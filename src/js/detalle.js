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
  obtenerBeneficiario,
  obtenerLote,
  obtenerOrganizacionAdmin,
  cambiarEstatusOrganizacion,
  obtenerAlimento,
  obtenerPerfil
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
  beneficiarios: {
    obtener: obtenerBeneficiario,
    titulo: (b) => `${b.Nombre_Beneficiario} ${b.Apaterno} ${b.Amaterno}`,
    campos: (b) => [
      ["Teléfono", b.Telefono_Beneficiario],
      ["Correo", b.Correo_Beneficiario || "Sin correo"],
      ["Integrantes de la familia", b.Integrantes],
      ["Dirección", `${b.Calle} ${b.Numero}`],
      ["Colonia", b.Nombre_Colonia],
    ],
  },
  lotes: {
    obtener: obtenerLote,
    titulo: (l) => `Lote de ${l.Nombre_Alimento}`,
    campos: (l) => [
      ["Aviso", l.Aviso],
      ["Tiempo", l.Dias_Texto],
      ["Stock", `${l.Stock} de ${l.Cantidad_Inicial} ${l.Unidad_Medida}`],
      ["Fecha de recepción", l.Fecha_Recepcion],
      ["Consumo preferente", l.Fecha_Preferente],
      ["Caducidad", l.Fecha_Caducidad],
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
  },
  "organizaciones-admin": {
    obtener: obtenerOrganizacionAdmin,
    titulo: (o) => o.Nombre_Org,
    campos: (o) => [
      ["Estatus", o.Estatus_Org],
      ["Tipo", o.Tipo_Org],
      ["Responsable", o.Responsable],
      ["Teléfono", o.Telefono_Org],
      ["Correo", o.Correo_Org],
      ["Dirección", `${o.Calle_Org} ${o.Numero_Org}, ${o.Nombre_Colonia}`],
      ["Cuenta que la registró", o.Cuenta],
    ],
  },
    "alimentos-admin": {
    obtener: obtenerAlimento,
    titulo: (a) => a.Nombre_Alimento,
    campos: (a) => [
      ["Categoría", a.Nombre_Categoria],
      ["Descripción", a.Descripcion],
      ["Unidad de medida", a.Unidad_Medida],
      ["Calorías", `${a.Calorias} kcal`],
      ["Proteínas", `${a.Proteinas} g`],
      ["Carbohidratos", `${a.Carbohidratos} g`],
      ["Grasas", `${a.Grasas} g`],
      ["Estado", a.Estado],
    ],
  },
    perfil: {
    obtener: obtenerPerfil,
    titulo: (u) => `${u.Nombre_Usuario} ${u.APaterno}`,
    campos: (u) => {
      const campos = [
        ["Tipo de cuenta", u.Nombre_Rol],
        ["Correo", u.Correo],
        ["Teléfono", u.Telefono],
        ["Miembro desde", u.Fecha_Registro],
      ];
      if (u.Administra.length > 0) {
        campos.push(["Administra", u.Administra.join(", ")]);
      }
      return campos;
    },
  },
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

function prepararValidacion(config, registro) {
  if (registro.Estatus_Org !== "Pendiente") {
    return; // ya se validó: los botones se quedan ocultos
  }

  const botonAprobar = document.querySelector("#boton-aprobar");
  const botonRechazar = document.querySelector("#boton-rechazar");
  const mensaje = document.querySelector("#mensaje-validacion");

  async function validar(nuevoEstatus) {
    const actualizada = await cambiarEstatusOrganizacion(id, nuevoEstatus);
    pintarDatos(config, actualizada);
    botonAprobar.hidden = true;
    botonRechazar.hidden = true;
    mensaje.textContent =
      nuevoEstatus === "Activa"
        ? "Organización aprobada. Ya puede recibir donaciones."
        : "Organización rechazada.";
    mensaje.hidden = false;
  }

  botonAprobar.hidden = false;
  botonRechazar.hidden = false;
  botonAprobar.addEventListener("click", () => validar("Activa"));
  botonRechazar.addEventListener("click", () => validar("Rechazada"));
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

  document.querySelector("#titulo").textContent = config.titulo(registro);
  pintarDatos(config, registro);

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
  if (modulo === "donaciones-org") {
    await mostrarAlimentosDonados();
    prepararConfirmacion(config, registro);
  }

  // "Donar este lote" lleva el lote al formulario de donación
  const botonDonar = document.querySelector("#boton-donar");
  if (botonDonar) {
    if (registro.Aviso === "Caducado") {
      botonDonar.hidden = true; // un lote caducado no se dona
    } else {
      botonDonar.href = `${botonDonar.getAttribute("href")}?lote=${id}`;
    }
  }

  if (modulo === "organizaciones-admin") {
    prepararValidacion(config, registro);
  }
}

await mostrarDetalle();
