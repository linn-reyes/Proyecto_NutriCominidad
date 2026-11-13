import { defineConfig } from 'vite'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Busca todos los .html de la raíz y los agrega al build
const paginas = Object.fromEntries(
  readdirSync('.')
    .filter((archivo) => archivo.endsWith('.html'))
    .map((archivo) => [archivo.replace('.html', ''), resolve(archivo)])
)

export default defineConfig({
  build: {
    rolldownOptions: {
      input: paginas
    }
  }
})