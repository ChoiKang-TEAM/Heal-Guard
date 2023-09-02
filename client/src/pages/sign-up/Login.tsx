import React, { useState } from 'react'
import { ButtonByMui } from 'components/buttons/Button'
import { InputByMui } from 'components/inputs/Input'
import { RadioByMui } from 'components/radios/Radio'
import { handleChange } from 'utils/handlers/dataChangeHandler'
import { RadioButtonsGroup } from 'components/radios/RadioGroup'
import { User, getUser } from 'apis/get-user'
import { Form } from 'components/forms/Form'
import { FormControl } from '@mui/material'
import { ClockCard } from 'components/clocks/Clock'

const Login = () => {
  const [fields, setFields] = useState<User>({
    userId: '',
    password: '',
    gender: 'a',
    BUDI: '',
  })

  const handleValueChange = (selectedValue: string | number) => {
    setFields((prevFields: User) => ({ ...prevFields, BUDI: selectedValue }))
  }

  const onLogin = () => {
    const dto: User = { ...fields }
    getUser(dto)
  }
  return (
    <Form>
      <ClockCard />
      <FormControl>
        <InputByMui
          value={fields.userId}
          type="text"
          label="아이디"
          onChange={(e) => handleChange(e, 'userId', fields, setFields)}
        />
      </FormControl>
      <FormControl>
        <InputByMui
          value={fields.password}
          type="password"
          label="비밀번호"
          onChange={(e) => handleChange(e, 'password', fields, setFields)}
        />
      </FormControl>
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
    </Form>
  )
}

export default Login
