const URL_RESTAURANTS = './api/main';
const URL_MENUS = './api/order/menu';
const URL_THIS = './order.html'

let restaurants = [];
let menu = {};
let restaurant = {};

let params = new URLSearchParams(document.location.search);
let id = params.get('id');

//init call
window.onload = () => init();

//code for calculation
let total = 0;
let order = [];

function updateList() {
    let ul = document.getElementById('order-list');
    let totalPrice = document.getElementById('order-total');

    //remove all first
    ul.innerHTML = '';
    total = 0;

    //add all
    order.forEach(dish => {
        total += dish.price;

        let li = document.createElement('li');
        li.innerText = `${dish.name} - ${dish.price}`

        ul.appendChild(li);
    });

    totalPrice.innerText = `Totaal: ${total}`;
}

//everything else
async function init() {
    if (id != null) {
        //reveal menu
        let container = document.getElementById('order-container-menu');
        container.hidden = false;

        //fetch
        await fetchRestaurantInfo();
        await fetchRestaurantMenu();

        //load
        await loadRestaurantInfo();
        await loadMenu();
    }
    
    else {
        //reveal restaurant selection
        let container = document.getElementById('order-restaurant-selection');
        container.hidden = false;

        //fetch & load
        await fetchRestaurants();
        await loadRestaurants();
    }
}

async function loadMenu() {
    let container = document.getElementById('order-container-items');
    let nav = document.getElementById('order-category-nav');

    menu.categories.forEach((cat) => {
        console.log(cat);

        //create the nav
        let a = document.createElement('a');
        a.innerText = cat.name;
        a.setAttribute('href', `#order-category-${cat.id}`);
        nav.appendChild(a);

        //create the category with dishses
        //category title
        h2 = document.createElement('h2');
        h2.innerText = cat.name;
        h2.setAttribute('id', `order-category-${cat.id}`);
        container.appendChild(h2); //title

        //dishes
        cat.dishes.forEach(async (dish) => {
            //section
            let section = document.createElement('section');

            //name
            let h3 = document.createElement('h3');
            h3.innerText = dish.name;
            //price
            let price = document.createElement('p');
            price.innerText = dish.price;
            //description
            let descrH = document.createElement('h4');
            descrH.innerText = 'Beschrijving';
            let descr = document.createElement('p');
            descr.innerText = dish.description;
            //buttone
            let btn = document.createElement('button');
            btn.innerText = 'Toevoegen aan bestelling';

            //add eventhandler for counting total
            btn.addEventListener('click', () => {
                order.push(dish);
                updateList();
            });

            //add to section
            section.appendChild(h3);
            section.appendChild(price);
            section.appendChild(descrH);
            section.appendChild(descr);
            section.appendChild(btn);

            //add section to container
            let container = document.getElementById('order-container-items');
            container.appendChild(section);
        });
    });
}

async function loadRestaurantInfo() {
    let title = document.getElementById('order-restaurant-title');
    title.innerText = restaurant.Name
}

async function fetchRestaurantMenu() {
    const res = await fetch(`${URL_MENUS}?id=${id}`);
    const json = await res.json();
    
    console.log(json);

    menu = json;
}

async function fetchRestaurantInfo() {
    const res = await fetch(`${URL_RESTAURANTS}?id=${id}`);
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