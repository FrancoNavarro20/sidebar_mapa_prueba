var map = L.map("mapa", { zoomControl: false }).setView([-40, -59], 4);

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

// var sidebar = L.control.sidebar("sidebar", {
//   position: "right",
//   closeButton: true,
//   autoPan: true
// });
// map.addControl(sidebar);
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
  errorMessage:
    "No se encontró ninguna ubicación que coincida con su búsqueda.",
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
            "<h6>Institucion:</h6> " + feature.properties.nombre_geografico
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
            "<h6>Institucion:</h6> " + feature.properties.nombre_geografico
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
      geoPackageUrl: "./geoPackage/CCZEM.gpkg",
      layerName: "CCZEM",
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<div style='font-size: 16px;'><b>Zona de Emergencia COVID</b></div><div style='font-size: 14px; padding-top:8px;'>Nombre: <b>" +
            feature.properties.CCZE +
            "</b></div>" +
            "<div style='font-size: 14px; padding-top:4px;'>A cargo de: <b>" +
            feature.properties.CDO +
            "</b></div></b>"
        );
      },
      style: { color: "rgb(31, 141, 108)" },
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
    iconUrl: "./img/ejercito.svg",
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
    data: { cod_uni: cod_uni },
    url: "database.php", // Url to which the request is send
    //url: "./geojson/data_unidades_ea.geojson",        // Url to which the request is send
    type: "POST", // Type of request to be send, called as method
    cache: true, // To unable request pages to be cached
    // el tipo de información que se espera de respuesta
    dataType : 'json',
    success: function(data)   // A function to be called if request succeeds
    {
      //console.log(data);
      ejercito = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: new EjercitoSvg() });
        },
        onEachFeature: function (feature, layer) {
          layer._leaflet_id = feature.properties.cod_uni;
          arma = "";
          if (feature.properties.arma!="") {
            arma = "<div style='font-size: 12px;'>Arma/Servicio: " + feature.properties.arma + "</div>" ;
          }
          layer.bindPopup(
            '<div><b style="font-size: 14px;">' + feature.properties.fna +
              "</b></div><div style='font-size: 10px; padding-top: 3px;'>" + ((feature.properties.localidad == null)?'':feature.properties.localidad) + "</div>" +
              "<div style='font-size: 12px; padding-top: 3px;'><a href=# onclick=masInfo('" + feature.properties.cod_uni +"')>Más información</a></div>"
          );
        },
        filter: function (feature) {
          return feature.properties.fdc == "Ejército Argentino";
        },
      });
      graficosSidebar()
      uni_agrupadas.addLayer(ejercito);
      map.addLayer(uni_agrupadas);
      //$("#div_listado_unidades").html(data.features[0].properties.fna);
      // $("#div_listado_unidades").html(elem);
      //$("#div_listado_unidades .owl-stage-outer .owl-stage .owl-item").remove();
      var length = $('.item').length;
      for (var i =0; i<length; i++) {
        $(".owl-carousel").trigger('remove.owl.carousel', i );
      }
      //$(".owl-carousel").trigger('refresh.owl.carousel');
      for (var i = 0; i < ejercito.getLayers().length; i++) { 
        switch (ejercito.getLayers()[i].feature.properties.cod_uni) {
          case "U3448":
            imagen_escudo = "<img src='./img/Dir_Grl_Com_Info.svg' style='padding-left:2px; padding-right:2px; width: 100%;'/>";
            break;
          case "U2325":
            imagen_escudo = "<img src='./img/B_Com_602.png' style='padding-left:5px; padding-right:5px; width: 100%;'/>";
            break;
          case "U3640":
            imagen_escudo = "<img src='./img/CIBERDEFENSA_ESCUDO.svg' style='padding-left:2px; padding-right:2px; width: 100%;'/>";
            break;
          case "U3639":
            imagen_escudo = "<img src='./img/CPS.svg' style='padding-left:2px; padding-right:2px; width: 100%;'/>";
            break;
          case "U0073":
          case "U3449":
            imagen_escudo = "<img src='./img/B_Mant_Com_601.png' style='width: 100%;'/>";
            break;
          default:
            imagen_escudo = "<img src='./img/ejercito.svg' style='width: 100%;'/>";
            break;
        }        
        style_escudo = "background-color: white; border: 1px solid #D9D9D9; border-radius: 10px 0px 0px 10px; vertical-align: middle; text-align: left; padding: 0px;";
        style_unidad = "background-color: white; border: 1px solid #D9D9D9; border-radius: 0px 10px 10px 0px; padding: 5px;";
        escudo = "<div class='col-md-4' style='display: flex; align-items: center; justify-content: center;" + style_escudo + "'>" + imagen_escudo + "</div>";
        nombre_unidad = "<div style='height: 35px; overflow:hidden; text-overflow: ellipsis; font-weight: bold; font-size: 14px; text-align: left; -webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box; line-height: 1.1rem;'>" + ejercito.getLayers()[i].feature.properties.fna + "</div>";
        localidad = "<div style='height: 30px; overflow:hidden; text-overflow: ellipsis; font-weight: normal; font-size: 10px; padding-top: 3px; padding-bottom: 0px; -webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box; line-height: 0.8rem;'>" + ((ejercito.getLayers()[i].feature.properties.localidad == null)?'':ejercito.getLayers()[i].feature.properties.localidad) + "</div>";
        unidad = "<div class='col-md-8 sector_unidad' style='cursor: pointer; " + style_unidad + "' onmouseover=mostrarUnidadesZoom('" + ejercito.getLayers()[i].feature.properties.cod_uni+ "') onclick=masInfo('" + ejercito.getLayers()[i].feature.properties.cod_uni+ "')>"+ nombre_unidad + localidad + "</div>";
        item = "<div class='item row'>" + escudo + unidad + "</div>";
        $('.owl-carousel').owlCarousel().trigger('add.owl.carousel', "<div class='owl-item'>" + item + "</div>").trigger('refresh.owl.carousel');
      }
      $('.sector_unidad').on('click',function (e) {       
        $('.sector_unidad').removeClass('click-unis');
        //var div_selec = $(e.relatedTarget);
        $(this).addClass('click-unis');     
      });
      $("#overlay_carousel").hide();
      $("#div_listado_unidades").delay(100).show();
    }
  });
}
//Fin GeoJSON

function masInfo(info) {  
  var uniInfo = ejercito._layers[info];
  cod_uni = uniInfo.feature.properties.cod_uni;
  cod_unisup = uniInfo.feature.properties.cod_unisup;
  //alert ("Cod Uni: "+cod_uni);
  document.getElementById("div_elem_mapa_seleccionado").innerHTML =
    //   "ID: " +
    '<div style="text-align: center; padding-top: 0px; margin-bottom: 5px; text-transform: uppercase; font-size: 22px; font-weight: bold;">' +
    uniInfo.feature.properties.fna +
    "</div>";
  $("#div_elem_menu_seleccionado").hide();
  $("#div_elem_mapa_seleccionado").show();

  var coords = ejercito._layers[info]._latlng;
  map.setView(coords, 14);
  _fireEventOnMarkerOrVisibleParentCluster(ejercito._layers[info], "mouseover");
  ejercito._layers[info].openPopup();
  
  // showSidebar();
  graficosSidebar();
}

function mostrarUnidadesZoom(id) {
  /*
  var coords = ejercito._layers[id]._latlng;
  map.setView(coords, 14);
  _fireEventOnMarkerOrVisibleParentCluster(ejercito._layers[id], "mouseover");
  ejercito._layers[id].openPopup();
  */
}

function _fireEventOnMarkerOrVisibleParentCluster(unidad, eventName) {
  if (eventName === "mouseover") {
    var visibleLayer = uni_agrupadas.getVisibleParent(unidad);
    if (visibleLayer instanceof L.MarkerCluster) {
      // We want to show a marker that is currently hidden in a cluster.
      // Make sure it will get highlighted once revealed.
      uni_agrupadas.once("spiderfied", function () {
        unidad.fire(eventName);
      });
      // Now spiderfy its containing cluster to reveal it.
      // This will automatically unspiderfy other clusters.
      visibleLayer.spiderfy();
    } else {
      // The marker is already visible, unspiderfy other clusters if
      // they do not contain the marker.
      _unspiderfyPreviousClusterIfNotParentOf(unidad);
      unidad.fire(eventName);
    }
  } else {
    // For mouseout, marker should be unclustered already, unless
    // the next mouseover happened before?
    unidad.fire(eventName);
  }
}

function _unspiderfyPreviousClusterIfNotParentOf(unidad) {
  // Check if there is a currently spiderfied cluster.
  // If so and it does not contain the marker, unspiderfy it.
  var spiderfiedCluster = uni_agrupadas._spiderfied;

  if (spiderfiedCluster && !_clusterContainsMarker(spiderfiedCluster, unidad)) {
    spiderfiedCluster.unspiderfy();
  }
}

function _clusterContainsMarker(cluster, unidad) {
  var currentLayer = unidad;

  while (currentLayer && currentLayer !== cluster) {
    currentLayer = currentLayer.__parent;
  }

  // Say if we found a cluster or nothing.
  return !!currentLayer;
}
