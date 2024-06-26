import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import './assets/styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/Login/Login.jsx'
import Escolha from './components/Escolha/Escolha.jsx'
import Empresa from './components/Empresa/Empresa.jsx'
import Talento from './components/Talento/Talento.jsx'


const router = createBrowserRouter([
  {
    path: "",
    element: <Home></Home>
  },
  {
    path: "Login",
    element: <Login></Login>
  },
  {
    path: "Escolha",
    element: <Escolha></Escolha>
  },
  {
  path: "Talento",
  element: <Empresa></Empresa>
  },
  {
    path: "Empresa",
    element: <Talento></Talento>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
