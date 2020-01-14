<?php 
include 'inc/funciones/funciones.php';
include 'inc/layout/header.php';
?>

<div class="contenedor-barra">
	<h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
	<form id="contacto" action="#">
		<legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>
		<?php include 'inc/layout/formulario.php'; ?>
	</form>
</div>

<div class="bg-blanco contenedor sombra contactos">
	<div class="contenedor-contactos">
		<h2>Contactos</h2>
		<input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contactos...">
		<p class="total-contactos"><span></span> Contactos</p>

		<div class="contenedor-tabla">
			<table id="listado-contactos" class="listado-contactos">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Empresa</th>
						<th>Telefono</th>
						<th>Acciones</th>

						

					</tr>
				</thead>
				<tbody>
					<?php 
					$contactos = obtenerContactos();
					if($contactos->num_rows): ?>
						<?php foreach($contactos as $contacto): ?>
							<tr>
								<td><?=$contacto['nombre'];?></td>
								<td><?=$contacto['empresa'];?></td>
								<td><?=$contacto['telefono'];?></td>
								<td>
									<a class="btn-editar btn" href="editar.php?id=<?=$contacto['id'];?>">
										<i class="fas fa-pen-square"></i>
									</a>
									<button data-id="<?=$contacto['id'];?>" type="button" class="btn-borrar btn">
										<i class="fas fa-trash-alt"></i>
									</button>
								</td>
							</tr>
						<?php endforeach; ?>	
					<?php endif; ?>
				</tbody>
			</table>
		</div>
	</div>
</div>

<?php include 'inc/layout/footer.php'; ?>
