'use strict'

var formulario = document.querySelector("#formPeliculas");



formulario.addEventListener("submit", function(){
    console.log("entroo");
    var titulo = document.querySelector("#addpelicula").value;
    if(titulo.length >= 1){
        localStorage.setItem(titulo, titulo);
    }

});

//Agregando las peliculas a la lista
var ul = document.querySelector("#ulPeliculas");
var i;
for(i in localStorage){
    if(typeof localStorage[i] == 'string'){
        var li = document.createElement('li');
        li.append(localStorage[i]);
        ul.append(li);
    }

}



//Formulario para borrar la pelicula
var formularioBorar = document.querySelector("#formularioBorrar");

formularioBorar.addEventListener("submit", function(){

    var titulo = document.querySelector("#borrarPelicula").value;
    if(titulo.length >= 1){
        localStorage.removeItem(titulo);
    }

});