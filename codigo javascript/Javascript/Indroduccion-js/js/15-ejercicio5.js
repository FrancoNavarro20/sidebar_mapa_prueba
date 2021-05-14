'use strict'

/* 
Muestre todos los numeros dividores de un numero introducido en el "alerta prompt"
*/

var numero = parseInt(prompt('Mete un numero', 1));

document.write(`<h1>Los Dividores son</h1>`);

for (var i = 1; i <= numero; i++) {
    if (numero % i == 0) {
        document.write(`<a>Los dividores son ${i} <br ></a>`);
    }
}