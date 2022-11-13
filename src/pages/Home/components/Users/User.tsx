import React, { FC, MouseEvent, useCallback } from 'react'
import { Link } from 'react-router-dom'

import postsStore from 'stores/postsStore'
import commonStore from 'stores/commonStore'

import styles from './User.module.scss'

export interface IUser {
  name: string
  messages: number
  index: number
}

interface Props {
  data: IUser
  selected: boolean
  hidden: boolean
}

const User: FC<Props> = ({ data, selected, hidden }) => {
  const { name, messages, index } = data
  const classNames = [styles.container, 'animate']

  if (selected) {
    classNames.push(styles.selected)
  }

  if (hidden) {
    classNames.push(styles.hidden)
  }

  const onClick = useCallback(() => {
    const selectedIndex = commonStore.selectedUserIndex === index ? null : index
    commonStore.setSelectedUserIndex(selectedIndex)

    if (selectedIndex !== null) {
      sessionStorage.setItem('selected-user-index', String(selectedIndex))
    } else {
      sessionStorage.removeItem('selected-user-index')
    }

    postsStore.setForceClearPostsSearch(true)
  }, [index])

  const onMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
  }

  const link = name.toLocaleLowerCase().replace(' ', '-')

  return (
    <Link to={link}>
      <div
        className={classNames.join(' ')}
        onMouseDown={onMouseDown}
        onClick={onClick}>
        <div className={styles.name}>{name}</div>
        <div className={styles['num-messages']}>
          <p className={styles['num-messages-inner']}>{messages}</p>
        </div>
      </div>
    </Link>
  )
}

export default User