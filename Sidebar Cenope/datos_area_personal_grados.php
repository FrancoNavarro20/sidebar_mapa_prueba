<?php

require 'conexion_database.php';


$json = file_get_contents('php://input');
$data = json_decode($json);

if (!isset($data->cod_uni) || $data->cod_uni=="") {
    echo "";
    return;
}

if ($data->cod_uni=="TODOS") {
  $query_por_grados = "SELECT p.peso_grado,p.grado,COUNT(*) AS cant_grado FROM personal p GROUP BY p.peso_grado,p.grado";
   } else {
$query_por_grados = "SELECT p.peso_grado,p.grado,COUNT(*) AS cant_grado FROM personal p GROUP BY p.cod_unidad,p.peso_grado,p.grado having p.cod_unidad='".$data->cod_uni."'";
}


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

header('Content-Type: application/json');

//$return = (object) array("oficiales"=>$json_pers_oficiales,"suboficiales"=>$json_pers_suboficiales);

echo '{"oficiales":'.$json_pers_oficiales.',"suboficiales":'.$json_pers_suboficiales.'}';

/*$fp = fopen('geojson/data_unidades_ea.geojson', 'w');
fwrite($fp, $jsonData);
fclose($fp);
*/

?>