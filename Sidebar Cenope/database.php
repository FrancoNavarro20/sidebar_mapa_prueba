<?php

<<<<<<< HEAD
require 'conexion_database.php';

$consulta = "SELECT u.nodo,u.localidad,c.* FROM capa_sig_unidades_militares c INNER JOIN unidad u ON u.cod_unidad=c.cod_uni";

if (isset($_POST['cod_uni']) && $_POST['cod_uni']!="TODOS") {
    $consulta .= " WHERE c.cod_unisup='".$_POST['cod_uni']."'";
} else {
    $consulta .= " WHERE c.cod_uni is not null";
=======
$hostname = '10.190.16.50';
$username = 'iberti';
$password = 'iberti3421';
$database = 'BaseSIG';

$conexion = mysqli_connect( $hostname, $username, $password, $database) or die ("No se ha podido conectar al servidor de Base de datos");

mysqli_set_charset($conexion,"utf8");

if (isset($_POST['cod_uni']) && $_POST['cod_uni']!="TODOS") {
    $consulta = "SELECT * FROM capa_sig_unidades_militares WHERE cod_unisup='".$_POST['cod_uni']."'";
} else {
    $consulta = "SELECT * FROM capa_sig_unidades_militares";
>>>>>>> almiron
}

$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

$features = array();
$i=0;
while ($columna = mysqli_fetch_array($resultado))
{
	$features[] = array(
        'type' => 'Feature',
        'properties' => array('gid' => ++$i,
        			'fdc' => 'Ejército Argentino',
<<<<<<< HEAD
                    'sag' => 'IGN',
      				'fna' => $columna['abrev'],
                    'localidad' => $columna['localidad'],
                    'nodo' => $columna['nodo'],
                    'arma' => $columna['arma'],
=======
      				'fna' => $columna['abrev'],
>>>>>>> almiron
        			'cod_uni' => $columna['cod_uni'],
        			'cod_unisup' => $columna['cod_unisup']),
        'geometry' => array(
             'type' => 'Point', 
             'coordinates' => array(
                  $columna['lat'], 
                  $columna['lon']
             ),
         ),
    );
}

$geojson = array(
    'type' => 'FeatureCollection',
    'features' => $features,
);

mysqli_close($conexion);

$jsonData =json_encode($geojson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

//print_r($data);
print_r($jsonData);

/*$fp = fopen('geojson/data_unidades_ea.geojson', 'w');
fwrite($fp, $jsonData);
fclose($fp);
*/

?>
