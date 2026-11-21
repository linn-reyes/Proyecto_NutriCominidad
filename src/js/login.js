import footerHtml from '../partials/footer.html?raw';
// Github del profe
import { api } from './api.js'
import { guardarSesion, obtenerUsuario } from './sesion.js'

if (obtenerUsuario()) location.replace('home.html')

const formulario = document.querySelector('#form-login')
const error = document.querySelector('#error-login')
const boton = formulario.querySelector('button')

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    error.hidden = true
    boton.disabled = true
    boton.textContent = 'Entrando...'

    try {
        const datos = Object.fromEntries(new FormData(formulario))
        const respuesta = await api.post('/api/auth/login', datos)

        guardarSesion(respuesta.token, respuesta.user)
        const inicioPorRol = {
          usuario: 'home.html',
          comercio: 'home-comercio.html',
          organizacion: 'home-organizacion.html',
        }
        location.href = inicioPorRol[respuesta.user.role] ?? 'home.html'
        
    } catch (e) {
        error.textContent = e.message
        error.hidden = false
    } finally {
        boton.disabled = false
        boton.textContent = 'Entrar'
    }
})

// Carga el footer
document.querySelector('#footer-container').innerHTML = footerHtml;

const tipo = document.querySelector('#tipo');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  window.location.href = destinos[tipo.value];
});