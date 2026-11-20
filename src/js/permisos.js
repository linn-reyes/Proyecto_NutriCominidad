//Ajustar permisos de roles correctos

export const permisos = {
    usuarios: ['admin'],
    usuario: ['admin'],
}

export function puedeEntrar(pagina, rol) {
    const roles = permisos[pagina]
    return !roles || roles.includes(rol)
}