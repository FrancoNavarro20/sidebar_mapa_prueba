'use strict'

/*
Mostrar todos los numeros impares que hay entre dos numeros introducidos por el 
usuario
*/

//parseInt "Convierte los String en numeros enteros"

var numero1 = parseInt(prompt('Introduce el primer numero', 0));
var numero2 = parseInt(prompt('Introduce el segundo numero', 0));


while (numero1 < numero2) {
    numero1++;

    //Para que tede los numero impares se tiene que hacer "numero1/2 !=(diferente) 0, y si ponermos el 1 nos da los pares"
    if (numero1 % 2 != 0) {
        console.log(`El ${numero1} es impar`);

    } else if (numero1 * 2 != 1)
        console.log(`El ${numero1} es par`);
}