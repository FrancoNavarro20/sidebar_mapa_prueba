'use strict'

/*
Que nos diga si un numero es par o impar.
1-Ventana prompt
2-Si no es valido qe nos pida de nuevo el numero
*/


//Cuando es un numero que se debe poner o que te pida la pagina!!
//debesponer las condiciones afuera del bucle " While" o hacer un "do While"!!!

var nombre = String(prompt('introduce Tu nombre!!', "franco"));
var numero = parseInt(prompt('introduce un numero y te diremos si es par o impar', 0));



while (isNaN(numero)) {
    numero = parseInt(prompt('introduce el primer numero:', 0));
}

if (numero % 2 == 0) {
    alert(`El ${numero} es Par`);
} else if (numero % 2 != 0) {
    alert(`El ${numero} es Impar`)
}


alert('Terminaste la operacion');
alert(`Felicidades ${nombre}`);









/*

//Otra forma de hacerlo!!! con "DO WHILE"!!

var numero = parseInt(prompt('introduce el primer numero:', 0));
 
do {

    if (isNaN(numero)) {
         numero = parseInt(prompt('introduce el primer numero:', 0));

    } else if (numero % 2 !== 0) {
       alert(`${numero} es un numero Impar`);

    } else if (numero % 2 == 0) {
        alert(`${numero} es un numero Par`);
    }

 } while (isNaN(numero))
*/