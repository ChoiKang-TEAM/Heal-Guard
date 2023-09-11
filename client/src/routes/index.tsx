import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'src/pages/sign-up/Login'
import Home from 'src/pages/Home'
import SignUp from 'src/pages/sign-up/SignUp'
import PrivateRoutes from 'src/routes/PrivateRoute'
import Header from 'src/components/molecules/headers/Header'

const RouterConfig = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default RouterConfig
