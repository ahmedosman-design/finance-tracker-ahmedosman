function searchData(pattern) {
    try {
        const regex = new RegExp(pattern, "i");

        return transactions.filter(t =>
            regex.test(t.description) ||
            regex.test(t.category)
        );

    } catch {
        return transactions;
    }
}