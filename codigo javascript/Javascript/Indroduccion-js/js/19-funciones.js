'use strict'

/*
Funciones " es un conjunto de ordenes que nosotros vamos a invocar cuando queramos"
Como una capsula donde hay guardados muchas ordeness

Una función es una agrupacion reutilizable de un conjunto de instrucciones
*/


// 1- Con la palabra "return" podemos hacer que nos devuelva un texto en la consola!!!


/*
Primera forma de hacerlo/Primera practica!!s 

 function calculadora() {
    return "Hola soy la calculadora!!!";
 }

 console.log(calculadora(), calculadora(), calculadora());
*/

///////////////////////////////////////////////////////////////////////////


/*
Otra forma de llamar a la funcion!
*/

//1-defino la funcion




/*
function calculadora() {

    //Le doy un conjunto de  instrucciones
    console.log("Hola soy la calculadora");
    console.log("Si, soy yo");

    return "Hola si soy la calculadora!!!"
}
*/



//2/////La invoco o llamo a la "funcion"///////////

//Si yo la invoco de esta manera me saca el "return" que puse!!!

/*
calculadora();
*/

//3/////////Otra forma de hacerlo de invocar a la funcion///////////

//Si la invoco de esta manera me agrega el "return"!!!



/*
 var resultado = calculadora();

 console.log(resultado);
*/




////////////////////////////-"PARAMETROS"-/////////////////////


function calculadora(numero1, numero2) {

    console.log("Suma:" + (numero1 + numero2));
    console.log("Resta:" + (numero1 - numero2));
    console.log("Multiplicacion:" + (numero1 * numero2));
    console.log("Division:" + (numero1 / numero2));
    console.log("***********************************");

    //return "Hola soy la calculadora";
}

//Invocar la fincion

// calculadora(12, 8);
// calculadora(98, 2);


//Aplicar los parametros a un bucle "For"


for (var i = 1; i <= 10; i++) {
    console.log(i);
    calculadora(i, 8);

}