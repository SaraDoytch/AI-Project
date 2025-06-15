import { RouterProvider } from 'react-router'
import './App.css'
import router from "./router/router"
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './stores/Store'

function App() {
  return (
    <>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
</CookiesProvider>
    </>
  )
}

export default App
