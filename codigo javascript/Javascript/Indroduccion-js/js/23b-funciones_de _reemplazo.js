'use strict'

// Funciones de reeemplazo


var numero = 444;
var texto1 = "Bienvenidos al curso de Javascript curso de Victor Robles";
var texto2 = "es muy buen curso";


//Con ".replace" me reemplaza cualquier palabra que quiera

var busqueda = texto1.replace("Javascript", "Symfony");
console.log(busqueda);


//Con ".slice" me recorta la oracion indicando en que caracte debe empezar hacia adelante
// O le puedo asignar de que caracter hasta cual quiero que me muestre ( 14,22) por eje!! 

var busqueda = texto1.slice(16, 24);
console.log(busqueda);


//Con   ".split()" me convierte el string en una Arrays
// Si le doy un espacio dentro de ".split" (me separa cada palabra);

var busqueda = texto1.split(" ");
console.log(busqueda);


//Con ".trim();" me quita los espacios de adelante y por detras  de la varaible que guarda un texto String

var busqueda = texto1.trim();
console.log(busqueda);