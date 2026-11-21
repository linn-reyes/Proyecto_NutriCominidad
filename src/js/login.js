import footerHtml from '../partials/footer.html?raw';
import { iniciarSesionLocal } from './datos.js';
import { guardarSesion, obtenerUsuario } from './sesion.js';
import { inicioPorRol } from './permisos.js';

document.querySelector('#footer-container').innerHTML = footerHtml;

// Si ya hay sesión, se va directo a SU inicio
const usuarioActual = obtenerUsuario();
if (usuarioActual && inicioPorRol[usuarioActual.role]) {
  location.replace(inicioPorRol[usuarioActual.role]);
}

const formulario = document.querySelector('#form-login');
const error = document.querySelector('#error-login');
const boton = formulario.querySelector('button');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  error.hidden = true;
  boton.disabled = true;
  boton.textContent = 'Entrando...';

  try {
    const datos = Object.fromEntries(new FormData(formulario));
    const respuesta = await iniciarSesionLocal(datos);

    const inicio = inicioPorRol[respuesta.user.role];
    if (!inicio) {
      throw new Error('Tu cuenta no tiene un rol válido.');
    }

    guardarSesion(respuesta.token, respuesta.user);
    location.href = inicio;
  } catch (e) {
    error.textContent = e.message;
    error.hidden = false;
  } finally {
    boton.disabled = false;
    boton.textContent = 'Iniciar Sesión';
  }
});