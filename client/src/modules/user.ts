import { User } from 'common/interfaces/users/User'

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

const userReducer = (state = initialState, action: UserActionTypes): User => {
  switch (action.type) {
    case SET_USER:
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
