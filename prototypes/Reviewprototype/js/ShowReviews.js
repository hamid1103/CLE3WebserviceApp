window.addEventListener('load', init)

let container;

let xhttp = new XMLHttpRequest();
let json;
let reviews;
xhttp.open("GET", "./backend/index.php", true);
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
        newDiv.dataset.indexNumber = i;
        newDiv.innerHTML =
            "<h2>" +
            reviews[i].name +
            "</h2>" +
            "<h3>" +
            reviews[i].place +
            "</h3>" +
            "<h3 name='Score'>" + "Score: " +
            reviews[i].score +
            "</h3>" +
            "<p>"+ reviews[i].summary +"</p>"+
            "Geschreven door: " + reviews[i].reviewer

        container[0].appendChild(newDiv)
    }
}