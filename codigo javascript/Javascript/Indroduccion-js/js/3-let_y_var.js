"user strict"
// Pruebas con de variables con "LET" Y "VAR"



//Prueba con "var"

var numero = 40;
console.log(numero); // valor 40

if (true) {
    var numero = 50;
    console.log(numero); // valor 50

}

console.log(numero); // valor 50


//Prueba con "LET"

var texto = "curso JS Victor Robles Web"

console.log(texto); // el vallor JS

if (true) {
    let texto = "Curso de  Laravel 5 Victor Robles Web";
    console.log(texto); // Valor Laravel 5

}

console.log(texto); // Valor JS