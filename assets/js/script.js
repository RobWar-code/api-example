const API_STRING = "AzkVzENpL2XoEMGh8JIvLXoFiAE";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();
    if (response.ok) {
        console.log(data);
    }
}