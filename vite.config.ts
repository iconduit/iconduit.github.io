import {join} from 'path'

import reactRefreshPlugin from '@vitejs/plugin-react-refresh'
// import {generateSW} from 'rollup-plugin-workbox'
import {defineConfig} from 'vite'

import {viteIconduitPlugin as iconduitPlugin} from './src/vite-plugin/iconduit'

export default defineConfig(({mode}) => {
  // Vite seems to magically make __dirname available
  const root = join(__dirname, 'src')
  const outDir = join(__dirname, 'artifacts/vite/build', mode)

  return {
    root,
    build: {
      assetsInlineLimit: 0,
      emptyOutDir: true,
      outDir,
    },
    plugins: [
      // generateSW({
      //   globDirectory: outDir,
      //   swDest: join(outDir, 'sw.js'),
      // }),
      iconduitPlugin({
        manifestPath: 'iconduit/site.iconduitmanifest',
      }),
      reactRefreshPlugin(),
    ],
    // assetsInclude: ['.webmanifest'],
  }
})
