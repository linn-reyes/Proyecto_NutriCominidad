import headerHtml from '../partials/header.html?raw';
import footerHtml from '../partials/footer.html?raw';
import { obtenerUsuario, cerrarSesion } from './sesion.js';
import { paginaActual, puedeEntrar, inicioPorRol } from './permisos.js';

function protegerPagina() {
  const usuario = obtenerUsuario();

  // Sin sesión → al login
  if (!usuario) {
    location.replace('/login.html');
    return false;
  }

  // Rol desconocido que se borra la sesión
  const inicio = inicioPorRol[usuario.role];
  if (!inicio) {
    cerrarSesion();
    return false;
  }

  // Página de otro rol hacia su propio inicio
  if (!puedeEntrar(paginaActual(), usuario.role)) {
    location.replace(inicio);
    return false;
  }

  return true;
}

export function cargarPartials() {
  const permitido = protegerPagina();

  document.querySelector('#header-container').innerHTML = headerHtml;
  document.querySelector('#footer-container').innerHTML = footerHtml;

  document.querySelector('.header__salir').addEventListener('click', (evento) => {
    evento.preventDefault();
    cerrarSesion();
  });

  return permitido;
}