function graficosSidebar() {
  cargarEstadisticasPersonal();
}

function cargarEstadisticasPersonal() {
  console.log(cod_uni);
  let post_fields = {
      cod_uni : cod_uni
  }

  fetch("datos_area_personal_grados.php", {
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
        console.log(datos);
        let cantidadesOf = [];
        let labelsOf = [];

        chart_personal("chart_oficiales", "Oficiales", datos.oficiales);
        chart_personal("chart_suboficiales", "Suboficiales", datos.suboficiales);
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

  // Title
  var title = chart.titles.push(new am4core.Label());
  title.text = titulo;
  title.fontSize = 20;
  title.marginTop = 15;
  title.marginBottom = 10;

  // Add data
  chart.data = datos_json;

  // Create axes

  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;

  categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    if (target.dataItem && target.dataItem.index & 2 == 2) {
      return dy + 15;
    }
    return dy;
  });

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.extraMax = 0.11;

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
}