import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const handleChange = (
  event: ChangeEvent<HTMLInputElement>,
  fieldName: string,
  fields: { [key: string]: string },
  setFields: Dispatch<SetStateAction<{ [key: string]: string }>>
) => {
  const { value } = event.target
  setFields((prevFields) => ({ ...prevFields, [fieldName]: value }))
}
