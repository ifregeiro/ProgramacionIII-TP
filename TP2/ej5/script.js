const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const edad = document.getElementById('edad');
const boton = document.getElementById('boton');

const errorNombre = document.getElementById('error-nombre');
const errorEmail = document.getElementById('error-email');
const errorEdad = document.getElementById('error-edad');

function validarEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
}

function limpiarErrores() {
    errorNombre.textContent = '';
    errorEmail.textContent = '';
    errorEdad.textContent = '';
}

boton.addEventListener('click', function(event) {
    event.preventDefault();
    limpiarErrores();
    let esValido = true;
    
    if (nombre.value.trim() === '') {
        mostrarError(errorNombre, 'El nombre es obligatorio');
        esValido = false;
    }
    
    if (email.value.trim() === '') {
        mostrarError(errorEmail, 'El mail es obligatorio');
        esValido = false;
    } else if (!validarEmail(email.value)) {
        mostrarError(errorEmail, 'El formato de mail no es válido');
        esValido = false;
    }
    
    if (edad.value.trim() === '') {
        mostrarError(errorEdad, 'La edad es obligatoria');
        esValido = false;
    } else if (isNaN(edad.value) || parseInt(edad.value) <= 18) {
        mostrarError(errorEdad, 'La edad debe ser un número mayor a 18');
        esValido = false;
    }
    
    if (esValido) {
        alert('Formulario enviado correctamente');
    }
});