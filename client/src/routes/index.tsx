import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'pages/sign-up/Login'
import Home from 'pages/Home'
import SignUp from 'pages/sign-up/SignUp'

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default RouterConfig
