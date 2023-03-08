window.addEventListener('load', init);

let submitButton;
let form;

let reviewer;
let name;
let score;
let place;
let summary;

let xhttp = new XMLHttpRequest();
let json;
let reviews;


function init(){
    console.log('inited')
    submitButton = document.getElementById('submitB')
    form = document.getElementById('ReviewForm')
    form.addEventListener('submit', subimit)
}

function subimit(e){
    reviewer = "John Doe"
    name = document.getElementById('restaurantName').value
    score = document.getElementById('score').value
    place = document.getElementById('location').value
    summary = document.getElementById('story').value
    e.preventDefault();
    /*xhttp.setRequestHeader("Content-type", "multipart/form-data")*/
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
            console.log(response)
        }
    };
    var data = new FormData;
    data.append("reviewer", reviewer)
    data.append("score", score)
    data.append("place", place)
    data.append("name", name)
    data.append("summary", summary)
    xhttp.open("POST", "./backend/newrev.php", true);
    xhttp.send(data)
    console.log('SUBIMITTEDs')
    window.location.replace("./index.html");
}