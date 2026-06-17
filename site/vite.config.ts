import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/phoxel-workbench/',
  plugins: [react()],
})
