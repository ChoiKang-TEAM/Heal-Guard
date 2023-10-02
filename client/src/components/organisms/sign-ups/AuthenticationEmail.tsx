import React, { useState } from 'react'
import * as yup from 'yup'
import FormLayout from 'src/components/organisms/layouts/FormLayout'
import { Button, FormControl, FormHelperText, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonByMui } from 'src/components/atoms/buttons/Button'
import ValidationInput from 'src/components/atoms/inputs/ValidationInput'
import useEmailVerification from 'src/hooks/useEmailVerification'
import { VERIFICATION_ERROR_MESSAGE } from 'src/common/constants/messages'

const AuthenticationEmail = () => {
  const { field, inputCode, createVerifyCode } = useEmailVerification()

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
    getValues,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const verifyCodeCreate = () => {
    createVerifyCode(getValues().email)
  }
  return (
    <FormLayout>
      <form onSubmit={handleSubmit(verifyCodeCreate)}>
        <FormControl
          error={field.state !== 'Created' && field.state !== 'Authentication'}
          variant={'standard'}
        >
          <div className="input-container">
            <ValidationInput<FormData>
              control={control}
              name="email"
              label="이메일"
              id="email"
              autoComplete="email"
              autoFocus
              errors={errors}
            />
            <ButtonByMui
              variant={'outlined'}
              label="인증하기"
              type={'submit'}
            />
          </div>
          <FormHelperText>
            {VERIFICATION_ERROR_MESSAGE[field.state].map((message, idx) => (
              <React.Fragment key={idx}>
                <span>{message}</span> <br />
              </React.Fragment>
            ))}
          </FormHelperText>
        </FormControl>
      </form>

      {field.state === 'Created' && (
        <form onSubmit={handleSubmit(verifyCodeCreate)}>
          <div className="input-container">
            <TextField
              type={'text'}
              value={inputCode}
              label="이메일"
              placeholder="이메일을 입력해주세요."
            />
            <ButtonByMui
              variant={'outlined'}
              label="인증하기"
              type={'submit'}
            />
          </div>
          <p style={{ color: 'red' }}>{errors.email?.message}</p>
        </form>
      )}
    </FormLayout>
  )
}

export default AuthenticationEmail
