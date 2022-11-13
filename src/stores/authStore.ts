import { action, makeObservable, observable } from 'mobx'

class AuthStore {
  constructor () {
    makeObservable(this, {
      sslToken: observable,
      setSSLToken: action
    })
  }

  sslToken: string | null = null

  setSSLToken (value: string | null): void {
    if (value === null) {
      localStorage.removeItem('sslKey')
      sessionStorage.removeItem('selected-user-index')
    } else {
      localStorage.setItem('sslKey', value)
    }
    this.sslToken = value
  }
}

export default new AuthStore()