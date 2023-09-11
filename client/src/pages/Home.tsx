import React, { useState } from 'react'
import { ButtonByMui } from 'src/components/atoms/buttons/Button'
import { InputByMui } from 'src/components/atoms/inputs/Input'
import { handleChange } from 'src/utils/handlers/dataChangeHandler'
import Header from 'src/components/molecules/headers/Header'

const Home = () => {
  const [fields, setFields] = useState<{ [key: string]: string }>({
    userId: '',
    password: '',
  })

  const onLogin = () => {
    console.log(fields)
  }
  return (
    <>
      <Header></Header>
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
    </>
  )
}

export default Home
