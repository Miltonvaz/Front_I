import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Start from './pages/Start.jsx' 
import Register from './pages/Register.jsx'
import Contacto from './pages/Contacto.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>

  },
  {
    path: '/Start',
    element: <Start></Start>
  },
  {
    path: '/Register',
    element: <Register></Register>
  },
  {
    path: '/Contacto',
    element: <Contacto></Contacto>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


