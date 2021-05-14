'use strict'


//Tabla de multiplicar de un numero introducido por pantalla


var numero = parseInt(prompt('Introduce un numero y te diremos las tablas del 1 al numero que ingreces :)', 0));

//document.write(`<h1>Estas son las tablas del ${numero}</h1>`);

for (var c = 1; c <= numero; c++) {

    document.write(`<h1> La tabla del ${c} </h1>`);

    //For de adentro!!
    for (var i = 1; i <= 10; i++) {

        document.write(`${numero} x ${i}= ${i*numero} <br>`);

    }

}