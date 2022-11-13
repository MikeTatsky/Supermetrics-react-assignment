import React, { FC, ReactNode, CSSProperties } from 'react'

import styles from './FormField.module.scss'

interface Props {
  children?: ReactNode
  label?: string
  style?: CSSProperties
  errorMsg?: string
}

const FormField: FC<Props> = ({ children, label, style, errorMsg }) => {
  const classNames = [styles.container]

  if (errorMsg) {
    classNames.push(styles.fieldError)
  }

  return (
    <div
      style={{ ...style }}
      className={styles.container}>
      <label className={classNames.join(' ')}>{label}</label>
      {children}
      {errorMsg && <div className={styles.error}>{errorMsg}</div>}
    </div>
  )
}

export default FormField