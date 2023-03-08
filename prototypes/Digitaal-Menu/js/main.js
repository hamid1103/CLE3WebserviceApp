window.addEventListener('load', init);

let title;
let button;

function init()
{
    document.querySelectorAll('table').forEach(item =>{
        item.style.display = "none";
    });
    title = document.getElementsByTagName('H2');
    document.addEventListener(`click`, binnenMenu);

    button = document.getElementById('terug');
    button.addEventListener(`click`, terugNaarStart)
}



function binnenMenu(e) {
    let target = e.target;
    if (target.nodeName !== 'H2') {
        return;
    }

    document.querySelectorAll('div').forEach(item =>{
        item.style.display = "none";
    });

    let currentDiv = document.getElementById(target.className);
    currentDiv.style.display = "block";
    currentDiv.lastElementChild.style.display = "";

    button.style.display = "block";
}

function terugNaarStart() {
    document.querySelectorAll('table').forEach(item =>{
        item.style.display = "none";
    });
    document.querySelectorAll('div').forEach(item =>{
        item.style.display = "block";
    });
    button.style.display = "none";
}