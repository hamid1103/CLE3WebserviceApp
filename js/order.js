const URL_RESTAURANTS = 'http://localhost/CLE3WebserviceApp/api/main';
const URL_MENUS = 'http://localhost/CLE3WebserviceApp/api/order/menu'

let restaurants = [];
let restaurant = {};
let menu = {};


async function init() {
    await fetchRestaurants();
    await loadRestaurants();
}

async function loadRestaurants() {
    let list = document.getElementById('order-restaurant-list')

    for (let i = 0; i < restaurants.length; i++) {
        let a = document.createElement('a');
        a.innerText = restaurants[i].Name;

        let li = document.createElement('li');
        li.appendChild(a);

        list.appendChild(li);
    }
}

async function fetchRestaurants() {
    const res = await fetch(URL_RESTAURANTS);
    const json = await res.json();
    
    console.log(json.restaurants);

    restaurants = json.restaurants;
}

async function fetchMenus() {
    const res = await fetch(URL_MENUS + `&id=0`);
    const json = await res.json();
    
    console.log(json);

    restaurants = json;
}

init()