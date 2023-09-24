import React from 'react'
import LoginInputForm from 'src/components/molecules/forms/LoginInputForm'
import { Container } from '@mui/material'

const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <LoginInputForm />
    </Container>
  )
}

export default Login
