<table class="table table-hover">
	<thead>
		<th style="text-align:center;">Grado</th>
		<th style="text-align:left;">Apellido y Nombre</th>
		<th style="text-align:left;">DNI</th>
	</thead>
	<tbody>
		<?php
			foreach ($listado_personal as $value) { ?>
			<td style="text-align:center;">
				<?php echo $value->grado; ?>
			</td>
			<td style="text-align:left;">
				<?php echo $value->apellido_nombre; ?>
			</td>
			<td style="text-align:left;">
				<?php echo $value->dni; ?>
			</td>
		<?php
			}
		?>
	</tbody>
</table>