<?php

require 'conexion_database.php';


if (!isset($_POST['cod_uni']) || $_POST['cod_uni']=="") {
    echo "";
    return;
}

$query_todos = "SELECT * FROM personal p WHERE p.cod_unidad='".$_POST['cod_uni']."'";

$result_todos = mysqli_query( $conexion, $query_todos ) or die ( "Algo ha ido mal en la consulta a la base de datos");

$personal = array();
$i=0;
while ($columna = mysqli_fetch_array($result_todos))
{
	$personal[] = array(
		'dni' => $columna['dni'],
        'arma' => $columna['arma'],
        'grado' => $columna['grado'],
        'peso_grado' => $columna['peso_grado'],
        'apellido' => $columna['apellido'],
        'nombre' => $columna['nombre'],
        'fraccion_grado' => $columna['fraccion_grado'],
        'orden_merito' => $columna['orden_merito']
    );
}

mysqli_close($conexion);

$jsonPersonal =json_encode($personal, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

print_r($jsonPersonal);

/*$fp = fopen('geojson/data_unidades_ea.geojson', 'w');
fwrite($fp, $jsonData);
fclose($fp);
*/

?>