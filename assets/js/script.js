const API_KEY = "AzkVzENpL2XoEMGh8JIvLXoFiAE";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();
    if (response.ok) {
        displayStatus(data);
    }
    else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let apiStatus = data.status;
    let heading = "API Key Status";
    let result = `<div>Your key is valid until:</div>`;
    result += `<div class="key-status">${data.expiry}</div>`
    let modalTitle = document.getElementById("resultsModalTitle");
    let modalBody = document.getElementById("results-content");
    modalTitle.innerHTML = heading;
    modalBody.innerHTML = result;

    resultsModal.show();
}