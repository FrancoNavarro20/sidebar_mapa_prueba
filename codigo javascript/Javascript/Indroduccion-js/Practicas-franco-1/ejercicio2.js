'use strict'

/*
Utilizar un bucle, mostrar la suma y la media de los numeros  introducidos 
hasta introducir un numero negativo y ahi mostrar el resultado
*/

var suma = 0;
var contador = 0;

do {
    var numero = parseInt(prompt('Introduce un numero', 0));

    if (isNaN(numero)) {
        numero = 0;
    } else if (numero >= 0) {
        suma = suma + numero;
        contador++;
    }
    document.write(`La suma es:${suma} <br>`);
    document.write(`La media es: ${contador}<br>`);

}
while (numero >= 0)

alert(`La suma total es: ${suma}`);
alert(`La media de los numeros es ${suma / contador}`);

//Terminacion de la operacion!!

alert(`Terminaste la operacion!!`);
alert(`FELICITACIONES!!!vamos por mas!!!`);





/*
//OTRA forma de hacerlo!!!! 


while (numero >= 0) {
     var numero = parseInt(prompt('Introduce un numero', 0));

     if (isNaN(numero)) {
         numero = 0;
     } else if (numero >= 0) {
         suma = suma + numero;
         contador++;
     }
     console.log(`La suma es:${suma} <br>`);
     console.log(`La media es: ${contador}<br>`);
 }

 alert(`La suma total es: ${suma}`);
 alert(`La media de los numeros es ${suma / contador}`);
 
 //Terminacion de la operacion!!

alert(`Terminaste la operacion!!`);
alert(`FELICITACIONES!!!vamos por mas!!!`);


 */