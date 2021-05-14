'use strict'

//Transformacion de textos

var numero = 444;
var texto1 = "Bienvenido al curso de Javascript de Victor Robles";
var texto2 = "es muy buen curso";


/* 
 La propiedad ".indexOf" nos sirve para buscar una palabra dentro de algo
 Nos dira en que caracterec empieza!!
 Y ".lastIndexOf" nos va a mostrar la palabra que pusimos pero al final de la oracion!!
 */

var busqueda = texto1.lastIndexOf("curso");
console.log(busqueda);



var busqueda = texto1.lastIndexOf("curso");
console.log(busqueda);




/*
Tambien tenemos la propiedad ".search" para buscar las palabras!!
es lo mismo que  ".indexOf"
*/


var busqueda = texto1.search("curso");
console.log(busqueda);



//Hay otra propiedad que es ".match" que te guarda las palabras que considen en un Arrays[]
// Se guarda asi si es Una sola palabra igual en la oracion:

//"""""texto1.match("curso")""""//

var busqueda = texto1.match("curso");
console.log(busqueda);



//Si son mas de una las palabras iguales se las debe guardar asi: texto1.match(/curso/gi);

var busqueda = texto1.match(/curso/g);
console.log(busqueda);



// Del caracter 14 va a empezar y me va a mostrar 5 caracteres en adelante , lo cual saldria a ser la palabra curso!!!

var busqueda = texto1.substr(14, 5);
console.log(busqueda);


//Con la propiedad ".charAt", le estoy diciendo que me saque en la consola el carracter 44 de la oracion;

var busqueda = texto1.charAt(44);
console.log(busqueda);


//Otra propiedad es el  ".startsWith" donde podes buscar palabras al comienzo solamente  de las oraciones

var busqueda = texto1.startsWith("Bienvenido");
console.log(busqueda);

//Otra propiedad es el  ".startsWith" donde podes buscar palabras al final solamente de las oraciones

var busqueda = texto1.endsWith("Victor Robles");
console.log(busqueda);


//.include de busca la palabra en la oracion y te dice si esta: (si es true o false);!!!
//Si existe o no Existe!! te dice!!

var busqueda = texto1.includes("Javascript");
console.log(busqueda);








/*
Parte 1 =>METODOS PARA PROCESAR TEXTO!!!



var dato = numero.toString(); // .tosString para convertir todo a texto
dato = texto1.toLowerCase(); // .toLowerCase para texto en Minuscula
dato = texto2.toUpperCase(); // .toUpperCase para texto en Mayuscula

console.log(dato);



///////////////////--Calcular longitud--///////////////////


//Con la propiedad  ".length" nos dice cuantos caracteres tiene nuestro texto y nos dice undefine si es un numero la que contiene la variable
//Y tambien sirve para contar cosas!!! 


var nombre = "Franco Navarro";
nombre = ["hola", "hola"]; // Estoy es un Arrays

console.log(nombre.length);


//Concatenar - Unir textos


//var textoTotal = `${texto1} \n ${texto2} !!!`; //Tambien se puede concatenar de esta manera!!!
//var textoTotal = texto1 + " " + texto2;        //Tambien se puede concatenar de esta manera!!!

var textoTotal = texto1.concat(" " + texto2); // Asi con la propiedad ".concat" se puede concatenar variables y textos!!


console.log(textoTotal);
*/