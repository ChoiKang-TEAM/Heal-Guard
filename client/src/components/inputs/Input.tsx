import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

interface InputByMuiProps {
  label: string
  type: 'text' | 'password'
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputByMui = ({
  label,
  type,
  value,
  onChange,
}: InputByMuiProps) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const renderPasswordToggle = (): JSX.Element | null => {
    if (type !== 'password') {
      return null
    }

    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }

  return (
    <>
      <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${label}`}
        type={
          type === 'password' ? (showPassword ? 'text' : 'password') : 'text'
        }
        value={value}
        onChange={onChange}
        endAdornment={renderPasswordToggle()}
        label={label}
      />
    </>
  )
}
