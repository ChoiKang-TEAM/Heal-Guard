import { useState, useCallback } from 'react'

const useEmailVerification = () => {
  const [authCode, setAuthCode] = useState('')
  const [inputCode, setInputCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const fetchAuthCode = useCallback(async () => {
    const fetchedCode = '111111'
    setAuthCode(fetchedCode)
  }, [])

  const handleInputChange = (e: InputEvent) => {
    console.log(e)
    setInputCode('e')
  }

  const handleVerify = () => {
    if (authCode === inputCode) {
      setIsVerified(true)
    } else {
      setIsVerified(false)
      alert('Invalid code. Please try again.')
    }
  }

  return {
    fetchAuthCode,
    handleInputChange,
    handleVerify,
    isVerified,
    inputCode,
  }
}

export default useEmailVerification
