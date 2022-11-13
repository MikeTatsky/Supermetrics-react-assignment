import React, { FC, ReactNode } from 'react'
import styles from './Box.module.scss'

interface Props {
  children: ReactNode
  width?: number
  height?: number
  dashed?: boolean
  rounded?: boolean
}

const Box: FC<Props> = (props) => {
  const classNames = [styles.container]

  if (props.dashed === true) {
    classNames.push(styles.dashed)
  }

  if (props.rounded === true) {
    classNames.push(styles.rounded)
  }

  return (
    <div
      style={{
        width: String(props.width ?? '') + 'px',
        height: String(props.height ?? '') + 'px'
      }}
      className={classNames.join(' ')}>
      {props.children}
    </div>
  )
}

export default Box