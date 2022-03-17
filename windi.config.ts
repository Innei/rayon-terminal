import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css,html}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  darkMode: 'media',
})
