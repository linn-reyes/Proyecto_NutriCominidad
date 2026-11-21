// Páginas que cualquiera puede ver sin iniciar sesión
const PUBLICAS = ['index', 'login', 'registro'];

// Qué rol puede entrar a cada página privada
export const permisos = {
  // Usuario
  home: ['usuario'],
  'recetas-cliente': ['usuario'],
  'receta-detalle-cli': ['usuario'],
  'recomendaciones-clientes': ['usuario'],
  'preferencias-clientes': ['usuario'],
  'preferencia-detalle-cli': ['usuario'],
  'preferencia-form-cli': ['usuario'],
  'solicitudes-clientes': ['usuario'],
  'solicitud-detalle-cli': ['usuario'],
  'solicitud-form-cli': ['usuario'],
  // Comercio
  'home-comercio': ['comercio'],
  'inventarios-com': ['comercio'],
  'inventario-detalle-com': ['comercio'],
  'inventario-form-com': ['comercio'],
  'donaciones-com': ['comercio'],
  'donacion-detalle-com': ['comercio'],
  'donacion-form-com': ['comercio'],
  'lotes-com': ['comercio'],
  'lote-detalle-com': ['comercio'],
  'lote-form-com': ['comercio'],
  // Organización
  'home-organizacion': ['organizacion'],
  'solicitudes-org': ['organizacion'],
  'solicitud-detalle-org': ['organizacion'],
  'solicitud-form-org': ['organizacion'],
  'entregas-org': ['organizacion'],
  'entrega-detalle-org': ['organizacion'],
  'entrega-form-org': ['organizacion'],
  'donaciones-org': ['organizacion'],
  'donacion-detalle-org': ['organizacion'],
  'beneficiarios-org': ['organizacion'],
  'beneficiario-detalle-org': ['organizacion'],
  'beneficiario-form-org': ['organizacion'],
  // Administrador
  'home-admin': ['admin'],
  'organizaciones-admin': ['admin'],
  'organizacion-detalle-admin': ['admin'],
};

// A dónde va cada rol al iniciar sesión
export const inicioPorRol = {
  usuario: '/home.html',
  comercio: '/home-comercio.html',
  organizacion: '/home-organizacion.html',
  admin: '/home-admin.html'
};

// "/inventarios-com.html" → "inventarios-com"
export function paginaActual() {
  const archivo = location.pathname.split('/').pop() || 'index.html';
  return archivo.replace('.html', '');
}

export function puedeEntrar(pagina, rol) {
  if (PUBLICAS.includes(pagina)) {
    return true;
  }
  return permisos[pagina]?.includes(rol) ?? false;
}