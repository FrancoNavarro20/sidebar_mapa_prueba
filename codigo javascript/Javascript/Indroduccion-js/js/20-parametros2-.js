'use strict'

// Parametros REST(resto) y  SPREAD

//parametro REST: con los tres puntitos se puede importar el resto de los parametros que no pusimos en la consola!!
//Parametro REST:"...resto_de_frutas"; los parametros restantes se guardan dentro de una lista o arrays!!



function listadoFrutas(fruta1, fruta2, ...resto_de_frutas) {

    //Para que me funcione el "Arrays", es necesario para concatenar la coma(,) no la suma(+)"

    console.log("Fruta 1:", fruta1);
    console.log("Fruta 2:", fruta2);
    console.log(resto_de_frutas);
}

listadoFrutas("Naranja", "Manzana", "Sandia", "Pera", "Melon", "Coco");


//Parametro de tipo SPREAD
//Se hace una variable con un Arrays y de invoca en la funcion con los tres puntitos
//Asi "...frutas" por ejemplo

var frutas = ["Naranja", "Manzana"];
listadoFrutas(...frutas, "Sandia", "Pera", "Melon", "Coco");

////
////
////
////
////
////
////
////
////
////
////
////
////

/////////////////////////-LA PRACTICA FRANKIÑO!!LICENCIADO EN SISTEMAS!!!-//////////////////////


//Funcion con funciones, parametros (REST,SPREAD) y arrays

/*
function listadoFrutas(fruta1, fruta2, ...resto_de_frutas) {

    //Para que me funcione el "Arrays, es necesario para concatenar la coma(,) no la suma(+)"

    console.log("Fruta 1:", fruta1);
    console.log("Fruta 2:", fruta2);
    console.log(resto_de_frutas);
}

// listadoFrutas("Naranja", "Manzana", "Sandia", "Melon", "Durazno");

var frutas = ["Naranja", "Manzana"];

listadoFrutas(frutas, "Sandia", "Melon", "Durazno");

*/