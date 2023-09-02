import React, { useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Radio } from '@mui/material'

interface RadioButtonsGroupProps<T> {
  label?: string
  value: T[]
  defaultValue?: T
  onValueChange?: (selectedValue: T) => void
}

export const RadioButtonsGroup = <T extends string | number>(
  props: RadioButtonsGroupProps<T>
) => {
  const [selectedValue, setSelectedValue] = useState<T | null>(
    props.defaultValue || null
  )
  const extendedHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: T = event.target.value as T
    setSelectedValue(newValue)
    props.onValueChange?.(newValue)
  }
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">버루막</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedValue}
        defaultValue={props.defaultValue}
        name="radio-buttons-group"
        onChange={extendedHandleChange}
      >
        {props.value.map((v: T) => (
          <FormControlLabel value={v} control={<Radio />} label={v} key={v} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
