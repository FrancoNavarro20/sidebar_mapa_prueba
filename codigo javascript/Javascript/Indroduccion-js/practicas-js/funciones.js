'use strict'


//Practica de funciones de franco


function resultado1() {

    alert('Bienvenidos a este ejercicio!!!')

    var numero1 = parseInt(prompt('Itroduce el primer numero', 0));
    var numero2 = parseInt(prompt('Introduce el segundo numero', 0));


    while (isNaN(numero1) || isNaN(numero2)) {
        numero1 = parseInt(prompt('Introduce el primer numero', 0));
        numero2 = parseInt(prompt('Introduce el segundo numero', 0));



    }



    var calculadora = `La suma es ${numero1+numero2}\n
    la resta es ${numero1-numero2}\n
    la multiplicacion es${numero1*numero2}\n
    la division es${numero1/numero2}`;


    alert(calculadora);

    alert('Terminaste el ejercicio!!');

}


// invocamos la funcion

var funcion1 = resultado1();