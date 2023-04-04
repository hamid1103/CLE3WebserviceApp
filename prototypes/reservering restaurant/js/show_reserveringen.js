window.addEventListener('load', init);
let xhttp = new XMLHttpRequest();
let json;
let reservering;
let container;
let firstname, restaurant, datetime, aantalPersonen, opmerkingen;
function init(e){
    form = document.getElementById('forum');
    form.addEventListener('submit', submitForm);
    reserveringen()

}


function submitForm(event){
    event.preventDefault();


    firstname = document.getElementById('firstname').value;
    restaurant = document.getElementById('restaurant').value;
    datetime = document.getElementById('datetime').value;
    aantalPersonen = document.getElementById('aantal-personen').value;
    opmerkingen = document.getElementById('opmerkingen').value;

    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            const response = this.responseText;
            console.log(response);
            location.replace('./reserveringen.html')
        }
    };

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('restaurant', restaurant);
    formData.append('datetime', datetime);
    formData.append('aantal-personen', aantalPersonen);
    formData.append('opmerkingen', opmerkingen);

    xhttp.open('POST', './backend/nieuwe_reservering.php', true);
    xhttp.send(formData);


    console.log('SUBMITTED');


    window.location.href = './reserveringen.html';
}