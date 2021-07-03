import {basename, dirname, relative, resolve} from 'path'
import {readFile} from 'fs/promises'
import type {Plugin} from 'rollup'

export interface Options {
  inputPath: string
  outputPath?: string
  shouldIndent?: boolean
}

export interface ResolvedOptions {
  inputPath: string
  outputPath: string
  shouldIndent: boolean
}

export function resolveOptions (options: Options): ResolvedOptions {
  const {
    inputPath,
    outputPath = 'app.webmanifest',
    shouldIndent = process.env.NODE_ENV !== 'production',
  } = options

  return {
    inputPath,
    outputPath,
    shouldIndent,
  }
}

export function webAppManifest (options: Options): Plugin {
  const {
    inputPath,
    outputPath,
    shouldIndent,
  } = resolveOptions(options)

  let emittedImages: {[src: string]: string}
  let manifest: Manifest

  return {
    name: 'web-app-manifest',

    async buildStart (): Promise<void> {
      emittedImages = {}

      const basePath = dirname(inputPath)
      const manifestJson = await readFile(inputPath)
      manifest = JSON.parse(manifestJson.toString('utf-8'))

      await Promise.all(manifestImages(manifest).map(async ({src}) => {
        const imagePath = resolve(basePath, src)

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
        source: JSON.stringify(manifest, null, shouldIndent ? 2 : 0),
      })
    },
  }
}

function manifestImages (manifest: Manifest): Image[] {
  const {icons = [], screenshots = []} = manifest

  return [...icons, ...screenshots]
}

interface Image {
  src: string
}

interface Manifest {
  icons: Image[] | undefined
  screenshots: Image[] | undefined
}
