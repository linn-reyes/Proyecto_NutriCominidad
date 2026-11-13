import { cargarPartials } from './partials.js';
import { obtenerRecomendaciones } from './datos.js';

cargarPartials();

const contenedor = document.querySelector('#lista');
const mensajeVacio = document.querySelector('#mensaje-vacio');

async function mostrarRecomendaciones() {
  const recomendaciones = await obtenerRecomendaciones();

  if (recomendaciones.length === 0) {
    mensajeVacio.hidden = false;
    return;
  }

  recomendaciones.forEach((receta) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta';

    const titulo = document.createElement('h3');
    titulo.className = 'tarjeta__titulo';
    titulo.textContent = receta.Nombre_Receta;

    const costo = document.createElement('p');
    costo.className = 'tarjeta__texto';
    costo.textContent = `Costo estimado: $${receta.Costo} · ${receta.Porciones} porciones`;

    const ingredientes = document.createElement('p');
    ingredientes.className = 'tarjeta__texto';
    ingredientes.textContent = `Ingredientes: ${receta.Ingredientes.join(', ')}`;

    const enlace = document.createElement('a');
    enlace.className = 'tarjeta__enlace';
    enlace.href = `receta-detalle-cli.html?id=${receta.ID_Receta}`;
    enlace.textContent = 'Ver receta';

    tarjeta.append(titulo, costo, ingredientes, enlace);
    contenedor.appendChild(tarjeta);
  });
}

await mostrarRecomendaciones();