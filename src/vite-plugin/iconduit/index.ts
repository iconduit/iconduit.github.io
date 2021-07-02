import {readConsumer} from '@iconduit/consumer'
import {basename, dirname, join, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {Plugin} from 'vite'
import urlParse from 'url-parse'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  let assetsDir: string
  let manifestPath: string
  // let jsonStringify: (any) => string
  let webAppManifestOutputPath: string

  return [
    {
      name: 'vite-plugin-iconduit',

      async configResolved (config) {
        assetsDir = config.build.assetsDir
        manifestPath = resolve(config.root, options.manifestPath)
        // jsonStringify = value => JSON.stringify(value, null, config.mode === 'production' ? 0 : 2)
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

    const webAppManifestDirPath = dirname(webAppManifestPath)
    const webAppManifest = JSON.parse(await readFile(webAppManifestPath))
    const {icons = [], screenshots = []} = webAppManifest
    const images = [...icons, ...screenshots]

    return await Promise.all(images.map(async image => {
      const srcUrl = urlParse(image.src)
      const imagePath = resolve(webAppManifestDirPath, srcUrl.pathname)

      const referenceId = context.emitFile({
        type: 'asset',
        name: basename(imagePath),
        source: await readFile(imagePath),
      })

      return {referenceId, srcUrl}
    }))
  }
}
