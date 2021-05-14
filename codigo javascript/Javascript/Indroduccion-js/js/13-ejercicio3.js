'use strict'

/*
Hacer un programa que muestre todos los numeros entre dos numero introducios por el usuario
*/


var numero1 = parseInt(prompt('Introduce el primer numero', 0));
var numero2 = parseInt(prompt('Introduce el segundo numero', 0));

// Bucle FOR
/*
1-Contador
2-condicion
3-aumentador
*/


document.write(`<h1> Los numero entre ${numero1} y ${numero2} son : </h1>`)

for (var i = numero1; i <= numero2; i++) {

    document.write(`${i} <hr>`)
}

alert('Finalizaste la operacion');