window.addEventListener("load", init)

let grid;
let body;

function init(){
    body = document.body;
    grid = document.getElementById('grid')
    body.addEventListener('mouseover', setWP)
}


function setWP(e){
    let imgsrc;
    if(e.target.className === 'imged'){
        imgsrc = e.target.dataset.img;
        console.log('IMAGE! ' + imgsrc)
    }else {
        imgsrc = ''
        console.log('not img. ' + imgsrc)
    }
    body.style.backgroundImage = `url(${imgsrc})`;

}