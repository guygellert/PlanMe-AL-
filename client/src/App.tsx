import React from "react"
import { setAuthToken } from "./auth/auth"
import ReactRouter from "./components/Router/Router"

const App = () => {
  const token = localStorage.getItem("token")
  if (token) {
    setAuthToken(token)
  }

  return (
    <ReactRouter />
  )
}

export default App
