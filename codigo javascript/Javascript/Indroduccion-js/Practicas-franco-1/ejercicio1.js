'use strict'


/* 
Programa que pida dos numeros y que nos diga cual es el mayor, el menor y si son iguales

PLUS: Si los numeos no son un numero(Letras) o son menores o iguales a cero, nos los vuelva a pedir;
*/

//PD: "Nan" significa que no es un numero!!


//Paso1 
//hacer las alertas "prompt" que nos pidan los numero

var numero1 = parseInt(prompt('Introduce el primer numero', 0));
var numero2 = parseInt(prompt('introduce el segundo numero', 0));


//Paso 2 "Bucle donde repite la accion hasta romper con el bucle"

while (isNaN(numero1) || isNaN(numero2) || numero1 < 0 || numero2 < 0) {
    numero1 = parseInt(prompt('Introduce el primer numero', 0));
    numero2 = parseInt(prompt('introduce el segundo numero', 0));
}

//Paso 3 las condicionales

if (numero1 > numero2) {
    alert(`${numero1} es el Mayor`);
    alert(`${numero2} es el Menor`);
} else if (numero2 > numero1) {
    alert(`${numero2} es el Mayor`);
    alert(`${numero1} es el Menor`);
}


//Paso agregado por franco!! 

/*
Quiero aparte que me den la suma,resta, multiplicacion y division de los numeros ingresados!!
Mostrar en "Alerta" y en la "consola"
*/

var resultado = `La suma es ${numero1+numero2} \n
La resta es ${numero1-numero2}\n
La multiplicacion es ${numero1*numero2}\n
La division es ${numero1/numero2}`

//Alerta
alert(resultado);

//consola 
console.log(resultado);

//Final
alert("Ejercicio terminado");
alert("Felicitaciones!!!");