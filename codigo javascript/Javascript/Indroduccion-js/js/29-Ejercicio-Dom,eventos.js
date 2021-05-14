'use strict'

window.addEventListener('load',function(){

    console.log("DOM cargando!!");

    var formulario = document.querySelector("#formulario");
    var box_dashed = document.querySelector(".dashed");
    box_dashed.style.display = "none";

    formulario.addEventListener('submit', function(){
        console.log("Evento submit capturado");

        var nombre = document.querySelector('#nombre').value;
        var apellidos = document.querySelector('#apellidos').value;
        var edad = parseInt(document.querySelector('#edad').value);

        //Validacion del formulario;
        if(nombre.trim() == null || nombre.trim().length == 0){
            alert("El nombre no es valido");
            document.querySelector("#error_nombre").innerHTML = "El nombre no es valido";
            return false;
        }else{
            document.querySelector("#error_nombre").style.display = "none";
        }

        if(apellidos.trim() == null || apellidos.trim().length == 0){
            alert("El apellido no es valido");
            document.querySelector("#error_apellido").innerHTML = "El apellido no es valido";
            return false;
        }else{
            document.querySelector("#error_apellido").style.display = "none";
        }

        if(edad == null || edad.length == 0 || isNaN(edad)){
            alert("La edad no es valida");
            document.querySelector("#error_edad").innerHTML = "La edad no es valido";
            return false;
        }else{
            document.querySelector("#error_edad").style.display = "none";
        }
        //Fin de validacion del formulario;

        box_dashed.style.display = "block";

        var p_nombre = document.querySelector("#p_nombre span");
        var p_apellido = document.querySelector("#p_apellido span");
        var p_edad = document.querySelector("#p_edad span");

        p_nombre.innerHTML = nombre;
        p_apellido.innerHTML = apellidos;
        p_edad.innerHTML = edad;

        /*Otra manera de hacerlo!!
        var datos_usuarios = [nombre , apellidos,edad];
        var indice;
        for(indice in datos_usuarios)
        {
            //Llamo a la etiqueta
            var parrafo = document.createElement("p");
            //Le agrego el dato a la etiqueta "p"
            parrafo.append(datos_usuarios[indice]);
            //Y por ultimo se lo agrego al Div para mostrarlo
            box_dashed.append(parrafo);
        }
      */

       
    });



});//fin