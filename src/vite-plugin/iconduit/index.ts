import {readConsumer} from '@iconduit/consumer'
import {basename, dirname, join, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {PluginContext} from 'rollup'
import type {Plugin} from 'vite'
import urlParse from 'url-parse'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  let assetsDir: string
  let emittedAssets: {[src: string]: string}
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

        emittedAssets = {}
        await processWebAppManifest(this, consumer.absoluteDocumentPath('webAppManifest'))
      },

      async generateBundle () {
        console.log(emittedAssets)
      },

      async transformIndexHtml () {
        return [
          {tag: 'link', attrs: {rel: 'manifest', href: webAppManifestOutputPath}},
        ]
      },
    },
  ]

  async function processWebAppManifest (
    context: PluginContext,
    webAppManifestPath: string|null,
  ): Promise<void> {
    if (typeof webAppManifestPath !== 'string') return

    const webAppManifestDirPath = dirname(webAppManifestPath)
    const webAppManifest = JSON.parse((await readFile(webAppManifestPath)).toString('utf-8'))
    const {icons = [], screenshots = []} = webAppManifest
    const images = [...icons, ...screenshots]

    await Promise.all(images.map(async ({src}) => {
      const {pathname} = urlParse(src)
      const imagePath = resolve(webAppManifestDirPath, pathname)

      const referenceId = context.emitFile({
        type: 'asset',
        name: basename(imagePath),
        source: await readFile(imagePath),
      })

      emittedAssets[src] = referenceId
    }))
  }
}
