import React from 'react'
import * as yup from 'yup'
import FormLayout from 'src/components/organisms/layouts/FormLayout'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonByMui } from 'src/components/atoms/buttons/Button'
import { useAppDispatch } from 'src/store'
import { authVerifyCodeCreate } from 'src/modules/sign-up/verificationAction'

const AuthenticationEmail = () => {
  const dispatch = useAppDispatch()

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일을 입력해주세요.'),
  })

  type FormData = yup.InferType<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const createVerifyCode = () => {
    const dto: {
      userId: string
    } = {
      userId: getValues().email,
    }
    dispatch(authVerifyCodeCreate(dto))
  }
  return (
    <FormLayout>
      <form onSubmit={handleSubmit(createVerifyCode)}>
        <div className="input-container">
          <TextField
            type="email"
            {...register('email')}
            label="이메일"
            placeholder="이메일을 입력해주세요."
          />
          <ButtonByMui variant={'outlined'} label="인증하기" type={'submit'} />
        </div>
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
      </form>
    </FormLayout>
  )
}

export default AuthenticationEmail
