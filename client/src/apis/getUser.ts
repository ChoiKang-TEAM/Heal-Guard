import { User } from 'types/interface/user'

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

const getUser = async (ctx: User) => {
  console.log(ctx)
  try {
    if (verifyUser(ctx)) {
      return 'token'
    } else throw new Error('INVALID USER')
  } catch (e) {
    console.error(e)
  }
}

const isUsedUserId = async (userId: string): Promise<boolean> => {
  try {
    const response: boolean = !!userId
    return response
  } catch (e) {
    console.error(e)
    return false
  }
}

const getUerApi = {
  getUser,
  isUsedUserId,
}

export default getUerApi
