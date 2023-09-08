import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLogin } from 'utils/handlers/isLoginHandler'

const PrivateRoutes: React.FC = () => {
  return isLogin() ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
