import { defineConfig } from 'vite'

const repoName = 'portfolio-3d'

export default defineConfig({
    base: `/${repoName}/`,
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    server: {
        port: 5173,
        open: true,
    },
})
