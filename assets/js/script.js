const API_KEY = "AzkVzENpL2XoEMGh8JIvLXoFiAE";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

// Test javascript URL: https://mattrudge.net/assets/js/menu.js
document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
    const form = processOptions(new FormData(document.getElementById("checksform")));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY
        },
        body: form
    });

    const data = await response.json();
    if (response.ok) {
        displayErrors(data);
    }
    else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayException(data) {
    console.log("error:", data);
    let heading = "An Exception Occurred"
    let report = "";
    report += `<div>The API returned Status Code ${data.status_code}</div>`;
    report += `<div>Error number: <span class="error-number">${data.error_no}</span></div>`;
    report += `<div>Error text: <span class="error-text">${data.error}</span></div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = report;
    resultsModal.show();
}

function processOptions(form) {

    let opt_array = [];
    for (let entry of form) {
        if (entry[0] === "options") {
            opt_array.push(entry[1]);
        }
    }
    form.delete("options");
    form.append("options", opt_array.join());
    return form;
}

function displayErrors(data) {

    let heading = `Results for file: ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no-errors">No errors reported!</div>`;
    }
    else {
        results = `<div>Total Errors: <span class="error-count">${data.total_errors}</span></div>`;
        for (let error of data.error_list) {
            results += `<div>At Line: <span class="line-number">${error.line}</span>, 
                At Col:<span class="column-number">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();
    if (response.ok) {
        displayStatus(data);
    }
    else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let apiStatus = data.status;
    let heading = "API Key Status";
    let result = `<div>Your key is valid until:</div>`;
    result += `<div class="key-status">${data.expiry}</div>`;
    let modalTitle = document.getElementById("resultsModalTitle");
    let modalBody = document.getElementById("results-content");
    modalTitle.innerHTML = heading;
    modalBody.innerHTML = result;

    resultsModal.show();
}