import type {Plugin} from 'vite'

import {resolveOptions, webAppManifest as rollupPlugin} from '../rollup-plugin/web-app-manifest'
import type {Options} from '../rollup-plugin/web-app-manifest'

export function webAppManifest (options: Options): Plugin {
  const {
    outputPath,
  } = resolveOptions(options)

  return {
    ...rollupPlugin(options),

    async transformIndexHtml () {
      return [
        {tag: 'link', attrs: {rel: 'manifest', href: outputPath}},
      ]
    },
  }
}
