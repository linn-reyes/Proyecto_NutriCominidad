import { cargarPartials } from "./partials.js";
import {
  obtenerSolicitud,
  obtenerPreferencia,
  obtenerOrganizaciones,
  obtenerAlergias,
  obtenerSolicitudOrganizacion,
  obtenerEntrega,
  obtenerSolicitudesOrganizacion,
  obtenerInventario,
  obtenerDonacion,
  obtenerAlimentos
} from './datos.js';

cargarPartials();

const modulo = document.body.dataset.modulo;
const id = new URLSearchParams(window.location.search).get("id");
const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje-formulario");
const titulo = document.querySelector("#titulo");

const modulos = {
  solicitudes: {
    obtener: obtenerSolicitud,
    tituloEditar: "Editar solicitud",
    lista: "solicitudes-clientes.html",
  },
  preferencias: {
    obtener: obtenerPreferencia,
    tituloEditar: "Editar preferencia",
    lista: "preferencias-clientes.html",
  },
  "solicitudes-org": {
    obtener: obtenerSolicitudOrganizacion,
    tituloEditar: "Actualizar solicitud",
    lista: "solicitudes-org.html",
  },
  entregas: {
    obtener: obtenerEntrega,
    tituloEditar: "Editar entrega",
    lista: "entregas-org.html",
  },
    inventarios: {
    obtener: obtenerInventario,
    tituloEditar: "Editar producto",
    lista: "inventarios-com.html",
  },
  donaciones: {
    obtener: obtenerDonacion,
    tituloEditar: "Editar donación",
    lista: "donaciones-com.html",
  }
};

function mostrarMensaje(texto, esError) {
  mensaje.textContent = texto;
  mensaje.hidden = false;
  mensaje.classList.toggle("formulario__mensaje--error", esError);
  mensaje.classList.toggle("formulario__mensaje--exito", !esError);
}

async function cargarOrganizaciones() {
  const select = document.querySelector("#ID_Organizacion");
  if (!select) {
    return;
  }

  const organizaciones = await obtenerOrganizaciones();
  organizaciones.forEach((organizacion) => {
    const opcion = document.createElement("option");
    opcion.value = organizacion.ID_Organizacion;
    opcion.textContent = organizacion.Nombre_Org;
    select.appendChild(opcion);
  });
}

  async function cargarSolicitudesOrganizacion() {
  const select = document.querySelector('#ID_Solicitud');
  if (!select) {
    return;
  }
  
  const solicitudesOrg = await obtenerSolicitudesOrganizacion();
  solicitudesOrg.forEach((s) => {
    const opcion = document.createElement('option');
    opcion.value = s.ID_Solicitud;
    opcion.textContent = `#${s.ID_Solicitud} · ${s.Familia}`;
    select.appendChild(opcion);
  });
}

async function cargarAlimentos() {
  const select = document.querySelector("#ID_Alimento");
  if (!select) {
    return;
  }

  const alimentos = await obtenerAlimentos();
  alimentos.forEach((alimento) => {
    const opcion = document.createElement("option");
    opcion.value = alimento.ID_Alimento;
    opcion.textContent = `${alimento.Nombre_Alimento} (${alimento.Unidad_Medida})`;
    select.appendChild(opcion);
  });
}

// Llena cada campo cuyo name coincide con una columna del registro
function llenarFormulario(registro) {
  for (const campo of formulario.elements) {
    if (campo.name && registro[campo.name] !== undefined) {
      campo.value = registro[campo.name];
    }
  }
}

async function prepararEdicion() {
  if (!id) {
    return;
  }

  const config = modulos[modulo];
  const registro = await config.obtener(id);

  if (!registro) {
    mostrarMensaje("El registro no existe.", true);
    formulario.querySelector('button[type="submit"]').disabled = true;
    return;
  }

  titulo.textContent = config.tituloEditar;
  llenarFormulario(registro);

  if (modulo === "preferencias") {
    const alergias = await obtenerAlergias(registro.ID_Usuario);
    if (alergias.length > 0) {
      document.querySelector("#Nombre_Alergia").value =
        alergias[0].Nombre_Alergia;
    }
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // El navegador ya revisa required, min y minlength; aquí se revisan los espacios en blanco
  const vacios = [...formulario.elements].filter(
    (campo) => campo.required && campo.value.trim() === "",
  );

  if (vacios.length > 0) {
    mostrarMensaje("Completa todos los campos obligatorios.", true);
    vacios[0].focus();
    return;
  }

  // Aquí después irá la llamada a la API
  mostrarMensaje("Guardado correctamente. Regresando a la lista...", false);
  setTimeout(() => {
    window.location.href = modulos[modulo].lista;
  }, 1200);
});

async function iniciar() {
  await cargarOrganizaciones();
  await cargarSolicitudesOrganizacion();
  await cargarAlimentos();
  await prepararEdicion();
}

await iniciar();