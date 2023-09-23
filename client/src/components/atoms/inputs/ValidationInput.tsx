/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import * as yup from 'yup'

import { Controller, FieldPath, Path, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'

interface Props<T extends yup.AnyObject> {
  schema: yup.ObjectSchema<T>
  name: string
}

const ValidationInput = <T extends yup.AnyObject>({
  schema,
  name,
}: Props<T>) => {
  type FormData = yup.InferType<typeof schema>
  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          variant={'outlined'}
          label="아이디"
          margin={'normal'}
          id="userId"
          autoFocus
          fullWidth
        />
      )}
    />
  )
}

export default ValidationInput
