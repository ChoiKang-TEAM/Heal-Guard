import { VerificationStateType } from 'src/types/type/states'

export const ID_IN_USE_MESSAGE: string = '이미 사용 중인 아이디입니다.'
export const VERIFICATION_ERROR_MESSAGE: {
  [key in VerificationStateType]: string[]
} = {
  Idle: [],
  Created: ['인증 메일이 발송되었습니다.'],
  Expired: ['인증 유효시간이 지났습니다.', '인증 메일 발송을 다시 눌러주세요.'],
  InUse: ['이미 사용중인 이메일입니다.'],
  Authentication: ['인증이 완료되었습니다.'],
  Mismatched: ['인증 번호가 일치하지 않습니다.'],
  Error: [
    '인증 메일을 발송하는 중 오류가 발생했습니다.',
    '인증 메일 발송을 다시 눌러주세요.',
  ],
}
