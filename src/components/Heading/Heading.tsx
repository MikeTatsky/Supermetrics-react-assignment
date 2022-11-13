import React, { FC, ReactNode } from 'react'
import styles from './Heading.module.scss'

interface Props {
  children: ReactNode
}

const Heading: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>{children}</h3>
    </div>
  )
}

export default Heading