window.addEventListener('load', init)

let reviewsHolder;
let mainContainer;
let xhttp = new XMLHttpRequest();
let SavedjsonData;
let modal;
let modalcontent;
var span

function init() {
    span = document.getElementsByClassName("close")[0];
    modalcontent = document.getElementById('modalcontent');
    modal = document.getElementById('myModal');
    mainContainer = document.getElementById('main')
    if (mainContainer.dataset.content === 'reviews') {
        reviewsHolder = document.getElementById('reviews')
        getReviews();
        console.log('getting reviews')
        window.addEventListener('click', clickHandler)
    } else
        if (mainContainer.dataset.content === 'form') {
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

span.onclick = function() {
    modal.style.display = "none";
}


function getReviews() {
    let reviews;
    let json;
    xhttp.open("GET", "./api/Main/index.php", true);
    xhttp.send()
    xhttp.onload = function () {
        let container = document.getElementById('Reviews')
        json = JSON.parse(this.responseText)
        console.log(this.responseText)
        //save data localy
        SavedjsonData = json;
        let restaurantss = json.restaurants;
        for (let restaurant of restaurantss) {
            let RestaurantDiv = document.createElement('section')
            let restName = document.createElement('h2')
            RestaurantDiv.className = 'restname'
            restName.innerText = restaurant.Name
            RestaurantDiv.ariaLabel = 'Reviews voor ' + restaurant.Name;
            RestaurantDiv.dataset.restid = restaurant.id;
            RestaurantDiv.appendChild(restName)

            console.log(restaurant)
            let reviews = restaurant.Reviews;
            console.log(reviews)
            for (let i = 0; i < reviews.length; i++) {
                console.log(reviews[i])
                let newDiv = document.createElement('div');

                let newFav = document.createElement('img')
                newFav.src='./images/fav.png'
                newFav.alt='favo'
                newFav.dataset.type = 'favorite'

                //check localstorage for key [restid]-[revid]
                newFav.dataset.code = restaurant.id+'-'+i
                console.log(localStorage.getItem(restaurant.id+'-'+i))
                if(localStorage.getItem(restaurant.id+'-'+i) === '1'){
                    //if key = 1 -> set .favOn + set dataset to fav = true
                    newFav.className = 'favOn'
                    newFav.dataset.fav = 'true'
                }else {
                    newFav.dataset.fav = 'false'
                    newFav.className = 'favOff'
                }



                newDiv.dataset.restaurant = restaurant.id
                newDiv.className = 'reviewcard'
                newDiv.dataset.indexNumber = i;
                newDiv.innerHTML =
                    "<h3 name='Score'>" + "Score: " +
                    reviews[i].score +
                    "</h3>" +
                    "<p>" + reviews[i].summary + "</p>" +
                    "Geschreven door: " + reviews[i].reviewer
                newDiv.appendChild(newFav)
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


btn.onclick = function() {
    modal.style.display = "block";
}
function clickHandler(e){
    console.log(e.target)
    if (e.target === modal){
        modal.style.display = "none";
    }else if(e.target.className === 'restname'){
        //Show restaurant data
        modal.style.display = "block";
        let restdata = SavedjsonData.restaurants[e.target.dataset.restid]
        modalcontent.innerHTML = "<h3>" + restdata.Name +"</h3> <br> " +
            "<p>Locatie: " + restdata.Location + "</p><br>" +
            "<p>api ID: " +restdata.id+ "</p>"
        console.log('EEE')
    }else if(e.target.className === 'reviewcard'){
        //show review + restaurant data
        let revindex = e.target.dataset.indexNumber
        let restdata = SavedjsonData.restaurants[e.target.dataset.restaurant]
        modalcontent.innerHTML = "<h3>" + restdata.Name +"</h3> <br> " +
            "<p>Locatie: " + restdata.Location + "</p><br>" +
            "<p>api ID: " +restdata.id+ "</p> <br>" +
            "<p>Score: "+restdata.Reviews[revindex].score+"</p><br>" +
            "<p>"+restdata.Reviews[revindex].summary+"</p><br>" +
            "<p>Door: "+restdata.Reviews[revindex].reviewer+"</p><br>"
        modal.style.display = "block";
    }else if(e.target.dataset.type === 'favorite'){
        //togle favorite
        let code = e.target.dataset.code
        if(e.target.dataset.fav === 'false'){
            e.target.dataset.fav = 'true';
            localStorage.setItem(code, '1')
            e.target.className = 'favOn'
        }else if(e.target.dataset.fav === 'true') {
            e.target.dataset.fav = 'false';
            localStorage.setItem(code, '0')
            e.target.className = 'favOff'
        }
    }
}