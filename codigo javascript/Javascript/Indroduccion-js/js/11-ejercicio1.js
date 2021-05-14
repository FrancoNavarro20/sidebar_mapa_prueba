'use strict'

/* 
Programa que pida dos numeros y que nos diga cual es el mayor, el menor y si son iguales

PLUS: Si los numeos no son un numero(Letras) o son menores o iguales a cero, nos los vuelva a pedir;
*/

//PD: "Nan" significa que no es un numero!!

var numero1 = parseInt(prompt('Introduce el primer numero', 0));

var numero2 = parseInt(prompt('Introduce el segundo numero', 0));

//Paso 2 /Bucle que se repite pa operacion hasta que los numeros sean correctos

while (numero1 <= 0 || numero2 <= 0 || isNaN(numero1) || isNaN(numero2)) {

    numero1 = parseInt(prompt('Introduce el primer numero', 0));
    numero2 = parseInt(prompt('Introduce el segundo numero', 0));

}


//Paso 1
if (numero1 == numero2) {
    // Ejecuta 
    alert('Los numeros son iguales');
} else if (numero1 > numero2) {
    alert("El numero mayor es: " + numero1);
    alert("El numero menor es: " + numero2);

} else if (numero2 > numero1) {
    alert("El numero Mayor es: " + numero2);
    alert("El numero menor es: " + numero1);
} else {
    alert('Introduce numeros correctos');
}