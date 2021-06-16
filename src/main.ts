import {render} from 'react-dom'

import App from './component/App'

document.addEventListener('DOMContentLoaded', function () {
  const container = document.createElement('span')
  document.body.appendChild(container)

  render(App(), container)
})

// if ('serviceWorker' in navigator) {
//   import(/* webpackChunkName: "workbox" */ 'workbox-window').then(({Workbox}) => {
//     new Workbox('/sw.js').register()
//   })
// }
