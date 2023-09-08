import React, { useState } from 'react'
import { ButtonByMui } from 'components/atoms/buttons/Button'
import { InputByMui } from 'components/atoms/inputs/Input'
import { RadioByMui } from 'components/atoms/radios/Radio'
import { handleChange } from 'utils/handlers/dataChangeHandler'
import { RadioButtonsGroup } from 'components/atoms/radios/RadioGroup'

import { Form } from 'components/molecules/forms/Form'
import { FormControl } from '@mui/material'
import { ClockCard } from 'components/molecules/clocks/Clock'
import { User } from 'types/interface/user'

const Login = () => {
  const [fields, setFields] = useState<User>({
    userId: '',
    password: '',
    gender: 'a',
    BUDI: '',
  })

  console.log(fields)

  const handleValueChange = (selectedValue: string | number) => {
    setFields((prevFields: User) => ({ ...prevFields, BUDI: selectedValue }))
  }

  const onLogin = () => {
    const dto: User = { ...fields }
    console.log(dto)
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
