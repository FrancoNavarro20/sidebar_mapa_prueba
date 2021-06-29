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
    url: "datos_area_personal.php", // Url to which the request is send
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
  $("#sub-menu-search").show();
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
    $("#div_nombre_elem_seleccionado").html(
      '<div style="font-size: 22px; font-weight: bold; text-align: center; padding-top: 5px; margin-bottom: 0px;">' +
        elem_selec +
        "</div>"
    );
  }

  $("#div_elem_mapa_seleccionado").hide();
  $("#div_elem_menu_seleccionado").show();

  map.removeLayer(ejercito);
  mostrar_marcadores(cod_uni);
  graficosSidebar();

  //map.setView([lat,lon],zoom);
  //if (!sidebar.isVisible())
  // showSidebar();
});

/*Inicio de panel principal (Conduccion Superior,Fuerza Operativa,Fuerza de Sostenimiento,Sistema Educ)*/

//Cerrar ejer-arg principal
$("#crossicon-ejer").click(function () {
  $("#sub-menu-ejer-arg").hide();
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

// function showSidebar() {
//$("#infosidebar").addClass("visible");
//$(".tamanoA").css("width", "calc(100vw - 800px)");
//window.setTimeout(function () {
//map.invalidateSize();
//}, 1000);
// }

// function hideSidebar() {
//$("#infosidebar").removeClass("visible");
//$(".tamanoA").css("width", "calc(100vw - 320px)");
//window.setTimeout(function () {
//map.invalidateSize();
//}, 1000);
// }

//Botones de los graficos
$(".pulsar_elemt_grafic").click(function () {
  //alert("Anda los botones");

  var origen = $(this);
  var universidad = origen.data("grafic");
  switch (universidad) {
    case "datos":
      //alert("Alerta de datos");
      $(".elemt_graficos_mil").hide("slow");
      $(".elemt_datos").show("slow");
      $("#boton_datos").addClass("elemt_pulsado_grafic");
      $("#boton_datos a").addClass("elemt_pulsado_grafic_a");
      $("#boton_grafic a").removeClass("elemt_pulsado_grafic_a");
      $("#boton_grafic").removeClass("elemt_pulsado_grafic");
      break;
    case "graficos":
      //alert("Alerta de graficos");
      $(".elemt_datos").hide("slow");
      $(".elemt_graficos_mil").show("slow");
      $("#boton_datos").removeClass("elemt_pulsado_grafic");
      $("#boton_datos a").removeClass("elemt_pulsado_grafic_a");
      $("#boton_grafic a").addClass("elemt_pulsado_grafic_a");
      $("#boton_grafic").addClass("elemt_pulsado_grafic");
      break;
    default:
      alert(
        "Hubo un error, no se selecciono una universidad pública o privada ."
      );
      break;
  }
});

$("#pers_opc").click(function () {
  var html =
    "<div class='item-area-pers'><button class='btn btn-outline-primary' id='datosGraficos'><p>Fuerza Efectiva</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Proyección de Bajas</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Oficios Judiciales</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Causas por Género y VIF</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Control Toxicológico</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Anexo 27</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Faltas Disciplinarias</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Deserción</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Actuaciones de Justicia Militar</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Situación de Vivienda</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Evacuaciones</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Accidentes</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Parte de Sanidad</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Estado Civil</p></button></div><div class='item-area-pers'><button class='btn btn-outline-primary '><p>Personal Propuesto para Junta de Calificación</p></button></div>";
  $("#carouselAreaPers")
    .trigger("replace.owl.carousel", html)
    .trigger("refresh.owl.carousel");
  $("#datosGraficos").click(function () {
    $("#muestraGraf").css("display", "block");
  });
  clickAreasPers();
});

$("#icia_opc").click(function () {
  var html =
    '<div class="item-area-pers"><button class="btn btn-outline-primary "><p>Revista de Material Sensible</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Estudio de Seguridad</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Seguridad Humana</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Cámaras - Instalaciones Sensibles</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "> <p>Cámaras - Perímetro</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Alarmas - Instalaciones Sensibles</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Rejas en Techo</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Rejas en Puertas y Ventanas</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Cerco Perimetral</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Vulneraciones</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "> <p>Reconocimientos</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Personal Vinculado a Causas Judiciales</p></button></div>';
  $("#carouselAreaPers")
    .trigger("replace.owl.carousel", html)
    .trigger("refresh.owl.carousel");
  clickAreasPers();
});

$("#ops_opc").click(function () {
  var html =
    '<div class="item-area-pers"><button class="btn btn-outline-primary "><p>Clase de Cuadros</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Cursillos</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Cursos Regulares</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Ciclos SSVV</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Ejercicios de Gabinete</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Ejercicios en el Terreno</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Simuladores</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Campo de Instrucción</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Polígono de Tiro</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Asignación de Munición para Instrucción (AMI)</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>MOTE</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Pruebas de Aptitud Física Básica (PAFB)</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Pruebas de Aptitud Física Operacional (PAFO)</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Aptitud Física Individual (AFI)</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Aptitud Aplicativa al Combate (AAC)</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Fracción de Reacción ante Catástrofes (FRAC)</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Organizaciones Militares de Paz (OMP)</p></button>';
  $("#carouselAreaPers")
    .trigger("replace.owl.carousel", html)
    .trigger("refresh.owl.carousel");
  clickAreasPers();
});

$("#mats_opc").click(function () {
  var html =
    '<div class="item-area-pers"><button class="btn btn-outline-primary "><p>Vehículos</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Armamento</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Material de Comunicaciones</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Materiales Generales</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Servicio de Mantenimiento de VVC</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Efectos Clase I</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Efectos Clase II y IV - UCA</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Efectos Clase III</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Barrio Militar</p></button></div>';
  $("#carouselAreaPers")
    .trigger("replace.owl.carousel", html)
    .trigger("refresh.owl.carousel");
  clickAreasPers();
});

$("#fins_opc").click(function () {
  var html =
    '<div class="item-area-pers"><button class="btn btn-outline-primary "><p>Viáticos</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Licitaciones</p></button></div><div class="item-area-pers"><button class="btn btn-outline-primary "><p>Presupuestos</p></button></div>';
  $("#carouselAreaPers")
    .trigger("replace.owl.carousel", html)
    .trigger("refresh.owl.carousel");
  clickAreasPers();
});

function clickAreasPers() {
  $(".item-area-pers button.btn.btn-outline-primary").on("click", function () {
    $(".click-item-area-pers").removeClass("click-item-area-pers");
    $(this).addClass("click-item-area-pers");
    if (!this.hasAttribute("id", "datosGraficos")) {
      $("#muestraGraf").css("display", "none");
    }
  });
}

$(".divisiones button.btn.btn-outline-primary").on("click", function () {
  $(".division-seleccionada").removeClass("division-seleccionada");
  $(this).addClass("division-seleccionada");
});
