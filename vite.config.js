import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Thư mục đầu ra do scripts/build.mjs truyền vào (QTOPIA_BUILD_DIR / QTOPIA_SSR_DIR).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
