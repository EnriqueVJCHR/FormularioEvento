// Lista de países
const paises = [
    "México", "Argentina", "Colombia", "España", 
    "Chile", "Perú", "Ecuador", "Bolivia", "Uruguay", "Paraguay"
];

document.addEventListener('DOMContentLoaded', function() {
    const selectPais = document.getElementById('pais');

    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais.toLowerCase();
        option.textContent = pais;
        selectPais.appendChild(option);
    });
});

const formulario = document.getElementById('formularioEvento');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));

    let esValido = true;

    // --- Validaciones ---
    const nombre = document.getElementById('nombre');
    if (nombre.value.trim().length < 3) {
        mostrarError(nombre, 'El nombre debe tener al menos 3 letras');
        esValido = false;
    }

    const email = document.getElementById('email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        mostrarError(email, 'Email inválido');
        esValido = false;
    }

    const telefono = document.getElementById('telefono');
    if (!/^\d{10}$/.test(telefono.value)) {
        mostrarError(telefono, 'Debe tener 10 números');
        esValido = false;
    }

    const fecha = document.getElementById('fechaNacimiento');
    if (fecha.value) {
        const nacimiento = new Date(fecha.value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        if (edad < 18) {
            mostrarError(fecha, 'Debes ser mayor de 18 años');
            esValido = false;
        }
    } else {
        mostrarError(fecha, 'Ingresa tu fecha de nacimiento');
        esValido = false;
    }

    const pais = document.getElementById('pais');
    if (pais.value === "") {
        mostrarError(pais, 'Selecciona un país');
        esValido = false;
    }

    const tipoEntrada = document.querySelector('input[name="tipoEntrada"]:checked');
    const errorTipo = document.getElementById('errorTipoEntrada');
    if (!tipoEntrada) {
        errorTipo.textContent = "Debes elegir una entrada";
        esValido = false;
    }

    const archivo = document.getElementById('identificacion');
    if (archivo.files.length === 0) {
        mostrarError(archivo, 'Sube tu identificación');
        esValido = false;
    }

    if (esValido) {
        const mensaje = document.getElementById('mensajeExito');
        mensaje.innerHTML = `<strong>¡Registro Exitoso!</strong><br>Gracias ${nombre.value}.`;
        mensaje.classList.add('show');
        formulario.reset();
        setTimeout(() => mensaje.classList.remove('show'), 5000);
    }
});

function mostrarError(input, mensaje) {
    const idError = 'error' + input.id.charAt(0).toUpperCase() + input.id.slice(1);
    const span = document.getElementById(idError);
    if (span) span.textContent = mensaje;
    input.classList.add('error');
}
