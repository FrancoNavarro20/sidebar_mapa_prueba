'use strict'

/*
Hacer un programa que muestre todos los numeros entre dos numero introducios por el usuario
*/


var numero1 = parseInt(prompt('Introduce el primer numero', 0));
var numero2 = parseInt(prompt('Introduce el segundo numero', 0));

while (numero1 < numero2) {
    numero1++;

    console.log(numero1);
}