import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouterConfig from 'src/routes'
import 'src/styles/app.scss'

function App() {
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  )
}

export default App
