import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Start from './pages/Start.jsx';
import Register from './pages/Register.jsx';
import Contacto from './pages/Contacto.jsx';
import Producto from './pages/Producto.jsx';
import ToolsManuals from './pages/ToolsManuals.jsx';
import ToolsElectric from './pages/ToolsElectric.jsx';
import Materials from './pages/Materials.jsx';
import OtherMore from './pages/OtherMore.jsx';
import Delivery from './pages/Delivery.jsx';
import Users from './pages/Users.jsx';
import Order from './pages/Order.jsx';
import Admin from './pages/Admin.jsx';
import Employees from './pages/Employees.jsx';
import About from './pages/About.jsx';
import AddEmployees from './pages/AddEmployees.jsx';
import ViewEmployees from './pages/ViewEmployees.jsx';
import ViewUsers from './pages/ViewUsers.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import ProductsAdd from './pages/ProductsAdd.jsx';
import AddProduct from './pages/AddProduct.jsx';
import AddUser from './pages/AddUser.jsx';
import DeliveryAdmin from './pages/DeliveryAdmin.jsx';
import OrderAdmin from './pages/OrderAdmin.jsx';
import Checkout from './pages/CheckOut.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Cart from './components/organismos/Cart.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/Start', element: <Start /> },
  { path: '/Register', element: <Register /> },
  { path: '/Contacto', element: <Contacto /> },
  { path: '/Producto', element: <Producto /> },
  { path: '/ToolsManuals', element: <ToolsManuals /> },
  { path: '/ToolsElectric', element: <ToolsElectric /> },
  { path: '/Materials', element: <Materials /> },
  { path: '/OtherMore', element: <OtherMore /> },
  { path: '/Delivery', element: <Delivery /> },
  { path: '/Users', element: <Users /> },
  { path: '/Order', element: <Order /> },
  { path: '/Admin', element: <Admin /> },
  { path: '/Employees', element: <Employees /> },
  { path: '/About', element: <About /> },
  { path: '/AddEmployees', element: <AddEmployees /> },
  { path: '/ViewEmployees', element: <ViewEmployees /> },
  { path: '/ViewUsers', element: <ViewUsers /> },
  { path: '/ShoppingCart', element: <ShoppingCart /> },
  { path: '/ProductsAdd', element: <ProductsAdd /> },
  { path: '/AddProduct', element: <AddProduct /> },
  { path: '/AddUser', element: <AddUser /> },
  { path: '/DeliveryAdmin', element: <DeliveryAdmin /> },
  { path: '/OrderAdmin', element: <OrderAdmin /> },
  { path: '/checkout/:product_id', element: <Checkout /> }, 
  { path: '/order-confirmation', element: <OrderConfirmation /> },
  { path: '/cart', element: <Cart /> },
]);

const CLIENT_ID = "Ad92mJpGDxnirLROAULhooW3Fh6YpaQfZ34KOT_obq5UqkUMuIuvT4cL5d0eCtN475Flzv4HY8ajZXX0"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID, currency: "USD" }}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </React.StrictMode>,
);