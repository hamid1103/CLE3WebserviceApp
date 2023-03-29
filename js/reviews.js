window.addEventListener('load', init)

let reviewsHolder;
let mainContainer;
let xhttp = new XMLHttpRequest();

function init() {
    mainContainer = document.getElementById('main')
    if (mainContainer.dataset.content === 'reviews') {
        reviewsHolder = document.getElementById('reviews')
        getReviews();
        console.log('getting reviews')
    } else if (mainContainer.dataset.content === 'form') {
        console.log('Setting form')
        let form = document.getElementById('ReviewForm')
        form.addEventListener('submit', postReview)
        //set form data
        let json;
        xhttp.open("GET", "./api/Main/index.php", true);
        xhttp.send()
        let done = false;
        xhttp.onload = function () {
            if (done) {
                return;
            }
            done = true;
            let reviewFormSelect = document.getElementById('restaurant')
            json = JSON.parse(this.responseText)
            let restaurants = json.restaurants
            for (let i = 0; i < restaurants.length; i++) {
                let curRest = restaurants[i]
                let newOption = document.createElement('option')
                newOption.value = i;
                newOption.innerText = curRest.Name;
                reviewFormSelect.appendChild(newOption);
            }

            console.log(json.restaurants)
            console.log('done')
        }
    }
}

function getReviews() {
    let reviews;
    let json;
    xhttp.open("GET", "./api/Main/index.php", true);
    xhttp.send()
    xhttp.onload = function () {
        let container = document.getElementById('Reviews')
        json = JSON.parse(this.responseText)
        console.log(json)
        let restaurantss = json.restaurants;
        for (let restaurant of restaurantss) {
            let RestaurantDiv = document.createElement('section')
            let restName = document.createElement('h2')
            restName.innerText = restaurant.Name
            RestaurantDiv.className = '';
            RestaurantDiv.appendChild(restName)

            console.log(restaurant)
            let reviews = restaurant.Reviews;
            console.log(reviews)
            for (let i = 0; i < reviews.length; i++) {
                console.log(reviews[i])
                let newDiv = document.createElement('div');
                newDiv.className = 'review-card'
                newDiv.dataset.indexNumber = i;
                newDiv.innerHTML =
                    "<h3 name='Score'>" + "Score: " +
                    reviews[i].score +
                    "</h3>" +
                    "<p>" + reviews[i].summary + "</p>" +
                    "Geschreven door: " + reviews[i].reviewer + "<hr>"
                RestaurantDiv.appendChild(newDiv)
            }
            container.appendChild(RestaurantDiv)
        }

    }
}

function postReview(e) {
    let reviewer = document.getElementById('name').value;
    let name = document.getElementById('restaurant').value;
    let score = document.getElementById('score').value;
    let summary = document.getElementById('story').value;
    e.preventDefault();
    /*xhttp.setRequestHeader("Content-type", "multipart/form-data")*/
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Response
            var response = this.responseText;
            console.log(response)
        }
    };
    var data = new FormData;
    let newReviewJson = {
        "reviewer": reviewer,
        "score": score,
        "summary": summary
    }
    data.append('action', 'addTo')
    data.append('id', name)
    data.append('key', 'Reviews')
    data.append('value', JSON.stringify(newReviewJson))
    console.log(JSON.stringify(newReviewJson))
    xhttp.open("POST", "./api/Main/index.php", true);
    xhttp.send(data)
    console.log('SUBIMITTEDs')
    location.replace('./review.html')
}