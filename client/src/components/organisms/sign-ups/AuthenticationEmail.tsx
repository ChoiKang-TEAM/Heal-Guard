import React from 'react'
import * as yup from 'yup'
import FormLayout from 'src/components/organisms/layouts/FormLayout'
import { FormControl, FormHelperText, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonByMui } from 'src/components/atoms/buttons/Button'
import ValidationInput from 'src/components/atoms/inputs/ValidationInput'
import useEmailVerification from 'src/hooks/useEmailVerification'
import { VERIFICATION_ERROR_MESSAGE } from 'src/common/constants/messages'

const AuthenticationEmail = () => {
  const {
    field,
    inputCode,
    minutes,
    seconds,
    createVerifyCode,
    handleSetInputCode,
    resetField,
    resetInputCode,
    confirmVerifyCode,
  } = useEmailVerification()

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('이메일 형식으로 입력해주세요.')
      .required('이메일을 입력해주세요.'),
  })

  type FormData = yup.InferType<typeof schema>

  const {
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
    resetInputCode()
    createVerifyCode(getValues().email)
  }

  const verifyCodeConfirm = () => {
    confirmVerifyCode(getValues().email)
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
              onChangeExtends={resetField}
              disabled={field.state === 'Authentication'}
            />
            <ButtonByMui
              variant={'outlined'}
              label="인증 번호 발송"
              type={'submit'}
              disabled={field.state === 'Authentication'}
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
      {(field.state === 'Created' || field.state === 'Mismatched') && (
        <>
          <p>
            인증 유효시간 : {String(minutes).padStart(2, '0')} :{' '}
            {String(seconds).padStart(2, '0')}
          </p>
          <form onSubmit={verifyCodeConfirm}>
            <div className="input-container">
              <TextField
                type={'text'}
                value={inputCode}
                label="인증번호"
                placeholder="인증번호"
                fullWidth
                onChange={handleSetInputCode}
              />
              <ButtonByMui
                variant={'outlined'}
                label="인증하기"
                onClick={verifyCodeConfirm}
              />
            </div>
          </form>
        </>
      )}
    </FormLayout>
  )
}

export default AuthenticationEmail
