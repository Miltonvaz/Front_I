import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Start from './pages/Start.jsx' 
import Register from './pages/Register.jsx'
import Contacto from './pages/Contacto.jsx'
import Producto from './pages/Producto.jsx'
import ToolsManuals from './pages/ToolsManuals.jsx'
import ToolsElectric from './pages/ToolsElectric.jsx'
import Materials from './pages/Materials.jsx'
import OtherMore from './pages/OtherMore.jsx'
import Delivery from './pages/Delivery.jsx'
import Users from './pages/Users.jsx'
import Order from './pages/Order.jsx'
import Admin from './pages/Admin.jsx'
import Employees from './pages/Employees.jsx'
import './index.css'; 
import About from './pages/About.jsx'
import AddEmployees from './pages/AddEmployees.jsx'
import ViewEmployees from './pages/ViewEmployees.jsx'
import ViewUsers from './pages/ViewUsers.jsx'

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
  {
    path: '/Producto',
    element: <Producto></Producto>
  },
  {
    path: '/ToolsManuals',
    element: <ToolsManuals></ToolsManuals>
  },
  {
    path: '/ToolsElectric',
    element: <ToolsElectric></ToolsElectric>
  },
  {
    path: '/Materials',
    element: <Materials></Materials>
  },
  {
    path: '/OtherMore',
    element: <OtherMore></OtherMore>
  },
  {
    path: '/Delivery',
    element: <Delivery></Delivery>
  },
  {
    path: '/Users',
    element: <Users></Users>
  },
  {
    path: '/Order',
    element: <Order></Order>
  },
  {
    path: '/Admin',
    element: <Admin></Admin>
  },
  {
    path: '/Employees',
    element: <Employees></Employees>
  },
  {
    path: '/About',
    element: <About></About>
  },
  {
    path: '/AddEmployees',
    element: <AddEmployees></AddEmployees>
  },
  {
    path: '/ViewEmployees',
    element: <ViewEmployees></ViewEmployees>
  },
  {
    path: '/ViewUsers',
    element: <ViewUsers></ViewUsers>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


