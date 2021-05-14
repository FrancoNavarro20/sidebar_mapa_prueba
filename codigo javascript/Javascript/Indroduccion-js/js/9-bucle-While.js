'use strict'

// Bucle- While que significa mientras

var year = 2018;

while (year != 1991) {
    // Ejecuta esto
    console.log("Estamos en el año " + year);

    // Para hacer un "Break" y parar el bucle en el año que yo quiera!! 
    if (year == 2000) {
        break;
    }

    year--; //Se le tiene que agregar el aumentador para que corte en 2051!
}

// Do while

var years = 30;


do {
    alert("Solo cuando sea diferente a 20")
    years--;
} while (years >= 25)