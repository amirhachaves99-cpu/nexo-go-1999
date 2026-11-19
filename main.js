// =========================================================
// "Base de datos" de mensajes de contacto usando localStorage
// =========================================================

const DB_KEY = 'nexogo_mensajes';

// Trae todos los mensajes guardados (o un array vacío si no hay nada aún)
function obtenerMensajes() {
    const datos = localStorage.getItem(DB_KEY);
    return datos ? JSON.parse(datos) : [];
}

// Guarda un mensaje nuevo en la lista
function guardarMensaje(nombre, email, mensaje) {
    const mensajes = obtenerMensajes();

    const nuevoMensaje = {
        id: Date.now(),
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        fecha: new Date().toLocaleString('es-UY')
    };

    mensajes.push(nuevoMensaje);
    localStorage.setItem(DB_KEY, JSON.stringify(mensajes));
}

// Borra todos los mensajes (útil para limpiar durante pruebas)
function borrarMensajes() {
    localStorage.removeItem(DB_KEY);
}

// =========================================================
// Conectar con el formulario de contacto
// =========================================================

const formulario = document.getElementById('contact-form');

if (formulario) {
    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        guardarMensaje(nombre, email, mensaje);

        alert('¡Gracias! Tu mensaje quedó guardado.');
        formulario.reset();

        console.log('Mensajes guardados hasta ahora:', obtenerMensajes());
    });
}
const form 