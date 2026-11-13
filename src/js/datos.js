const ID_USUARIO_ACTUAL = 1;
const ID_BENEFICIARIO_ACTUAL = 1;
const ID_ORGANIZACION_ACTUAL = 1;
const ID_COMERCIO_ACTUAL = 1;

const organizaciones = [
  { ID_Organizacion: 1, Nombre_Org: 'Banco de Alimentos Esperanza' },
  { ID_Organizacion: 2, Nombre_Org: 'Centro Comunitario Hortensia' },
  { ID_Organizacion: 3, Nombre_Org: 'Asociación Manos Solidarias' }
];

const alimentos = [
  { ID_Alimento: 1, Nombre_Alimento: 'Arroz', Unidad_Medida: 'kg' },
  { ID_Alimento: 2, Nombre_Alimento: 'Frijol', Unidad_Medida: 'kg' },
  { ID_Alimento: 3, Nombre_Alimento: 'Huevo', Unidad_Medida: 'pieza' },
  { ID_Alimento: 4, Nombre_Alimento: 'Calabaza', Unidad_Medida: 'kg' },
  { ID_Alimento: 5, Nombre_Alimento: 'Cebolla', Unidad_Medida: 'kg' },
  { ID_Alimento: 6, Nombre_Alimento: 'Tortilla de maíz', Unidad_Medida: 'kg' },
  { ID_Alimento: 7, Nombre_Alimento: 'Jitomate', Unidad_Medida: 'kg' }
];

const recetas = [
  {
    ID_Receta: 1,
    Nombre_Receta: 'Arroz con frijoles y huevo',
    Descripcion: 'Plato completo y económico para toda la familia.',
    Tiempo_Preparacion: 30,
    Porciones: 4,
    Costo: 45
  },
  {
    ID_Receta: 2,
    Nombre_Receta: 'Sopa de calabaza',
    Descripcion: 'Sopa caliente con calabaza y cebolla.',
    Tiempo_Preparacion: 40,
    Porciones: 4,
    Costo: 35
  },
  {
    ID_Receta: 3,
    Nombre_Receta: 'Tacos de frijol',
    Descripcion: 'Tacos sencillos de frijol con jitomate.',
    Tiempo_Preparacion: 20,
    Porciones: 3,
    Costo: 30
  }
];

const detalleRecetas = [
  { ID_Detalle_Receta: 1, ID_Receta: 1, ID_Alimento: 1, Cantidad: 0.5, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 2, ID_Receta: 1, ID_Alimento: 2, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 3, ID_Receta: 1, ID_Alimento: 3, Cantidad: 4, Unidad_Medida: 'pieza' },
  { ID_Detalle_Receta: 4, ID_Receta: 2, ID_Alimento: 4, Cantidad: 1, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 5, ID_Receta: 2, ID_Alimento: 5, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 6, ID_Receta: 3, ID_Alimento: 6, Cantidad: 0.5, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 7, ID_Receta: 3, ID_Alimento: 2, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 8, ID_Receta: 3, ID_Alimento: 7, Cantidad: 0.25, Unidad_Medida: 'kg' }
];

const solicitudes = [
  {
    ID_Solicitud: 1,
    Fecha_Solicitud: '2026-11-02',
    Motivo: 'Necesitamos apoyo con despensa básica para la quincena.',
    Integrantes: 4,
    Prioridad: 'Alta',
    Estado: 'Pendiente',
    ID_Beneficiario: 1,
    ID_Organizacion: 1
  },
  {
    ID_Solicitud: 2,
    Fecha_Solicitud: '2026-10-20',
    Motivo: 'Apoyo con verduras y cereales para mi familia.',
    Integrantes: 4,
    Prioridad: 'Media',
    Estado: 'Entregada',
    ID_Beneficiario: 1,
    ID_Organizacion: 2
  },
  {
    ID_Solicitud: 3,
    Fecha_Solicitud: '2026-10-25',
    Motivo: 'Solicitud de otra familia.',
    Integrantes: 3,
    Prioridad: 'Baja',
    Estado: 'Pendiente',
    ID_Beneficiario: 2,
    ID_Organizacion: 3
  },
  { ID_Solicitud: 4, 
    Fecha_Solicitud: '2026-10-26', 
    Motivo: 'Apoyo con cereales y leguminosas.',
    Integrantes: 5, 
    Prioridad: 'Alta', 
    Estado: 'Atendida', 
    ID_Beneficiario: 2, 
    ID_Organizacion: 1 }
];

const preferencias = [
  {
    ID_Preferencia: 1,
    Tipo: 'Vegetariana',
    Descripcion: 'Prefiero platillos sin carne.',
    Observaciones: 'Consumo huevo y lácteos.',
    ID_Usuario: 1
  },
  {
    ID_Preferencia: 2,
    Tipo: 'Económica',
    Descripcion: 'Busco menús de bajo costo para cuatro personas.',
    Observaciones: '',
    ID_Usuario: 1
  },
  {
    ID_Preferencia: 3,
    Tipo: 'Sin gluten',
    Descripcion: 'Preferencia de otro usuario.',
    Observaciones: '',
    ID_Usuario: 2
  }
];

const alergias = [
  { ID_Alergia: 1, Nombre_Alergia: 'Cacahuate', ID_Usuario: 1 },
  { ID_Alergia: 2, Nombre_Alergia: 'Mariscos', ID_Usuario: 1 }
];

const beneficiarios = [
  { ID_Beneficiario: 1, Nombre_Beneficiario: 'María', Apaterno: 'López' },
  { ID_Beneficiario: 2, Nombre_Beneficiario: 'José', Apaterno: 'Hernández' }
];

const entregas = [
  { ID_Entrega: 1, Fecha_Entrega: '2026-11-05', Responsable: 'Laura Méndez',
    Estado: 'Programada', Observaciones: 'Despensa básica.', ID_Solicitud: 1 },
  { ID_Entrega: 2, Fecha_Entrega: '2026-10-28', Responsable: 'Pedro Ruiz',
    Estado: 'Entregada', Observaciones: '', ID_Solicitud: 4 }
];

const inventarios = [
  { ID_Inventario: 1, Cantidad: 40, Fecha_Actualizacion: '2026-11-10', Estado: 'Disponible', ID_Comercio: 1, ID_Alimento: 1 },
  { ID_Inventario: 2, Cantidad: 25, Fecha_Actualizacion: '2026-11-11', Estado: 'Disponible', ID_Comercio: 1, ID_Alimento: 7 },
  { ID_Inventario: 3, Cantidad: 6, Fecha_Actualizacion: '2026-11-09', Estado: 'Por agotarse', ID_Comercio: 1, ID_Alimento: 3 },
  { ID_Inventario: 4, Cantidad: 15, Fecha_Actualizacion: '2026-11-08', Estado: 'Disponible', ID_Comercio: 2, ID_Alimento: 2 }
];

const donaciones = [
  { ID_Donacion: 1, Fecha_Donacion: '2026-11-03', Cantidad: 20, Estado: 'Entregada',
    Observaciones: 'Arroz y frijol en buen estado.', ID_Comercio: 1, ID_Organizacion: 1 },
  { ID_Donacion: 2, Fecha_Donacion: '2026-11-10', Cantidad: 12, Estado: 'Pendiente',
    Observaciones: '', ID_Comercio: 1, ID_Organizacion: 2 },
  { ID_Donacion: 3, Fecha_Donacion: '2026-11-05', Cantidad: 8, Estado: 'Entregada',
    Observaciones: 'Verdura de temporada.', ID_Comercio: 2, ID_Organizacion: 3 }
];

// Organizaciones
export async function obtenerOrganizaciones() {
  return organizaciones;
}

// Recetas
export async function obtenerRecetas() {
  return recetas;
}

export async function obtenerReceta(id) {
  return recetas.find((receta) => receta.ID_Receta === Number(id));
}

export async function obtenerIngredientes(idReceta) {
  return detalleRecetas
    .filter((detalle) => detalle.ID_Receta === Number(idReceta))
    .map((detalle) => {
      const alimento = alimentos.find((item) => item.ID_Alimento === detalle.ID_Alimento);
      return { ...detalle, Nombre_Alimento: alimento ? alimento.Nombre_Alimento : 'Desconocido' };
    });
}

// Recomendaciones: recetas ordenadas de la más económica a la más cara
export async function obtenerRecomendaciones() {
  const ordenadas = [...recetas].sort((a, b) => a.Costo - b.Costo);

  return Promise.all(
    ordenadas.map(async (receta) => {
      const ingredientes = await obtenerIngredientes(receta.ID_Receta);
      return { ...receta, Ingredientes: ingredientes.map((item) => item.Nombre_Alimento) };
    })
  );
}

// Solicitudes
function agregarOrganizacion(solicitud) {
  const organizacion = organizaciones.find((org) => org.ID_Organizacion === solicitud.ID_Organizacion);
  return { ...solicitud, Nombre_Org: organizacion ? organizacion.Nombre_Org : 'Desconocida' };
}

export async function obtenerSolicitudes() {
  return solicitudes
    .filter((solicitud) => solicitud.ID_Beneficiario === ID_BENEFICIARIO_ACTUAL)
    .map(agregarOrganizacion);
}

export async function obtenerSolicitud(id) {
  const solicitud = solicitudes.find(
    (item) => item.ID_Solicitud === Number(id) && item.ID_Beneficiario === ID_BENEFICIARIO_ACTUAL
  );
  return solicitud ? agregarOrganizacion(solicitud) : undefined;
}

// Preferencias y alergias
export async function obtenerPreferencias() {
  return preferencias.filter((preferencia) => preferencia.ID_Usuario === ID_USUARIO_ACTUAL);
}

export async function obtenerPreferencia(id) {
  return preferencias.find(
    (preferencia) => preferencia.ID_Preferencia === Number(id) && preferencia.ID_Usuario === ID_USUARIO_ACTUAL
  );
}

export async function obtenerAlergias(idUsuario) {
  return alergias.filter((alergia) => alergia.ID_Usuario === Number(idUsuario));
}

//Organización: solicitudes recibidas
function solicitudesDeMiOrganizacion() {
  return solicitudes.filter((s) => s.ID_Organizacion === ID_ORGANIZACION_ACTUAL);
}

function agregarFamilia(solicitud) {
  const b = beneficiarios.find((item) => item.ID_Beneficiario === solicitud.ID_Beneficiario);
  return { ...solicitud, Familia: b ? `${b.Nombre_Beneficiario} ${b.Apaterno}` : 'Desconocida' };
}

export async function obtenerSolicitudesOrganizacion() {
  return solicitudesDeMiOrganizacion().map(agregarFamilia);
}

export async function obtenerSolicitudOrganizacion(id) {
  const s = solicitudesDeMiOrganizacion().find((item) => item.ID_Solicitud === Number(id));
  return s ? agregarFamilia(s) : undefined;
}

//Organización: entregas
export async function obtenerEntregas() {
  const ids = solicitudesDeMiOrganizacion().map((s) => s.ID_Solicitud);
  return entregas.filter((e) => ids.includes(e.ID_Solicitud));
}

export async function obtenerEntrega(id) {
  const lista = await obtenerEntregas();
  return lista.find((e) => e.ID_Entrega === Number(id));
}

// ---- Comercio: inventario ----
function agregarAlimento(registro) {
  const a = alimentos.find((item) => item.ID_Alimento === registro.ID_Alimento);
  return {
    ...registro,
    Nombre_Alimento: a ? a.Nombre_Alimento : 'Desconocido',
    Unidad_Medida: a ? a.Unidad_Medida : ''
  };
}

export async function obtenerAlimentos() {
  return alimentos;
}

export async function obtenerInventarios() {
  return inventarios
    .filter((i) => i.ID_Comercio === ID_COMERCIO_ACTUAL)
    .map(agregarAlimento);
}

export async function obtenerInventario(id) {
  const i = inventarios.find(
    (item) => item.ID_Inventario === Number(id) && item.ID_Comercio === ID_COMERCIO_ACTUAL
  );
  return i ? agregarAlimento(i) : undefined;
}

// ---- Comercio: donaciones ----
export async function obtenerDonaciones() {
  return donaciones
    .filter((d) => d.ID_Comercio === ID_COMERCIO_ACTUAL)
    .map(agregarOrganizacion);
}

export async function obtenerDonacion(id) {
  const d = donaciones.find(
    (item) => item.ID_Donacion === Number(id) && item.ID_Comercio === ID_COMERCIO_ACTUAL
  );
  return d ? agregarOrganizacion(d) : undefined;
}