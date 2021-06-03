"use strict"

// Condicional if

//Si  A es igual a B entonces haz algo
//Si  A es igual a B diferente o igual o menor haz algo


var edad1 = 10;
var edad2 = 12;

//Si pasa esto

if (edad1 > edad2) {

    //Ejecuta esto
    console.log("Edad uno es mayor que edad 2");

} else {
    console.log("La edad 1 es inferior")
}

/*
// Otra parte operadores relacionales

Mayor: >
Menor: <
Mayor o igual: >=
Menor o igual: <=
Igual: ==
Distinto: !=

*/

var edad = 19;
var nombre = "David Suarez";



if (edad >= 18) {
    //Es mayor de edad
    console.log(nombre + " " + "tiene:" + " " + edad + " " + "Años, es mayor de edad");

    //Anidacion de "if" dentro de otro "if"

    if (edad <= 33) {
        //Ejecuta
        console.log("Todabia eres millenials");
    } else if (edad >= 70) {
        console.log("Eres anciano");
    } else {
        console.log(`Ya no eres millenials`);
    }



} else {
    console.log(nombre + " tiene " + edad + " años , es menor de edad");
}


/*
//Operadores logicos 

AND(Y):&&
OR(O):||
NEGACION:!

*/

// Practica con los operadores

var year = 2018;

//NEGACION


if (year != 2016) {

    console.log("Realmente es " + year);
}

//AND

if (year >= 2000 && year <= 2020) {

    console.log("Estamos en la era actual");

} else {
    console.log("Estamos en la era Post-moderna");
}

//OR

if (year == 2008 || (year >= 2018 && year == 2028)) {

    console.log("El año acaba en 8");
} else {
    console.log("Año no registrado");
}