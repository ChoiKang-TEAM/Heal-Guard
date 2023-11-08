type ResponseCodeType = 'SUCCESS' | 'EMPTY_DATA'
type ErrorCodeType = 'INVALID_USER' | 'BAD_REQUEST'

export const RESPONSE_CODES: { [key in ResponseCodeType]: number } = {
  SUCCESS: 1000,
  EMPTY_DATA: 1001
}

export const ERROR_CODES: { [key in ErrorCodeType]: number } = {
  INVALID_USER: 3001,
  BAD_REQUEST: 2000
}
