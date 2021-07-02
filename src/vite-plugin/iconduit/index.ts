import {readConsumer} from '@iconduit/consumer'
import {join, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {Plugin} from 'vite'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  let manifestPath: string
  let webAppManifestOutputPath: string

  return [
    {
      name: 'vite-plugin-iconduit',

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

    const webAppManifestSource = await readFile(webAppManifestPath)

    context.emitFile({
      type: 'asset',
      fileName: webAppManifestOutputPath,
      source: webAppManifestSource,
    })
  }
}
