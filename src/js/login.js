const formulario = document.querySelector('.formulario');
const tipo = document.querySelector('#tipo');

const destinos = {
  usuario: 'home.html',
  comercio: 'home-comercio.html',
  organizacion: 'home-organizacion.html'
};

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  window.location.href = destinos[tipo.value];
});