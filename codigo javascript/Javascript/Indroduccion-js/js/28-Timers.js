'use strict'


window.addEventListener('load',function(){

    function intervalo(){
        let tiempo = setInterval(function(){
            console.log("Set intervalo se esta ejecutando");
            var encabezado = document.querySelector('h1');
            if(encabezado.style.fontSize == "50px")
            {
                encabezado.style.fontSize = "25px";
            }else{
                encabezado.style.fontSize = "50px";
            }
        },1000);
  
        return tiempo;
    }

    var funcionTiempo = intervalo();

    var stop = document.querySelector('#stop');
    stop.addEventListener('click',function(){
        alert("Has detenido el set Intervalo.");
        clearInterval(funcionTiempo);
    });

    var start = document.querySelector('#start');
    start.addEventListener('click',()=>{
        intervalo();
    });

});//fin
