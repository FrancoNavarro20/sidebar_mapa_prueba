var ejercito;
$("#EA-mil").click(function () {
  var clicks = $(this).data("clicks");
  var cod_uni = $(this).data("cod_uni");
  map.removeLayer(ejercito);
  if (!clicks) {
    mostrar_marcadores(cod_uni);
  }
  $(this).data("clicks", !clicks);
});
