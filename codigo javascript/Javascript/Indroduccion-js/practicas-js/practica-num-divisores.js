'use strict'
/* 
Muestre todos los numeros dividores de un numero introducido en el "alerta prompt"
*/

// var numero = parseInt(prompt('Introduce un numero', 0));

// for (var i = 1; i <= numero; i++) {
//     if (numero % i == 0) {
//         document.write(`Los divisores son ${i} <br>`)
//     }
// }

/* 
Programa que pida dos numeros y que nos diga cual es el mayor, el menor y si son iguales

PLUS: Si los numeos no son un numero(Letras) o son menores o iguales a cero, nos los vuelva a pedir;
*/

//PD: "Nan" significa que no es un numero!!



var numero1 = parseInt(prompt('Introduce el primer numero', 0));

var numero2 = parseInt(prompt('Introduce el segundo numero', 0));


while (isNaN(numero1) || isNaN(numero2) || numero1 <= 0 || numero2 <= 0) {

    numero1 = parseInt(prompt('Introduce el primer numero', 0));

    numero2 = parseInt(prompt('Introduce el segundo numero', 0));
}


if (numero1 > numero2) {
    alert(`${numero1} es Mayor`);
    alert(`${numero2} es Menor`);

} else if (numero1 < numero2) {
    alert(`${numero1} es menor`);
    alert(`${numero2} es Mayor`);
} else {
    alert('Numeros incorrectos')
}

var confirmacion = confirm('¿Te gusto el ejercicio?');

if (confirmacion == true) {
    console.log('Al usuario le gusto el ejercicio');

} else if (confirmacion != true) {
    console.log('ahi que mejorar los ejercicios!!vamos por mass');
}

alert('Nos vemos pronto!!');