import { validateField } from "./validators.js";
import {
    transactions,
    addTransaction,
    setTransactions
} from "./state.js";

import {
    saveTransactions,
    loadTransactions
} from "./storage.js";

const form = document.getElementById("transactionForm");
const tableBody = document.getElementById("tableBody");

const totalRecords = document.getElementById("totalRecords");
const totalAmount = document.getElementById("totalAmount");
const topCategory = document.getElementById("topCategory");

function updateDashboard() {
    totalRecords.textContent = `${transactions.length} Records`;

    const totalSpent = transactions.reduce(
        (sum, transaction) => sum + Number(transaction.amount),
        0
    );

    totalAmount.textContent = `$${totalSpent.toFixed(2)}`;

    const categoryCounts = {};

    transactions.forEach(transaction => {
        categoryCounts[transaction.category] =
            (categoryCounts[transaction.category] || 0) + 1;
    });

    let highestCount = 0;
    let mostUsedCategory = "No Category";

    for (const category in categoryCounts) {
        if (categoryCounts[category] > highestCount) {
            highestCount = categoryCounts[category];
            mostUsedCategory = category;
        }
    }

    topCategory.textContent = mostUsedCategory;
}

function renderTable() {
    tableBody.innerHTML = "";

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>$${transaction.amount}</td>
            <td>${transaction.category}</td>
            <td>${transaction.date}</td>
        `;

        tableBody.appendChild(row);
    });
}
setTransactions(loadTransactions());

renderTable();
updateDashboard();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const description =
        document.getElementById("description").value;

    const amount =
        document.getElementById("amount").value;

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("date").value;

    if (!validateField("description", description)) {
        alert("Invalid description");
        return;
    }

    if (!validateField("amount", amount)) {
        alert("Invalid amount");
        return;
    }

    if (!validateField("category", category)) {
        alert("Invalid category");
        return;
    }

    if (!validateField("date", date)) {
        alert("Invalid date");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        category,
        date
    };

    addTransaction(transaction);
    saveTransactions(transactions);

    renderTable();
    updateDashboard();

    form.reset();
});