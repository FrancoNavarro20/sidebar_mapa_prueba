'use strict'

/*
Calculadora:

- Pida dos numeros por la pantalla

- Si metemos uno mal que nos los vuelva a pedir

- En el (Body) Cuerpo de la pagina,nos aparezca en una alerta y por la consola el resultado de
sumar, restar , multiplicar y dividir esas dos cifras
*/


var numero1 = parseInt(prompt('Introduce el Primer numero', 1));
var numero2 = parseInt(prompt('Indroduce el segundo numero', 1));

while (numero1 < 0 || numero2 < 0 || isNaN(numero1) || isNaN(numero2)) {

    numero1 = parseInt(prompt('Introduce el Primer numero', 1));
    numero2 = parseInt(prompt('Indroduce el segundo numero', 1));
}

var resultado = `La suma es ${numero1+numero2}<br>
La resta es ${numero1-numero2}<br>
La multiplicacion es ${numero1*numero2}<br>
La division es ${numero1/numero2}<br>`;

//respuesta en el documento HTML
document.write(resultado);


//Variable para las alertas y la consola con "\n"

var resultadocmd = `La suma es ${numero1+numero2}\n
La resta es ${numero1-numero2}\n
La multiplicacion es ${numero1*numero2}\n
La division es ${numero1/numero2}\n`;

//respuesta en el alerta y la consola

alert(resultadocmd);

console.log(resultadocmd);