const formularioContactos = document.querySelector('#contacto')
listadoContactos = document.querySelector('#listado-contactos tbody'),
inputBuscador = document.querySelector('#buscar');


eventListeners();

function eventListeners(){
	// Cuando el formulario de crear o editar se ejecuta
	formularioContactos.addEventListener('submit',leerFormulario);

	//listener para eliminar 
	if(listadoContactos){
		listadoContactos.addEventListener('click',eliminarContacto);
	}

	//buscador
	inputBuscador.addEventListener('input',buscarContactos);

	numeroContactos();
}

function leerFormulario(e){
	e.preventDefault();
	// Leer los datos de los inputs
	const nombre = document.querySelector('#nombre').value
	empresa = document.querySelector('#empresa').value,
	telefono = document.querySelector('#telefono').value,
	accion = document.querySelector('#accion').value;

	if(nombre==='' || empresa==='' || telefono===''){
		//2 parametros texto y clase
		mostrarNotificacion('Todos los campos son obligatorios','error');
	}else{
		// pasa la validacion crer llamado a ajax
		const infoContacto = new FormData();
		infoContacto.append('nombre',nombre);
		infoContacto.append('empresa',empresa);
		infoContacto.append('telefono',telefono);
		infoContacto.append('accion',accion);
		// console.log(...infoContacto);
		if(accion==='crear'){
			//Crear un nuevo contacto
			insertarBD(infoContacto);
		}else{
			//editar el contacto
			//leer el id
			const idRegistro = document.querySelector('#id').value;
			infoContacto.append('id',idRegistro);
			actualizarRegistro(infoContacto);
		}
	}

}

// inserta en la base de datos via ajax
function insertarBD(datos){
	// llamado ajax

	//crear el objeto
	const xhr = new XMLHttpRequest();

	//abrir la conexion
	xhr.open('POST','inc/modelos/modelo-contactos.php',true);

	//pasar los datos
	xhr.onload=function(){
		if(this.status === 200){
			//leemos la respuesta de php
			const respuesta = JSON.parse(xhr.responseText);
			
			//inserta un nuevo elemento a la tabla
			const nuevoContacto = document.createElement('tr');
			nuevoContacto.innerHTML= `
			<td>${respuesta.datos.nombre}</td>
			<td>${respuesta.datos.empresa}</td>
			<td>${respuesta.datos.telefono}</td>
			`;

			//Crear contenedor para los botones
			const contenedorAcciones = document.createElement('td');

			//crear el icono de editar
			const iconoEditar = document.createElement('i');
			iconoEditar.classList.add('fas','fa-pen-square');

			//crea el enlace para editar
			const btnEditar = document.createElement('a');
			btnEditar.appendChild(iconoEditar);
			btnEditar.href=`editar.php?id=${respuesta.datos.id_insertado}`;
			btnEditar.classList.add('btn','btn-editar');

			//agregarlo al padre
			contenedorAcciones.appendChild(btnEditar);

			//crear el icono de eliminar
			const iconoEliminar = document.createElement('i');
			iconoEliminar.classList.add('fas','fa-trash-alt');

			//crear el boton d eliminar
			const btnEliminar = document.createElement('button');
			btnEliminar.appendChild(iconoEliminar);
			btnEliminar.setAttribute('data-id',respuesta.datos.id_insertado);
			btnEliminar.classList.add('btn','btn-borrar');

			//Agregarlo al padre
			contenedorAcciones.appendChild(btnEliminar);

			//Agregarlo al tr
			nuevoContacto.appendChild(contenedorAcciones);

			//agregarlo con los contactos
			listadoContactos.appendChild(nuevoContacto);

			//resetear el form
			formularioContactos.reset();

			//mostrara la notificacion
			mostrarNotificacion('Contacto Creado Correctamente!','correcto');

			//Actualizar el numero
			numeroContactos();

		}
	}

	//enviar los datos
	xhr.send(datos);
}

function actualizarRegistro(datos){
	//ajax
	const xhr = new XMLHttpRequest();
	xhr.open('POST','inc/modelos/modelo-contactos.php',true);
	xhr.onload=function(){
		if(this.status===200){
			// console.log(xhr.responseText);
			const respuesta = JSON.parse(xhr.responseText);
			if(respuesta.respuesta==='correcto'){
				mostrarNotificacion('Contacto Editado Correctamente','correcto');
			}else{
				//hubo un error
				mostrarNotificacion('Hubo un error....','error');
			}

			//Despues de 3 segundo redireccionar
			setTimeout(()=>{
				window.location.href='index.php';
			},4000);
		}
	}

	xhr.send(datos);
}


// Eliminar el contacto
function eliminarContacto(e){
	if(e.target.parentElement.classList.contains('btn-borrar')){
		//Tomar el id del contacto
		const id = e.target.parentElement.getAttribute('data-id');

		const respuesta = confirm("¿Estas Seguro(a)?");
		if(respuesta){
			//Llamado a ajax
			const xhr = new XMLHttpRequest();

			xhr.open('GET',`inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`,true);
			xhr.onload=function(){
				if(this.status===200){
					//console.log(xhr.responseText);
					const resultado = JSON.parse(xhr.responseText);
					if(resultado.respuesta==='correcto'){
						//Eliminar el registro del DOM
						// console.log(e.target.parentElement.parentElement.parentElement);
						e.target.parentElement.parentElement.parentElement.remove();

						//mostrar notificacion
						mostrarNotificacion('Contacto eliminado','correcto');

						//Actualizar el numero
						numeroContactos();
						
					}else{
						//mostrar notificacion
						mostrarNotificacion('Hubo un error...','error');
					}
					
				}
			}

			xhr.send();
		}
	}
}

// Notificaion en pantalla
function mostrarNotificacion(mensaje,clase){
	const notificacion = document.createElement('div');
	notificacion.classList.add(clase,'notificacion','sombra');
	notificacion.textContent=mensaje;

	//Formulario
	formularioContactos.insertBefore(notificacion,document.querySelector('form legend'));

	//Ocultar y mostrar la notificacion
	setTimeout(()=>{
		notificacion.classList.add('visible');
		setTimeout(()=>{
			notificacion.classList.remove('visible');

			setTimeout(()=>{
				notificacion.remove();
			},500);
		},3000);
	},100);

}

// Buscador de registros
function buscarContactos(e){
	const expresion = new RegExp(e.target.value,"i"),
	registros = document.querySelectorAll('tbody tr');

	registros.forEach(registro=>{
		 	registro.style.display= 'none'; //ocultar

		 	//console.log(registro.childNodes[1].textContent);
		 	// filtrar por nombre y buscar los espacios con expresion regular y dejar un espacio
		 	if(registro.childNodes[1].textContent.replace(/\s/g," ").search(expresion)!=-1){
		 		registro.style.display='table-row';
		 	}
		 	numeroContactos();

		 });
}

//Muestra el numero de contactos
function numeroContactos(){
	const totalContactos = document.querySelectorAll('tbody tr'),
	contenedorNumero = document.querySelector('.total-contactos span');
	// console.log(totalContactos.length);

	let total = 0;
	totalContactos.forEach(contacto=>{
		if(contacto.style.display==='' || contacto.style.display==='table-row'){
			total++;
		}
	});

	//console.log(total);
	contenedorNumero.textContent=total;
}