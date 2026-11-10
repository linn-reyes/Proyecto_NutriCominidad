import footerHtml from '../partials/footer.html?raw';

// Carga el footer
document.querySelector('#footer-container').innerHTML = footerHtml;

const formulario = document.querySelector('.formulario');
const tipo = document.querySelector('#tipo');

// Página a la que va cada tipo de sesión
const destinos = {
  usuario: 'home.html',
  comercio: 'home-comercio.html',
  organizacion: 'home-organizacion.html'
};

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  window.location.href = destinos[tipo.value];
});