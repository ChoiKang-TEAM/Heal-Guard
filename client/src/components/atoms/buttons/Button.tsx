import React from 'react'
import MuiButton from '@mui/material/Button'

interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  label: string
  onClick?: () => void
}

interface ButtonMuiProps {
  color?: 'secondary' | 'success' | 'error' | 'primary'
  variant?: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  label: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(
        ' '
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  )
}

export const ButtonByMui = ({ disabled = false, ...props }: ButtonMuiProps) => {
  return (
    <MuiButton
      className="input-button ml-10"
      disabled={disabled}
      type={props.type}
      {...props}
    >
      {props.label}
    </MuiButton>
  )
}
