import React from 'react'
import { Route } from 'react-router-dom'
import { Login } from 'pages/sign-up/Login'

function App() {
  return (
    <>
      <Route path="/login" Component={Login} />
    </>
  )
}

export default App
