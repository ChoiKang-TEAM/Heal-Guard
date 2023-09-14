import { useState } from 'react'

const useEmailVerification = () => {
  const [fields, setFields] = useState({
    verifyCode: null,
  })

  return {
    fields,
    setFields,
  }
}

export default useEmailVerification
