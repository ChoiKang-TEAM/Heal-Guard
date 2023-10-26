type ResponseCodeType = 'SUCCESS'
type ErrorCodeType = 'INVALID_USER'
export const RESPONSE_CODES: { [key in ResponseCodeType]: number } = {
  SUCCESS: 1000
}

export const ERROR_CODES: { [key in ErrorCodeType]: number } = {
  INVALID_USER: 3001
}
