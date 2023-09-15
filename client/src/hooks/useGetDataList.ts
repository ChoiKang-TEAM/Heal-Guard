import { useState } from 'react'

const useGetDataList = () => {
  const [fields, setFields] = useState({
    verifyCode: null,
  })

  return {
    fields,
    setFields,
  }
}

export default useGetDataList
