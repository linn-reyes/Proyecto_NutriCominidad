export const permisos = {
    home: ['usuario'],
    'home-organizacion': ['organizacion'],
    'home-comercio': ['comercio'],
}

export function puedeEntrar(pagina, rol) {
    const roles = permisos[pagina]
    return !roles || roles.includes(rol)
}