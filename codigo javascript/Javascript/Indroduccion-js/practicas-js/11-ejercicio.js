'use strict'

/* 
Programa que pida dos numeros y que nos diga cual es el mayor, el menor y si son iguales

PLUS: Si los numeos no son un numero(Letras) o son menores o iguales a cero, nos los vuelva a pedir;
*/

//PD: "Nan" significa que no es un numero!!


var numero1 = parseInt(prompt('Introduce el primer numero', 0));
var numero2 = parseInt(prompt('Introduce el segundo numero', 0));

//Parte B que es la del bucle "While"

// El bucle tienen que ir arriva para que funcione!!

while (numero1 <= 0 || numero2 <= 0 || isNaN(numero1) || isNaN(numero2)) {

    var numero1 = parseInt(prompt('Introduce datos correctos del primer numero', 0));
    var numero2 = parseInt(prompt('Introduce datos correctos del segundo numero', 0));

}


// la parte A de condicionales

if (numero1 == numero2) {
    alert('Los numeros son iguales');
} else if (numero1 > numero2) {
    //Ejecuta    
    alert('El numero Mayor es: ' + numero1);
    alert('El numero menor es: ' + numero2);

} else if (numero2 > numero1) {
    //Ejecuta
    alert('El numero mayor es: ' + numero2);
    alert('El numero menor es: ' + numero1);
} else {
    alert('Los datos son incorrectos');
}

console.log(numero1, numero2);