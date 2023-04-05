window.addEventListener('load', reserveringen);
let xhttp = new XMLHttpRequest();
let container;
function reserveringen(){
    container = document.getElementById('reserveringen-container');
    xhttp.open("GET", "./backend/index.php", true);
    xhttp.send();
    xhttp.onload = function (){
        json = JSON.parse(this.responseText);
        console.log(this.responseText)
        reservering = json.reserveringen;

        for(let i = 0; i< reservering.length; i++){
            console.log(reservering[i]);
            let Div = document.createElement('div');
            Div.className = 'reservering';
            Div.dataset.indexNumber = i;
            Div.innerHTML =
                "<h2>" +
                reservering[i].voornaam +
                "</h2>" +
                "<h3>" +
                reservering[i].restaurant +
                "</h3>" +
                "<h3>" +
                reservering[i].datetime +
                "</h3>" +
                "<p>" +
                reservering[i].aantal_personen +
                "</p>" +
                "<p>" +
                reservering[i].opmerkingen +
                "</p>";


            container.appendChild(Div);
        }

    }


}