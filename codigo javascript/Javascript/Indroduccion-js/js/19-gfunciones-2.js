'use strict'

//Funciones parte 2

//parametros opcionales!!! No hace falta ponerle un parametro por eso e opcional


/*

Una sola "Funcion" sola para todas las orde


function calculadora(numero1, numero2, mostrar = false) {

    if (mostrar == false) {

        console.log("Suma es:" + (numero1 + numero2));
        console.log("Resta es:" + (numero1 - numero2));
        console.log("Multiplicacion es:" + (numero1 * numero2));
        console.log("Division es:" + (numero1 / numero2));
        console.log("***************************************** ");

    } else {
        document.write("Suma es:" + (numero1 + numero2) + "<br>");
        document.write("Resta es:" + (numero1 - numero2) + "<br>");
        document.write("Multiplicacion es:" + (numero1 * numero2) + "<br>");
        document.write("Division es:" + (numero1 / numero2) + "<br>");
        document.write("*****************************************" + "<br>");
    }

}



calculadora(1, 4);
calculadora(2, 5, true);
calculadora(4, 80, true);


*/





/* Funciones dentro de "funciones" */

function porConsola(numero1, numero2) {

    console.log("Suma es:" + (numero1 + numero2));
    console.log("Resta es:" + (numero1 - numero2));
    console.log("Multiplicacion es:" + (numero1 * numero2));
    console.log("Division es:" + (numero1 / numero2));
    console.log("***************************************** ");

}

function porPantalla(numero1, numero2) {

    document.write("Suma es:" + (numero1 + numero2) + "<br>");
    document.write("Resta es:" + (numero1 - numero2) + "<br>");
    document.write("Multiplicacion es:" + (numero1 * numero2) + "<br>");
    document.write("Division es:" + (numero1 / numero2) + "<br>");
    document.write("*****************************************" + "<br>");
}


function calculadora(numero1, numero2, mostrar = false) {

    //Parametro opcional es "mostrar= false";

    if (mostrar == false) {
        porConsola(numero1, numero2);
    } else {
        porPantalla(numero1, numero2);
    }


    return true;
}


//Estoy invocando funciones!!
calculadora(1, 4);
calculadora(2, 5, true);
calculadora(4, 80, true);
calculadora(10, 8);