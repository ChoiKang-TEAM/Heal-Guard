import { User } from 'src/types/interface/user/userInterface'

const usedEmail: string[] = ['motojate@naver.com', 'maxi@soulware.kr']
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
    return usedEmail.includes(userId)
  } catch (e) {
    console.error(e)
    throw new Error('IS_NOT_VALIDATION')
  }
}

const getUerApi = {
  getUser,
  isUsedUserId,
}

export default getUerApi
