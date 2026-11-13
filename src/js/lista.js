import { cargarPartials } from "./partials.js";
import {
  obtenerRecetas,
  obtenerSolicitudes,
  obtenerPreferencias,
  obtenerSolicitudesOrganizacion,
  obtenerEntregas,
  obtenerInventarios,
  obtenerDonaciones
} from './datos.js';

cargarPartials();

const modulo = document.body.dataset.modulo;
const lista = document.querySelector("#lista");
const mensajeVacio = document.querySelector("#mensaje-vacio");
const tabla = document.querySelector(".tabla");

// Qué datos y qué columnas usa cada módulo
const modulos = {
  recetas: {
    obtener: obtenerRecetas,
    id: "ID_Receta",
    detalle: "receta-detalle-cli.html",
    columnas: (receta) => [
      receta.Nombre_Receta,
      `${receta.Tiempo_Preparacion} min`,
      receta.Porciones,
      `$${receta.Costo}`,
    ],
  },
  solicitudes: {
    obtener: obtenerSolicitudes,
    id: "ID_Solicitud",
    detalle: "solicitud-detalle-cli.html",
    columnas: (solicitud) => [
      solicitud.Fecha_Solicitud,
      solicitud.Motivo,
      solicitud.Integrantes,
      solicitud.Prioridad,
      solicitud.Estado,
    ],
  },
  preferencias: {
    obtener: obtenerPreferencias,
    id: "ID_Preferencia",
    detalle: "preferencia-detalle-cli.html",
    columnas: (preferencia) => [
      preferencia.Tipo,
      preferencia.Descripcion,
      preferencia.Observaciones || "-",
    ],
  },
  "solicitudes-org": {
    obtener: obtenerSolicitudesOrganizacion,
    id: "ID_Solicitud",
    detalle: "solicitud-detalle-org.html",
    columnas: (s) => [
      s.Fecha_Solicitud,
      s.Familia,
      s.Integrantes,
      s.Prioridad,
      s.Estado,
    ],
  },
  entregas: {
    obtener: obtenerEntregas,
    id: "ID_Entrega",
    detalle: "entrega-detalle-org.html",
    columnas: (e) => [e.Fecha_Entrega, e.Responsable, e.Estado],
  },
    inventarios: {
    obtener: obtenerInventarios,
    id: "ID_Inventario",
    detalle: "inventario-detalle-com.html",
    columnas: (i) => [
      i.Nombre_Alimento,
      `${i.Cantidad} ${i.Unidad_Medida}`,
      i.Estado,
      i.Fecha_Actualizacion,
    ],
  },
  donaciones: {
    obtener: obtenerDonaciones,
    id: "ID_Donacion",
    detalle: "donacion-detalle-com.html",
    columnas: (d) => [d.Fecha_Donacion, d.Nombre_Org, d.Cantidad, d.Estado],
  }
};

async function mostrarLista() {
  const config = modulos[modulo];
  const registros = await config.obtener();

  if (registros.length === 0) {
    tabla.hidden = true;
    mensajeVacio.hidden = false;
    return;
  }

  registros.forEach((registro) => {
    const fila = document.createElement("tr");

    config.columnas(registro).forEach((valor) => {
      const celda = document.createElement("td");
      celda.textContent = valor;
      fila.appendChild(celda);
    });

    const celdaDetalle = document.createElement("td");
    const enlace = document.createElement("a");
    enlace.className = "tabla__enlace";
    enlace.href = `${config.detalle}?id=${registro[config.id]}`;
    enlace.textContent = "Ver";
    celdaDetalle.appendChild(enlace);
    fila.appendChild(celdaDetalle);

    lista.appendChild(fila);
  });
}

mostrarLista();
