import { obtenerUsuario } from './sesion.js';

const ID_BENEFICIARIO_ACTUAL = 1;
const sesion = obtenerUsuario();
const ID_USUARIO_ACTUAL = sesion?.id ?? 0;
const ID_COMERCIO_ACTUAL = comercios.find((c) => c.ID_Usuario === ID_USUARIO_ACTUAL)?.ID_Comercio ?? 0;
const ID_ORGANIZACION_ACTUAL = organizaciones.find((o) => o.ID_Usuario === ID_USUARIO_ACTUAL)?.ID_Organizacion ?? 0;


// ---- Usuarios y roles ----
const roles = [
  { ID_Rol: 1, Nombre_Rol: 'Administrador', Estado_Rol: 'Activo' },
  { ID_Rol: 2, Nombre_Rol: 'Usuario', Estado_Rol: 'Activo' },
  { ID_Rol: 3, Nombre_Rol: 'Comercio', Estado_Rol: 'Activo' },
  { ID_Rol: 4, Nombre_Rol: 'Organización', Estado_Rol: 'Activo' },
  { ID_Rol: 5, Nombre_Rol: 'Nutriólogo', Estado_Rol: 'Inactivo' }
];

const usuarios = [
  { ID_Usuario: 1, ID_Rol: 2, Nombre_Usuario: 'Ana', APaterno: 'Torres', Correo: 'ana.torres@gmail.com',
    Telefono: '2221234567', Fecha_Registro: '2026-10-01', Estado_Usuario: 'Activo' },
  { ID_Usuario: 2, ID_Rol: 2, Nombre_Usuario: 'Luis', APaterno: 'Ramírez', Correo: 'luis.ramirez@gmail.com',
    Telefono: '2222345678', Fecha_Registro: '2026-10-05', Estado_Usuario: 'Activo' },
  { ID_Usuario: 3, ID_Rol: 3, Nombre_Usuario: 'Roberto', APaterno: 'Hidalgo', Correo: 'roberto.hidalgo@gmail.com',
    Telefono: '2223456789', Fecha_Registro: '2026-10-08', Estado_Usuario: 'Activo' },
  { ID_Usuario: 4, ID_Rol: 3, Nombre_Usuario: 'Carmen', APaterno: 'Ruiz', Correo: 'carmen.ruiz@gmail.com',
    Telefono: '2224567890', Fecha_Registro: '2026-10-12', Estado_Usuario: 'Activo' },
  { ID_Usuario: 5, ID_Rol: 4, Nombre_Usuario: 'Laura', APaterno: 'Méndez', Correo: 'laura.mendez@gmail.com',
    Telefono: '2225678901', Fecha_Registro: '2026-10-15', Estado_Usuario: 'Activo' }
];

// ---- Ubicación ----
const estados = [
  { ID_Estado: 1, Nombre_Estado: 'Puebla' },
  { ID_Estado: 2, Nombre_Estado: 'Tlaxcala' },
  { ID_Estado: 3, Nombre_Estado: 'Veracruz' },
  { ID_Estado: 4, Nombre_Estado: 'Oaxaca' },
  { ID_Estado: 5, Nombre_Estado: 'Ciudad de México' }
];

const municipios = [
  { ID_Municipio: 1, ID_Estado: 1, Nombre_Municipio: 'Puebla' },
  { ID_Municipio: 2, ID_Estado: 1, Nombre_Municipio: 'San Andrés Cholula' },
  { ID_Municipio: 3, ID_Estado: 1, Nombre_Municipio: 'San Pedro Cholula' },
  { ID_Municipio: 4, ID_Estado: 2, Nombre_Municipio: 'Tlaxcala' },
  { ID_Municipio: 5, ID_Estado: 3, Nombre_Municipio: 'Xalapa' }
];

const colonias = [
  { ID_Colonia: 1, ID_Municipio: 1, Nombre_Colonia: 'Centro', CP: '72000' },
  { ID_Colonia: 2, ID_Municipio: 1, Nombre_Colonia: 'La Paz', CP: '72160' },
  { ID_Colonia: 3, ID_Municipio: 1, Nombre_Colonia: 'Bosques de San Sebastián', CP: '72310' },
  { ID_Colonia: 4, ID_Municipio: 2, Nombre_Colonia: 'Lomas de Angelópolis', CP: '72830' },
  { ID_Colonia: 5, ID_Municipio: 3, Nombre_Colonia: 'Barrio de Jesús', CP: '72760' }
];

// ---- Organizaciones y comercios ----
const organizaciones = [
  { ID_Organizacion: 1, Nombre_Org: 'Banco de Alimentos Esperanza', Tipo_Org: 'Banco de alimentos',
    Responsable: 'Laura Méndez', Telefono_Org: '2226667788', Correo_Org: 'contacto@bancoesperanza.org',
    Calle_Org: 'Reforma', Numero_Org: 710, Estatus_Org: 'Activa', ID_Colonia: 1, ID_Usuario: 5 },
  { ID_Organizacion: 2, Nombre_Org: 'Centro Comunitario Hortensia', Tipo_Org: 'Centro comunitario',
    Responsable: 'Patricia Gómez', Telefono_Org: '2227778899', Correo_Org: 'hortensia@centrocomunitario.org',
    Calle_Org: 'Hortensias', Numero_Org: 23, Estatus_Org: 'Activa', ID_Colonia: 2, ID_Usuario: 5 },
  { ID_Organizacion: 3, Nombre_Org: 'Asociación Manos Solidarias', Tipo_Org: 'Asociación civil',
    Responsable: 'Jorge Vargas', Telefono_Org: '2228889900', Correo_Org: 'manossolidarias@gmail.com',
    Calle_Org: 'Allende', Numero_Org: 15, Estatus_Org: 'Activa', ID_Colonia: 5, ID_Usuario: 5 },
  { ID_Organizacion: 4, Nombre_Org: 'Comedor Comunitario San José', Tipo_Org: 'Comedor comunitario',
    Responsable: 'Teresa Ortiz', Telefono_Org: '2229990011', Correo_Org: 'comedorsanjose@gmail.com',
    Calle_Org: 'San José', Numero_Org: 402, Estatus_Org: 'Pendiente', ID_Colonia: 3, ID_Usuario: 5 },
  { ID_Organizacion: 5, Nombre_Org: 'Casa Hogar Luz y Vida', Tipo_Org: 'Casa hogar',
    Responsable: 'Andrés Navarro', Telefono_Org: '2220001122', Correo_Org: 'luzyvida@gmail.com',
    Calle_Org: 'Luz', Numero_Org: 9, Estatus_Org: 'Pendiente', ID_Colonia: 4, ID_Usuario: 5 }
];

const comercios = [
  { ID_Comercio: 1, Nombre_Comercio: 'Mercado Hidalgo', Razon: 'Mercado Hidalgo S.A. de C.V.', Tipo: 'Mercado',
    Telefono_Comercio: '2221112233', Correo_Comercio: 'contacto@mercadohidalgo.com',
    Calle_C: '16 de Septiembre', Numero_C: 301, ID_Colonia: 1, ID_Usuario: 3 },
  { ID_Comercio: 2, Nombre_Comercio: 'Verdulería Don Chuy', Razon: 'Jesús Morales Ruiz', Tipo: 'Verdulería',
    Telefono_Comercio: '2222223344', Correo_Comercio: 'donchuy@gmail.com',
    Calle_C: 'Morelos', Numero_C: 12, ID_Colonia: 5, ID_Usuario: 3 },
  { ID_Comercio: 3, Nombre_Comercio: 'Panadería La Espiga', Razon: 'Panificadora La Espiga S. de R.L.', Tipo: 'Panadería',
    Telefono_Comercio: '2223334455', Correo_Comercio: 'laespiga@gmail.com',
    Calle_C: 'Juárez', Numero_C: 2105, ID_Colonia: 2, ID_Usuario: 4 },
  { ID_Comercio: 4, Nombre_Comercio: 'Abarrotes Doña Lupe', Razon: 'Guadalupe Ríos Castro', Tipo: 'Tienda de abarrotes',
    Telefono_Comercio: '2224445566', Correo_Comercio: 'abarrotesdonalupe@gmail.com',
    Calle_C: 'Fresnos', Numero_C: 80, ID_Colonia: 3, ID_Usuario: 4 },
  { ID_Comercio: 5, Nombre_Comercio: 'Fonda El Fogón', Razon: 'Alimentos El Fogón S.A. de C.V.', Tipo: 'Fonda',
    Telefono_Comercio: '2225556677', Correo_Comercio: 'elfogon@gmail.com',
    Calle_C: 'Atlixcáyotl', Numero_C: 5320, ID_Colonia: 4, ID_Usuario: 3 }
];

// ---- Alimentos ----
const categorias = [
  { ID_Categoria: 1, Nombre_Categoria: 'Cereales y granos', Descripcion: 'Arroz, maíz, avena y sus derivados.', Estado: 'Activa' },
  { ID_Categoria: 2, Nombre_Categoria: 'Leguminosas', Descripcion: 'Frijol, lenteja, garbanzo y haba.', Estado: 'Activa' },
  { ID_Categoria: 3, Nombre_Categoria: 'Origen animal', Descripcion: 'Huevo, leche, carne y sus derivados.', Estado: 'Activa' },
  { ID_Categoria: 4, Nombre_Categoria: 'Verduras', Descripcion: 'Hortalizas frescas.', Estado: 'Activa' },
  { ID_Categoria: 5, Nombre_Categoria: 'Frutas', Descripcion: 'Frutas frescas de temporada.', Estado: 'Activa' }
];

// Valores nutricionales por 100 g (huevo por pieza)
const alimentos = [
  { ID_Alimento: 1, Nombre_Alimento: 'Arroz', ID_Categoria: 1, Descripcion: 'Arroz blanco de grano largo.',
    Unidad_Medida: 'kg', Calorias: 360, Proteinas: 7, Carbohidratos: 79, Grasas: 1, Estado: 'Activo' },
  { ID_Alimento: 2, Nombre_Alimento: 'Frijol', ID_Categoria: 2, Descripcion: 'Frijol negro seco.',
    Unidad_Medida: 'kg', Calorias: 340, Proteinas: 21, Carbohidratos: 62, Grasas: 1, Estado: 'Activo' },
  { ID_Alimento: 3, Nombre_Alimento: 'Huevo', ID_Categoria: 3, Descripcion: 'Huevo blanco de gallina.',
    Unidad_Medida: 'pieza', Calorias: 70, Proteinas: 6, Carbohidratos: 1, Grasas: 5, Estado: 'Activo' },
  { ID_Alimento: 4, Nombre_Alimento: 'Calabaza', ID_Categoria: 4, Descripcion: 'Calabacita verde.',
    Unidad_Medida: 'kg', Calorias: 17, Proteinas: 1, Carbohidratos: 3, Grasas: 0, Estado: 'Activo' },
  { ID_Alimento: 5, Nombre_Alimento: 'Cebolla', ID_Categoria: 4, Descripcion: 'Cebolla blanca.',
    Unidad_Medida: 'kg', Calorias: 40, Proteinas: 1, Carbohidratos: 9, Grasas: 0, Estado: 'Activo' },
  { ID_Alimento: 6, Nombre_Alimento: 'Tortilla de maíz', ID_Categoria: 1, Descripcion: 'Tortilla de maíz nixtamalizado.',
    Unidad_Medida: 'kg', Calorias: 218, Proteinas: 6, Carbohidratos: 45, Grasas: 3, Estado: 'Activo' },
  { ID_Alimento: 7, Nombre_Alimento: 'Jitomate', ID_Categoria: 4, Descripcion: 'Jitomate saladet.',
    Unidad_Medida: 'kg', Calorias: 18, Proteinas: 1, Carbohidratos: 4, Grasas: 0, Estado: 'Activo' }
];

// ---- Recetas ----
const recetas = [
  { ID_Receta: 1, Nombre_Receta: 'Arroz con frijoles y huevo', Descripcion: 'Plato completo y económico para toda la familia.',
    Tiempo_Preparacion: 30, Porciones: 4, Costo: 45, Propuesta: 'Comida principal; acompañar con tortillas y agua de fruta.' },
  { ID_Receta: 2, Nombre_Receta: 'Sopa de calabaza', Descripcion: 'Sopa caliente con calabaza y cebolla.',
    Tiempo_Preparacion: 40, Porciones: 4, Costo: 35, Propuesta: 'Ideal para la cena o como entrada en temporada de frío.' },
  { ID_Receta: 3, Nombre_Receta: 'Tacos de frijol', Descripcion: 'Tacos sencillos de frijol con jitomate.',
    Tiempo_Preparacion: 20, Porciones: 3, Costo: 30, Propuesta: 'Opción rápida para el almuerzo; se puede agregar cebolla picada.' },
  { ID_Receta: 4, Nombre_Receta: 'Huevo a la mexicana', Descripcion: 'Huevo revuelto con jitomate y cebolla.',
    Tiempo_Preparacion: 15, Porciones: 3, Costo: 35, Propuesta: 'Desayuno completo; acompañar con frijoles y tortillas.' },
  { ID_Receta: 5, Nombre_Receta: 'Arroz rojo con calabaza', Descripcion: 'Arroz guisado con jitomate y calabacita.',
    Tiempo_Preparacion: 35, Porciones: 4, Costo: 40, Propuesta: 'Guarnición o plato principal para aprovechar verdura próxima a caducar.' }
];

const detalleRecetas = [
  { ID_Detalle_Receta: 1, ID_Receta: 1, ID_Alimento: 1, Cantidad: 0.5, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 2, ID_Receta: 1, ID_Alimento: 2, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 3, ID_Receta: 1, ID_Alimento: 3, Cantidad: 4, Unidad_Medida: 'pieza' },
  { ID_Detalle_Receta: 4, ID_Receta: 2, ID_Alimento: 4, Cantidad: 1, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 5, ID_Receta: 2, ID_Alimento: 5, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 6, ID_Receta: 3, ID_Alimento: 6, Cantidad: 0.5, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 7, ID_Receta: 3, ID_Alimento: 2, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 8, ID_Receta: 3, ID_Alimento: 7, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 9, ID_Receta: 4, ID_Alimento: 3, Cantidad: 6, Unidad_Medida: 'pieza' },
  { ID_Detalle_Receta: 10, ID_Receta: 4, ID_Alimento: 7, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 11, ID_Receta: 4, ID_Alimento: 5, Cantidad: 0.1, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 12, ID_Receta: 5, ID_Alimento: 1, Cantidad: 0.5, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 13, ID_Receta: 5, ID_Alimento: 7, Cantidad: 0.25, Unidad_Medida: 'kg' },
  { ID_Detalle_Receta: 14, ID_Receta: 5, ID_Alimento: 4, Cantidad: 0.5, Unidad_Medida: 'kg' }
];

// ---- Usuario: preferencias y alergias ----
const preferencias = [
  { ID_Preferencia: 1, Tipo: 'Vegetariana', Descripcion: 'Prefiero platillos sin carne.',
    Observaciones: 'Consumo huevo y lácteos.', ID_Usuario: 1 },
  { ID_Preferencia: 2, Tipo: 'Económica', Descripcion: 'Busco menús de bajo costo para cuatro personas.',
    Observaciones: '', ID_Usuario: 1 },
  { ID_Preferencia: 3, Tipo: 'Sin gluten', Descripcion: 'Evito alimentos con trigo, cebada y centeno.',
    Observaciones: '', ID_Usuario: 2 },
  { ID_Preferencia: 4, Tipo: 'Baja en sodio', Descripcion: 'Prefiero comidas con poca sal.',
    Observaciones: '', ID_Usuario: 2 },
  { ID_Preferencia: 5, Tipo: 'Rica en fibra', Descripcion: 'Busco recetas con verduras y leguminosas.',
    Observaciones: '', ID_Usuario: 1 }
];

const alergias = [
  { ID_Alergia: 1, Nombre_Alergia: 'Cacahuate', ID_Usuario: 1 },
  { ID_Alergia: 2, Nombre_Alergia: 'Mariscos', ID_Usuario: 1 },
  { ID_Alergia: 3, Nombre_Alergia: 'Gluten', ID_Usuario: 2 },
  { ID_Alergia: 4, Nombre_Alergia: 'Lactosa', ID_Usuario: 2 },
  { ID_Alergia: 5, Nombre_Alergia: 'Fresa', ID_Usuario: 1 }
];

// ---- Beneficiarios, solicitudes y entregas ----
const beneficiarios = [
  { ID_Beneficiario: 1, Nombre_Beneficiario: 'María', Apaterno: 'López', Amaterno: 'García',
    Telefono_Beneficiario: '2226789012', Correo_Beneficiario: 'maria.lopez@gmail.com',
    Integrantes: 4, Calle: 'Fresnos', Numero: 112, ID_Colonia: 3 },
  { ID_Beneficiario: 2, Nombre_Beneficiario: 'José', Apaterno: 'Hernández', Amaterno: 'Cruz',
    Telefono_Beneficiario: '2227890123', Correo_Beneficiario: 'jose.hernandez@gmail.com',
    Integrantes: 5, Calle: 'Morelos', Numero: 45, ID_Colonia: 5 },
  { ID_Beneficiario: 3, Nombre_Beneficiario: 'Guadalupe', Apaterno: 'Sánchez', Amaterno: 'Pérez',
    Telefono_Beneficiario: '2228901234', Correo_Beneficiario: 'lupita.sanchez@gmail.com',
    Integrantes: 3, Calle: '5 de Mayo', Numero: 210, ID_Colonia: 1 },
  { ID_Beneficiario: 4, Nombre_Beneficiario: 'Miguel', Apaterno: 'Flores', Amaterno: 'Rojas',
    Telefono_Beneficiario: '2229012345', Correo_Beneficiario: 'miguel.flores@gmail.com',
    Integrantes: 6, Calle: 'Teziutlán Sur', Numero: 38, ID_Colonia: 2 },
  { ID_Beneficiario: 5, Nombre_Beneficiario: 'Rosa', Apaterno: 'Martínez', Amaterno: 'Díaz',
    Telefono_Beneficiario: '2220123456', Correo_Beneficiario: 'rosa.martinez@gmail.com',
    Integrantes: 2, Calle: 'Hidalgo', Numero: 77, ID_Colonia: 5 }
];

const solicitudes = [
  { ID_Solicitud: 1, Fecha_Solicitud: '2026-11-02', Motivo: 'Necesitamos apoyo con despensa básica para la quincena.',
    Integrantes: 4, Prioridad: 'Alta', Estado: 'Pendiente', ID_Beneficiario: 1, ID_Organizacion: 1 },
  { ID_Solicitud: 2, Fecha_Solicitud: '2026-10-20', Motivo: 'Apoyo con verduras y cereales para mi familia.',
    Integrantes: 4, Prioridad: 'Media', Estado: 'Entregada', ID_Beneficiario: 1, ID_Organizacion: 2 },
  { ID_Solicitud: 3, Fecha_Solicitud: '2026-10-25', Motivo: 'Apoyo con despensa mientras encuentro trabajo.',
    Integrantes: 3, Prioridad: 'Baja', Estado: 'Pendiente', ID_Beneficiario: 2, ID_Organizacion: 3 },
  { ID_Solicitud: 4, Fecha_Solicitud: '2026-10-26', Motivo: 'Apoyo con cereales y leguminosas.',
    Integrantes: 5, Prioridad: 'Alta', Estado: 'Atendida', ID_Beneficiario: 2, ID_Organizacion: 1 },
  { ID_Solicitud: 5, Fecha_Solicitud: '2026-11-14', Motivo: 'Apoyo con huevo y verduras para mis hijos.',
    Integrantes: 3, Prioridad: 'Media', Estado: 'Pendiente', ID_Beneficiario: 3, ID_Organizacion: 1 }
];

const entregas = [
  { ID_Entrega: 1, Fecha_Entrega: '2026-11-05', Responsable: 'Laura Méndez',
    Estado: 'Programada', Observaciones: 'Despensa básica.', ID_Solicitud: 1 },
  { ID_Entrega: 2, Fecha_Entrega: '2026-10-28', Responsable: 'Pedro Ruiz',
    Estado: 'Entregada', Observaciones: '', ID_Solicitud: 4 },
  { ID_Entrega: 3, Fecha_Entrega: '2026-10-22', Responsable: 'Patricia Gómez',
    Estado: 'Entregada', Observaciones: 'Verduras y cereales.', ID_Solicitud: 2 },
  { ID_Entrega: 4, Fecha_Entrega: '2026-11-19', Responsable: 'Jorge Vargas',
    Estado: 'Programada', Observaciones: 'Primera parte del apoyo.', ID_Solicitud: 3 },
  { ID_Entrega: 5, Fecha_Entrega: '2026-11-26', Responsable: 'Jorge Vargas',
    Estado: 'Programada', Observaciones: 'Segunda parte del apoyo.', ID_Solicitud: 3 }
];

// ---- Comercio: inventarios, lotes y donaciones ----
const inventarios = [
  { ID_Inventario: 1, Cantidad: 40, Fecha_Actualizacion: '2026-11-10', Estado: 'Disponible', ID_Comercio: 1, ID_Alimento: 1 },
  { ID_Inventario: 2, Cantidad: 25, Fecha_Actualizacion: '2026-11-11', Estado: 'Disponible', ID_Comercio: 1, ID_Alimento: 7 },
  { ID_Inventario: 3, Cantidad: 6, Fecha_Actualizacion: '2026-11-09', Estado: 'Por agotarse', ID_Comercio: 1, ID_Alimento: 3 },
  { ID_Inventario: 4, Cantidad: 15, Fecha_Actualizacion: '2026-11-08', Estado: 'Disponible', ID_Comercio: 2, ID_Alimento: 2 },
  { ID_Inventario: 5, Cantidad: 12, Fecha_Actualizacion: '2026-11-16', Estado: 'Disponible', ID_Comercio: 2, ID_Alimento: 4 }
];

const lotes = [
  { ID_Lote: 1, ID_Inventario: 1, Fecha_Recepcion: '2026-10-10', Fecha_Caducidad: '2027-04-10',
    Fecha_Preferente: '2027-03-10', Cantidad_Inicial: 60, Stock: 40 },
  { ID_Lote: 2, ID_Inventario: 2, Fecha_Recepcion: '2026-11-08', Fecha_Caducidad: '2026-11-21',
    Fecha_Preferente: '2026-11-18', Cantidad_Inicial: 30, Stock: 25 },
  { ID_Lote: 3, ID_Inventario: 3, Fecha_Recepcion: '2026-11-01', Fecha_Caducidad: '2026-11-22',
    Fecha_Preferente: '2026-11-15', Cantidad_Inicial: 30, Stock: 6 },
  { ID_Lote: 4, ID_Inventario: 4, Fecha_Recepcion: '2026-10-01', Fecha_Caducidad: '2027-08-01',
    Fecha_Preferente: '2027-06-01', Cantidad_Inicial: 20, Stock: 15 },
  { ID_Lote: 5, ID_Inventario: 5, Fecha_Recepcion: '2026-11-02', Fecha_Caducidad: '2026-11-20',
    Fecha_Preferente: '2026-11-12', Cantidad_Inicial: 20, Stock: 12 }
];

const donaciones = [
  { ID_Donacion: 1, Fecha_Donacion: '2026-11-03', Cantidad: 20, Estado: 'Entregada',
    Observaciones: 'Arroz en buen estado.', ID_Comercio: 1, ID_Organizacion: 1 },
  { ID_Donacion: 2, Fecha_Donacion: '2026-11-10', Cantidad: 12, Estado: 'Pendiente',
    Observaciones: '', ID_Comercio: 1, ID_Organizacion: 2 },
  { ID_Donacion: 3, Fecha_Donacion: '2026-11-05', Cantidad: 8, Estado: 'Entregada',
    Observaciones: 'Verdura de temporada.', ID_Comercio: 2, ID_Organizacion: 3 },
  { ID_Donacion: 4, Fecha_Donacion: '2026-11-12', Cantidad: 6, Estado: 'Entregada',
    Observaciones: 'Huevo cercano a su fecha de consumo preferente.', ID_Comercio: 1, ID_Organizacion: 1 },
  { ID_Donacion: 5, Fecha_Donacion: '2026-11-16', Cantidad: 5, Estado: 'Pendiente',
    Observaciones: 'Frijol a granel.', ID_Comercio: 2, ID_Organizacion: 2 }
];

const detallesDonaciones = [
  { ID_Detalle_Donacion: 1, ID_Donacion: 1, ID_Lote: 1, Cantidad: 20, Unidad_Medida: 'kg' },
  { ID_Detalle_Donacion: 2, ID_Donacion: 2, ID_Lote: 2, Cantidad: 5, Unidad_Medida: 'kg' },
  { ID_Detalle_Donacion: 3, ID_Donacion: 2, ID_Lote: 3, Cantidad: 7, Unidad_Medida: 'pieza' },
  { ID_Detalle_Donacion: 4, ID_Donacion: 3, ID_Lote: 5, Cantidad: 8, Unidad_Medida: 'kg' },
  { ID_Detalle_Donacion: 5, ID_Donacion: 4, ID_Lote: 3, Cantidad: 6, Unidad_Medida: 'pieza' },
  { ID_Detalle_Donacion: 6, ID_Donacion: 5, ID_Lote: 4, Cantidad: 5, Unidad_Medida: 'kg' }
];

const rolesPorId = { 1: 'admin', 2: 'usuario', 3: 'comercio', 4: 'organizacion' };

// Login de demostración: busca el correo en los datos locales.
// No revisa contraseña porque los datos de prueba no tienen contraseñas.
export async function iniciarSesionLocal({ email }) {
  const usuario = usuarios.find((u) => u.Correo === email && u.Estado_Usuario === 'Activo');
  if (!usuario) {
    throw new Error('Correo o contraseña incorrectos.');
  }
  return {
    token: 'demo',
    user: { id: usuario.ID_Usuario, name: usuario.Nombre_Usuario, role: rolesPorId[usuario.ID_Rol] },
  };
}

// Organizaciones (solo las validadas pueden recibir donaciones y solicitudes)
export async function obtenerOrganizaciones() {
  return organizaciones.filter((org) => org.Estatus_Org === 'Activa');
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

// ---- Usuario actual (para Perfil) ----
export async function obtenerUsuarioActual() {
  const usuario = usuarios.find((u) => u.ID_Usuario === ID_USUARIO_ACTUAL);
  const rol = roles.find((r) => r.ID_Rol === usuario?.ID_Rol);
  return usuario ? { ...usuario, Nombre_Rol: rol?.Nombre_Rol ?? '' } : undefined;
}

// ---- Ubicación (para los formularios de Registro y Beneficiarios) ----
export async function obtenerColonias() {
  return colonias.map((colonia) => {
    const municipio = municipios.find((m) => m.ID_Municipio === colonia.ID_Municipio);
    const estado = estados.find((e) => e.ID_Estado === municipio?.ID_Estado);
    return {
      ...colonia,
      Nombre_Municipio: municipio?.Nombre_Municipio ?? '',
      Nombre_Estado: estado?.Nombre_Estado ?? ''
    };
  });
}

// ---- Catálogos ----
export async function obtenerCategorias() {
  return categorias;
}

export async function obtenerComercios() {
  return comercios;
}

// ---- Comercio: lotes ordenados del que caduca primero al último ----
export async function obtenerLotes() {
  const misInventarios = inventarios.filter((i) => i.ID_Comercio === ID_COMERCIO_ACTUAL);
  return lotes
    .filter((lote) => misInventarios.some((i) => i.ID_Inventario === lote.ID_Inventario))
    .map((lote) => {
      const inventario = misInventarios.find((i) => i.ID_Inventario === lote.ID_Inventario);
      return agregarAlimento({ ...lote, ID_Alimento: inventario.ID_Alimento });
    })
    .sort((a, b) => a.Fecha_Caducidad.localeCompare(b.Fecha_Caducidad));
}

// ---- Qué alimentos incluye una donación ----
export async function obtenerDetallesDonacion(idDonacion) {
  return detallesDonaciones
    .filter((detalle) => detalle.ID_Donacion === Number(idDonacion))
    .map((detalle) => {
      const lote = lotes.find((l) => l.ID_Lote === detalle.ID_Lote);
      const inventario = inventarios.find((i) => i.ID_Inventario === lote?.ID_Inventario);
      const alimento = alimentos.find((a) => a.ID_Alimento === inventario?.ID_Alimento);
      return { ...detalle, Nombre_Alimento: alimento?.Nombre_Alimento ?? 'Desconocido' };
    });
}

// ---- Organización: donaciones recibidas ----
function donacionesDeMiOrganizacion() {
  return donaciones.filter((d) => d.ID_Organizacion === ID_ORGANIZACION_ACTUAL);
}

function agregarComercio(donacion) {
  const comercio = comercios.find((c) => c.ID_Comercio === donacion.ID_Comercio);
  return { ...donacion, Nombre_Comercio: comercio ? comercio.Nombre_Comercio : 'Desconocido' };
}

export async function obtenerDonacionesRecibidas() {
  return donacionesDeMiOrganizacion().map(agregarComercio);
}

export async function obtenerDonacionRecibida(id) {
  const donacion = donacionesDeMiOrganizacion().find((d) => d.ID_Donacion === Number(id));
  return donacion ? agregarComercio(donacion) : undefined;
}

export async function confirmarRecepcion(id) {
  const donacion = donacionesDeMiOrganizacion().find((d) => d.ID_Donacion === Number(id));
  if (donacion?.Estado === 'Pendiente') {
    donacion.Estado = 'Entregada';
  }
  return donacion ? agregarComercio(donacion) : undefined;
}