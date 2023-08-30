import React from 'react'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Radio } from '@mui/material'

interface RadioButtonsGroupProps<T> {
  label?: string
  value: T[]
}

export const RadioButtonsGroup = <T extends string | number>(
  props: RadioButtonsGroupProps<T>
) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {props.value.map((v: T) => (
          <FormControlLabel value={v} control={<Radio />} label={v} key={v} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
