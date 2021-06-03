<?php

require 'conexion_database.php';


if (!isset($_POST['cod_uni']) || $_POST['cod_uni']=="") {
    echo "";
    return;
}

$query_por_grados = "SELECT p.peso_grado,p.grado,COUNT(*) AS cant_grado FROM personal p GROUP BY p.cod_unidad,p.peso_grado,p.grado having p.cod_unidad='".$_POST['cod_uni']."'";

$result_por_grados = mysqli_query( $conexion, $query_por_grados ) or die ( "Algo ha ido mal en la consulta a la base de datos");

$personal = array();
$i=0;
while ($columna = mysqli_fetch_array($result_por_grados))
{
	$personal[] = array(
        'peso_grado' => $columna['peso_grado'],
        'grado' => $columna['grado'],
        'cant_grado' => $columna['cant_grado']
    );
}

mysqli_close($conexion);

print_r($personal);

/*$fp = fopen('geojson/data_unidades_ea.geojson', 'w');
fwrite($fp, $jsonData);
fclose($fp);
*/

?>