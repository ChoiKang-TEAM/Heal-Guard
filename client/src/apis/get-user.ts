interface User {
  userId: string
  password: string
}

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

export const getUser = (ctx: User) => {
  console.log(ctx)
  try {
    if (verifyUser(ctx)) {
      console.log('test1')
      localStorage.setItem('token', '1234')
    } else return
  } catch (e) {
    console.error(e)
  }
}
