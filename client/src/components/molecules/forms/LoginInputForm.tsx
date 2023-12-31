import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Paper, Typography } from '@mui/material'
import ValidationInput from 'src/components/atoms/inputs/ValidationInput'
import getUerApi from 'src/apis/getUser'

const LoginInputForm = () => {
  const schema = yup.object().shape({
    userId: yup
      .string()
      //.email('이메일 형식으로 입력해주세요.')
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
    const dto = {
      userId: getValues().userId,
      password: getValues().password,
    }
    const result = getUerApi.login(dto)
    console.log(result)
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
        <ValidationInput<FormData>
          control={control}
          name="userId"
          label="아이디"
          id="userId"
          autoComplete="userId"
          autoFocus
          errors={errors}
        />
        <ValidationInput<FormData>
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
