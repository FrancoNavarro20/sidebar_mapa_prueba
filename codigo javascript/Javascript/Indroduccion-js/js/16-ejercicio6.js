'use strict'


/*
Que nos diga si un numero es par o impar.
1-Ventana prompt
2-Si no es valido qe nos pida de nuevo el numero
*/

var number = parseInt(prompt('Introduce un numero'));

while (isNaN(number)) {

    number = parseInt(prompt('Introduce un numero'));

}

if (number % 2 == 0) {
    alert(`El ${number} es PAR`);
} else {
    alert(`El ${number} es IMPAR`);
}