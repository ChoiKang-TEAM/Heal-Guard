import React from 'react'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { TextField } from '@mui/material'
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
  disabled?: boolean
  onChangeExtends?: () => void
}
const ValidationInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  errors,
  onChangeExtends,
  disabled = false,
  ...rest
}: ControlledTextFieldProps<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { onChange, ...restField } = field
          const customOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeExtends?.()
            onChange(e)
          }

          return (
            <TextField
              {...restField}
              onChange={customOnchange}
              {...rest}
              type={type}
              disabled={disabled}
              variant="outlined"
              label={label}
              margin="normal"
              fullWidth
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
            />
          )
        }}
      />
    </div>
  )
}

export default ValidationInput
