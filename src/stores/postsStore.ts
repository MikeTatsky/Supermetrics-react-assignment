import { action, makeObservable, observable } from 'mobx'

import commonStore from 'stores/commonStore'

import { IPost } from 'pages/Home/components/Posts/Post'

class PostsStore {
  constructor () {
    makeObservable(this, {
      foundPostsIds: observable,
      forceClearPostsSearch: observable,
      setSortedPosts: action,
      setFoundPostsIds: action,
      setForceClearPostsSearch: action
    })
  }

  postsByUsers: IPost[][] = []
  foundPostsIds: string[] = []
  forceClearPostsSearch: boolean = false

  setSortedPosts (values: IPost[][]): void {
    this.postsByUsers = values
  }

  getFoundPostIds (value: string): string[] {
    const foundPostIds: string[] = []

    if (commonStore.selectedUserIndex === null) {
      return foundPostIds
    }

    return this.postsByUsers[commonStore.selectedUserIndex].reduce((acc: string[], post: IPost) => {
      if (new RegExp(value.toLocaleLowerCase()).test(post.message.toLocaleLowerCase())) {
        foundPostIds.push(post.id)
      }

      return foundPostIds
    }, foundPostIds)
  }

  setFoundPostsIds (postsIds: string[]): void {
    this.foundPostsIds = postsIds
  }

  setForceClearPostsSearch (value: boolean): void {
    this.forceClearPostsSearch = value
  }
}

export default new PostsStore()