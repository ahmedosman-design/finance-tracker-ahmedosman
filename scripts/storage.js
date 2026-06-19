function saveData() {
    localStorage.setItem("financeData", JSON.stringify(transactions));
}

// EXPORT JSON
function exportData() {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "transactions.json";
    a.click();
}

// IMPORT JSON
function importData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            if (!Array.isArray(data)) {
                alert("Invalid file");
                return;
            }

            transactions = data;
            saveData();
            render();

        } catch {
            alert("Invalid JSON file");
        }
    };

    reader.readAsText(file);
}