var map = L.map("mapa", { zoomControl: false }).setView(
  [-40, -59],
  5
);

L.tileLayer(
  "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
  {
    attribution:
      '<a href="http://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2" target="_blank">Instituto Geográfico Nacional</a>',
    minZoom: 3,
    maxZoom: 18,
  }
).addTo(map);

L.control
  .scale({
    maxWidth: 240,
    metric: true,
    imperial: false,
    position: "bottomleft",
  })
  .addTo(map);

L.control
  .polylineMeasure({
    position: "bottomright",
    unit: "metres",
    clearMeasurementsOnStop: false,
    showClearControl: true,
    showUnitControl: true,
  })
  .addTo(map);

map.addControl(
  L.control.locate({
    locateOptions: {
      enableHighAccuracy: true,
    },
    position: "bottomright",
  })
);

var sidebar = L.control.sidebar("sidebar", {
  position: "right",
  closeButton: true,
  autoPan: true
});
map.addControl(sidebar);
//sidebar.show();

/*
map.on('click', function () {
  sidebar.hide();      
});

map.on('popupclose', function () {
  sidebar.hide();      
});
*/

//ZOOM HOME
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);
//Fin ZOOM HOME

var geocoder = L.Control.Geocoder.nominatim({
  geocodingQueryParams: { countrycodes: "AR" },
});

var control = L.Control.geocoder({
  geocoder: geocoder,
  placeholder: "Buscar",
  errorMessage: "No se encontró ninguna ubicación que coincida con su búsqueda.",
});

document.getElementById("geosidebar").appendChild(control.onAdd(map));

//Leaflet Draw
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
  draw: {
    circle: false,
  },
  edit: {
    featureGroup: drawnItems,
  },
});
map.addControl(drawControl);

map.on("draw:created", function (e) {
  var type = e.layerType,
    layer = e.layer;
  console.log(e);

  if (type === "marker") {
    layer.bindPopup();
    layer.getPopup().setContent(layer.getLatLng().toString());
  }
  drawnItems.addLayer(layer);
});

//Fin Leaflet Draw

//WFS
var linea_frc = {
  color: "black",
  weight: 1,
};

var frc_url =
  "https://wms.ign.gob.ar/geoserver/ign/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ign:lineas_de_transporte_ferroviario_AN010&outputFormat=application/json";

var ferrocarril;
$("#bt-lim-intern").click(function () {
  var clicks = $(this).data("clicks");
  if (!clicks) {
    $.getJSON(frc_url).then((res) => {
      ferrocarril = L.geoJSON(res, linea_frc).addTo(map);
    });
  } else {
    map.removeLayer(ferrocarril);
  }
  $(this).data("clicks", !clicks);
});

var univ_url =
  "https://wms.ign.gob.ar/geoserver/infraestructura-social/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=infraestructura-social:puntos_de_ciencia_y_educacion_020602&outputFormat=application/json";
var UnivSvg = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 24),
    iconUrl: "./img/universidad_nac.svg",
  },
});
var UnivPSvg = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 24),
    iconUrl: "./img/universidad_otras.svg",
  },
});

var infraestructura_social;
$("#publica-mil").click(function () {
  var clicks = $(this).data("clicks");
  if (!clicks) {
    $.getJSON(univ_url).then((res) => {
      infraestructura_social = L.geoJSON(res, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: new UnivSvg() });
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "<h6>Institucion:</h6> " +
            feature.properties.nombre_geografico
          );
        },
        filter: function (feature) {
          return !feature.properties.nombre_geografico.search(
            "Universidad Nacional" || "Universidad Tecnológica Nacional"
          );
        },
      }).addTo(map);
    });
  } else {
    map.removeLayer(infraestructura_social);
  }
  $(this).data("clicks", !clicks);
});

var infraestructura_privada;
$("#privada-mil").click(function () {
  var clicks = $(this).data("clicks");
  if (!clicks) {
    $.getJSON(univ_url).then((res) => {
      infraestructura_privada = L.geoJSON(res, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: new UnivPSvg() });
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "<h6>Institucion:</h6> " +
            feature.properties.nombre_geografico
          );
        },
        filter: function (feature) {
          return feature.properties.nombre_geografico.search(
            "Universidad Nacional" || "Universidad Tecnológica Nacional"
          );
        },
      }).addTo(map);
    });
  } else {
    map.removeLayer(infraestructura_privada);
  }
  $(this).data("clicks", !clicks);
});

//Fin WFS

var zonas_br_ea;
$("#zonas_responsabilidad_br_EA").click(function () {
  var clicks = $(this).data("clicks");
  if (!clicks) {
    // Load the GeoPackage and display the layer
    zonas_br_ea = L.geoPackageFeatureLayer([], {
      geoPackageUrl: './geoPackage/CCZEM.gpkg',
      layerName: 'CCZEM',
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<div style='font-size: 16px;'><b>Zona de Emergencia COVID</b></div><div style='font-size: 14px; padding-top:8px;'>Nombre: <b>" +
          feature.properties.CCZE + "</b></div>" +
          "<div style='font-size: 14px; padding-top:4px;'>A cargo de: <b>" +
          feature.properties.CDO + "</b></div></b>"
        );
      },
      style: {color: 'rgb(31, 141, 108)'}
    }).addTo(map);
  } else {
    map.removeLayer(zonas_br_ea);
  }
  $(this).data("clicks", !clicks);
});

/*
$("#zonas_responsabilidad_br_EA").click(function () {
  var clicks = $(this).data("clicks");
  if (!clicks) {
    // Load the GeoPackage and display the layer
    zonas_br_ea = L.geoPackageTileLayer({
      geoPackageUrl: 'http://ngageoint.github.io/GeoPackage/examples/rivers.gpkg',
      layerName: 'rivers_tiles'
    }).addTo(map);
  } else {
    map.removeLayer(zonas_br_ea);
  }
  $(this).data("clicks", !clicks);
});
*/
//GeoJSON

var AereaSvg = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(40, 40),
    iconUrl: "./img/Logo_Fuerza-Aerea.png",
  },
});
var ArmadaSvg = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(40, 40),
    iconUrl: "./img/Escudo_armada_argentina_banderolas.png",
  },
});
var EjercitoSvg = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(40, 40),
    iconUrl: "./img/Escudo_del_Ejército_Argentino.png",
  },
});

var fuerza_aerea;
$("#FFAA").click(function () {
  var clicks = $(this).data("clicks");
  if (!clicks) {
    fetch("./geojson/instalacion_militar.geojson")
      .then((response) => response.json())
      .then((data) => {
        fuerza_aerea = L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: new AereaSvg() });
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup(
              '<b style="font-size: 14px;"><img src="./img/Logo_Fuerza-Aerea.png" style="width: 24px; height: 24px"/> ' +
              feature.properties.fdc +
              "<br><b>Nombre</b>: " +
              feature.properties.fna +
              "<br><a href=# data-id='" +
              feature.properties.gid +
              "' data-fuerza='" +
              feature.properties.fdc +
              "' data-objeto='" +
              feature.properties.objeto +
              "' data-nombre='" +
              feature.properties.fna +
              "' data-fuente='" +
              feature.properties.sag +
              "' data-img='" +
              '<center><img src="./img/Logo_Fuerza-Aerea.png" style="max-width: 20%; height: auto;"/></center>' +
              "' onclick='masInfo(this)'>Mas información</a>"
            );
          },
          filter: function (feature) {
            return feature.properties.fdc == "Fuerza Aérea Argentina";
          },
        }).addTo(map);
      });
  } else {
    map.removeLayer(fuerza_aerea);
  }
  $(this).data("clicks", !clicks);
});

var armada_arg;
$("#arm-arg").click(function () {
  var clicks = $(this).data("clicks");
  if (!clicks) {
    fetch("./geojson/instalacion_militar.geojson")
      .then((response) => response.json())
      .then((data) => {
        armada_arg = L.geoJSON(data, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: new ArmadaSvg() });
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup(
              '<b style="font-size: 14px;"><img src="./img/Escudo_armada_argentina_banderolas.png" style="width: 24px; height: 24px"/> ' +
              feature.properties.fdc +
              "<br><b>Nombre</b>: " +
              feature.properties.fna +
              "<br><a href=# data-id='" +
              feature.properties.gid +
              "' data-fuerza='" +
              feature.properties.fdc +
              "' data-objeto='" +
              feature.properties.objeto +
              "' data-nombre='" +
              feature.properties.fna +
              "' data-fuente='" +
              feature.properties.sag +
              "' data-img='" +
              '<center><img src="./img/Escudo_armada_argentina_banderolas.png" style="max-width: 20%; height: auto;"/></center>' +
              "' onclick='masInfo(this)'>Mas información</a>"
            );
          },
          filter: function (feature) {
            return feature.properties.fdc == "Armada Argentina";
          },
        }).addTo(map);
      });
  } else {
    map.removeLayer(armada_arg);
  }
  $(this).data("clicks", !clicks);
});

function mostrar_marcadores(cod_uni) {
  $.ajax({
    data: { "cod_uni" : cod_uni },
    url: "database.php",        // Url to which the request is send
    //url: "./geojson/data_unidades_ea.geojson",        // Url to which the request is send
    type: "POST",             // Type of request to be send, called as method
    cache: true,             // To unable request pages to be cached
    // el tipo de información que se espera de respuesta
    dataType : 'json',
    success: function(data)   // A function to be called if request succeeds
    {
      //console.log(data);
      var elem="";
      ejercito = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: new EjercitoSvg() });
        },
        onEachFeature: function (feature, layer) {
          elem = elem + "<div class='row' style='background-color:#eeeeee; min-height: 25px; margin-left: 0px; margin-right:0px; padding-left:10px; padding-right:10px; align-content: center; font-weight:bold; text-transform: uppercase;'>" + feature.properties.fna + "</div>";
          layer.bindPopup(
            '<b style="font-size: 14px;"><img src="./img/Escudo_del_Ejército_Argentino.png" style="width: 24px; height: 24px"/> ' +
              feature.properties.fdc +
              "<br><b>Nombre</b>: " +
              feature.properties.fna +
              "<br><a href=# data-id='" +
              feature.properties.gid +
              "' data-cod_uni='" +
              feature.properties.cod_uni +
              "' data-cod_unisup='" +
              feature.properties.cod_unisup +
              "' data-fuerza='" +
              feature.properties.fdc +
              "' data-objeto='" +
              feature.properties.objeto +
              "' data-nombre='" +
              feature.properties.fna +
              "' data-localidad='" +
              feature.properties.localidad +
              "' data-nodo='" +
              feature.properties.nodo +
              "' data-arma='" +
              feature.properties.arma +
              "' data-fuente='" +
              feature.properties.sag +
              "' data-img='" +
              '<center><img src="./img/Escudo_del_Ejército_Argentino.png" style="max-width: 15%; height: auto;"/></center>' + 
              "' onclick='masInfo(this)'>Más información</a>"
          );
        },
        filter: function (feature) {
          return feature.properties.fdc == "Ejército Argentino";
        },
      })
      uni_agrupadas.addLayer(ejercito);
      map.addLayer(uni_agrupadas);
      //$("#div_listado_unidades").html(data.features[0].properties.fna);
      $("#div_listado_unidades").html(elem);
    }
  });
}
//Fin GeoJSON

function masInfo(info) {
  cod_uni = $(info).data("cod_uni");
  cod_unisup = $(info).data("cod_unisup");
  //alert ("Cod Uni: "+cod_uni);
  document.getElementById("div_elem_mapa_seleccionado").innerHTML =
    //   "ID: " +
    "<div>" + $(info).data("img") + "</div>" +
    '<div style="text-align: center; padding-top: 10px; margin-bottom: 5px; text-transform: uppercase; font-size: 22px; font-weight: bold;">' +
    $(info).data("nombre") +
    "</div>" +
    "<div style='text-align: center; background-color:#eeeeee; min-height: 30px; margin-top:5px; font-size:14px;'>" +
    "<div class='row'>" +
    "<div class='col-md-6' style='font-weight:bold; padding: 5px; text-align:left;'>Localidad</div>" +
    "<div class='col-md-6' style='text-transform: uppercase; padding: 5px; text-align:left;'>" + $(info).data("localidad") + "</div>" +
    "<div class='col-md-6' style='font-weight:bold; padding: 5px; text-align:left;'>Arma</div>" +
    "<div class='col-md-6' style='text-transform: uppercase; padding: 5px; text-align:left;'>" + $(info).data("arma") + "</div></div></div>";
 
  setTimeout(function(){
    $("#div_elem_menu_seleccionado").hide();
    $("#div_elem_mapa_seleccionado").show();    
    sidebar.show();
  }, 1000);
  graficosSidebar();
}