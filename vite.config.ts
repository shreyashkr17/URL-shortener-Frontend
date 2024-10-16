import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define:{
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV)
  },
  base:'./',
  build:{
    outDir:'dist',
    assetsDir: 'assets',
    emptyOutDir:true
  }
})
