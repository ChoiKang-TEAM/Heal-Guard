import axios from 'axios'

export const signUpUserApi = (params) => {
  try {
    const response = axios.post('api/sign-up')
    return response
  } catch (e) {
    console.error(e)
  }
}
