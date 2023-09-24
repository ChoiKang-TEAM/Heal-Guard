import React from 'react'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import { Control, FieldErrors } from 'react-hook-form'
import { InputType } from 'src/types/type/states'

type ControlledTextFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  type?: InputType
  errors: FieldErrors
  id?: string
  autoComplete?: string
  autoFocus?: boolean
}
const ValidationInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  errors,
  ...rest
}: ControlledTextFieldProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            {...rest}
            type={type}
            variant="outlined"
            label={label}
            margin="normal"
            fullWidth
          />
        )}
      />
      {errors[name] && (
        <Typography color="error">{errors[name]?.message as string}</Typography>
      )}
    </>
  )
}

export default ValidationInput
