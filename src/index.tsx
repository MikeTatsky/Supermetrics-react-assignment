import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import authStore from 'stores/authStore'
import commonStore from 'stores/commonStore'
import usersStore from 'stores/usersStore'
import postsStore from 'stores/postsStore'

import 'scss/main.scss'

const stores = {
  authStore,
  commonStore,
  usersStore,
  postsStore
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>
)