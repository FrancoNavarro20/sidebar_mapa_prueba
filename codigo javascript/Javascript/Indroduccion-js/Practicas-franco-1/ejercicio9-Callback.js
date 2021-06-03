'use strict'

var pelicula = function(nombre){
    return "La pelicula es" + nombre;
}

function sumame(numero1, numero2, sumaYmuestra, sumaPorDos){
    var sumar = numero1 + numero2;

    //Estas serian las funciones anonimas y de callback;
    sumaYmuestra(sumar);
    sumaPorDos(sumar);

    return sumar;
}

//La primera funcion de fecha y la otra normal
sumame(5,7,(dato) =>{
    console.log("La suma es :"+ dato);
},
function(dato){
    console.log("La suma por dos es :" + (dato*2));
}
);






