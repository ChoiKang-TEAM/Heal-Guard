import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const handleChange = <T>(
  event: ChangeEvent<HTMLInputElement>,
  fieldName: string,
  fields: T,
  setFields: Dispatch<SetStateAction<T>>
) => {
  const { value } = event.target
  setFields((prevFields) => ({ ...prevFields, [fieldName]: value }))
}
