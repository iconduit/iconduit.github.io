import {join} from 'path'

import reactRefreshPlugin from '@vitejs/plugin-react-refresh'
// import {generateSW} from 'rollup-plugin-workbox'
import {defineConfig} from 'vite'

export default ({mode}) => {
  // Vite seems to magically make __dirname available
  const root = join(__dirname, 'src')
  const outDir = join(__dirname, 'artifacts/vite/build', mode)

  return defineConfig({
    root,
    build: {
      outDir,
    },
    plugins: [
      // generateSW({
      //   globDirectory: outDir,
      //   swDest: join(outDir, 'sw.js'),
      // }),
      reactRefreshPlugin(),
    ],
  })
}
