<?php

require 'conexion_database.php';

//$_POST['cod_uni'] = "U3448";
//$_POST['tipo_personal'] = "Suboficiales";
if (!isset($_POST['cod_uni']) || $_POST['cod_uni']=="") {
    echo "";
    return;
}

$query_todos = "SELECT * FROM personal p WHERE p.cod_unidad='".$_POST['cod_uni']."'";
switch ($_POST['tipo_personal']) {
    case 'Oficiales':
        $query_todos = $query_todos." AND p.peso_grado>0 AND p.peso_grado<=1600";
        break;
    case 'Suboficiales':
        $query_todos = $query_todos." AND p.peso_grado>1600";
        break;
}
$query_todos = $query_todos." ORDER BY p.peso_grado,p.fraccion_grado,p.orden_merito";

$result_todos = mysqli_query( $conexion, $query_todos ) or die ( "Algo ha ido mal en la consulta a la base de datos");

$personal = array();
$i=0;

?>
<table class="table table-hover">
    <thead>
        <th style="text-align:center;">Grado</th>
        <th style="text-align:center;">Arma</th>
        <th style="text-align:left;">Apellido y Nombre</th>
        <th style="text-align:center;">DNI</th>
    </thead>
    <tbody>
        <?php
while ($columna = mysqli_fetch_array($result_todos))
{
    ?>
    <tr>
        <td style="text-align:center;">
            <?php echo $columna['grado']; ?>
        </td>
        <td style="text-align:center;">
            <?php echo $columna['arma']; ?>
        </td>
        <td style="text-align:left;">
            <?php echo  $columna['apellido']." ".$columna['nombre']; ?>
        </td>
        <td style="text-align:center;">
            <?php echo $columna['dni']; ?>
        </td>
    </tr>
<?php
}
?>
    </tbody>
</table
<?php
mysqli_close($conexion);
?>