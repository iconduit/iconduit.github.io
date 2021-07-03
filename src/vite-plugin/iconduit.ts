import {readConsumer} from '@iconduit/consumer'
import {basename, dirname, join, relative, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {PluginContext} from 'rollup'
import type {Plugin} from 'vite'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  let emittedAssets: {[src: string]: string}
  let jsonStringify: (any) => string
  let manifestPath: string
  let outDir: string
  let webAppManifest: WebAppManifest|undefined
  let webAppManifestOutputPath: string
  let webAppManifestOutputUrl: string

  return [
    {
      name: 'vite-plugin-iconduit',

      async configResolved (config) {
        outDir = config.build.outDir

        const assetsDir = config.build.assetsDir
        const absoluteAssetsDir = resolve(outDir, assetsDir)

        manifestPath = resolve(config.root, options.manifestPath)
        jsonStringify = value => JSON.stringify(value, null, config.mode === 'production' ? 0 : 2)

        webAppManifestOutputPath = resolve(absoluteAssetsDir, 'app.webmanifest')
        webAppManifestOutputUrl = join(assetsDir, 'app.webmanifest')
      },

      async buildStart () {
        const consumer = readConsumer(manifestPath)

        emittedAssets = {}
        webAppManifest = await loadWebAppManifest(this, consumer.absoluteDocumentPath('webAppManifest'))
      },

      async generateBundle () {
        const assetMap = Object.fromEntries(
          Object.entries(emittedAssets).map(([src, referenceId]) => {
            return [src, resolve(outDir, this.getFileName(referenceId))]
          }),
        )

        if (typeof webAppManifest !== 'undefined') {
          const webAppManifestOutputDirPath = dirname(webAppManifestOutputPath)

          const {icons = [], screenshots = []} = webAppManifest
          const images = [...icons, ...screenshots]

          for (const image of images) image.src = relative(webAppManifestOutputDirPath, assetMap[image.src])

          this.emitFile({
            type: 'asset',
            fileName: webAppManifestOutputUrl,
            source: jsonStringify(webAppManifest),
          })
        }
      },

      async transformIndexHtml () {
        return [
          {tag: 'link', attrs: {rel: 'manifest', href: webAppManifestOutputUrl}},
        ]
      },
    },
  ]

  async function loadWebAppManifest (
    context: PluginContext,
    webAppManifestPath: string|null,
  ): Promise<WebAppManifest|undefined> {
    if (typeof webAppManifestPath !== 'string') return undefined

    const webAppManifestDirPath = dirname(webAppManifestPath)
    const webAppManifest = JSON.parse((await readFile(webAppManifestPath)).toString('utf-8'))
    const {icons = [], screenshots = []} = webAppManifest
    const images = [...icons, ...screenshots]

    await Promise.all(images.map(async ({src}) => {
      const imagePath = resolve(webAppManifestDirPath, src)

      const referenceId = context.emitFile({
        type: 'asset',
        name: basename(imagePath),
        source: await readFile(imagePath),
      })

      emittedAssets[src] = referenceId
    }))

    return webAppManifest
  }
}

interface WebAppManifestImage {
  src: string
}

interface WebAppManifest {
  icons: WebAppManifestImage[]|undefined
  screenshots: WebAppManifestImage[]|undefined
}
