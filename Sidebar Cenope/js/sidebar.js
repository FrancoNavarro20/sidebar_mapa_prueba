var cod_uni = "TODOS";
var ejercito;

//codigo jquery
$(document).ready(function () {
  $(".elem_conducc_sup").hide();
  $(".elem_fuerza_oper").hide();
  $(".elem_fuerza_oper_gub").hide();
  $(".elem_fuerza_oper_guc").hide();
  $(".elem_fuerza_sostenim").hide();
  $(".elem_sist_educ").hide();
  
  //mostrar_marcadores("TODOS");

  //variables
  var bandera;
  var bandera2;
  var bandera3;
  var flag2;
  var banderaGraficos;
  var banderaActive;
  var ajustarse_Search;

  bandera = 1;
  bandera2 = 1;
  bandera3 = 1;
  banderaGraficos = false;
  ajustarse_Search = 0;
  flag2 = 0;

  //Ocultar sub-menu al cargar la pagina
  $(".sidebar-search-info").hide();
  $("#sub-menu-search2").hide();
  $("#sub-menu-capa_universidades").hide();
  $("#sub-menu-capa_ferrocarril").hide();
  $("#sub-menu-conduc-sup").hide();
  $(".elem_fuerza_oper").hide();
  $(".elem_fuerza_sostenim").hide();
  $(".elem_sist_educ").hide();
  $(".elem_fuerza_oper_gub").hide();
  $(".elem_fuerza_oper_guc").hide();
  $(".areas_personal").hide();
  $(".areas_inteligencia").hide();
  $(".areas_operaciones").hide();
  $(".areas_material").hide();
  $(".areas_finanzas").hide();
  //alert("Estas en php");
  //-------------------------Boton de capas - funcionalidades---------------------//
  $("#search").on('click', function () {
   
    //Apagar color de botones del sidebar principal
    $(".sidebar-search-info").hide(); // esconder sub-menu del boton de lupa
    $("#sub-menu-search").show();
    $(".sidebar-search").toggleClass('active'); //aparecer y desaparecer sidebar 
    $(".sidebar-capas").removeClass('active');
    
    $(".sidebar #search i").show("slow");
    $("#search i").addClass("pulsado"); //pintar y despintar boton
    $("#capas i").removeClass('pulsado');
    $("#capas #triangle2").hide();

  });

  //Click unidades militares
  $("#uni-militares").click(function () { 
    $("#sub-menu-search2 #subMenuB").slideDown();
    $("#sub-menu-search2").show();
  });

  //Click cerrar unidades militares
  $("#sub-menu-search2 #crossicon").click(function () { 
    $("#sub-menu-search2").hide();
    $("#sub-menu-search").show(); 
  });

  //Click universidades
  $("#universidades").click(function () { 
    $("#sub-menu-capa_universidades").show();
  });

  //Click cerrar Universidades
  $("#sub-menu-capa_universidades #crossicon-univer").click(function () { 
    $("#sub-menu-capa_universidades").hide();
    $("#sub-menu-capas").show(); 
  });

  //Click limite internacional
  $("#limite-arg").click(function () { 
    //$("#sub-menu-search").hide(); 
    $("#sub-menu-capa_ferrocarril").show();
  });

  //Click cerrar Universidades
  $("#sub-menu-capa_ferrocarril #crossicon-lim").click(function () { 
    $("#sub-menu-capa_ferrocarril").hide();
    $("#sub-menu-capas").show(); 
    console.log("Límite internacional se cerro correctamente .");
  });

  //--------------- Boton de informacion----------------------------//
  
  $("#capas").click(function () {
    $(".sidebar-search").hide(); // esconder sub-menu del boton de capas
    $("#sub-menu-capas").show();  
    $(".sidebar-capas").toggleClass('active');
    $("#capas i").addClass('pulsado');
    $("#search i").removeClass('pulsado');
    $("#search #triangle3").hide();

    //Pintar boton de capas del menu principal;
    $(".sidebar #capas i").show("slow");
    $("#capas i").addClass("pulsado");
  });
  //-------------Universidades-----------Publicas y privadas -----------------//
  $(".pulsar-universidades").click(function () { 
    var origen = $(this);
    var universidad = origen.data('universidad');
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


  $(".pers").click(function () { 
    $("#sub-menu-search5").hide(); 
    console.log("Personal se cerro correctamente");    
  });

  /*abrir ejer-arg principal*/
  $("#EA-mil").click(function () {
    $("#sub-menu-ejer-arg").show(); 
    var clicks = $(this).data("clicks");

    if ( typeof $(this).data("cod_uni") !== "undefined")
      cod_uni = $(this).data("cod_uni");

    map.removeLayer(ejercito);
    if (!clicks) {
      mostrar_marcadores(cod_uni);
    }
    $(this).data("clicks", !clicks);
  });

  $(".items_areas_conduccion").click(function () {
     //();
    if (!sidebar.isVisible())
      sidebar.show();
  });

  $(".ejer-items").click(function () {
    if (typeof $(this).data("cod_uni") == "undefined" || $(this).data("cod_uni")=="")
      return;
    cod_uni = $(this).data("cod_uni");
    //console.log("cod_uni:"+cod_uni);
    if (typeof $(this).data("nombre_elem") != "undefined") {
      elem_selec = $(this).data("nombre_elem");
      div_sup = "<center><img src='./img/Escudo_del_Ejército_Argentino.png' style='max-width: 15%; height: auto;'/></center>";
      $("#div_nombre_elem_seleccionado").html(div_sup+'<h4 style="text-align: center; padding-top: 10px; margin-bottom: 10px;">'+elem_selec+"</h4>");
    }
    $("#div_elem_mapa_seleccionado").hide();
    $("#div_elem_menu_seleccionado").show();
    map.removeLayer(ejercito);
    mostrar_marcadores(cod_uni);
    graficosSidebar();
    if (!sidebar.isVisible())
      sidebar.show();
  });
  
  /*Inicio de panel principal (Conduccion Superior,Fuerza Operativa,Fuerza de Sostenimiento,Sistema Educ)*/
  
  //Cerrar ejer-arg principal
  $("#crossicon-ejer").click(function () { 
     $("#sub-menu-ejer-arg").hide();
  });

  /*abrir ejer-arg principal*/ 
  $("#cond-sup").click(function () { 
      $("#sub-menu-conduc-sup").show(); 
  });
  
  //Cerrar ejer-arg principal
  $("#crossicon-conduc").click(function () { 
     $("#sub-menu-conduc-sup").hide();
  });

  
  $(".click_fuerza_ope").click(function () { 
     $(".elem_fuerza_oper").show();
  });
  
  $(".crossicon-fuerza_oper").click(function () { 
     $(".elem_fuerza_oper").hide();
  });

  $(".click_fuerza_sostenim").click(function () { 
     $(".elem_fuerza_sostenim").show();
  });
  
  $(".crossicon-fuerza_sostenim").click(function () { 
     $(".elem_fuerza_sostenim").hide();
  });

  $(".click_sist_educ").click(function () { 
     $(".elem_sist_educ").show();
  });
  
  $(".crossicon-sist_educ").click(function () { 
     $(".elem_sist_educ").hide();
  });

  /*Fin de panel principal (Conduccion Superior,Fuerza Operativa,Fuerza de Sostenimiento,Sistema Educ)*/

  //Panel fuerza Operativa Gub

  $(".click_gub").click(function () { 
     $(".elem_fuerza_oper_gub").show();
  });
  
  $(".crossicon-fuerza_oper_gub").click(function () { 
     $(".elem_fuerza_oper_gub").hide();
  });

  $(".click_guc").click(function () { 
     $(".elem_fuerza_oper_guc").show();
  });
  
  $(".crossicon-fuerza_oper_guc").click(function () { 
     $(".elem_fuerza_oper_guc").hide();
  });

  $(".click_areas_personal").click(function () { 
     $(".areas_personal").show();
  });
  
  $("#crossicon-conduc_areas_pers").click(function () { 
     $(".areas_personal").hide();
  });

  $(".click_areas_inteligencia").click(function () { 
     $(".areas_inteligencia").show();
  });
  
  $("#crossicon-conduc_areas_inteligencia").click(function () { 
     $(".areas_inteligencia").hide();
  });

  $(".click_areas_operaciones").click(function () { 
     $(".areas_operaciones").show();
  });
  
  $("#crossicon-conduc_areas_operaciones").click(function () { 
     $(".areas_operaciones").hide();
  });

  $(".click_areas_material").click(function () { 
     $(".areas_material").show();
  });
  
  $("#crossicon-conduc_areas_material").click(function () { 
     $(".areas_material").hide();
  });

  $(".click_areas_finanzas").click(function () { 
     $(".areas_finanzas").show();
  });
  
  $("#crossicon-conduc_areas_finanzas").click(function () { 
     $(".areas_finanzas").hide();
  });


  /* Estilo pulsado Ferrocarril JS
   $("#bt-lim-intern").click(function () { 
      $(this).toggleClass('active-ferrocarril'); 
   });*/

   /*Estilo pulsado Ferrocarril JS*/
   $("#bt-lim-intern").click(function () { 
      $(this).toggleClass('active-ferrocarril-pulsado'); 
   });

   /*Estilo universidades publicas*/
   $("#privada-mil").click(function () { 
      $(this).toggleClass('active-priv'); 
   });

   $("#publica-mil").click(function () { 
      $(this).toggleClass('active-pub'); 
   });

   

   /*fin Estilo pulsado Ferrocarril JS*/
})



$('.hover_fuerzas ul').on('click', 'li', function(){
   // $(this).addClass('hoveado_fuerzas').siblings().removeClass('hoveado_fuerzas');
   $('.hoveado_fuerzas').removeClass('hoveado_fuerzas');
   $(this).addClass('hoveado_fuerzas');
});

$('.hover_areas ul').on('click', 'li', function(){
   // $(this).addClass('hoveado_areas').siblings().removeClass('hoveado_areas');
   $('.hoveado_areas').removeClass('hoveado_areas');
   $(this).addClass('hoveado_areas');
});