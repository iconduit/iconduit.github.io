import {readConsumer} from '@iconduit/consumer'
import {join, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {Plugin} from 'vite'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  let manifestPath: string
  let jsonStringify: (any) => string
  let webAppManifestOutputPath: string

  return [
    {
      name: 'vite-plugin-iconduit',

      async configResolved (config) {
        manifestPath = resolve(config.root, options.manifestPath)
        jsonStringify = value => JSON.stringify(value, null, config.mode === 'production' ? 0 : 2)
        webAppManifestOutputPath = join(config.build.assetsDir, 'app.webmanifest')
      },

      async buildStart () {
        const consumer = readConsumer(manifestPath)

        processWebAppManifest(this, consumer.absoluteDocumentPath('webAppManifest'))
      },

      async transformIndexHtml () {
        return [
          {tag: 'link', attrs: {rel: 'manifest', href: webAppManifestOutputPath}},
        ]
      },
    },
  ]

  async function processWebAppManifest (context, webAppManifestPath: string|null): void {
    if (typeof webAppManifestPath !== 'string') return

    const webAppManifest = JSON.parse(await readFile(webAppManifestPath))

    context.emitFile({
      type: 'asset',
      fileName: webAppManifestOutputPath,
      source: jsonStringify(webAppManifest),
    })
  }
}
