'use strict'


//Ambito de las variables dentro y fuera de las funciones!!!

function holaMundo(texto) {

    var hola_mundo = "Texto dentro de la funcion";

    console.log(texto);
    //Yo puedo llamar a una variable que esta fuera de la funcion a que este adentro!!!
    console.log(numero.toString());
    //Ahora puedo acceder a una variable que este adentro de la funcion pero esa variable no la puedo llevar afuera de la funcion por que sale error!!
    console.log(hola_mundo);
}


var numero = 12;
var texto = "Hola mundo soy una variable global";

holaMundo(texto);

///// "toString" => convertir a los numeros o todo a String (textos);

/*console.log(numero.toString());*/

/*console.log(typeof numero.toString());*/