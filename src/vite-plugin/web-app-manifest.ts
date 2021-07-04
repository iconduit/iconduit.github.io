import type {Plugin} from 'vite'

import {resolveOptions, webAppManifest as createRollupPlugin} from '../rollup-plugin/web-app-manifest'
import type {Options} from '../rollup-plugin/web-app-manifest'

export function webAppManifest (options: Options): Plugin {
  const {
    outputPath,
  } = resolveOptions(options)

  const rollupPlugin = createRollupPlugin(options)
  let isServer = false

  return {
    name: 'web-app-manifest',

    async configureServer () {
      isServer = true
    },

    async buildStart (...args) {
      if (!isServer) await rollupPlugin.buildStart.call(this, ...args)
    },

    async generateBundle (...args) {
      if (!isServer) await rollupPlugin.generateBundle.call(this, ...args)
    },

    async transformIndexHtml () {
      return [
        {tag: 'link', attrs: {rel: 'manifest', href: outputPath}},
      ]
    },
  }
}
