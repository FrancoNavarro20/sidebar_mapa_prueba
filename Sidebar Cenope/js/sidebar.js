'use strict'


var search = document.querySelector("#search");
var bandera = 1;
search.addEventListener('click', () =>{
    //Sacar y poner el sub-menu search
    console.log("Esto entra!!");
    if(bandera){
        document.querySelector("#search i").style.color = "#fff";
        //document.querySelector("#search i").style.fontSize = "30px";
        document.querySelector("#search #triangle2").style.display = "block";
        bandera = 0;
    }else{
        document.querySelector("#search i").style.color = "#495057";
        document.querySelector("#search i").style.fontSize = "25px";
        document.querySelector("#search #triangle2").style.display = "none";
        bandera = 1;
    }

    //Para aparecer y desaparecer el sidebar-search
    document.querySelector(".sidebar-search").classList.toggle('active');
});






