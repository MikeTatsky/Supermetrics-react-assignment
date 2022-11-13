import React, { FC, useLayoutEffect } from 'react'
import { observer } from 'mobx-react'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'

import authStore from 'stores/authStore'

const App: FC = () => {
  useLayoutEffect(() => {
    const sslToken = localStorage.getItem('sslKey')
    if (sslToken) {
      authStore.setSSLToken(sslToken)
    }
  }, [])

  return (
    <div className="App">
      {
        authStore.sslToken ? <Home/> : <Login/>
      }
    </div>
  )
}

export default observer(App)
