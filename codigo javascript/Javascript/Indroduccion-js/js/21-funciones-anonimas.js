'use strict'

//Funciones anonimas!!!
//Es una funcion que no tiene nombre

/*
Un callback es una funcion dentro de otra
*/

/*
var pelicula = function(nombre) {
    return "La pelicula es:" + nombre;
}
*/

//PARTE 2!!


/*
function sumame(numero1, numero2) {
    var sumar = numero1 + numero2;
    return sumar;
}

console.log(sumame(4, 5));
*/


//////Parte 3/callback!!!


//Explicacion
/*
"SumaYmuestra" y "sumaPordos" se vuelven funciones y las tengo que invocar dentro de la funcion principal para que aparezcan
///Luego cuando invoque a la funcion principal "Sumame", ahi le aplico una funcion!!!
*/


//Funcion sin flecha


function sumame(numero1, numero2, sumaYmuestra, sumaPordos) {

    var sumar = numero1 + numero2;
    console.log(sumar);

    //Aca le estoy dando el valor o dato a el parametro de abajo que es "dato"!!!
    sumaYmuestra(sumar);
    sumaPordos(sumar);

    // return sumar;
}

sumame(5, 7, function(dato) {
        console.log("La suma es:", dato);
    },
    function(dato) {
        console.log("La suma por dos es:", (dato * 2));
    }
);

// Funcion de FLECHA

function sumame(numero1, numero2, sumaYmuestra, sumaPordos) {
    var sumar = numero1 + numero2;

    sumaYmuestra(sumar);
    sumaPordos(sumar);

    return sumar;
}

sumame(5, 7, dato => {
        console.log("La suma es:", dato);

    },
    dato => {
        console.log("La suma por dos es:", (dato * 2));
    }
);