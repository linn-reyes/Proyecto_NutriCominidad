import { cargarPartials } from "./partials.js";
import {
  obtenerSolicitud,
  obtenerPreferencia,
  obtenerOrganizaciones,
  obtenerSolicitudOrganizacion,
  obtenerEntrega,
  obtenerSolicitudesOrganizacion,
  obtenerInventario,
  obtenerDonacion,
  obtenerAlimentos,
  obtenerBeneficiario,
  obtenerColonias,
  obtenerLote,
  obtenerInventarios,
  obtenerLotes,
  obtenerAlimento,
  obtenerCategoria,
  obtenerCategorias,
  obtenerReceta,
  obtenerIngredientes,
  obtenerAlergia,
  eliminarAlergia
} from "./datos.js";

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
  beneficiarios: {
    obtener: obtenerBeneficiario,
    tituloEditar: "Editar familia",
    lista: "beneficiarios-org.html",
  },
  donaciones: {
    obtener: obtenerDonacion,
    tituloEditar: "Editar donación",
    lista: "donaciones-com.html",
  },
  lotes: {
    obtener: obtenerLote,
    tituloEditar: "Editar lote",
    lista: "lotes-com.html",
    validar: validarLote,
  },
  "alimentos-admin": {
    obtener: obtenerAlimento,
    tituloEditar: "Editar alimento",
    lista: "alimentos-admin.html",
  },
  "categorias-admin": {
    obtener: obtenerCategoria,
    tituloEditar: "Editar categoría",
    lista: "categorias-admin.html",
  },
    "recetas-admin": {
    obtener: obtenerReceta,
    tituloEditar: "Editar receta",
    lista: "recetas-admin.html",
    validar: validarReceta,
  },
    alergias: {
    obtener: obtenerAlergia,
    tituloEditar: "Editar alergia",
    lista: "alergias-cli.html",
    eliminar: eliminarAlergia,
  },
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
  const select = document.querySelector("#ID_Solicitud");
  if (!select) {
    return;
  }

  const solicitudesOrg = await obtenerSolicitudesOrganizacion();
  solicitudesOrg.forEach((s) => {
    const opcion = document.createElement("option");
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

async function cargarColonias() {
  const select = document.querySelector("#ID_Colonia");
  if (!select) {
    return;
  }

  const colonias = await obtenerColonias();
  colonias.forEach((colonia) => {
    const opcion = document.createElement("option");
    opcion.value = colonia.ID_Colonia;
    opcion.textContent = `${colonia.Nombre_Colonia}, ${colonia.Nombre_Municipio} (CP ${colonia.CP})`;
    select.appendChild(opcion);
  });
}

// Reglas del lote (las mismas que están en el diccionario de datos)
function validarLote() {
  const {
    Fecha_Recepcion,
    Fecha_Preferente,
    Fecha_Caducidad,
    Cantidad_Inicial,
    Stock,
  } = formulario.elements;

  if (Fecha_Caducidad.value <= Fecha_Recepcion.value) {
    return "La fecha de caducidad debe ser posterior a la de recepción.";
  }
  if (Fecha_Preferente.value > Fecha_Caducidad.value) {
    return "La fecha de consumo preferente no puede ser posterior a la de caducidad.";
  }
  if (Number(Stock.value) > Number(Cantidad_Inicial.value)) {
    return "El stock no puede ser mayor que la cantidad recibida.";
  }
  return null;
}

async function cargarInventarios() {
  const select = document.querySelector("#ID_Inventario");
  if (!select) {
    return;
  }

  const inventarios = await obtenerInventarios();
  inventarios.forEach((inventario) => {
    const opcion = document.createElement("option");
    opcion.value = inventario.ID_Inventario;
    opcion.textContent = `${inventario.Nombre_Alimento} (${inventario.Unidad_Medida})`;
    select.appendChild(opcion);
  });
}

// ---- Donación: elegir de qué lotes se dona ----
function entradasLotes() {
  return [...document.querySelectorAll("[data-lote]")];
}

function actualizarTotal() {
  const total = entradasLotes().reduce(
    (suma, entrada) => suma + Number(entrada.value || 0),
    0,
  );
  document.querySelector("#Cantidad").value = total;
}

async function cargarLotesDonacion() {
  const contenedor = document.querySelector("#lista-lotes");
  if (!contenedor) {
    return;
  }

  const lotes = (await obtenerLotes()).filter(
    (lote) => lote.Stock > 0 && lote.Aviso !== "Caducado",
  );

  if (lotes.length === 0) {
    document.querySelector("#sin-lotes").hidden = false;
    return;
  }

  lotes.forEach((lote) => {
    const campo = document.createElement("div");
    campo.className = "formulario__lote";

    const etiqueta = document.createElement("label");
    etiqueta.className = "formulario__etiqueta";
    etiqueta.htmlFor = `lote-${lote.ID_Lote}`;
    etiqueta.textContent = `${lote.Nombre_Alimento} · ${lote.Dias_Texto} · hay ${lote.Stock} ${lote.Unidad_Medida}`;

    const entrada = document.createElement("input");
    entrada.className = "formulario__input";
    entrada.type = "number";
    entrada.id = `lote-${lote.ID_Lote}`;
    entrada.min = "0";
    entrada.max = String(lote.Stock);
    entrada.value = "0";
    entrada.dataset.lote = lote.ID_Lote;
    entrada.addEventListener("input", actualizarTotal);

    campo.append(etiqueta, entrada);
    contenedor.appendChild(campo);
  });
}

async function cargarCategorias() {
  const select = document.querySelector("#ID_Categoria");
  if (!select) {
    return;
  }

  const categorias = await obtenerCategorias();
  categorias.forEach((categoria) => {
    const opcion = document.createElement("option");
    opcion.value = categoria.ID_Categoria;
    opcion.textContent = categoria.Nombre_Categoria;
    select.appendChild(opcion);
  });
}

// Si se viene desde "Donar este lote", ese lote ya aparece lleno
function preseleccionarLote() {
  const idLote = new URLSearchParams(window.location.search).get("lote");
  if (!idLote) {
    return;
  }

  const entrada = document.querySelector(`[data-lote="${CSS.escape(idLote)}"]`);
  if (!entrada) {
    return;
  }

  entrada.value = entrada.max;
  entrada.focus();
  actualizarTotal();
}

// ---- Receta: filas de ingredientes que se agregan y se quitan ----
let alimentosActivos = [];
let siguienteFila = 1;

function crearCampo(textoEtiqueta, control) {
  const campo = document.createElement("div");
  campo.className = "formulario__campo";
  const etiqueta = document.createElement("label");
  etiqueta.className = "formulario__etiqueta";
  etiqueta.htmlFor = control.id;
  etiqueta.textContent = textoEtiqueta;
  campo.append(etiqueta, control);
  return campo;
}

function crearFilaIngrediente(ingrediente = {}) {
  const numero = siguienteFila++;

  const select = document.createElement("select");
  select.className = "formulario__select";
  select.id = `alimento-${numero}`;
  select.required = true;
  select.add(new Option("Selecciona un alimento", ""));
  alimentosActivos.forEach((alimento) => {
    select.add(new Option(`${alimento.Nombre_Alimento} (${alimento.Unidad_Medida})`, alimento.ID_Alimento));
  });
  select.value = ingrediente.ID_Alimento ?? "";

  const cantidad = document.createElement("input");
  cantidad.className = "formulario__input";
  cantidad.type = "number";
  cantidad.id = `cantidad-${numero}`;
  cantidad.min = "0.01";
  cantidad.step = "0.01";
  cantidad.required = true;
  cantidad.value = ingrediente.Cantidad ?? "";

  const quitar = document.createElement("button");
  quitar.className = "formulario__secundario";
  quitar.type = "button";
  quitar.textContent = "Quitar";
  quitar.setAttribute("aria-label", `Quitar ingrediente ${numero}`);

  const fila = document.createElement("div");
  fila.className = "formulario__ingrediente";
  fila.dataset.ingrediente = "";
  fila.append(crearCampo("Alimento", select), crearCampo("Cantidad", cantidad), quitar);

  quitar.addEventListener("click", () => fila.remove());
  document.querySelector("#lista-ingredientes").appendChild(fila);
}

async function prepararIngredientes() {
  const contenedor = document.querySelector("#lista-ingredientes");
  if (!contenedor) {
    return;
  }

  alimentosActivos = await obtenerAlimentos();
  document.querySelector("#agregar-ingrediente").addEventListener("click", () => crearFilaIngrediente());

  // Al editar se cargan los ingredientes guardados; al crear, una fila vacía
  const guardados = id ? await obtenerIngredientes(id) : [];
  if (guardados.length > 0) {
    guardados.forEach((ingrediente) => crearFilaIngrediente(ingrediente));
  } else {
    crearFilaIngrediente();
  }
}

function validarReceta() {
  const filas = [...document.querySelectorAll("[data-ingrediente]")];
  if (filas.length === 0) {
    return "Agrega al menos un ingrediente.";
  }

  const elegidos = filas.map((fila) => fila.querySelector("select").value);
  if (new Set(elegidos).size !== elegidos.length) {
    return "Hay un ingrediente repetido. Junta las cantidades en una sola fila.";
  }
  return null;
}

function validarDonacion() {
  if (id) {
    return null; // al editar, los alimentos no cambian
  }

  const entradas = entradasLotes();
  if (entradas.length === 0) {
    return "No tienes lotes disponibles para donar.";
  }
  if (entradas.some((entrada) => Number(entrada.value) > Number(entrada.max))) {
    return "No puedes donar más de lo que hay en el lote.";
  }
  if (entradas.every((entrada) => Number(entrada.value || 0) === 0)) {
    return "Escribe cuánto donas de al menos un lote.";
  }
  return null;
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

  if (modulo === "donaciones") {
    document.querySelector("#grupo-lotes").hidden = true;
    document.querySelector("#aviso-edicion").hidden = false;
  }
}

async function prepararEliminar() {
  const config = modulos[modulo];
  const boton = document.querySelector("#boton-eliminar");
  if (!boton || !id || !config.eliminar) {
    return;
  }

  const registro = await config.obtener(id);
  if (!registro) {
    return; // no se puede eliminar algo que no existe
  }

  boton.hidden = false;
  boton.addEventListener("click", async () => {
    await config.eliminar(id);
    boton.disabled = true;
    mostrarMensaje("Eliminado correctamente. Regresando a la lista...", false);
    setTimeout(() => {
      window.location.href = config.lista;
    }, 1200);
  });
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

  const errorRegla = modulos[modulo].validar?.();
  if (errorRegla) {
    mostrarMensaje(errorRegla, true);
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
  await cargarColonias();
  await cargarInventarios();
  await cargarLotesDonacion();
  await cargarCategorias();
  await prepararIngredientes();
  await prepararEdicion();
  await prepararEliminar();
  preseleccionarLote();
}

await iniciar();
