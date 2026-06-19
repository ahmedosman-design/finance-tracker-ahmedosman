let editingId = null;

// INPUTS
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

// NAV
function showView(id) {
    document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// ADD / EDIT
function addTransaction() {

    const error = validate(
        descInput.value,
        amountInput.value,
        categoryInput.value,
        dateInput.value
    );

    if (error) return alert(error);

    if (editingId) {

        const tx = transactions.find(t => t.id === editingId);

        tx.description = descInput.value;
        tx.amount = Number(amountInput.value);
        tx.category = categoryInput.value;
        tx.date = dateInput.value;
        tx.updatedAt = new Date().toISOString();

        editingId = null;

    } else {

        transactions.push({
            id: Date.now().toString(),
            description: descInput.value,
            amount: Number(amountInput.value),
            category: categoryInput.value,
            date: dateInput.value,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }

    saveData();
    render();

    descInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";
    dateInput.value = "";
}

// EDIT
function editTx(id) {
    const tx = transactions.find(t => t.id === id);
    if (!tx) return;

    descInput.value = tx.description;
    amountInput.value = tx.amount;
    categoryInput.value = tx.category;
    dateInput.value = tx.date;

    editingId = id;
}

// DELETE
function deleteTx(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    render();
}

// RENDER
function render(data = transactions) {

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    data.forEach(t => {
        tbody.innerHTML += `
        <tr>
            <td>${t.description}</td>
            <td>${t.amount}</td>
            <td>${t.category}</td>
            <td>${t.date}</td>
            <td>
                <button onclick="editTx('${t.id}')">Edit</button>
                <button onclick="deleteTx('${t.id}')">Delete</button>
            </td>
        </tr>`;
    });

    updateStats();
}

// STATS
function updateStats() {

    document.getElementById("totalRecords").textContent = transactions.length;

    const total = transactions.reduce((a, b) => a + b.amount, 0);
    document.getElementById("totalAmount").textContent = total.toFixed(2);

    const cats = {};
    transactions.forEach(t => {
        cats[t.category] = (cats[t.category] || 0) + 1;
    });

    const top = Object.entries(cats).sort((a,b)=>b[1]-a[1])[0];
    document.getElementById("topCategory").textContent = top ? top[0] : "None";
}

// SEARCH
searchInput.addEventListener("input", (e) => {
    const results = searchData(e.target.value);
    render(results);
});

// SORT
sortSelect.addEventListener("change", (e) => {

    let sorted = [...transactions];

    switch (e.target.value) {

        case "az":
            sorted.sort((a,b)=>a.description.localeCompare(b.description));
            break;

        case "za":
            sorted.sort((a,b)=>b.description.localeCompare(a.description));
            break;

        case "low":
            sorted.sort((a,b)=>a.amount-b.amount);
            break;

        case "high":
            sorted.sort((a,b)=>b.amount-a.amount);
            break;

        case "new":
            sorted.sort((a,b)=>new Date(b.date)-new Date(a.date));
            break;

        case "old":
            sorted.sort((a,b)=>new Date(a.date)-new Date(b.date));
            break;
    }

    render(sorted);
});

// INIT
render();