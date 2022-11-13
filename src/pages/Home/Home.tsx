import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'

import { Input, Button } from 'components'
import Posts from './components/Posts/Posts'
import Users from './components/Users/Users'

import { IPost } from './components/Posts/Post'
import authStore from 'stores/authStore'

import commonStore from 'stores/commonStore'
import usersStore from 'stores/usersStore'
import postsStore from 'stores/postsStore'

import styles from './Home.module.scss'

const URL_GET_POSTS = 'https://api.supermetrics.com/assignment/posts'

function preparePosts (posts: any[]): [string[], IPost[][]] {
  const usersWithPosts: {
    [key: string]: IPost[]
  } = {}

  posts.forEach(post => {
    usersWithPosts[post.from_name] ||= []
    usersWithPosts[post.from_name].push(post)
  })

  const userNames: string[] = Object.keys(usersWithPosts).sort()
  const sortedPosts = userNames.map(userName => {
    return usersWithPosts[userName]
  })

  return [userNames, sortedPosts]
}

const Home: FC = () => {
  const [isLoading, setLoading] = useState(false)
  const searchPostRef = React.useRef<HTMLInputElement>(null)
  const [page, setPage] = useState<number>(commonStore.page)

  useEffect(() => {
    setLoading(true)

    axios.get(URL_GET_POSTS, {
      params: {
        sl_token: authStore.sslToken,
        page
      }
    })
      .then(res => {
        const { posts } = res.data.data
        const [users, sortedPosts] = preparePosts(posts)

        usersStore.setUsers(users)
        postsStore.setSortedPosts(sortedPosts)

        const selectedUserIndex = sessionStorage.getItem('selected-user-index')

        commonStore.setSelectedUserIndex(selectedUserIndex === null ? null : Number(selectedUserIndex))
        setLoading(false)
      })
      .catch(e => {
        authStore.setSSLToken(null)
        console.log(e)
      })
  }, [page])

  reaction(() => commonStore.page, () => {
    setPage(commonStore.page)
  })

  reaction(() => postsStore.forceClearPostsSearch, (value) => {
    if (value) {
      postsStore.setForceClearPostsSearch(false)
      // @ts-expect-error
      searchPostRef.current.value = ''
      searchPostRef?.current?.blur?.()
    }
  })

  const onChangeSearchUser = debounce((value: string) => {
    commonStore.setSearchUser(value)

    if (value !== '') {
      const foundUsersIndexes = usersStore.getFoundUsersIndexes(value)
      usersStore.setFoundUsersIndexes(foundUsersIndexes)
    } else {
      usersStore.setFoundUsersIndexes([])
    }
  }, 700)

  const onChangeSearchPost = debounce((value: string) => {
    commonStore.setSearchByPost(value)

    if (value !== '' && commonStore.selectedUserIndex !== null) {
      const foundPostsIds = postsStore.getFoundPostIds(value)

      postsStore.setFoundPostsIds(foundPostsIds)
    } else {
      commonStore.setSearchByPost('')
    }
  }, 700)

  const onSortPostASC = (): void => {
    commonStore.setSortPostsDir('ASC')
  }

  const onSortPostDESC = (): void => {
    commonStore.setSortPostsDir('DESC')
  }

  const onPageBack = (): void => {
    commonStore.setPage(commonStore.page - 1)
    commonStore.setSelectedUserIndex(null)
  }

  const onPageNext = (): void => {
    commonStore.setPage(commonStore.page + 1)
    commonStore.setSelectedUserIndex(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.nav}>
          <Input
            placeHolder='Search'
            onChange={onChangeSearchUser}
          />
          <div className={styles.buttonsContainer}>
            <Button selected={commonStore.postSortDir === 'ASC'} img='chevronDown' onClick={onSortPostASC}></Button>
            <Button selected={commonStore.postSortDir === 'DESC'} img='chevronUp' onClick={onSortPostDESC}></Button>
            <div className={styles.separator}></div>
            <Button
              disabled={commonStore.page === 1}
              img='chevronLeft'
              onClick={onPageBack}></Button>
            <Input
              readOnly={true}
              width={35}
              value={String(commonStore.page)}
            />
            <Button
              disabled={commonStore.page === 10}
              img='chevronRight'
              onClick={onPageNext}></Button>
          </div>
          <div className={styles['ml-auto']}></div>
          <Input
            disabled={commonStore.selectedUserIndex === null}
            inputRef={searchPostRef}
            placeHolder='Search'
            onChange={onChangeSearchPost}
          />
        </div>
      </div>
      <div className={styles['main-body']}>
        <Users isLoading={isLoading} />
        <Posts/>
      </div>
    </div>
  )
}

export default observer(Home)