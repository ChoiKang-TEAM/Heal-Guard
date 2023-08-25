import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement>,
  fieldName: string,
  fields: { [key: string]: string },
  setFields: Dispatch<SetStateAction<{ [key: string]: string }>>
) => {
  const { value } = e.target
  setFields((prevFields) => ({ ...prevFields, [fieldName]: value }))
}
