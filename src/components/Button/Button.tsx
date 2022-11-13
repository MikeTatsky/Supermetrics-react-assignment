import React, { CSSProperties, FC, ReactNode } from 'react'

import styles from './Button.module.scss'

import { ReactComponent as ChevronDown } from 'assets/img/ChevronDown.svg'
import { ReactComponent as ChevronUp } from 'assets/img/ChevronUp.svg'
import { ReactComponent as ChevronLeft } from 'assets/img/ChevronLeft.svg'
import { ReactComponent as ChevronRight } from 'assets/img/ChevronRight.svg'

interface Props {
  children?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  style?: CSSProperties
  img?: string
  selected?: boolean
  disabled?: boolean
}

const renderImg = (img?: string): ReactNode | null => {
  switch (img) {
    case 'chevronDown':
      return <ChevronDown/>
    case 'chevronUp':
      return <ChevronUp/>
    case 'chevronLeft':
      return <ChevronLeft/>
    case 'chevronRight':
      return <ChevronRight/>
    default:
      return null
  }
}

const Button: FC<Props> = ({ children, onClick, style, img, selected, disabled }) => {
  const classNames = [styles.button, 'animate']

  if (selected) {
    classNames.push(styles.selected)
  }

  return (
    <button
      style={{ ...style }}
      className={classNames.join(' ')}
      type='button'
      disabled={disabled}
      onMouseDown={(e) => {
        if (disabled) {
          e.preventDefault()
        }
      }}
      onClick={(e) => { onClick?.(e) }}>
      {
        renderImg(img)
      }
      {children ? <span className={styles.text}>{children}</span> : null}
    </button>
  )
}

export default Button