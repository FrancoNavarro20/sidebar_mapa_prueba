'use strict'


//Practica con el Do While bucle

var suma = 0;
var contador = 0;


do {

    var numero = parseInt(prompt('Introduzca numeros hasta que pongas uno negativo', 0));

    if (numero >= 0) {
        suma += numero;
        contador++;
    } else if (isNaN(numero)) {
        numero = 0;
    }
    console.log(suma);
    console.log(contador);

} while (numero >= 0)

alert('Finalizamos la operacion');
alert('El resultado es: ' + suma);
alert('La media es: ' + (Number(suma / contador)));