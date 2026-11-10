const boton = document.querySelector('.header__toggle')
const menu = document.querySelector('.header__nav')
const enlaces = menu.querySelectorAll('.header__link')

function cambiarMenu(abrir) {
  menu.classList.toggle('header__nav--open', abrir)
  boton.classList.toggle('header__toggle--open', abrir)
  boton.setAttribute('aria-expanded', abrir)
  boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú')
}

boton.addEventListener('click', () => {
  const estaAbierto = menu.classList.contains('header__nav--open')
  cambiarMenu(!estaAbierto)
})

for (const enlace of enlaces) {
  enlace.addEventListener('click', () => cambiarMenu(false))
}

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    cambiarMenu(false)
  }
})