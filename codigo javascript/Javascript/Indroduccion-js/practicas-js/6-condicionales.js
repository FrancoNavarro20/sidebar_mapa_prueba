'use strict'


//Practica con las condicionales


var edad = 72;
var nombre = "Franco Navarro";


if (edad >= 18 && edad < 75) {
    console.log(`${nombre} es mayor de edad`);

    // Segundo if
    if (edad > 25 && edad < 35) {
        console.log(`Tu eres un hombre o mujer jover`);

    } else if (edad >= 40 && edad < 65) {
        console.log(`Estas llegando a la mitad de 50`);

    } else if (edad > 70) {
        console.log(`Tu eres un anciano`);

    } else {
        console.log(`Tu edad esta bien!!`)
    }

} else {
    console.log(`${nombre} no es mayor de edad`);
}