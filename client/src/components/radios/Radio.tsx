import React from 'react'
import Radio from '@mui/material/Radio'

interface RadioPros {
  checked: boolean
  value?: string
  name: string
  label?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RadioByMui = ({ ...props }: RadioPros) => {
  return <Radio {...props} />
}
