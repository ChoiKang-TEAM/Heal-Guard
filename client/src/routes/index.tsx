import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'pages/sign-up/Login'
import Home from 'pages/Home'
import SignUp from 'pages/sign-up/SignUp'
import PrivateRoutes from 'routes/PrivateRoute'
import Header from 'components/molecules/headers/Header'

const RouterConfig = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default RouterConfig
