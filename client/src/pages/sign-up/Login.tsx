import React, { useState } from 'react'
import { ButtonByMui } from 'components/atoms/buttons/Button'
// import { InputByMui } from 'components/atoms/inputs/Input'
import { RadioByMui } from 'components/atoms/radios/Radio'
import { handleChange } from 'utils/handlers/dataChangeHandler'
import { RadioButtonsGroup } from 'components/atoms/radios/RadioGroup'
// import { Form } from 'components/molecules/forms/Form'
import { FormControl } from '@mui/material'
import { ClockCard } from 'components/molecules/clocks/Clock'
import { User } from 'types/interface/user'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
//import { EMAIL_REGEX } from 'common/constants/regexs'

const Login = () => {
  const [fields, setFields] = useState<User>({
    userId: undefined,
    password: undefined,
  })

  const schema = yup.object().shape({
    userId: yup.string().required('아이디를 입력해주세요.'),

    password: yup.string().required('비밀번호를 입력해주세요.'),
  })

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ userId: string; password: string }>({
    resolver: yupResolver(schema),
  })

  const handleValueChange = (selectedValue: string | number) => {
    setFields((prevFields: User) => ({ ...prevFields, BUDI: selectedValue }))
  }

  const onLogin = () => {
    const dto: User = { ...fields }
    console.log(dto)
    console.log(errors)
  }
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <ClockCard />

      <input type="text" {...register('userId')} />
      <p>{errors.userId?.message}</p>

      <input type="password" {...register('password')} />
      <p>{errors.password?.message}</p>

      <FormControl>
        <ButtonByMui
          color="primary"
          variant="outlined"
          label="로그인"
          onClick={onLogin}
        />
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
