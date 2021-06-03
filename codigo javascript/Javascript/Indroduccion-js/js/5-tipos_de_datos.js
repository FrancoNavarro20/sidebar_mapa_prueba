"use strict"




//Operadores

var numero1 = 7;
var numero2 = 12;
var operacion = numero1 * numero2;


alert("El resultado de la operacion es :" + operacion);



//Tipos de Datos "Numeros, textos y verdaderos y falso"


var numero_entero = 44;
var cadena_texto = 'Hola "que" tal';
var verdadero_falso = false; // puede ser "true" o "false"


var numero_falso = "33.4";


// Esto para convertir un numero con comillas de texto en un numero verdadero sin comillas

console.log(Number(numero_falso) + 7); //"Number" Te muestra todo el numero con decimales

console.log(parseFloat(numero_falso) + 7); // "parseFloat" tambien te muestra el numero completo y con decimales

console.log(parseInt(numero_falso) + 7); // "parseInt" No te muestra el numero con decimales solo completo


// Para convertir numeros verdaderos a String "texto" , El string convierte todo a texto sea numero o true and false!! 


console.log(numero_entero + 4); // Se sumaa!! resultado=48;


console.log(String(numero_entero) + 4); // No se suman sino que se concatenan y queda resultado=444;




// Ahora para saver que tipo de datos en las variables estamos guardando usamos la propiedad "typeof"


console.log(typeof numero_entero);
console.log(typeof cadena_texto);
console.log(typeof verdadero_falso);
console.log(typeof numero_falso);