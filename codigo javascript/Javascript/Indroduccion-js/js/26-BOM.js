'use strict'


//BOM   

//Para saver la cantidad de pixeles de la ventana;
function getBom(screenFunction){
    console.log("Usando windows");
    console.log(window.innerWidth);
    console.log(window.innerHeight);    
    console.log(window.location.href);

    screenFunction();
}

function redirect(url){
    window.location.href = url;
}

function abrirVentana(url){
    window.open(url,"","width=400,height=300");
}

//Este te dice el campo completo de la ventana
getBom( ()=>{
    console.log("Usuando screen");
    console.log(screen.width);
    console.log(screen.height);
});




