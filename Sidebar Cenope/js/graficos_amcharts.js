function graficosSidebar() {
  $(".div_pers_cant").hide();
  $(".overlay").delay(100).show();
  cargarEstadisticasPersonal();
}

function cargarEstadisticasPersonal() {
  console.log(cod_uni);
  let post_fields = {
    cod_uni : cod_uni
  }
  fetch("datos_area_personal_grados_nuevo.php", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_fields),
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.warn('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(datos) {
        //console.log(datos);
        let cantidadesOf = [];
        let labelsOf = [];
        var cant_of_superiores=0;
        var cant_of_jefes=0;
        var cant_of_subalternos=0;
        var cant_subof_superiores=0;
        var cant_subof_subalternos=0;
        var cant_sold_operacionales=0;
        var cant_sold_tecnicos=0;
        var cant_sold_especialistas=0;
        var cant_sold_deportistas=0;
        var peso_grado;

        $.each(datos.oficiales, function(key,value) {
          //console.log(value.peso_grado+':'+value.first);
          peso_grado = parseInt(value.peso_grado)
          if (peso_grado>0 && peso_grado<=500) {
            cant_of_superiores = cant_of_superiores + parseInt(value.first)
          }
          if (peso_grado>=600 && peso_grado<=700) {
            cant_of_jefes = cant_of_jefes + parseInt(value.first)
          }
          if (peso_grado>=800 && peso_grado<=1600) {
            cant_of_subalternos = cant_of_subalternos + parseInt(value.first)
          }
        });
        $.each(datos.suboficiales, function(key,value) {
          //console.log(value.peso_grado+':'+value.first);
          peso_grado = parseInt(value.peso_grado)
          if (peso_grado>=1700 && peso_grado<=2000) {
            cant_subof_superiores = cant_subof_superiores + parseInt(value.first)
          }
          if (peso_grado>=2100) {
            cant_subof_subalternos = cant_subof_subalternos + parseInt(value.first)
          }
        });
        $.each(datos.soldados, function(key,value) {
          //console.log(value.peso_grado+':'+value.first);
          switch (value.peso_grado) {
            case "O": //Operacionales
              cant_sold_operacionales = cant_sold_operacionales + parseInt(value.first);
              break;
            case "T": //Técnicos
              cant_sold_tecnicos = cant_sold_tecnicos + parseInt(value.first);
              break;
            case "E": //Especialistas
              cant_sold_especialistas = cant_sold_especialistas + parseInt(value.first);
              break;
            case "D": //Deportistas
              cant_sold_deportistas = cant_sold_deportistas + parseInt(value.first);
              break;
          }
        });
        var cant_of_total = cant_of_superiores + cant_of_jefes + cant_of_subalternos;
        var cant_subof_total = cant_subof_superiores + cant_subof_subalternos;
        var cant_soldados_total = cant_sold_operacionales + cant_sold_tecnicos + cant_sold_especialistas;

        $("#cant_of_total").html(cant_of_total);
        $("#cant_of_superiores").html(cant_of_superiores);
        $("#cant_of_jefes").html(cant_of_jefes);
        $("#cant_of_subalternos").html(cant_of_subalternos);
        $("#cant_subof_total").html(cant_subof_total);
        $("#cant_subof_superiores").html(cant_subof_superiores);
        $("#cant_subof_subalternos").html(cant_subof_subalternos);
        $("#cant_sold_total").html(cant_soldados_total);
        $("#cant_sold_operacionales").html(cant_sold_operacionales);
        $("#cant_sold_tecnicos").html(cant_sold_tecnicos);
        $("#cant_sold_especialistas").html(cant_sold_especialistas);
        $("#cant_sold_deportistas").html(cant_sold_deportistas);

        if (cod_uni=="TODOS") {
          $("#btn_ver_oficiales").hide();
          $("#btn_ver_suboficiales").hide();
          $("#btn_ver_soldados").hide();
          $("#div_civiles").css("height", "155px");
        } else {
          $("#btn_ver_oficiales").show();
          $("#btn_ver_suboficiales").show();
          $("#btn_ver_soldados").show();
          $("#div_civiles").css("height", "184px");
        }

        $(".overlay").hide();
        $(".div_pers_cant").delay(100).fadeIn();
        
        chart_personal("chart_oficiales", "Oficiales", datos.oficiales);
        chart_personal("chart_suboficiales", "Suboficiales", datos.suboficiales);
        chart_personal("chart_soldados", "Soldados", datos.soldados);
      });
    }
  )
  .catch(function(err) {
    console.error('Fetch Error -', err);
  });
}

function chart_personal(div_chart,titulo,datos_json) {
  // Themes begin
  am4core.useTheme(am4themes_material);
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  var chart = am4core.create(div_chart, am4charts.XYChart);
  chart.numberFormatter.numberFormat = "#.";
  

  // Title
  var title = chart.titles.push(new am4core.Label());
  //title.text.color = "#125186";
  title.text = titulo;
  title.fontSize = 20;
  title.marginTop = 10;
  title.marginBottom = 10;

  // Add data
  chart.data = datos_json;

  // Create axes

  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.valign = "top";
  categoryAxis.renderer.labels.template.fontSize = 12;

  categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    if (target.dataItem && target.dataItem.index & 2 == 2) {
      return dy + 15;
    }
    return dy;
  });

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.extraMax = 0.11;
  valueAxis.renderer.labels.template.fontSize = 12;

  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "first";
  series.dataFields.categoryX = "category";
  series.name = "Cant personal";
  series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  series.columns.template.fillOpacity = .8;

  var columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;

  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.verticalCenter = "bottom";
  labelBullet.label.dy = -10;
  labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
  labelBullet.label.fontSize = 12;
}