'use strict'

function cambiarColor(color){
    caja.style.background = color;
}

//var caja = document.getElementById("micaja");
var caja = document.querySelector("#micaja");

caja.innerHTML = "Hola soy la caja 1";
caja.style.background = "green";
caja.style.padding = "20px";
caja.style.margin = "20px";
caja.className = "hola hola2";

//Conseguir elementos por su etiqueta!!

var todosLosDivs = document.getElementsByTagName('div');

var contenidoEnTexto = todosLosDivs[2];
var valor;

for(valor in todosLosDivs){
    if(typeof todosLosDivs[valor].textContent == "string")
    {   
        var parciarValor = parseInt(valor);
        console.log(typeof valor);

        //Agregando campos a la seccion , parrafos!!!
        todosLosDivs[valor].innerHTML = "se cambio el texto de la caja " + (parciarValor+1) + "!!!";
        var parrafo = document.createElement('p');
        var texto = document.createTextNode(todosLosDivs[valor].textContent);
        parrafo.appendChild(texto);
        document.querySelector('#miseccion').appendChild(parrafo);
    }
    
}


//Segunda parte

var divRojos = document.getElementsByClassName('rojo');
var divAmarrillo = document.getElementsByClassName('amarillo');

console.log(divRojos);
divAmarrillo[0].style.background= "yellow";

var valor;
for(valor in divRojos)
{   
    if(divRojos[valor].className == "rojo"){
        divRojos[valor].style.background="red";
    }
}


//querySelector
var id = document.querySelector("#encabezado");
console.log(id);

var claseRojo = document.querySelectorAll(".rojo");
console.log(claseRojo);

var etiqueta = document.querySelector("div");
console.log(etiqueta);








//PRUEBA array

//document.write("<h1>Lenguajes de programacion 2021</h1>");

//document.write("<ul>");

//var lenguajes = ["PHP","Javascript", "C#"];

//lenguajes.forEach( (elemento,indice,array) =>{
  //  document.write("<li> "+ indice + " " + elemento + " </li>");
//});

//document.write("</ul>");





