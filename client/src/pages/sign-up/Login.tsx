import React from 'react'
import LoginInputForm from 'src/components/molecules/forms/LoginInputForm'
import { Button, Container, Paper } from '@mui/material'

const Login = () => {
  return (
    <Container component="main" maxWidth="xs">
      <LoginInputForm />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '5px' }}>
        <Button
          type={'submit'}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          회원가입
        </Button>
        <Button
          type={'submit'}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          비밀번호 찾기
        </Button>
      </Paper>
    </Container>
  )
}

export default Login
