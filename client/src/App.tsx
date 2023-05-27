import React from "react"
import { setAuthToken } from "./auth/auth"
import ReactRouter from "./components/Router/Router"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient();

const App = () => {
  const token = localStorage.getItem("token")
  if (token) {
    setAuthToken(token)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactRouter />
    </QueryClientProvider>
  )
}

export default App
