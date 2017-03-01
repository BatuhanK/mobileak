import './style/index.less'

import {h, render} from 'preact'

let root
function init() {
  let App = require('./containers/App')
  root = render(<App/>, document.querySelector('#app'), root)
}

init()

if (module.hot) {
  module.hot.accept('./containers/App', () => window.requestAnimationFrame(() => {
    init()
  }))
}
