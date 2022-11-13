import { action, makeObservable, observable } from 'mobx'

class UsersStore {
  constructor () {
    makeObservable(this, {
      users: observable,
      foundUsersIndexes: observable,
      setFoundUsersIndexes: action
    })
  }

  users: string[] = []
  foundUsersIndexes: number[] = []

  setUsers (value: string[]): void {
    this.users = value
  }

  setFoundUsersIndexes (usersIndexes: number[]): void {
    this.foundUsersIndexes = usersIndexes
  }

  getFoundUsersIndexes (value: string): number[] {
    const foundIndexes: number[] = []

    return this.users.reduce((acc, userName, index) => {
      if (new RegExp(value).test(userName)) {
        acc.push(index)
      }

      return acc
    }, foundIndexes)
  }
}

export default new UsersStore()