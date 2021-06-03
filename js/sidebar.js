'use strict'

//Boton de capas

/*
var search = document.querySelector("#search");
var trianguloCapas = document.querySelector("#lupa #triangle2");
search.addEventListener('click', () =>{
    //Sacar y poner el sub-menu search
    console.log("Esto entra!!");
    /*
    if(bandera){
        //document.querySelector("#lupa i").style.color = "#fff";
        //document.querySelector("#lupa i").style.fontSize = "30px";
        document.querySelector("#lupa #triangle2").style.display = "block";
        bandera = 0;
    }else{
        //document.querySelector("#lupa i").style.color = "#818181";
        document.querySelector("#lupa i").style.fontSize = "25px";
        document.querySelector("#lupa #triangle2").style.display = "none";
        bandera = 1;
    }
    
    //Para aparecer y desaparecer el sidebar-search y coloriar el boton si esta pulsado o no
    //document.querySelector(".sidebar-search").classList.toggle('active');
    //search.classList.toggle('pulsado');
}); */

//Generando un evento over in


//codigo jquery
$(document).ready(function () {

    //variables
    var bandera;
    var bandera2;
    var bandera3;
    var flag1;
    var flag2;
    var flag3;
    var banderaGraficos;
    var banderaActive;
    var ajustarse_Search;

    bandera = 1;
    bandera2 = 1;
    bandera3 = 1;
    banderaGraficos = false;
    ajustarse_Search = 0;
    flag1 = 0;
    flag2 = 0;
    flag3 = 0;

    //Ocultar sub-menu al cargar la pagina
    $(".sidebar-capa-info").hide();
    $("#sub-menu-search2").hide();
    $("#sub-menu-search3").hide();
    $("#sub-menu-search4").hide();
    //$("#sub-menu-lupa").hide();

    //-------------------------Boton de capas - funcionalidades---------------------//
    $("#capa").on('click', function () {
        //Apagar color de botones del sidebar principal

        $(".sidebar-capa-info").hide(); // esconder sub-menu del boton de lupa
        $(".sidebar-search-lupa").hide(); 
        $("#sub-menu-search").show();
        $(".sidebar-search").toggleClass('active'); //aparecer y desaparecer sidebar 
        //$(".graficos").toggleClass("mover-grafic");
        //$("#mapa").toggleClass("mapa-completo");
        $(".sidebar-capa-info").removeClass('active2');
        $(".sidebar-search-lupa").removeClass('active3');
        
        if(banderaGraficos == true){
            $(".graficos").removeClass("mover-grafic");
            banderaGraficos = false;
        }

        //Achicar mapa
        //$("#map-cenope").toggleClass("active-mapa");

        //Para abrir mapa al abrir el primer sidebar responsiado;
        /*
        if($("#mapa").hasClass("tamanoA")){
           $("#mapa").removeClass("tamanoA")
           $("#mapa").addClass("tamanoB");
        }else if(ajustarse_Search == 1){
            $("#mapa").removeClass("tamanoC")
            $("#mapa").addClass("tamanoA"); 
        }
        else{
            $("#mapa").removeClass("tamanoB")
            $("#mapa").addClass("tamanoA"); 
        }
        */

    
        //

        $(".sidebar #lupa i").toggleClass('pulsado'); // pintar y despintar boton
        $("#info i").removeClass('pulsado');
        $("#lupa i").removeClass('pulsado');
        $("#info #triangle4").hide();
        $("#lupa #triangle3").hide();
        flag1 = 2;

        //Aparecer y desaparecer triangulito
        if(bandera == 1)
        {   
          $("#triangle3").show();
          bandera = 0;
        }
        else if(flag2 == 2 || flag3 == 2)
        {
            $("#triangle3").show();
            flag2 = 0;
            flag3 = 0;
        }
        else
        {
            $("#triangle3").hide();
            bandera = 1;
        }
    });

    //Click unidades militares
    $("#uni-militares").click(function () { 
        //$("#sub-menu-search").hide(); 
        $("#sub-menu-search2 #subMenuB").slideDown();
        $("#sub-menu-search2").show();
      
        console.log("Se produjo correctamente.");
    });

    //Click cerrar unidades militares
    $("#sub-menu-search2 #crossicon").click(function () { 
        $("#sub-menu-search2").hide();
        $("#sub-menu-search").show(); 
        console.log("Unidades militares se cerro correctamente");
        
    });

    //Click universidades
    $("#universidades").click(function () { 
        //$("#sub-menu-search").hide(); 
        $("#sub-menu-search3").show();
        console.log("Universidades se abrio correctamente .");
    });

    //Click cerrar Universidades
    $("#sub-menu-search3 #crossicon-univer").click(function () { 
        $("#sub-menu-search3").hide();
        $("#sub-menu-search").show(); 
        console.log("Universidades se cerro correctamente .");
    });

    //Click limite internacional
    $("#limite-arg").click(function () { 
        //$("#sub-menu-search").hide(); 
        $("#sub-menu-search4").show();
        console.log("Límite internacional se abrio correctamente .");
    });

    //Click cerrar Universidades
    $("#sub-menu-search4 #crossicon-lim").click(function () { 
        $("#sub-menu-search4").hide();
        $("#sub-menu-search").show(); 
        console.log("Límite internacional se cerro correctamente .");
    });

    //--------------- Boton de informacion----------------------------//
    $("#info").click(function () { 

        $(".sidebar-search").hide(); //escondiendo capas
        $(".sidebar-search-lupa").hide(); // escondiendo lupa
        $(".sidebar-capa-info").show();
        $(".sidebar-capa-info").toggleClass('active2');
        $(".sidebar-search").removeClass('active');
        $(".sidebar-search-lupa").removeClass('active3');

        //pintar , mostrar opcion del sidebar principal , y quitar estilos de los otros botones
        $("#info i").toggleClass('pulsado');
        $("#lupa i").removeClass('pulsado');
        $("#lupa i").removeClass('pulsado');
        $("#lupa #triangle2").hide(); 
        $("#lupa #triangle3").hide(); 
        flag2 = 2;

        //Aparecer y desaparecer triangulito
        if(bandera2 == 1)
        {   
          $("#info #triangle4").show();
          bandera2 = 0;
        }
        else if(flag1 == 2 || flag3 == 2)
        {
            $("#info #triangle4").show();
            flag1 = 0;
            flag3 = 0;
        }
        else
        {
            $("#info #triangle4").hide();
            //$("#search").toggleClass('pulsado'); 
            bandera2 = 1;
        }
        

        
    },50);


    //--------Mostrar informacion al apretar las unidades militares - EA - AA - FFAA

    $('.prueba').click(function () { 
        
        var origen = $(this);
        var fuerza = origen.data('fuerza');

        switch(fuerza)
        {
            case "EA" :
               
                //$("#ejer-arg").toggleClass('mostrar');
                $("#sub-menu-search2 #EA-mil ").toggleClass("active4");

                //Para abrir mapa al abrir el primer sidebar responsiado;
               
                ajustarse_Search = 1;
                break;   
            case "Armada" :
                
                 //$("#armada-arg").toggleClass('mostrar');
                $("#sub-menu-search2 #arm-arg").toggleClass("active4");
                 break; 
            case "Aerea" :
               
                //$("#fuerza-aerea").toggleClass('mostrar');
                $("#sub-menu-search2 #FFAA ").toggleClass("active4");
                 break; 
        }
        
    });

    //-------------Universidades-----------Publicas y privadas -----------------//
    $(".pulsar-universidades").click(function () { 
        
        var origen = $(this);
        var universidad = origen.data('universidad');
        //Ocultar los 3
        switch(universidad)
        {
            case "publica" :
                $("#publica-mil").toggleClass('active5');
                break;   
            case "privada" :
                $("#privada-mil").toggleClass('active5');
                 break;
            default :
                console.log("Hubo un error, no se selecciono una universidad pública o privada .");
                break;
        }
        
    });



    //---------------------Mostrar sidebar del boton lupa---------------------//
    $("#lupa").click(function () {  
        $(".sidebar-search").hide(); // esconder sub-menu del boton de capas
        $(".sidebar-capa-info").hide(); // esconder sub-menu del boton de info
        $(".sidebar-search-lupa").toggleClass('active3');   
        $(".sidebar-search-lupa").show();   
        $(".sidebar-search").removeClass('active');
        $(".sidebar-capa-info").removeClass('active2');

        $("#lupa i").toggleClass('pulsado');
        $("#lupa i").removeClass('pulsado');
        $("#info i").removeClass('pulsado');
        $("#lupa #triangle2").hide(); 
        $("#info #triangle4").hide(); 
        flag3 = 2;

          //Aparecer y desaparecer triangulito
          if(bandera3 == 1)
          {   
            $("#lupa #triangle3").show();
            bandera3 = 0;
          }
          else if(flag1 == 2 || flag2 == 2)
          {
              $("#lupa #triangle3").show();
              flag1 = 0;
              flag2 = 0;
          }
          else
          {
              $("#lupa #triangle3").hide();
              bandera3 = 1;
          }
            
    });

    //Onclick de los Personal !!!
    $("#personal").click(function () { 
        $("#sub-menu-search5").show();
        console.log("Personal abierto correctamente .");
    });

    //Click cerrar Personal
    $("#title-person #crossicon").click(function () { 
       $("#sub-menu-search5").hide(); 
       console.log("Personal se cerro correctamente");    
    });

    //Click inteligencia
    $("#inteligencia").click(function () { 
        $("#sub-menu-search6").show();
        console.log("Inteligencia abierto correctamente .");
    });

    //Click cerrar Inteligencia
    $("#title-intel #crossicon").click(function () { 
        $("#sub-menu-search6").hide(); 
        console.log("Inteligencia se cerro correctamente");    
    });

     //Click Operaciones
     $("#operaciones").click(function () { 
        $("#sub-menu-search7").show();
        console.log("Inteligencia abierto correctamente .");
    });

    //Click cerrar Operaciones
    $("#title-opera #crossicon").click(function () { 
        $("#sub-menu-search7").hide(); 
        console.log("Operaciones se cerro correctamente");    
    });

     //Click Materiales
     $("#material").click(function () { 
        $("#sub-menu-search8").show();
        console.log("Materiales abierto correctamente .");
    });

    //Click cerrar Materiales
    $("#title-mate #crossicon").click(function () { 
        $("#sub-menu-search8").hide(); 
        console.log("Operaciones se cerro correctamente");    
    });
 
     //Click Finanzas
     $("#finanzas").click(function () { 
        $("#sub-menu-search9").show();
        console.log("Finanzas abierto correctamente .");
    });

    //Click cerrar Finanzas
    $("#title-fina #crossicon").click(function () { 
        $("#sub-menu-search9").hide(); 
        console.log("Finanzas se cerro correctamente");    
    });
 
 

});



//Esta es la ultima actualizacion









  /*Toggle EA
    $("#sub-menu-search2 #EA").click(function () { 
        $("#ejer-arg").toggleClass('mostrar');
        $("#armada-arg").removeClass('mostrar');
        $("#fuerza-aerea").removeClass('mostrar');
    });


    //Toggle armada argentina
    $("#sub-menu-search2 #arm-arg").click(function () { 
        $("#armada-arg").toggleClass('mostrar');
        $("#ejer-arg").removeClass('mostrar');
        $("#fuerza-aerea").removeClass('mostrar');
    });

    //Toggle FFAA
    $("#sub-menu-search2 #FFAA").click(function () { 
        $("#fuerza-aerea").toggleClass('mostrar');
        $("#armada-arg").removeClass('mostrar');
        $("#ejer-arg").removeClass('mostrar');
    });



    $(".uni-mil").click(function () { 

        $("#ejer-arg").toggleClass('mostrar');
        $("#armada-arg").removeClass('mostrar');
        $("#fuerza-aerea").removeClass('mostrar');
    });

   

    $("#sub-menu-search2 #FFAA").click(function () { 
        $("#fuerza-aerea").toggleClass('mostrar');
        $("#armada-arg").removeClass('mostrar');
        $("#ejer-arg").removeClass('mostrar');
    });
 */

$("#triangle3").addClass("pulsado");
$("#lupa i").addClass("pulsado");
$("#triangle3").css("display", "inline");
$("#lupa i").css("color", "white");

// $("#EA-mil").click(graficosSidebar(),100);

$(".fas fa-home").attr("color", "white");