import presetWind from '@unocss/preset-wind'
import transformerDirective from '@unocss/transformer-directives'
import { presetAttributify, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      transformers: [transformerDirective()],
      presets: [
        presetWind({ dark: 'class' }),
        presetAttributify({}),
        presetUno(),
      ],
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})
