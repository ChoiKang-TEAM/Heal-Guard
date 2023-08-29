import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'pages/sign-up/Login'
import Home from 'pages/Home'

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default RouterConfig
