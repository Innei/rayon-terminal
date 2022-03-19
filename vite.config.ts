import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Icons from 'unplugin-icons/vite'
import WindiCSS from 'vite-plugin-windicss'

import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  base: './',
  plugins: [
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),
    solidPlugin(),
    WindiCSS(),
    Icons({
      compiler: 'solid',
    }),
  ],
  define: {
    // @ts-ignore
    __DEV__: process.env.NODE_ENV === 'development',
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})
