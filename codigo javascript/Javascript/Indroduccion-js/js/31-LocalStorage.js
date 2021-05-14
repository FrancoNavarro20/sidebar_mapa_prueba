'use strict'

//LocalStorage

//Comprobar disponibilidad de localStorage
if(typeof(Storage) !== 'undefined'){
    console.log("LocalStorage disponible");
}else{
    console.log("No disponible");
}

//Guardar datos
localStorage.setItem("titulo", "Curso de symfony");

//Recuperar o obtener elemento

console.log(localStorage.getItem("titulo"));
document.querySelector("#peliculas").innerHTML = localStorage.getItem("titulo");

//guardar un objeto en el localStorage
var usuario = {
    nombre:"Franco Navarro",
    email: "frankitonv@gmail.com",
    web: "google.com"
}

/*Para guardar mi objeto en el localStorage ,
 si o si tengo que convertir ese objeto a un string
 con JSON.stringify()
 */
localStorage.setItem("usuario",JSON.stringify(usuario));

//Recuperar o obtener objeto Json desde localStorage

/*
 Con el parse lo que hago es traer el objeto js en formato de ojeto para usarlo en codigo Js
 si no , es todo un string;
*/

var userjs = JSON.parse(localStorage.getItem("usuario"));
console.log(userjs);

document.querySelector("#datos").append(userjs.nombre + " - " + userjs.email + " - " + userjs.web);


//remover o limpiar datos del LocalStorage


//Me cargan los datos , puedo usar el Json pero despues me elimina la memoria;
localStorage.removeItem("usuario");
localStorage.clear();




