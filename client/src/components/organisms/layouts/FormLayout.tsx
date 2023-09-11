import React, { ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return <div className="form-layout">{children}</div>
}

export default FormLayout
