import React, { useState } from 'react'
// import { ButtonByMui } from 'components/atoms/buttons/Button'
// import { InputByMui } from 'components/atoms/inputs/Input'
import { RadioByMui } from 'src/components/atoms/radios/Radio'
import { handleChange } from 'src/utils/handlers/dataChangeHandler'
import { RadioButtonsGroup } from 'src/components/atoms/radios/RadioGroup'
// import { Form } from 'components/molecules/forms/Form'
import { FormControl, Input, OutlinedInput } from '@mui/material'
import { ClockCard } from 'src/components/molecules/clocks/Clock'
import { User } from 'src/types/interface/user/userInterface'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ButtonByMui } from 'src/components/atoms/buttons/Button'
// import { InputByMui } from 'components/atoms/inputs/Input'
//import { EMAIL_REGEX } from 'common/constants/regexs'

const Login = () => {
  const [fields, setFields] = useState<User>({
    userId: '',
    password: '',
  })

  const schema = yup.object().shape({
    userId: yup.string().email().required('아이디를 입력해주세요.'),

    password: yup.string().required('비밀번호를 입력해주세요.'),
  })

  type FormData = yup.InferType<typeof schema>

  // const handleCustomChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: 'userId' | 'password'
  // ) => {
  //   setFields((prevFields) => ({
  //     ...prevFields,
  //     [fieldName]: e.target.value,
  //   }))
  //   setValue(fieldName, e.target.value) // react-hook-form에 값을 설정
  // }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: 'motojate@naver.com',
    },
    mode: 'onChange',
  })

  const handleValueChange = (selectedValue: string | number) => {
    setFields((prevFields: User) => ({ ...prevFields, BUDI: selectedValue }))
  }

  const onLogin = () => {
    console.log(fields)
    console.log(errors)
  }
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <ClockCard />
      <Controller
        name="userId"
        control={control}
        defaultValue=""
        render={({ field }) => {
          console.log(field)
          return (
            <>
              <Input {...field} placeholder="아이디" />
              {errors.userId && <span>{errors.userId.message}</span>}
            </>
          )
        }}
      />
      <OutlinedInput type="text" {...register('userId')} />
      <p style={{ color: 'red' }}>{errors.userId?.message}</p>

      <OutlinedInput
        type="password"
        {...register('userId')}
        label="오토컴플리트"
      />
      <p style={{ color: 'red' }}>{errors.password?.message}</p>

      <FormControl>
        <ButtonByMui label="아이디" type={'submit'} onClick={onLogin} />
      </FormControl>
      <FormControl>
        <RadioByMui
          checked={fields.gender === 'a'}
          value={'a'}
          name="radio-buttons"
          label="a"
          onChange={(e) => handleChange(e, 'gender', fields, setFields)}
        />
        <RadioByMui
          checked={fields.gender === 'b'}
          value={'b'}
          name="radio-buttons"
          label="b"
          onChange={(e) => handleChange(e, 'gender', fields, setFields)}
        />
      </FormControl>
      <RadioButtonsGroup
        label="BUDI"
        defaultValue="buddy"
        value={['buddy', 'lucy', 'maxi']}
        onValueChange={handleValueChange}
      />
    </form>
  )
}

export default Login
