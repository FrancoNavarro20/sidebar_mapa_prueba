'use strict'


/*
Utilizar un bucle, mostrar la suma y la media de los numeros  introducidos 
hasta introducir un numero negativo y ahi mostrar el resultado
*/


var suma = 0;
var contador = 0;

//bucle Do while

do {

    var numero = parseInt(prompt('Indtroduce solo numero hasta que indruduzcas uno negativo', 0));
    if (isNaN(numero)) { //Si lo que introduces son letras 

        //Ejecuta esto
        numero = 0;
    } else if (numero >= 0) {
        suma = suma + numero;
        //suma+=numero
        contador++;
    }
    console.log(suma);
    console.log(contador);


} while (numero >= 0)

alert('La suma es: ' + suma);
alert('La media es:' + Number(suma / contador));