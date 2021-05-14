'use strict'

/* 
Muestre todos los numeros dividores de un numero introducido en el "alerta prompt"
*/


var numero = parseInt(prompt('Introdusca el un numero:', 0));


for (var i = 1; i < numero; i++) {
    if (numero % i == 0) {
        console.log(`Los divisores son ${i}`);

    }
}

alert(`Terminaste la operacion`);
alert(`FELICIDADES!!!`);