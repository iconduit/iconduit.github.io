import {readConsumer} from '@iconduit/consumer'
import {join, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {Plugin} from 'vite'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  let assetsDir: string
  let consumer
  let manifestPath: string

  return [
    {
      name: 'vite-plugin-iconduit',

      async buildStart () {
        consumer = readConsumer(manifestPath)

        const webAppManifestPath = consumer.absoluteDocumentPath('webAppManifest')
        const webAppManifestSource = await readFile(webAppManifestPath)

        this.emitFile({
          type: 'asset',
          fileName: join(assetsDir, 'app.webmanifest'),
          source: webAppManifestSource,
        })
      },

      async configResolved (config) {
        assetsDir = config.build.assetsDir
        manifestPath = resolve(config.root, options.manifestPath)
      },

      async transformIndexHtml () {
        return [
          {tag: 'link', attrs: {rel: 'manifest', href: 'iconduit/site.webmanifest'}},
        ]
      },
    },
  ]
}
