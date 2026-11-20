import { cargarPartials } from "./partials.js";
import {
  obtenerReceta,
  obtenerSolicitud,
  obtenerPreferencia,
  obtenerIngredientes,
  obtenerAlergias,
  obtenerSolicitudOrganizacion,
  obtenerEntrega,
  obtenerInventario,
  obtenerDonacion,
  obtenerDonacionRecibida,
  obtenerDetallesDonacion,
  confirmarRecepcion,
} from "./datos.js";

cargarPartials();

const modulo = document.body.dataset.modulo;
const id = new URLSearchParams(window.location.search).get("id");

// Qué dato se consulta y qué campos se muestran en cada módulo
const modulos = {
  recetas: {
    obtener: obtenerReceta,
    titulo: (receta) => receta.Nombre_Receta,
    campos: (receta) => [
      ["Descripción", receta.Descripcion],
      ["Tiempo de preparación", `${receta.Tiempo_Preparacion} minutos`],
      ["Porciones", receta.Porciones],
      ["Costo estimado", `$${receta.Costo}`],
    ],
  },
  solicitudes: {
    obtener: obtenerSolicitud,
    titulo: (solicitud) => `Solicitud del ${solicitud.Fecha_Solicitud}`,
    campos: (solicitud) => [
      ["Organización", solicitud.Nombre_Org],
      ["Motivo", solicitud.Motivo],
      ["Integrantes", solicitud.Integrantes],
      ["Prioridad", solicitud.Prioridad],
      ["Estado", solicitud.Estado],
    ],
  },
  preferencias: {
    obtener: obtenerPreferencia,
    titulo: (preferencia) => `Preferencia: ${preferencia.Tipo}`,
    campos: (preferencia) => [
      ["Tipo", preferencia.Tipo],
      ["Descripción", preferencia.Descripcion],
      ["Observaciones", preferencia.Observaciones || "Sin observaciones"],
    ],
  },
  "solicitudes-org": {
    obtener: obtenerSolicitudOrganizacion,
    titulo: (s) => `Solicitud de ${s.Familia}`,
    campos: (s) => [
      ["Fecha", s.Fecha_Solicitud],
      ["Motivo", s.Motivo],
      ["Integrantes", s.Integrantes],
      ["Prioridad", s.Prioridad],
      ["Estado", s.Estado],
    ],
  },
  entregas: {
    obtener: obtenerEntrega,
    titulo: (e) => `Entrega del ${e.Fecha_Entrega}`,
    campos: (e) => [
      ["Solicitud", `#${e.ID_Solicitud}`],
      ["Responsable", e.Responsable],
      ["Estado", e.Estado],
      ["Observaciones", e.Observaciones || "Sin observaciones"],
    ],
  },
  inventarios: {
    obtener: obtenerInventario,
    titulo: (i) => i.Nombre_Alimento,
    campos: (i) => [
      ["Cantidad disponible", `${i.Cantidad} ${i.Unidad_Medida}`],
      ["Estado", i.Estado],
      ["Última actualización", i.Fecha_Actualizacion],
    ],
  },
  donaciones: {
    obtener: obtenerDonacion,
    titulo: (d) => `Donación del ${d.Fecha_Donacion}`,
    campos: (d) => [
      ["Organización", d.Nombre_Org],
      ["Cantidad total", d.Cantidad],
      ["Estado", d.Estado],
      ["Observaciones", d.Observaciones || "Sin observaciones"],
    ],
  },
  "donaciones-org": {
    obtener: obtenerDonacionRecibida,
    titulo: (d) => `Donación de ${d.Nombre_Comercio}`,
    campos: (d) => [
      ["Fecha", d.Fecha_Donacion],
      ["Comercio", d.Nombre_Comercio],
      ["Cantidad total", d.Cantidad],
      ["Estado", d.Estado],
      ["Observaciones", d.Observaciones || "Sin observaciones"],
    ],
  }
};

function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

async function mostrarIngredientes() {
  const ingredientes = await obtenerIngredientes(id);

  if (ingredientes.length === 0) {
    document.querySelector("#seccion-ingredientes .tabla").hidden = true;
    document.querySelector("#mensaje-sin-ingredientes").hidden = false;
    return;
  }

  const cuerpo = document.querySelector("#ingredientes");
  ingredientes.forEach((ingrediente) => {
    const fila = document.createElement("tr");
    fila.append(
      crearCelda(ingrediente.Nombre_Alimento),
      crearCelda(ingrediente.Cantidad),
      crearCelda(ingrediente.Unidad_Medida),
    );
    cuerpo.appendChild(fila);
  });
}

async function mostrarAlergias(idUsuario) {
  const alergias = await obtenerAlergias(idUsuario);

  if (alergias.length === 0) {
    document.querySelector("#mensaje-sin-alergias").hidden = false;
    return;
  }

  const lista = document.querySelector("#alergias");
  alergias.forEach((alergia) => {
    const item = document.createElement("li");
    item.textContent = alergia.Nombre_Alergia;
    lista.appendChild(item);
  });
}

function pintarDatos(config, registro) {
  const datos = document.querySelector("#datos");
  datos.replaceChildren();
  config.campos(registro).forEach(([etiqueta, valor]) => {
    const dt = document.createElement("dt");
    dt.textContent = etiqueta;
    const dd = document.createElement("dd");
    dd.textContent = valor;
    datos.append(dt, dd);
  });
}

async function mostrarDetalle() {
  const config = modulos[modulo];
  const registro = await config.obtener(id);

  if (!registro) {
    document.querySelector("#mensaje-no-existe").hidden = false;
    document.querySelectorAll(".detalle").forEach((seccion) => {
      seccion.hidden = true;
    });
    return;
  }

  if (modulo === "donaciones-org") {
  await mostrarAlimentosDonados();
  prepararConfirmacion(config, registro);
  }

  document.querySelector("#titulo").textContent = config.titulo(registro);

  pintarDatos(config, registro);
  };

  async function mostrarAlimentosDonados() {
  const alimentos = await obtenerDetallesDonacion(id);

  if (alimentos.length === 0) {
    document.querySelector("#seccion-alimentos .tabla").hidden = true;
    document.querySelector("#mensaje-sin-alimentos").hidden = false;
    return;
  }

  const cuerpo = document.querySelector("#alimentos-donados");
  alimentos.forEach((alimento) => {
    const fila = document.createElement("tr");
    fila.append(
      crearCelda(alimento.Nombre_Alimento),
      crearCelda(alimento.Cantidad),
      crearCelda(alimento.Unidad_Medida),
    );
    cuerpo.appendChild(fila);
  });
}

function prepararConfirmacion(config, registro) {
  if (registro.Estado !== "Pendiente") {
    return; // si ya se entregó, el botón se queda oculto
  }

  const boton = document.querySelector("#boton-confirmar");
  boton.hidden = false;

  boton.addEventListener("click", async () => {
    const actualizada = await confirmarRecepcion(id);
    pintarDatos(config, actualizada);
    boton.hidden = true;
    document.querySelector("#mensaje-confirmado").hidden = false;
  });
}

  // El botón Editar lleva el mismo id al formulario
  const botonEditar = document.querySelector("#boton-editar");
  if (botonEditar) {
    botonEditar.href = `${botonEditar.getAttribute("href")}?id=${id}`;
  }

  if (modulo === "recetas") {
    await mostrarIngredientes();
  }
  if (modulo === "preferencias") {
    await mostrarAlergias(registro.ID_Usuario);
  }

await mostrarDetalle();
