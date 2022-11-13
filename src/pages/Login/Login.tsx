import React, { FC, useState } from 'react'
import { Box, Button, FormField, Heading, Input } from 'components'
import axios, { AxiosError } from 'axios'

import styles from './Login.module.scss'

import authStore from 'stores/authStore'

const isNameValid = (value: string): boolean => {
  return value.length !== 0
}

const isErrorEmailValid = (value: string): RegExpMatchArray | null => {
  return value.match(
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
}

const Login: FC = () => {
  const [name, setName] = useState('')
  const [isNameEmpty, setIsNameEmpty] = useState(true)
  const [email, setEmail] = useState('')
  const [isEmailEmpty, setIsEmailEmpty] = useState(true)
  const [isRegistering, setRegistering] = useState(false)
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  const onSubmit = (): void => {
    if (!isNameValid(name)) {
      setErrorName('Not correct name')
      return
    } else {
      setErrorName('')
    }

    if (!isErrorEmailValid(email)) {
      setErrorEmail('Not correct email')
      return
    } else {
      setErrorEmail('')
    }

    setRegistering(true)

    const registerURL = 'https://api.supermetrics.com/assignment/register'

    axios.post(registerURL, {
      client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
      name,
      email
    }).then(res => {
      const { data } = res.data
      authStore.setSSLToken(data.sl_token)
      setRegistering(false)
    }).catch((e: AxiosError) => {
      localStorage.removeItem('sslKey')
      console.log(`Error: ${e.message}`)
      authStore.setSSLToken(null)
      setRegistering(false)
    })
  }

  return (
    <div className={styles.container}>
      <Box
        width={500}
        dashed={true}
        rounded={true}>
        <div>
          <Heading>LOGIN</Heading>
        </div>
        <div
          className={styles['fields-container']}>
          <FormField
            errorMsg={errorName}
            label='Name'>
            <Input
              value={name}
              onChange={value => {
                setName(value)
                setIsNameEmpty(value.length === 0)
              }}
              placeHolder="Full Name"
              width={300}/>
          </FormField>
          <FormField
            errorMsg={errorEmail}
            label='Email'>
            <Input
              value={email}
              onChange={value => {
                setEmail(value)
                setIsEmailEmpty(value.length === 0)
              }}
              placeHolder="name@company.email"
              width={300}/>
          </FormField>
        </div>
        <div className={styles.footer}>
          <Button
            disabled={isNameEmpty || isEmailEmpty}
            style={{
              marginRight: '10px'
            }}
            onClick={() => onSubmit()}
          >{isRegistering ? 'Loading...' : 'Login'}</Button>
        </div>
      </Box>
    </div>
  )
}

export default Login
