import React, { FormEventHandler, ReactNode } from 'react'
import Box from '@mui/material/Box'

interface FormProps {
  children: ReactNode
  onSubmit: FormEventHandler
}

export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <Box component={'form'} noValidate onSubmit={onSubmit}>
      {children}
    </Box>
  )
}
