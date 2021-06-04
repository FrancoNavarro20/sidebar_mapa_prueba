var ejercito;
$("#EA-mil").click(function () {
  var clicks = $(this).data("clicks");

  if ( typeof $(this).data("cod_uni") !== "undefined")
    cod_uni = $(this).data("cod_uni");

  map.removeLayer(ejercito);
  if (!clicks) {
    mostrar_marcadores(cod_uni);
  }
  $(this).data("clicks", !clicks);
});

$(".ejer-items").click(function () {

  if ( typeof $(this).data("cod_uni") !== "undefined")
    cod_uni = $(this).data("cod_uni");

  //console.log("cod_uni:"+cod_uni);
  map.removeLayer(ejercito);
  mostrar_marcadores(cod_uni);
  console.log("asd")
  graficosSidebar() 

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
      ejercito = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: new EjercitoSvg() });
        },
        onEachFeature: function (feature, layer) {
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
              '<center><img src="./img/Escudo_del_Ejército_Argentino.png" style="max-width: 20%; height: auto;"/></center>' + 
              "' onclick='masInfo(this)'>Mas información</a>"
          );
        },
        filter: function (feature) {
          return feature.properties.fdc == "Ejército Argentino";
        },
      }).addTo(map);
    }
  });
}