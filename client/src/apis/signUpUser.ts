import axios from 'axios'

export const signUpUserApi = () => {
  try {
    const response = axios.get('api/sign-up')
    return response
  } catch (e) {
    console.error(e)
  }
}
