import type {Plugin} from 'vite'

export function ViteWorkboxPlugin (): Plugin[] {
  return [
    {
      name: 'vite-plugin-workbox:virtual',
    },
  ]
}
