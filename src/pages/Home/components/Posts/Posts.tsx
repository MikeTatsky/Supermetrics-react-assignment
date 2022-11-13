import React, { FC } from 'react'
import { observer } from 'mobx-react'
import Post from './Post'
import commonStore from 'stores/commonStore'
import postsStore from 'stores/postsStore'

import styles from './Posts.module.scss'
import { ReactComponent as Star } from 'assets/img/Stars.svg'

const Posts: FC = () => {
  return (
    <div className={[styles.container, 'light-scrollbar'].join(' ')}>
      {commonStore.selectedUserIndex === null
        ? <div className={styles['no-data']}>
            <Star/>
            Select user to display posts
          </div>
        : postsStore.postsByUsers[commonStore.selectedUserIndex]
          .sort((itemA, itemB) => commonStore.postSortDir === 'ASC'
            ? +new Date(itemA.created_time) - +new Date(itemB.created_time)
            : +new Date(itemB.created_time) - +new Date(itemA.created_time)
          ).map(item =>
          <Post
            key={item.id}
            data={item}
            hidden={commonStore.searchByPosts === '' ? false : !postsStore.foundPostsIds.includes(item.id)}
          />)}
    </div>
  )
}

export default observer(Posts)