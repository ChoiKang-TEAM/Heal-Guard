import { getUser } from 'apis/get-user'
import { User } from 'common/interfaces/users/user'

const SET_USER = 'user/SET_USER'
const LOGOUT = 'user/LOGOUT'

interface SetUserAction {
  type: typeof SET_USER
  payload: {
    id: number
    userId: string
  }
}

interface LogoutAction {
  type: typeof LOGOUT
}

type UserActionTypes = SetUserAction | LogoutAction

const initialState: User = {
  userId: '',
}

const userReducer = async (
  state = initialState,
  action: UserActionTypes
): Promise<User> => {
  switch (action.type) {
    case SET_USER:
      await getUser(state)
      return {
        ...state,
        ...action.payload,
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default userReducer
