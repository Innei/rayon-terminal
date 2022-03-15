import Mdi from '@iconify-json/mdi'
import presetIcons from '@unocss/preset-icons'
import presetWind from '@unocss/preset-wind'
import transformerDirective from '@unocss/transformer-directives'
import { presetAttributify, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
export default defineConfig({
  base: './',
  plugins: [
    solidPlugin(),
    Unocss({
      transformers: [transformerDirective()],
      presets: [
        presetWind({ dark: 'media' }),
        presetAttributify({}),
        presetUno(),
        presetIcons({
          collections: { mdi: Mdi.icons },
        }),
      ],
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})
