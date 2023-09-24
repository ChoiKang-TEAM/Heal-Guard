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
import ControlledTextField from 'src/components/atoms/inputs/ControlledTextField'

const LoginInputForm = () => {
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
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  const onLogin = () => {
    console.log(getValues())
    console.log(errors)
  }
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '100px' }}>
      <Typography component="h1" variant="h5">
        로그인
      </Typography>

      <form
        onSubmit={handleSubmit(onLogin)}
        noValidate
        style={{ marginTop: '20px' }}
      >
        <ControlledTextField<FormData>
          control={control}
          name="userId"
          label="아이디"
          id="userId"
          autoComplete="userId"
          autoFocus
          errors={errors}
        />
        <ControlledTextField<FormData>
          control={control}
          name="password"
          label="비밀번호"
          type="password"
          id="password"
          autoComplete="password"
          errors={errors}
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
  )
}

export default LoginInputForm
