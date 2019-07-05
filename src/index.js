import {render} from 'react-dom'

import App from './component/App.jsx'

document.addEventListener('DOMContentLoaded', function () {
  const container = document.createElement('span')
  document.body.appendChild(container)

  render(App(), container)
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(error => {
      console.error('Unable to register service worker:', error)
    })
  })
}
