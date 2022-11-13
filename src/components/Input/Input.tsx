import React, { ChangeEvent, FC, RefObject } from 'react'
import styles from './Input.module.scss'

interface Props {
  value?: string
  placeHolder?: string
  onChange?: (value: string) => void
  width?: number
  inputRef?: RefObject<HTMLInputElement>
  disabled?: boolean
  readOnly?: boolean
}

// eslint-disable-next-line react/display-name
const Input: FC<Props> = ({ value, placeHolder, onChange, width, inputRef, disabled, readOnly }) => {
  return (
    <input
      ref={inputRef}
      style={{
        width: String(width ?? '') + 'px'
      }}
      type="text"
      placeholder={placeHolder}
      className={[styles.input, 'animate'].join(' ')}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      onMouseDown={(e) => {
        if (readOnly) {
          e.preventDefault()
        }
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
      }} />
  )
}

export default Input