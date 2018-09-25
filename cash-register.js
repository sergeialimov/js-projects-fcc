
const sh = require('./shared.js')

const checkCashRegister = (price, customersMoney, cashInput) => {
  const sumInput = (customersMoney - price).toFixed(2);
  let result = { status: sh.whatStatus(cashInput, sumInput), change: [] };
  console.log('result', result);
  
  
  const getChange = (sumOut, internalCash) => {                                                          console.log('internalCash', internalCash);
    let cash = internalCash.slice();                                                                     console.log('-------------------------------');
    let sum = sumOut;
    // у findAmount собственная sum, потому что она уменьшаются рекурсивно
    
    const amount = sh.findAmount(sum);
    
    let money = sh.getDrawerAndCash(sum, cash, result.change, amount);
    cash = money.cash;
    if (!money.change) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }                                                                                                       console.log('sumInput', sumInput); console.log('getBalance(result.change)', sh.getBalance(result.change));
    // compare required change with prepared change
    const diff = (sumInput - sh.getBalance(money.change)).toFixed(2);                                          console.log('diff', diff);
    if (diff > 0) {
      getChange(diff, cash);
    }                                                                                                       console.log('quitting', result);
    return result;
  };
  return getChange(sumInput, cashInput);
};














console.log(checkCashRegister(19.5, 20, 
  [["PENNY", 0.5], 
  ["NICKEL", 0], 
  ["DIME", 0], 
  ["QUARTER", 0], 
  ["ONE", 0], 
  ["FIVE", 0], 
  ["TEN", 0], 
  ["TWENTY", 0], 
  ["ONE HUNDRED", 0]]));


// result {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.