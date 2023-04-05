window.addEventListener("load", init)

let grid;
let body;
let imgview;
function init(){
    body = document.body;
    imgview = document.getElementById('viewwindow')
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
    imgview.src = imgsrc;
    imgview.style.display='block';
    /*body.style.backgroundImage = `url(${imgsrc})`;
    body.style.backgroundSize = 'cover';*/

}