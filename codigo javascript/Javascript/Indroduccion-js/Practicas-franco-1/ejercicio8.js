'use strict'

/*
Calculadora:

- Pida dos numeros por la pantalla

- Si metemos uno mal que nos los vuelva a pedir

- En el (Body) Cuerpo de la pagina,nos aparezca, en una alerta y por la consola el resultado de
sumar, restar , multiplicar y dividir esas dos cifras
*/


var numero1 = parseInt(prompt('Introduce el primer numero:', 0));
var numero2 = parseInt(prompt('Introduce el segundo numero:', 0));

while (isNaN(numero1) || isNaN(numero2)) {
    var numero1 = parseInt(prompt('Introduce el primer numero:', 0));
    var numero2 = parseInt(prompt('Introduce el segundo numero:', 0));
}

var resultado = `La suma es ${numero1+numero2}\n
La resta es ${numero1-numero2}\n
La multiplicacion es ${numero1*numero2}\n
La division es ${numero1/numero2}\n
`;

var resultadocmd = `La suma es ${numero1+numero2}<br>
La resta es ${numero1-numero2}<br>
La multiplicacion es ${numero1*numero2}<br>
La division es ${numero1/numero2}<br>
`;

alert(resultado);

console.log(resultado);

document.write(`<h1>${resultadocmd}</h1>`);