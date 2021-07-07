<?php

require 'conexion_database.php';

//$_POST['cod_uni']="U3448";
if (!isset($_POST['cod_uni'])) {
    return;
}

if ($_POST['cod_uni']=="TODOS") {
    $consulta = "SELECT u.nodo,u.localidad,c.* FROM capa_sig_unidades_militares c
        INNER JOIN unidad u ON u.cod_unidad=c.cod_uni";

    $resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos");

    $features = array();
    $i=0;
    while ($columna = mysqli_fetch_array($resultado))
    {
        $features[] = array(
            'type' => 'Feature',
            'properties' => array('gid' => ++$i,
                'fdc' => 'Ejército Argentino',
                'sag' => 'IGN',
                'cod_uni' => $columna['cod_uni'],
                'fna' => $columna['abrev'],
                'localidad' => $columna['localidad']),
            'geometry' => array(
                 'type' => 'Point', 
                 'coordinates' => array(
                      $columna['lat'], 
                      $columna['lon']
                 ),
             ),
        );
    }
} else {
    //$consulta .= " WHERE (c.cod_uni='".$_POST['cod_uni']."' or c.cod_unisup='".$_POST['cod_uni']."') AND c.cod_uni like 'U%' order by c.cod_uni desc";
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
    $features = array();
    $i=0;
    
    while ($columna = mysqli_fetch_array($resultado))
    {
        $total = explode(",", $columna['result']);
        for ($i=0; $i <= 3; $i++) { 
            $uni = explode("/", $total[$i]);
            if ($uni[0]!="") {
                if (!in_array($uni[0], $unidades)) {
                    array_push($unidades, $uni[0]);
                    if ($_POST['cod_uni']=="Y0001") {
                        $uni[3]="";
                        $uni[4]="";
                    }
                    $features[] = array(
                        'type' => 'Feature',
                        'properties' => array('gid' => ++$i,
                            'fdc' => 'Ejército Argentino',
                            'sag' => 'IGN',
                            'cod_uni' => $uni[0],
                            'fna' => $uni[1],
                            'localidad' => $uni[2]),
                        'geometry' => array(
                            'type' => 'Point', 
                            'coordinates' => array(
                                $uni[3], 
                                $uni[4]
                            ),
                         ),
                    );
                }
            }
        }
    }
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
