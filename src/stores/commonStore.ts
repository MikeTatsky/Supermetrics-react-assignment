import { action, makeObservable, observable } from 'mobx'
import postsStore from 'stores/postsStore'

class CommonStore {
  constructor () {
    makeObservable(this, {
      page: observable,
      searchByUsers: observable,
      searchByPosts: observable,
      selectedUserIndex: observable,
      postSortDir: observable,
      setPage: action,
      setSearchUser: action,
      setSortPostsDir: action
    })
  }

  page: number = 1
  searchByUsers: string = ''
  searchByPosts: string = ''
  selectedUserIndex: number | null = null
  postSortDir: 'ASC' | 'DESC' = 'DESC'

  setPage (value: number): void {
    if (value < 1) {
      value = 1
    } else if (value > 10) {
      value = 10
    }

    this.page = value
  }

  setSearchUser (value: string): void {
    this.searchByUsers = value
  }

  setSelectedUserIndex (value: number | null): void {
    if (value === null) {
      sessionStorage.removeItem('selected-user-index')
    }
    this.selectedUserIndex = value
    this.searchByPosts = ''
    postsStore.foundPostsIds = []
  }

  setSearchByPost (value: string): void {
    this.searchByPosts = value
  }

  setSortPostsDir (value: 'ASC' | 'DESC'): void {
    this.postSortDir = value
  }
}

export default new CommonStore()