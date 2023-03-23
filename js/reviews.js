window.addEventListener('load', init)

let reviewsHolder;
let mainContainer;
let xhttp = new XMLHttpRequest();


function init(){
    mainContainer = document.getElementById('main')
    if(mainContainer.dataset.content === 'reviews'){
        reviewsHolder = document.getElementById('reviews')
        getReviews();
        console.log('getting reviews')
    }else if(mainContainer.dataset.content === 'form'){
        console.log('Setting form')
        let form = document.getElementById('ReviewForm')
        form.addEventListener('submit', postReview)
    }
}

function getReviews(){
    let reviews;
    let json;
    xhttp.open("GET", "./api/Main/index.php", true);
    xhttp.send()
    xhttp.onload = function () {
        json = JSON.parse(this.responseText)
        console.log(json)
        let restaurantss = json.restaurants;
        for(let restaurant of restaurantss){
            console.log(restaurant)
            let reviews = restaurant.Reviews;
            console.log(reviews)
            for (let review of reviews){
                //reviews code here
                /*for(let i = 0; i< reviews.length; i++){
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
        }*/
            }
        }

    }
}

function postReview(e){
    let reviewer = document.getElementById('name').value;
    let name = document.getElementById('restaurantName').value;
    let score = document.getElementById('score').value;
    let place = document.getElementById('location').value;
    let summary = document.getElementById('story').value;
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
    let newReviewJson = {
        "reviewer": reviewer,
        "score": score,
        "place": place,
        "name": name,
        "summary": summary
    }
    data.append('action', 'addTo')
    data.append()
    xhttp.open("POST", "./api/Main/index.php", true);
    xhttp.send(data)
    console.log('SUBIMITTEDs')
    window.location.replace("./index.html");
}