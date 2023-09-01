import React, { useState } from 'react'
import { ButtonByMui } from 'components/buttons/Button'
import { InputByMui } from 'components/inputs/Input'
import { handleChange } from 'utils/handlers/dataChangeHandler'
import { getUser } from 'apis/get-user'

const Home = () => {
  const [fields, setFields] = useState<{ [key: string]: string }>({
    userId: '',
    password: '',
  })

  const onLogin = () => {
    const dto = {
      userId: fields.userId,
      password: fields.password,
    }
    console.log(fields)
    getUser(dto)
  }
  return (
    <>
      <InputByMui
        value={fields.userId}
        type="text"
        label="아이디"
        onChange={(e) => handleChange(e, 'userId', fields, setFields)}
      />
      <InputByMui
        value={fields.password}
        type="password"
        label="비밀번호"
        onChange={(e) => handleChange(e, 'password', fields, setFields)}
      />
      <ButtonByMui
        color="primary"
        variant="outlined"
        label="로그인"
        onClick={onLogin}
      />
    </>
  )
}

export default Home
