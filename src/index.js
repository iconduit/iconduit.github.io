import {render} from 'react-dom'

import App from './component/App.jsx'

document.addEventListener('DOMContentLoaded', function () {
  const container = document.createElement('span')
  document.body.appendChild(container)

  render(App(), container)
})
