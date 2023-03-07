window.addEventListener('load', init)

let container;

let xhttp = new XMLHttpRequest();
let json;
let reviews;
xhttp.open("GET", "http://localhost/PrototypeCLE3/backend/", true);
xhttp.send()
xhttp.onload = function (){
    json = JSON.parse(this.responseText)
    reviews = json.reviews;
}

function init(e){
    container = document.getElementsByClassName('fullcontainer');
    renderReviews()
}

function renderReviews(){
    for(let i = 0; i< reviews.length; i++){
        console.log(reviews[i])
        let newDiv = document.createElement('div');
        newDiv.className = 'review-card'
        newDiv.innerText = JSON.stringify(reviews[i])
        container[0].appendChild(newDiv)
    }
}