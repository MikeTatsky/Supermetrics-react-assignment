import React, { FC } from 'react'
import { observer } from 'mobx-react'

import styles from './Users.module.scss'
import User from './User'

import commonStore from 'stores/commonStore'
import usersStore from 'stores/usersStore'
import postsStore from 'stores/postsStore'

interface Props {
  isLoading: boolean
}

const Users: FC<Props> = ({ isLoading }) => {
  return (
    <div className={[styles.container, 'light-scrollbar'].join(' ')}>{
      isLoading
        ? <div className={styles.loading}>Loading...</div>
        : usersStore.users.map((itemName, index) => {
          return (<User
          key={itemName}
          selected={commonStore.selectedUserIndex === index}
          hidden={commonStore.searchByUsers === '' ? false : !usersStore.foundUsersIndexes.includes(index)}
          data={{
            name: itemName,
            messages: postsStore.postsByUsers[index].length,
            index
          }}
        />)
        })
    }</div>
  )
}

export default observer(Users)