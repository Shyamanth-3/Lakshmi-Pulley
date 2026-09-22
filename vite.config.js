import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // Vite's default output dir is "assets" (lowercase), which collides with the pre-existing
    // public/Assets/ (capitalized legacy images/PDFs) on case-insensitive filesystems (Windows/macOS
    // default). That merges the two into one directory, and `vite preview`'s static server then
    // fails to resolve /assets/*.js|css (case-sensitive match against the on-disk "Assets" entry),
    // silently falling back to index.html. Renaming avoids the collision outright.
    assetsDir: 'static',
  },
})
