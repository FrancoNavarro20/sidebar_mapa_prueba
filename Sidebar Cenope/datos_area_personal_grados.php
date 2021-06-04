<?php

require 'conexion_database.php';


if (!isset($_POST['cod_uni']) || $_POST['cod_uni']=="") {
    echo "";
    return;
}

$query_por_grados = "SELECT p.peso_grado,p.grado,COUNT(*) AS cant_grado FROM personal p GROUP BY p.cod_unidad,p.peso_grado,p.grado having p.cod_unidad='".$_POST['cod_uni']."'";

$result_por_grados = mysqli_query( $conexion, $query_por_grados ) or die ( "Algo ha ido mal en la consulta a la base de datos");

$pers_oficiales = array();
$pers_suboficiales = array();
$i=0;
while ($columna = mysqli_fetch_array($result_por_grados))
{
    $peso = (int)$columna['peso_grado'];
    if ($peso>0 && $peso<=1600) {
    	$pers_oficiales[] = array(
            'category' => $columna['grado'],
            'first' => $columna['cant_grado']
        );
    } else {
        $pers_suboficiales[] = array(
            'category' => $columna['grado'],
            'first' => $columna['cant_grado']
        );
    }
}

//mysqli_close($conexion);

$json_pers_oficiales =json_encode($pers_oficiales, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$json_pers_suboficiales =json_encode($pers_suboficiales, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

//print_r($jsonPersonal);

/*$fp = fopen('geojson/data_unidades_ea.geojson', 'w');
fwrite($fp, $jsonData);
fclose($fp);
*/

?>

<!DOCTYPE html>
<html lang="en">
  <style>
    .formato {
      width: 100%;
      height: 500px;
      font-size: 15px;
    }
    div{
    border: 1px solid black;
    }
  </style>

  <div class="formato" id="chart_oficiales"></div>
  <div class="formato" id="chart_suboficiales"></div>

  <script src="../../plugins/chart.js/Chart.min.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/themes/moonrisekingdom.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

  <script>
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("chart_oficiales", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      var bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = <?php echo $json_pers_oficiales; ?>;

    createSeries("first", "Oficiales");

    function arrangeColumns() {
      var series = chart.series.getIndex(0);

      var w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        var delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          var middle = chart.series.length / 2;

          var newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          var visibleCount = newIndex;
          var newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            var trueIndex = chart.series.indexOf(series);
            var newIndex = series.dummyData;

            var dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }

    chart = am4core.create("chart_suboficiales", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    
    chart.data = <?php echo $json_pers_suboficiales; ?>;

    createSeries("first", "Suboficiales");
  </script>
</html>