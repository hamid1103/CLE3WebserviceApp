window.addEventListener('load', init);

let submitButton;
let form;


function init(){
    console.log('inited')
    submitButton = document.getElementById('submitB')
    form = document.getElementById('ReviewForm')
    form.addEventListener('submit', subimit)
}

function subimit(e){
    e.preventDefault();
    console.log('SUBIMITTEDs')
}