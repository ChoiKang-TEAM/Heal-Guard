export const getValidTime = (minutes: number): Date => {
  const validTime = new Date()
  validTime.setMinutes(validTime.getMinutes() + minutes)
  return validTime
}
