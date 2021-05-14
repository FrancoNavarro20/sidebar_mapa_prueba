"use strict"

//Switch


var edad = 18;
var imprime = "";

// Son como los "if" condicionales
switch (edad) {
    case 18:
        imprime = "acabas de cumplir la mayoria de edad"
        break;
    case 25:
        imprime = "Ya eres un adulto"
        break;
    case 40:
        imprime = "Crisis de los cuarenta"
        break;
    case 75:
        imprime = "Eres  un anciano"
        break;
    default:
        imprime = "Tu edad es neutra"
        break;
}

console.log(imprime);