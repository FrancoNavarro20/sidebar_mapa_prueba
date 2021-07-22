<?php

require 'conexion_database.php';

//$_POST['cod_uni'] = "U3448";
//$_POST['tipo_personal'] = "Soldados";
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
    case 'Soldados':
        $query_todos = "SELECT *,p.categoria as arma,p.grado as peso_grado,p.fecha_ingreso as fraccion_grado,p.apellido as orden_merito FROM personal_ssvv p WHERE p.cod_unidad='".$_POST['cod_uni']."'";
        break;
}
$query_todos = $query_todos." ORDER BY peso_grado,fraccion_grado,orden_merito";

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
            <?php echo strtoupper($columna['apellido'])." ".ucwords($columna['nombre']); ?>
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