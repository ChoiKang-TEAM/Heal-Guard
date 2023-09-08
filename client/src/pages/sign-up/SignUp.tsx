import { User } from 'types/interface/user'
import { ButtonByMui } from 'components/atoms/buttons/Button'
import React from 'react'
import { loginUser } from 'modules/user/userAction'
import { useAppDispatch, useAppSelector } from 'store'

const SingUp = () => {
  const user: User = useAppSelector((state) => state.userReducer.user)
  const status = useAppSelector((state) => state.userReducer.status)
  const dispatch = useAppDispatch()
  const login = (mode: boolean) => {
    if (mode) dispatch(loginUser({ userId: 'test', password: 'qwer1234!!' }))
    else dispatch(loginUser({ userId: 'sandy-babo', password: 'qwer1234!!' }))
  }
  return (
    <>
      {user.userId} | {status}
      {user.status}
      <br />
      <ButtonByMui label="성공 버튼" onClick={() => login(true)} />
      <br />
      <ButtonByMui label="실패 버튼" onClick={() => login(false)} />
    </>
  )
}

export default SingUp
