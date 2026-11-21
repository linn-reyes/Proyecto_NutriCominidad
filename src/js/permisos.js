export const permisos = {
    home: ['usuario'],
    usuario: ['admin'],
}

export function puedeEntrar(pagina, rol) {
    const roles = permisos[pagina]
    return !roles || roles.includes(rol)
}