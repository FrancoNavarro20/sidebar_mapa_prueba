<?php

require 'conexion_database.php';

//$_POST['cod_uni'] = "U3448";
//$_POST['tipo_personal'] = "Soldados";
if (!isset($_POST['cod_uni']) || $_POST['cod_uni']=="") {
  echo "";
  return;
}
?>

<table id="tabla_personal" class="table table-hover">
    <thead>
        <th style="text-align:center;">Destino</th>
        <th style="text-align:center;">Grado</th>
        <th style="text-align:center;">Arma</th>
        <th style="text-align:left;">Apellido y Nombre</th>
        <th style="text-align:center;">DNI</th>
    </thead>
    <tbody>

<?php
$consulta = "SELECT concat(COALESCE(u.cod_unidad,''),'/',COALESCE(rtrim(u.abreviatura),''),'/',COALESCE(rtrim(u.localidad),''),'/',COALESCE(u.lat,''),'/',COALESCE(u.lon,''),','
  ,COALESCE(u2.cod_unidad,''),'/',COALESCE(rtrim(u2.abreviatura),''),'/',COALESCE(rtrim(u2.localidad),''),'/',COALESCE(u2.lat,''),'/',COALESCE(u2.lon,''),','
  ,COALESCE(u3.cod_unidad,''),'/',COALESCE(rtrim(u3.abreviatura),''),'/',COALESCE(rtrim(u3.localidad),''),'/',COALESCE(u3.lat,''),'/',COALESCE(u3.lon,''),','
  ,COALESCE(u4.cod_unidad,''),'/',COALESCE(rtrim(u4.abreviatura),''),'/',COALESCE(rtrim(u4.localidad),''),'/',COALESCE(u4.lat,''),'/',COALESCE(u4.lon,''),','
  ,COALESCE(u5.cod_unidad,''),'/',COALESCE(rtrim(u5.abreviatura),''),'/',COALESCE(rtrim(u5.localidad),''),'/',COALESCE(u5.lat,''),'/',COALESCE(u5.lon,'')) as result FROM unidad u
  LEFT JOIN unidad AS u2 ON u2.cod_unisup = u.cod_unidad AND (u2.cod_unidad like 'U%' OR u2.cod_unidad like 'X%' OR u2.cod_unidad like 'Y%')
  LEFT JOIN unidad AS u3 ON u3.cod_unisup = u2.cod_unidad AND (u3.cod_unidad like 'U%' OR u3.cod_unidad like 'X%' OR u3.cod_unidad like 'Y%')
  LEFT JOIN unidad AS u4 ON u4.cod_unisup = u3.cod_unidad AND (u4.cod_unidad like 'U%' OR u4.cod_unidad like 'X%' OR u4.cod_unidad like 'Y%')
  LEFT JOIN unidad AS u5 ON u5.cod_unisup = u4.cod_unidad AND (u5.cod_unidad like 'U%' OR u5.cod_unidad like 'X%' OR u5.cod_unidad like 'Y%')
  WHERE u.cod_unidad='".$_POST['cod_uni']."' 
  AND (u.cod_unidad like 'U%' OR u.cod_unidad like 'X%' OR u.cod_unidad like 'Y%')
  order by u.abreviatura desc";

$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

$unidades = array();
$pers_oficiales = array();
$pers_suboficiales = array();
$pers_soldados = array();
while ($columna = mysqli_fetch_array($resultado))
{
  $total = explode(",", $columna['result']);
  for ($i=0; $i <= 3; $i++) { 
    $uni = explode("/", $total[$i]);
    if ($uni[0]!="") {
      if (!in_array($uni[0], $unidades)) {
        array_push($unidades, $uni[0]);
        $query_todos = "SELECT u.abreviatura,p.* FROM personal p
        INNER JOIN unidad u ON u.cod_unidad=p.cod_unidad WHERE p.cod_unidad='".$uni[0]."'";
        switch ($_POST['tipo_personal']) {
          case 'Oficiales':
            $query_todos = $query_todos." AND p.peso_grado>0 AND p.peso_grado<=1600";
            break;
          case 'Suboficiales':
            $query_todos = $query_todos." AND p.peso_grado>1600";
            break;
          case 'Soldados':
            $query_todos = "SELECT u.abreviatura,p.*,p.categoria as arma,p.grado as peso_grado,p.fecha_ingreso as fraccion_grado,p.apellido as orden_merito
            FROM personal_ssvv p
            INNER JOIN unidad u ON u.cod_unidad=p.cod_unidad
            WHERE p.cod_unidad='".$uni[0]."'";
            break;
        }
        $query_todos = $query_todos." ORDER BY peso_grado,fraccion_grado,orden_merito";

        $result_todos = mysqli_query( $conexion, $query_todos ) or die ( "Algo ha ido mal en la consulta a la base de datos");
        while ($columna = mysqli_fetch_array($result_todos))
        {
          ?>
          <tr>
            <td style="text-align:center;">
                <?php echo $columna['abreviatura']; ?>
            </td>
            <td style="text-align:center;">
                <?php echo $columna['grado']; ?>
            </td>
            <td style="text-align:center;">
                <?php echo $columna['arma']; ?>
            </td>
            <td style="text-align:left;">
                <?php echo strtoupper($columna['apellido'])." ".ucwords($columna['nombre']); ?>
            </td>
            <td style="text-align:center;">
                <?php echo $columna['dni']; ?>
            </td>
          </tr>
        <?php
        }
      }
    }
  }
}
?>
  </tbody>
</table>
<script>
  $("#div_modal_listado_personal #tabla_personal").ready( function () {
    $('#tabla_personal').DataTable({
      columnDefs:[{
            targets: "_all",
            sortable: false
        }],
      "language": {
        "url": "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json"
      }
    });
  });
</script>

<?php
mysqli_close($conexion);
?>