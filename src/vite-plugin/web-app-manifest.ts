import chalk from 'chalk'
import {readFile} from 'fs/promises'
import {dirname, join} from 'path'
import send from 'send'
import type {Plugin, ResolvedConfig} from 'vite'

import {manifestImages, resolveOptions, webAppManifest as createRollupPlugin} from '../rollup-plugin/web-app-manifest'
import type {Options} from '../rollup-plugin/web-app-manifest'

export function webAppManifest (options: Options): Plugin {
  const {
    inputPath,
    outputPath,
  } = resolveOptions(options)

  const rollupPlugin = createRollupPlugin(options)
  let config: ResolvedConfig
  let isServer = false
  let assetMap: {[path: string]: string}

  return {
    name: 'web-app-manifest',

    async configResolved (resolved) {
      config = resolved
    },

    async configureServer (server) {
      isServer = true
      const {middlewares, watcher} = server

      watcher.add(inputPath)
      watcher.on('add', handleManifestWatchEvent)
      watcher.on('change', handleManifestWatchEvent)
      watcher.on('unlink', handleManifestWatchEvent)
      await updateManifest()

      middlewares.use((request, response, next) => {
        if (typeof request.url !== 'string') return next()

        const url = new URL(request.url, 'http://a/')
        const path = url.pathname.substr(1)
        const filePath = assetMap[path]

        if (typeof filePath !== 'string') return next()

        send(request, filePath).pipe(response)
      })
    },

    async buildStart (...args) {
      if (!isServer) await rollupPlugin.buildStart.call(this, ...args)
    },

    async generateBundle (...args) {
      if (!isServer) await rollupPlugin.generateBundle.call(this, ...args)
    },

    async transformIndexHtml () {
      return [
        {tag: 'link', attrs: {rel: 'manifest', href: outputPath}},
      ]
    },
  }

  function handleManifestWatchEvent (path: string): void {
    if (path !== inputPath) return

    updateManifest().catch(error => {
      const originalMessage = error.message
      const message = typeof originalMessage === 'string' ? originalMessage : 'An unknown error occurred'

      config?.logger.warn(chalk.yellow(`Unable to update web app manifest: ${message}`))
    })
  }

  async function updateManifest (): Promise<void> {
    assetMap = {}
    let manifest, manifestJson

    try {
      manifestJson = await readFile(inputPath)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error

      return
    }

    assetMap[outputPath] = inputPath

    try {
      manifest = JSON.parse(manifestJson.toString('utf-8'))
    } catch (error) {
      return
    }

    const baseInputPath = dirname(inputPath)
    const baseOutputPath = dirname(outputPath)

    for (const {src} of manifestImages(manifest)) {
      assetMap[join(baseOutputPath, src)] = join(baseInputPath, src)
    }
  }
}
