'use strict'

// Practica con la estructura de control " Switch"


var edad = 18;
var imprime = "";

switch (edad) {
    case 18:
        var imprime = "Tu eres mayor de edad"
        break;
    case 25:
        var imprime = "Tu eres un adulto"
        break;
    case 40:
        var imprime = "Ya estas en los 40 años"
        break;
    case 75:
        var imprime = "Eres un anciano"
        break;
    default:
        var imprime = " Tu edad es nuetra"
        break;
}

console.log(imprime);