<?php

$hostname = '10.190.16.50';
$username = 'iberti';
$password = 'iberti3421';
$database = 'BaseSIG';

$conexion = mysqli_connect( $hostname, $username, $password, $database) or die ("No se ha podido conectar al servidor de Base de datos");

mysqli_set_charset($conexion,"utf8");

?>