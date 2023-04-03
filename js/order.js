const URL_RESTAURANTS = './api/main';
const URL_MENUS = './api/order/menu';
const URL_THIS = './order.html'

let restaurants = [];
let menu = {};
let restaurant = {};

let params = new URLSearchParams(document.location.search);
let id = params.get('id');


async function init() {
    if (typeof id != null && typeof id == 'number') {
        await fetchRestaurantInfo();
        await fetchRestaurantMenu();
    }
    await fetchRestaurants();
    await loadRestaurants();
}

async function loadMenu() {
    
}

async function fetchRestaurantMenu() {
    const res = await fetch(`${URL_MENU}?=id${id}`);
    const json = await res.json();
    
    console.log(json);

    menu = json;
}

async function fetchRestaurantInfo() {
    const res = await fetch(`${URL_RESTAURANTS}?=id${id}`);
    const json = await res.json();
    
    console.log(json);

    restaurant = json;
}

async function loadRestaurants() {
    let list = document.getElementById('order-restaurant-list');

    for (let i = 0; i < restaurants.length; i++) {
        let a = document.createElement('a');
        a.innerText = restaurants[i].Name;
        a.setAttribute('href', `${URL_THIS}?id=${restaurants[i].id}`);

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
    const res = await fetch(URL_MENUS + `?id=0`);
    const json = await res.json();
    
    console.log(json);

    restaurants = json;
}

init()