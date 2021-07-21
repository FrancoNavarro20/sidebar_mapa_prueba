<?php

require 'conexion_database.php';

$json = file_get_contents('php://input');
$data = json_decode($json);

//$data->cod_uni = "U3448";

if (!isset($data->cod_uni) || $data->cod_uni=="") {
    echo "";
    return;
}

if ($data->cod_uni=="TODOS") {
  // $query_por_grados = "SELECT p.peso_grado,p.grado,COUNT(*) AS cant_grado FROM personal p GROUP BY p.peso_grado,p.grado";
  $query_por_grados = "SELECT peso_grado,grado,sum(cant_grado) cant_grado
  FROM (
  SELECT p.peso_grado peso_grado,p.grado grado,COUNT(*) AS cant_grado FROM personal p 
  GROUP BY p.peso_grado,p.grado
  UNION
  SELECT p.categoria peso_grado, p.grado grado,COUNT(*) AS cant_grado FROM personal_ssvv p 
  GROUP BY p.categoria, p.grado
  ) unidades
  GROUP BY peso_grado,grado
  ORDER BY CAST(`peso_grado` AS UNSIGNED),grado";

  $result_por_grados = mysqli_query( $conexion, $query_por_grados ) or die ( "Algo ha ido mal en la consulta a la base de datos");

  $pers_oficiales = array();
  $pers_suboficiales = array();
  $pers_soldados = array();
  $i=0;
  while ($columna = mysqli_fetch_array($result_por_grados))
  {
    $peso = (int)$columna['peso_grado'];
    if ($peso>0 && $peso<=1600) {
      $pers_oficiales[] = array(
        'peso_grado' => $columna['peso_grado'],
        'category' => $columna['grado'],
        'first' => $columna['cant_grado']
      );
    } else if ($peso>1600 && $peso<3000) {
      $pers_suboficiales[] = array(
        'peso_grado' => $columna['peso_grado'],
        'category' => $columna['grado'],
        'first' => $columna['cant_grado']
      );
    } else {
      $pers_soldados[] = array(
        'peso_grado' => $columna['peso_grado'],
        'category' => $columna['grado'],
        'first' => $columna['cant_grado']
      );
    }
  }
} else {
  //$query_por_grados = "SELECT p.peso_grado,p.grado,COUNT(*) AS cant_grado FROM personal p GROUP BY p.cod_unidad,p.peso_grado,p.grado having p.cod_unidad='".$data->cod_uni."'";

  $consulta = "SELECT concat(COALESCE(u.cod_unidad,''),'/',COALESCE(rtrim(u.abreviatura),''),'/',COALESCE(rtrim(u.localidad),''),'/',COALESCE(u.lat,''),'/',COALESCE(u.lon,''),','
    ,COALESCE(u2.cod_unidad,''),'/',COALESCE(rtrim(u2.abreviatura),''),'/',COALESCE(rtrim(u2.localidad),''),'/',COALESCE(u2.lat,''),'/',COALESCE(u2.lon,''),','
    ,COALESCE(u3.cod_unidad,''),'/',COALESCE(rtrim(u3.abreviatura),''),'/',COALESCE(rtrim(u3.localidad),''),'/',COALESCE(u3.lat,''),'/',COALESCE(u3.lon,''),','
    ,COALESCE(u4.cod_unidad,''),'/',COALESCE(rtrim(u4.abreviatura),''),'/',COALESCE(rtrim(u4.localidad),''),'/',COALESCE(u4.lat,''),'/',COALESCE(u4.lon,''),','
    ,COALESCE(u5.cod_unidad,''),'/',COALESCE(rtrim(u5.abreviatura),''),'/',COALESCE(rtrim(u5.localidad),''),'/',COALESCE(u5.lat,''),'/',COALESCE(u5.lon,'')) as result FROM unidad u
    LEFT JOIN unidad AS u2 ON u2.cod_unisup = u.cod_unidad AND (u2.cod_unidad like 'U%' OR u2.cod_unidad like 'X%' OR u2.cod_unidad like 'Y%' OR u2.cod_unidad like 'Z%')
    LEFT JOIN unidad AS u3 ON u3.cod_unisup = u2.cod_unidad AND (u3.cod_unidad like 'U%' OR u3.cod_unidad like 'X%' OR u3.cod_unidad like 'Y%' OR u3.cod_unidad like 'Z%')
    LEFT JOIN unidad AS u4 ON u4.cod_unisup = u3.cod_unidad AND (u4.cod_unidad like 'U%' OR u4.cod_unidad like 'X%' OR u4.cod_unidad like 'Y%' OR u4.cod_unidad like 'Z%')
    LEFT JOIN unidad AS u5 ON u5.cod_unisup = u4.cod_unidad AND (u5.cod_unidad like 'U%' OR u5.cod_unidad like 'X%' OR u5.cod_unidad like 'Y%' OR u5.cod_unidad like 'Z%')
    WHERE u.cod_unidad='".$data->cod_uni."' 
    AND (u.cod_unidad like 'U%' OR u.cod_unidad like 'X%' OR u.cod_unidad like 'Y%' OR u.cod_unidad like 'Z%')
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
                  $query_por_grados = "SELECT peso_grado,grado,sum(cant_grado) cant_grado
                    FROM (
                    SELECT p.peso_grado peso_grado,p.grado grado,COUNT(*) AS cant_grado FROM personal p 
                    GROUP BY p.cod_unidad,p.peso_grado,p.grado
                    having p.cod_unidad='".$uni[0]."'
                    UNION
                    SELECT p.categoria peso_grado, p.grado grado,COUNT(*) AS cant_grado FROM personal_ssvv p 
                    GROUP BY p.cod_unidad,p.grado
                    having p.cod_unidad='".$uni[0]."'
                    ) unidades
                    GROUP BY peso_grado,grado
                    ORDER BY CAST(`peso_grado` AS UNSIGNED),grado";

                  $result_por_grados = mysqli_query( $conexion, $query_por_grados ) or die ( "Algo ha ido mal en la consulta a la base de datos");

                  while ($columna = mysqli_fetch_array($result_por_grados))
                  {
                    $peso = (int)$columna['peso_grado'];
                    if ($peso>0 && $peso<=1600) {
                      $pers_oficiales[] = array(
                        'peso_grado' => $columna['peso_grado'],
                        'category' => $columna['grado'],
                        'first' => $columna['cant_grado']
                      );
                    } else if ($peso>1600 && $peso<3000) {
                      $pers_suboficiales[] = array(
                        'peso_grado' => $columna['peso_grado'],
                        'category' => $columna['grado'],
                        'first' => $columna['cant_grado']
                      );
                    } else {
                      $pers_soldados[] = array(
                        'peso_grado' => $columna['peso_grado'],
                        'category' => $columna['grado'],
                        'first' => $columna['cant_grado']
                      );
                    }
                  }
              }
          }
      }
  }
}

//mysqli_close($conexion);

$json_pers_oficiales =json_encode($pers_oficiales, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$json_pers_suboficiales =json_encode($pers_suboficiales, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$json_pers_soldados =json_encode($pers_soldados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

header('Content-Type: application/json');

//$return = (object) array("oficiales"=>$json_pers_oficiales,"suboficiales"=>$json_pers_suboficiales);

echo '{"oficiales":'.$json_pers_oficiales.',"suboficiales":'.$json_pers_suboficiales.',"soldados":'.$json_pers_soldados.'}';

/*$fp = fopen('geojson/data_unidades_ea.geojson', 'w');
fwrite($fp, $jsonData);
fclose($fp);
*/

?>