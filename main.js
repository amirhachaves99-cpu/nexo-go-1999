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
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
  const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatus = document.getElementById("form-status");

  const validators = {
    name: (val) => {
      if (!val.trim()) return "Ingresá tu nombre.";
      if (val.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
      return "";
    },
    email: (val) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val.trim()) return "Ingresá tu correo electrónico.";
      if (!emailRegex.test(val.trim())) return "Ingresá un correo válido.";
      return "";
    },
    message: (val) => {
      if (!val.trim()) return "Escribí un mensaje.";
      if (val.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      return "";
    }
  };

  function validateField(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    const message = validators[input.id] ? validators[input.id](input.value) : "";
    if (errorEl) errorEl.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    return !message;
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [nameInput, emailInput, messageInput].filter(Boolean);
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      if (formStatus) formStatus.textContent = "Revisá los campos marcados antes de enviar.";
      return;
    }

    if (formStatus) formStatus.textContent = "¡Formulario válido! Mensaje listo para enviar.";
    contactForm.reset();
    fields.forEach((f) => f.classList.remove("invalid"));
  });
}
}