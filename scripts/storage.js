export function saveTransactions(transactions) {
    localStorage.setItem(
        "financeData",
        JSON.stringify(transactions)
    );
}

export function loadTransactions() {
    const data =
        localStorage.getItem("financeData");

    return data ? JSON.parse(data) : [];
}