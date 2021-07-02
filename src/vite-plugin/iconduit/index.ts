import {readConsumer} from '@iconduit/consumer'
import {join, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {Plugin} from 'vite'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  let consumer
  let manifestPath: string
  let webAppManifestOutputPath: string

  return [
    {
      name: 'vite-plugin-iconduit',

      async buildStart () {
        consumer = readConsumer(manifestPath)

        const webAppManifestPath = consumer.absoluteDocumentPath('webAppManifest')
        const webAppManifestSource = await readFile(webAppManifestPath)

        this.emitFile({
          type: 'asset',
          fileName: webAppManifestOutputPath,
          source: webAppManifestSource,
        })
      },

      async configResolved (config) {
        const {
          build: {
            assetsDir,
          },
          root,
        } = config

        manifestPath = resolve(root, options.manifestPath)
        webAppManifestOutputPath = join(assetsDir, 'app.webmanifest')
      },

      async transformIndexHtml () {
        return [
          {tag: 'link', attrs: {rel: 'manifest', href: webAppManifestOutputPath}},
        ]
      },
    },
  ]
}
