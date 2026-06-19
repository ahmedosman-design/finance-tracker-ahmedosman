export let transactions = [];

export function addTransaction(transaction) {
    transactions.push(transaction);
}

export function setTransactions(data) {
    transactions.length = 0;
    transactions.push(...data);
}