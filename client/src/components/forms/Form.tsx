import React, { ReactNode } from 'react'
import Box from '@mui/material/Box'

interface FormProps {
  children: ReactNode
}

export const Form = ({ children }: FormProps) => {
  return (
    <Box component={'form'} noValidate>
      {children}
    </Box>
  )
}
