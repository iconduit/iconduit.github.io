import type {Plugin} from 'vite'

export interface ViteIconduitOptions {
  manifestPath: string
}

export function viteIconduitPlugin (options: ViteIconduitOptions): Plugin[] {
  return [
    {
      name: 'vite-plugin-iconduit',
      transformIndexHtml () {
        return [
          {tag: 'link', attrs: {rel: 'manifest', href: 'iconduit/site.webmanifest'}},
        ]
      },
    },
  ]
}
