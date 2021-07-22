var cod_uni = "TODOS";
var ejercito;
var uni_agrupadas = L.markerClusterGroup.layerSupport();

//codigo jquery

$("#modal_listado_personal").on("show.bs.modal", function (e) {
  var button = $(e.relatedTarget);

  var modal = $(this);
  modal.find(".overlay").show();
  var personal_listado = button.data("personal_listado");
  switch (personal_listado) {
    case "Oficiales":
      break;
  }
  modal.find("#modal_titulo_listado").html("Listado de " + personal_listado);
  $.ajax({
    data: "cod_uni=" + cod_uni + " & tipo_personal=" + personal_listado,
    url: "datos_area_personal_nuevo.php", // Url to which the request is send
    //url: "./geojson/data_unidades_ea.geojson",// Url to which the request is send
    type: "POST", // Type of request to be send, called as method
    cache: true, // To unable request pages to be cached
    // el tipo de información que se espera de respuesta
    success: function (
      datos // A function to be called if request succeeds
    ) {
      console.log("se envio");
      modal.find(".overlay").delay(500).fadeOut();
      modal.find("#div_modal_listado_personal").html("").delay(500).hide();
      modal.find("#div_modal_listado_personal").html(datos).fadeIn();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log("se produjo un error en el envio");
    },
  });
});

$(".elem_conducc_sup").hide();

mostrar_marcadores("TODOS");
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
$(".elem_extra_fuerza").hide();
$(".elem_fuerza_oper_gub").hide();
$(".elem_fuerza_oper_guc").hide();

$(".menu_fuer_oper_elem1").hide();
$(".menu_fuer_oper_elem3").hide();

$(".areas_personal").hide();
$(".areas_inteligencia").hide();
$(".areas_operaciones").hide();
$(".areas_material").hide();
$(".areas_finanzas").hide();
//alert("Estas en php");
//-------------------------Boton de capas - funcionalidades---------------------//
$("#search").on("click", function () {
  //Apagar color de botones del sidebar principal
  $(".sidebar-search-info").hide(); // esconder sub-menu del boton de lupa
  $("#sub-menu-ejer-arg").show();
  $(".sidebar-search").toggleClass("active"); //aparecer y desaparecer sidebar
  $(".sidebar-capas").removeClass("active");

  $(".sidebar #search i").show("slow");
  $("#search i").addClass("pulsado"); //pintar y despintar boton
  $("#capas i").removeClass("pulsado");
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
  $(".sidebar-capas").toggleClass("active");
  $("#capas i").addClass("pulsado");
  $("#search i").removeClass("pulsado");
  $("#search #triangle3").hide();

  //Pintar boton de capas del menu principal;
  $(".sidebar #capas i").show("slow");
  $("#capas i").addClass("pulsado");
});
//-------------Universidades-----------Publicas y privadas -----------------//
$(".pulsar-universidades").click(function () {
  var origen = $(this);
  var universidad = origen.data("universidad");
  switch (universidad) {
    case "publica":
      $("#publica-mil").toggleClass("active5");
      break;
    case "privada":
      $("#privada-mil").toggleClass("active5");
      break;
    default:
      console.log(
        "Hubo un error, no se selecciono una universidad pública o privada ."
      );
      break;
  }
});

//---------------------Mostrar sidebar del boton lupa---------------------//

//Onclick de los Personal !!!
$("#personal").click(function () {
  $("#sub-menu-search5").show();
  console.log("Personal abierto correctamente .");
});

/*abrir ejer-arg principal*/
$("#EA-mil").click(function () {
  $("#sub-menu-ejer-arg").show();
  var clicks = $(this).data("clicks");

  if (typeof $(this).data("cod_uni") !== "undefined")
    cod_uni = $(this).data("cod_uni");

  map.removeLayer(ejercito);
  if (!clicks) {
    mostrar_marcadores(cod_uni);
  }
  $(this).data("clicks", !clicks);
});

$("#btn_mostrar_mapa").click(function () {
  if ($(this).html()=="Ocultar Mapa") {
    $(this).html("Mostrar Mapa");
  } else {
    $(this).html("Ocultar Mapa");
  }
});

$(".items_areas_conduccion").click(function () {
  //();
  // if (!sidebar.isVisible()) showSidebar();
});

$(".ejer-items").click(function () {
  map.setView([-40, -59], 4);
  if (
    typeof $(this).data("cod_uni") == "undefined" ||
    $(this).data("cod_uni") == ""
  )
    return;
  cod_uni = $(this).data("cod_uni");
  lat = $(this).data("lat");
  lon = $(this).data("lon");
  zoom = $(this).data("zoom");
  //console.log("cod_uni:"+cod_uni);
  if (typeof $(this).data("nombre_elem") != "undefined") {
    elem_selec = $(this).data("nombre_elem");
    div_sup =
      "<center><img src='./img/Escudo_del_Ejército_Argentino.png' style='max-width: 15%; height: auto;'/></center>";
    $("#div_nombre_elem_seleccionado").html(elem_selec);
  }
  $("#div_elem_mapa_seleccionado").hide();
  $("#div_elem_menu_seleccionado").show();
  map.removeLayer(ejercito);
  mostrar_marcadores(cod_uni);
});

/*Inicio de panel principal (Conduccion Superior,Fuerza Operativa,Fuerza de Sostenimiento,Sistema Educ)*/

//Cerrar ejer-arg principal
$("#crossicon-ejer").click(function () {
  $("#sub-menu-ejer-arg").hide();
  $("#sub-menu-search").show();
});

/*abrir ejer-arg principal*/
$("#cond-sup").click(function () {
  //$("#sub-menu-conduc-sup").show();
  $(".elem_fuerza_sostenim").show();
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
  $("#sub-menu-conduc-sup").show();
});

$(".crossicon-fuerza_sostenim").click(function () {
  $(".elem_fuerza_sostenim").hide();
});

$(".click_sist_educ").click(function () {
  $(".elem_sist_educ").show();
});

$(".click_extra_fuerza").click(function () {
  $(".elem_extra_fuerza").show();
});

$(".crossicon-sist_educ").click(function () {
  $(".elem_sist_educ").hide();
});

$(".crossicon-extra_fuerza").click(function () {
  $(".elem_extra_fuerza").hide();
});

/*Fin de panel principal (Conduccion Superior,Fuerza Operativa,Fuerza de Sostenimiento,Sistema Educ)*/

//Panel fuerza Operativa Gub

$(".click_gub").click(function () {
  $(".elem_fuerza_oper_gub").show();
});

$(".crossicon-fuerza_oper_gub").click(function () {
  $(".elem_fuerza_oper_gub").hide();
});

$(".click_fuer_oper_elem2").click(function () {
  $(".elem_fuerza_oper_guc").show();
});

$(".crossicon-fuerza_oper_guc").click(function () {
  $(".elem_fuerza_oper_guc").hide();
});

$(".click_fuer_oper_elem1").click(function () {
  $(".menu_fuer_oper_elem1").show();
});
$(".crossicon_fuer_oper_elem1").click(function () {
  $(".menu_fuer_oper_elem1").hide();
});
$(".click_fuer_oper_elem3").click(function () {
  $(".menu_fuer_oper_elem3").show();
});
$(".crossicon_fuer_oper_elem3").click(function () {
  $(".menu_fuer_oper_elem3").hide();
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
  $(this).toggleClass("active-ferrocarril-pulsado");
});

$("#zonas_responsabilidad_br_EA").click(function () {
  $(this).toggleClass("active-ferrocarril-pulsado");
});



/*Estilo universidades publicas*/
$("#privada-mil").click(function () {
  $(this).toggleClass("active-priv");
});

$("#publica-mil").click(function () {
  $(this).toggleClass("active-pub");
});

/*fin Estilo pulsado Ferrocarril JS*/

$(".hover_fuerzas ul").on("click", "li", function () {
  // $(this).addClass('hoveado_fuerzas').siblings().removeClass('hoveado_fuerzas');
  $(".hoveado_fuerzas").removeClass("hoveado_fuerzas");
  $(this).addClass("hoveado_fuerzas");
});


//Botones de los graficos
$(".pulsar_elemt_grafic").click(function () {
  $(".pulsar_elemt_grafic").removeClass("active");
  $(this).addClass("active");
  var origen_btn = $(this).data("grafic");

  switch (origen_btn) {
    case "datos":
      //alert("Alerta de datos");
      $("#div_carrousel_graficos").hide('slow');
      $("#div_carrousel_datos").show('slow');
      break;
    case "graficos":
      //alert("Alerta de graficos");
      $("#div_carrousel_graficos").show('slow');
      $("#div_carrousel_datos").hide('slow');
      break;
    default:
      alert(
        "Hubo un error, no se selecciono una universidad pública o privada ."
      );
      break;
  }
});

$(".btn_areas_conduc").click(function () {
  $(".btn_areas_conduc").removeClass("active");
  $(this).addClass("active");
});

$("#pers_opc").click(function () {
  cargar_carrousel_pers();
});

function cargar_carrousel_pers() {
  var html = `<div class="btn_elem_pers btn btn-outline-secondary" id="fuerza_efectiva">Fuerza Efectiva</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Proyección de Bajas</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Oficios Judiciales</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Causas por Género y VIF</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Control Toxicológico</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Anexo 27</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Faltas Disciplinarias</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Deserción</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Actuaciones de Justicia Militar</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Situación de Vivienda</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Evacuaciones</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Accidentes</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Parte de Sanidad</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Estado Civil</div>
  <div class='btn_elem_pers btn btn-outline-secondary'>Personal Propuesto para Junta de Calificación</div>`;
  $("#carouselAreaPers").trigger("replace.owl.carousel", html);
  $("#carouselAreaPers").trigger("refresh.owl.carousel");
  $("#carouselAreaPers").ready(function () {
    $(".btn_elem_pers").on("click", function () {
      //console.log("item seleccionado");
      $(".btn_elem_pers").removeClass("item_selec");
      $(this).addClass("item_selec");
    });
  });
  clickAreasPers();
}

function seleccionar_elem (elem) {
  $(".btn_elem_pers").removeClass("item_selec");
  $(elem).addClass("item_selec");
}

$("#icia_opc").click(function () {
  var html = `<div class='btn_elem_icia btn btn-outline-secondary' id='datosGraficos'>Revista de Material Sensible</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Estudio de Seguridad</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Seguridad Humana</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Cámaras - Instalaciones Sensibles</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Cámaras - Perímetro</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Alarmas - Instalaciones Sensibles</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Rejas en Techo</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Rejas en Puertas y Ventanas</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Cerco Perimetral</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Situación de Vivienda</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Evacuaciones</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Vulneraciones</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Reconocimientos</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Estado Civil</div>
  <div class='btn_elem_icia btn btn-outline-secondary'>Personal Vinculado a Causas Judiciales</div>`;
  
  $("#carouselAreaPers").trigger("replace.owl.carousel", html);
  $("#carouselAreaPers").trigger("refresh.owl.carousel");

  $("#carouselAreaPers").ready(function () {
    $(".btn_elem_icia").on("click", function () {
      //console.log("item seleccionado");
      $(".btn_elem_icia").removeClass("item_selec");
      $(this).addClass("item_selec");
    });
  });
});

$("#ops_opc").click(function () {
  var html = `<div class='btn_elem_op btn btn-outline-secondary' id='datosGraficos'>Clase de Cuadros</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Cursillos</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Cursos Regulares</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Ciclos SSVV</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Ejercicios de Gabinete</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Ejercicios en el Terreno</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Simuladores</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Campo de Instrucción</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Polígono de Tiro</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Asignación de Munición para Instrucción (AMI)</div>
  <div class='btn_elem_op btn btn-outline-secondary'>MOTE</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Pruebas de Aptitud Física Básica (PAFB)</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Pruebas de Aptitud Física Operacional (PAFO)</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Aptitud Física Individual (AFI)</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Aptitud Aplicativa al Combate (AAC)</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Fracción de Reacción ante Catástrofes (FRAC)</div>
  <div class='btn_elem_op btn btn-outline-secondary'>Organizaciones Militares de Paz (OMP)</div>`;
  $("#carouselAreaPers").trigger("replace.owl.carousel", html);
  $("#carouselAreaPers").trigger("refresh.owl.carousel");
  $("#carouselAreaPers").ready(function () {
    $(".btn_elem_op").on("click", function () {
      $(".btn_elem_op").removeClass("item_selec");
      $(this).addClass("item_selec");
    });
  });
});

$("#mats_opc").click(function () {
  var html = `<div class='btn_elem_mat btn btn-outline-secondary' id='datosGraficos'>Vehículos</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Armamento</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Material de Comunicaciones</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Materiales Generales</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Servicio de Mantenimiento de VVC</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Efectos Clase I</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Efectos Clase II y IV - UCA</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Efectos Clase III</div>
  <div class='btn_elem_mat btn btn-outline-secondary'>Barrio Militar</div>`;
  $("#carouselAreaPers").trigger("replace.owl.carousel", html);
  $("#carouselAreaPers").trigger("refresh.owl.carousel");
  $("#carouselAreaPers").ready(function () {
    $(".btn_elem_mat").on("click", function () {
      $(".btn_elem_mat").removeClass("item_selec");
      $(this).addClass("item_selec");
    });
  });
});

$("#fins_opc").click(function () {
  var html = `<div class='btn_elem_fin btn btn-outline-secondary' id='datosGraficos'>Viáticos</div>
  <div class='btn_elem_fin btn btn-outline-secondary'>Licitaciones</div>
  <div class='btn_elem_fin btn btn-outline-secondary'>Presupuestos</div>`;
  $("#carouselAreaPers").trigger("replace.owl.carousel", html);
  $("#carouselAreaPers").trigger("refresh.owl.carousel");
  $("#carouselAreaPers").ready(function () {
    $(".btn_elem_fin").on("click", function () {
      $(".btn_elem_fin").removeClass("item_selec");
      $(this).addClass("item_selec");
    });
  });
});

function clickAreasPers() {
  $(".btn_elem_pers").removeClass("item_selec");
  $("#fuerza_efectiva").addClass("item_selec");
  $("#div_carrousel_graficos").hide('slow');
  $("#div_carrousel_datos").show('slow');
}


