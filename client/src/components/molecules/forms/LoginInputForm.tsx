import React, { useState } from 'react'
import * as yup from 'yup'

import { User } from 'src/types/interface/user/userInterface'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

const LoginInputForm = () => {
  const [fields, setFields] = useState<User>({
    userId: '',
    password: '',
  })

  const schema = yup.object().shape({
    userId: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('아이디를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
  })

  type FormData = yup.InferType<typeof schema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  const onLogin = () => {
    console.log(fields)
    console.log(errors)
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '100px' }}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>

        <form
          onSubmit={handleSubmit(onLogin)}
          noValidate
          style={{ marginTop: '20px' }}
        >
          <Controller
            name={'userId'}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant={'outlined'}
                label="아이디"
                margin={'normal'}
                id="userId"
                autoComplete={'userId'}
                autoFocus
                fullWidth
              />
            )}
          />
          {errors.userId && (
            <Typography color={'error'}>{errors.userId.message}</Typography>
          )}
          <Controller
            name={'password'}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type={'password'}
                variant={'outlined'}
                label="비밀번호"
                margin={'normal'}
                id="password"
                autoComplete={'password'}
                fullWidth
              />
            )}
          />
          <Button
            type={'submit'}
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            로그인
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default LoginInputForm
