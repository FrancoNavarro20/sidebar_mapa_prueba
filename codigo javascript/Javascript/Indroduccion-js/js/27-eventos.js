'use strict'

//Probando evento "load" => es para cuando ponemos el script html en el "head"y carga el script antes que el html
window.addEventListener('load',() =>{
        
    function cambiarColor(){

        console.log("Me has dado click");

        var bg = boton.style.background;
        if(bg == "green")
        {
            boton.style.background = "yellow";
        }else
        {
            boton.style.background = "green";
        }
        
        boton.style.padding = "10px";
        boton.style.border = "1px solid #ccc";
        return true;
    }

    var boton = document.querySelector("#boton");

    //Generando un evento click
    boton.addEventListener('click', function(){
        cambiarColor();
        console.log(this);
        this.style.border = "10px solid black";
    });


    //Generando un evento over in
    boton.addEventListener('mouseover',function(){
        boton.style.background = "#33A6FF";
    });


    //Generando un evento over out
    boton.addEventListener('mouseout',function(){
        boton.style.background = "#ccc";
    });


    //Evento de focus

    //Es para saber si el usuario esta afuera del input o adentro escribiendo
    var input = document.querySelector("#campo_nombre");

    input.addEventListener('focus', function(){
        console.log("[focus] Estas dentro del input");
        agregarTexto();
    });

    //blur
    input.addEventListener('blur',function(){
        console.log("[blur] Estas fuera del input");
        sacarTexto();
    });

    //esto fue una prueba que me salio jaja , para poner y sacar el "Escribiendo.."

    var divEscribiendo = document.querySelector("#textoEscribiendo");

    function agregarTexto(){

        console.log(divEscribiendo);
        var parrafo = document.createElement('p');
        var texto = document.createTextNode("Escribiendo...");
        parrafo.appendChild(texto);
        divEscribiendo.append(parrafo);
    }


    function sacarTexto(){

        var eliminarEtiqueta = document.querySelector("#textoEscribiendo p");
        divEscribiendo.remove(eliminarEtiqueta);
        return true;
    }


    //Keydown
    input.addEventListener('keydown',function(evento){
        console.log("[keydown] Pulsando esta tecla " + String.fromCharCode(evento.keyCode));
    })

    //Keypress
    input.addEventListener('keypress',function(evento){
        console.log("[keypress] Tecla presionada " + String.fromCharCode(evento.keyCode));
    })


    //Keyup
    input.addEventListener('keyup',function(evento){
        console.log("[keyup] Tecla soltada " + String.fromCharCode(evento.keyCode));
    })

}); //fin del evento Load





