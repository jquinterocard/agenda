<div class="campos">
	<div class="campo">
		<label for="nombre">Nombre:</label>
		<input type="text" id="nombre" placeholder="Nombre Contacto" value="<?=$contacto['nombre']??''?>">
	</div>

	<div class="campo">
		<label for="empresa">Empresa:</label>
		<input type="text" id="empresa" placeholder="Nombre Empresa" value="<?=$contacto['empresa']??''?>">
	</div>

	<div class="campo">
		<label for="telefono">Telefono:</label>
		<input type="tel" id="telefono" placeholder="Telefono Contacto" value="<?=$contacto['telefono']??''?>">
	</div>
</div>

<div class="campo enviar">
	<input type="hidden" id="accion" value="<?php echo isset($contacto['telefono'])?'editar':'crear'?>">
	<?php if(isset($contacto['id'])): ?>
		<input type="hidden" id="id" value="<?=$contacto['id'];?>">
	<?php endif; ?>
	<input type="submit" value="<?php echo isset($contacto['telefono'])?'Guardar':'Añadir'?>">
</div>