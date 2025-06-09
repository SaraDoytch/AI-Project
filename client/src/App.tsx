import { RouterProvider } from 'react-router'
import './App.css'
import router from "./router/router"
import { CookiesProvider } from 'react-cookie'

function App() {
  return (
    <>
    <CookiesProvider>
        <RouterProvider router={router} />
</CookiesProvider>
    </>
  )
}

export default App
