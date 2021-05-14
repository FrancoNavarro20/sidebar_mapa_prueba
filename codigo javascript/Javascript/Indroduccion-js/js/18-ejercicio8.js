'use strict'

/*
Calculadora:

- Pida dos numeros por la pantalla

- Si metemos uno mal que nos los vuelva a pedir

- En el (Body) Cuerpo de la pagina,nos aparezca en una alerta y por la consola el resultado de
sumar, restar , multiplicar y dividir esas dos cifras
*/

//Paso que agregue
document.write(String('<h1>Calculadora</h1>'));

// Paso 1
var numero1 = parseInt(prompt('Introduce el primer numero', 0));
var numero2 = parseInt(prompt('Introduce el segundo numero', 0));

//Paso 2
while (numero1 < 0 || numero2 < 0 || isNaN(numero1) || isNaN(numero2)) {

    numero1 = parseInt(prompt('Introduce el primer numero', 0));
    numero2 = parseInt(prompt('Introduce el segundo numero', 0));
}

//Paso 3 (Que aparesca en el HTML)

var resultado = `La suma es: ${numero1+numero2} <br>
                 La resta es: ${numero1-numero2}<br>
                 La multiplicacion es:${numero1*numero2}<br>
                 La division es: ${numero1/numero2}`;


//Esta variable es para poner pasar la informacion de la variable por "alertas y la consola"!

//La propiedad "\n" es para hacer un salto de linea y se vea en los alertas y consola!

var resultadoCMD = `La suma es: ${numero1+numero2}\n
La resta es: ${numero1-numero2}\n
La multiplicacion es:${numero1*numero2}\n
La division es: ${numero1/numero2}\n`;

//html
document.write(resultado);
//Alert
alert(resultadoCMD);
//console
console.log(resultadoCMD);