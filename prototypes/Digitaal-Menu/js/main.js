window.addEventListener('load', init);

//global vars
let apiURL = 'menuDatabase/menu1.json';
let menu;


function init()
{
    menu = document.getElementById('menu');
    collectMenu();
}


function collectMenu() {
    fetch(apiURL)
        .then ((response) => {
            return response.json();
        })
        .then(showMenu)
}
//Need to add back buttons, stop it from duplicating on multiple clicks, delete other categories when opening one
function showMenu(resultedMenu) {
    for (let i = 0; i < resultedMenu.categorie.length; i++) {
        let categorieDiv = document.createElement('div');
        let categorieTitel = document.createElement('h1');

        categorieDiv.setAttribute('id', Object.getOwnPropertyNames(resultedMenu.categorie[i]));
        categorieDiv.setAttribute('role', 'button');

        let categorieNaam = Object.getOwnPropertyNames(resultedMenu.categorie[i]);
        categorieTitel.innerHTML = categorieNaam;

        categorieTitel.addEventListener('click', function (e) {
                let huidigeCategorie = resultedMenu.categorie[i][categorieNaam];
                for (let gerechtenLoop = 0; gerechtenLoop < huidigeCategorie.length; gerechtenLoop++) {
                    let categorieGerecht = document.createElement('div');
                    let gerechtTitel = document.createElement('h2');
                    categorieGerecht.appendChild(gerechtTitel);
                    gerechtTitel.innerHTML = resultedMenu.categorie[i][categorieNaam][gerechtenLoop].naam;

                    gerechtTitel.addEventListener('click', function (e){
                            let gerechtDetails = document.createElement('h3');
                            gerechtDetails.innerHTML = `Beschrijving: ${resultedMenu.categorie[i][categorieNaam][gerechtenLoop].beschrijving}<br />Prijs: ${resultedMenu.categorie[i][categorieNaam][gerechtenLoop].prijs}`
                            categorieGerecht.appendChild(gerechtDetails);
                    });

                    categorieDiv.appendChild(categorieGerecht);
                }
        })

        categorieDiv.appendChild(categorieTitel);
        menu.appendChild(categorieDiv);
    }
}