import {basename, dirname, relative, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {Plugin} from 'rollup'

export interface Options {
  compact?: boolean
  indent?: string
  inputPath: string
  outputPath?: string
}

export interface ResolvedOptions {
  compact: boolean
  indent: string
  inputPath: string
  outputPath: string
}

export function manifestImages (manifest: Manifest): Image[] {
  const {icons = [], screenshots = []} = manifest

  return [...icons, ...screenshots]
}

export function resolveOptions (options: Options): ResolvedOptions {
  const {
    compact = process.env.NODE_ENV === 'production',
    indent = '  ',
    inputPath,
    outputPath = 'app.webmanifest',
  } = options

  return {
    compact,
    indent,
    inputPath,
    outputPath,
  }
}

type WebAppManifestPlugin = Plugin & {
  buildStart: NonNullable<Plugin['buildStart']>
  generateBundle: NonNullable<Plugin['generateBundle']>
}

export function webAppManifest (options: Options): WebAppManifestPlugin {
  const {
    compact,
    indent,
    inputPath,
    outputPath,
  } = resolveOptions(options)

  let emittedImages: {[src: string]: string}
  let manifest: Manifest

  return {
    name: 'web-app-manifest',

    async buildStart (): Promise<void> {
      emittedImages = {}
      const basePath = dirname(inputPath)

      this.addWatchFile(inputPath)

      const manifestJson = await readFile(inputPath)
      manifest = JSON.parse(manifestJson.toString('utf-8'))

      await Promise.all(manifestImages(manifest).map(async ({src}) => {
        const imagePath = resolve(basePath, src)

        this.addWatchFile(imagePath)

        const referenceId = this.emitFile({
          type: 'asset',
          name: basename(imagePath),
          source: await readFile(imagePath),
        })

        emittedImages[src] = referenceId
      }))
    },

    async generateBundle (): Promise<void> {
      const imageMap = Object.fromEntries(
        Object.entries(emittedImages).map(([src, referenceId]) => {
          return [src, this.getFileName(referenceId)]
        }),
      )

      const basePath = dirname(outputPath)
      for (const image of manifestImages(manifest)) image.src = relative(basePath, imageMap[image.src])

      this.emitFile({
        type: 'asset',
        fileName: outputPath,
        source: JSON.stringify(manifest, null, compact ? '' : indent),
      })
    },
  }
}

interface Image {
  src: string
}

interface Manifest {
  icons: Image[] | undefined
  screenshots: Image[] | undefined
}
