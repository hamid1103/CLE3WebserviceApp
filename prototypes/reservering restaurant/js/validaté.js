//global

let firstname = document.getElementById("firstname").value;
let restaurant = document.getElementById("restaurant").value;
//let datetime = document.getElementById("datetime").value;
let aantal_personen = document.getElementById("aantal-personen").value;
let opmerkingen = document.getElementById("opmerkingen").value;


let reserverenBtn = document.querySelector("button[type='submit']");

reserverenBtn.onclick = function(e) {
    e.preventDefault();
    if (validateFirstName() && validateReservationDate()) {
        // sla de reserveringsgegevens op of stuur ze naar een server
        alert("Bedankt voor het reserveren!");
    }
};

function validateFirstName() {
    let firstNameInput = document.getElementById("firstname");
    let firstNameValue = firstNameInput.value.trim();
    if (firstNameValue === "") {
        firstNameInput.setCustomValidity("Vul uw voornaam in");
        return false;
    } else {
        firstNameInput.setCustomValidity("");
        return true;
    }
}



// function validateReservationDate() {
//     let reservationDateInput = document.getElementById("datetime");
//     let reservationDateValue = new Date(reservationDateInput.value).getTime();
//     let now = new Date().getTime();
//     if (reservationDateValue <= now) {
//         reservationDateInput.setCustomValidity("De reserveringsdatum moet in de toekomst liggen");
//         return false;
//     } else {
//         reservationDateInput.setCustomValidity("");
//         return true;
//     }
// }