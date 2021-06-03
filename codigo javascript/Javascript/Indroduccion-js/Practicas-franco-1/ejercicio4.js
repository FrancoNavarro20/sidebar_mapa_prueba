'use strict'

/*
Mostrar todos los numeros impares que hay entre dos numeros introducidos por el 
usuario
*/

//parseInt "Convierte los String en numeros enteros"

var numero1 = parseInt(prompt('Introduce el Primer numero', 0));
var numero2 = parseInt(prompt('Introduce el Segundo numero', 0));


while (numero1 < numero2) {

    numero1++;

    if (numero1 % 2 != 0) {
        console.log(`El numero impar es: ${numero1}`);
    } else if (numero1 % 2 == 0) {
        console.log(`El numero Par es: ${numero1}`)
    }
}


/*

Se puede hacer de las dos maneras!!

for (var i = numero1; i < numero2; i++) {

    if (i % 2 != 0) {
        console.log(`El numero impar es: ${i}`);
    } else if (i % 2 == 0) {
        console.log(`El numero Par es: ${i}`)
    }
}
*/