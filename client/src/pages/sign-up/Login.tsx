import React from 'react'
import LoginInputForm from 'src/components/molecules/forms/LoginInputForm'
import { Button, Container, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const goSignUpPage = () => {
    navigate('/sign-up', {
      replace: true,
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <LoginInputForm />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '5px' }}>
        <Button
          type={'button'}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={goSignUpPage}
        >
          회원가입
        </Button>
        <Button
          type={'button'}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          비밀번호 찾기
        </Button>
        <Button
          type={'button'}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          통합 회원가입
        </Button>
      </Paper>
    </Container>
  )
}

export default Login
