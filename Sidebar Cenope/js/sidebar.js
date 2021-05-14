'use strict'

$("#sub-menu-search2").hide();  // Esta linea oculta el sub menu 2
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
    //document.querySelector("#sub-menu-search2").classList.toggle('active2');
});

$(document).ready(function () {

    $("#covid-19").click(function (e) { 
        $("#sub-menu-search").hide();
        $("#sub-menu-search2").show(); //Esta linea vuelve a mostrar el submenu2
    });
     
});

$("#crossicon").click(function (e) { 
    $("#sub-menu-search2").hide();   
    $("#sub-menu-search").show(); 
});
$("#search").click(function (e) { 
    $("#sub-menu-search2").hide();
});


