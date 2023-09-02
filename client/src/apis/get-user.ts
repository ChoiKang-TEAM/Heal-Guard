import { User } from 'common/interfaces/users/User'

const basicUser: User = {
  userId: 'test',
  password: 'qwer1234!!',
}

const verifyUser = (confirmCheckUser: User): boolean => {
  console.log(confirmCheckUser)
  if (
    confirmCheckUser.userId === basicUser.userId &&
    confirmCheckUser.password === basicUser.password
  )
    return true
  else return false
}

export const getUser = async (ctx: User) => {
  console.log(ctx)
  try {
    if (verifyUser(ctx)) {
      return 'token'
    } else throw new Error('INVALID USER')
  } catch (e) {
    console.error(e)
  }
}
