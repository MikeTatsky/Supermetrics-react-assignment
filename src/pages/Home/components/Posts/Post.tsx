import React, { FC } from 'react'

import styles from './Post.module.scss'

export interface IPost {
  id: string
  from_name: string
  from_id: string
  message: string
  type: string
  created_time: string
}

interface Props {
  data: IPost
  hidden: boolean
}

const Post: FC<Props> = ({ data, hidden }) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { message, created_time } = data

  const classNames = [styles.container]

  if (hidden) {
    classNames.push(styles.hidden)
  }

  return (
    <div className={classNames.join(' ')}>
      <div className={styles.time}>{created_time}</div>
      <div className={styles.message}>{message}</div>
    </div>
  )
}

export default Post