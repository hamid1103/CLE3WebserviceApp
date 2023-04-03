window.addEventListener('load', init);

//global vars
//change api later to
let apiURL = 'api/menuDatabase/menu1.json';
let openedDetails;
let detailsareOpened = false;
let categoryIsOpened = false;
let closeButton;
let currentCategory;

function init()
{
    let menu = document.getElementById('menu');
    collectMenu();
    let popUp = document.getElementById('popup');
    popUp.addEventListener(`click`, menuSwitch);
}


function menuSwitch(e) {
    let target = e.target;
    if (target.nodeName !== 'H3') {
        return;
    }

    if (target.innerHTML === "Menu 1") {
        apiURL = 'api/menuDatabase/menu1.json';
    }

    if (target.innerHTML === "Menu 2") {
        apiURL = 'api/menuDatabase/menu2.json';
    }

    menu.remove();
    menu = document.createElement('section');
    menu.setAttribute('id', "menu");
    document.body.appendChild(menu);
    collectMenu();
}


function collectMenu() {
    fetch(apiURL)
        .then ((response) => {
            return response.json();
        })
        .then(showMenu)
}


function showMenu(resultedMenu) {
    for (let i = 0; i < resultedMenu.category.length; i++) {
        let categoryDiv = document.createElement('div');
        let categoryTitle = document.createElement('h1');

        categoryDiv.setAttribute('id', Object.getOwnPropertyNames(resultedMenu.category[i]));
        categoryDiv.setAttribute('role', 'button');

        let categoryName = Object.getOwnPropertyNames(resultedMenu.category[i]);
        categoryTitle.innerHTML = categoryName;

        categoryTitle.addEventListener('click', function () {
                if (categoryIsOpened) {
                    openCategory.removeChild(closeButton);
                    for (let dishLoop = 0; dishLoop < currentCategory.length; dishLoop++) {
                        openCategory.removeChild(openCategory.lastChild);
                    }
                }

                currentCategory = resultedMenu.category[i][categoryName];

                closeButton = document.createElement('button');
                closeButton.innerHTML = `Sluit ${categoryName} lijst`;


                for (let dishLoop = 0; dishLoop < currentCategory.length; dishLoop++) {
                    let categoryDish = document.createElement('div');
                    let dishTitle = document.createElement('h2');
                    categoryDish.appendChild(dishTitle);
                    dishTitle.innerHTML = resultedMenu.category[i][categoryName][dishLoop].naam;
                                                                                        //Keep Dutch, name in JSON
                    dishTitle.addEventListener('click', function (){
                            if (detailsareOpened) {
                               openedDetails.remove();
                            }

                            let dishDetails = document.createElement('h3');
                            dishDetails.innerHTML = `Beschrijving: ${resultedMenu.category[i][categoryName][dishLoop].beschrijving}<br />Prijs: ${resultedMenu.category[i][categoryName][dishLoop].prijs}`
                            categoryDish.appendChild(dishDetails);                                                   //Keep Dutch, name in JSON  -->                                               same here

                            openedDetails = dishDetails;
                            detailsareOpened = true;
                    });

                    categoryDiv.appendChild(categoryDish);
                }

                closeButton.addEventListener(`click`, function (){
                    if (categoryIsOpened) {
                        openCategory.removeChild(closeButton);
                        for (let dishLoop = 0; dishLoop < currentCategory.length; dishLoop++) {
                            openCategory.removeChild(openCategory.lastChild);
                        }
                        categoryIsOpened = false;
                    }
                })

                categoryDiv.appendChild(closeButton);

                openCategory = categoryDiv;
                categoryIsOpened = true;
        })

        categoryDiv.appendChild(categoryTitle);
        menu.appendChild(categoryDiv);
    }
}