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

export const handleTimeDifference = (
  dataDate?: Date
): { minutes: number; seconds: number } => {
  if (!dataDate) return { minutes: 0, seconds: 0 }
  const target = new Date(dataDate)
  const now = new Date()
  const diff = Math.max(target.getTime() - now.getTime(), 0)
  const minutes = Math.floor(diff / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { minutes, seconds }
}
