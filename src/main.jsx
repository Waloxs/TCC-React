import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import './assets/styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/Login/Login.jsx'
import Escolha from './components/Escolha/Escolha.jsx'
import Empresa from './components/Empresa/Empresa.jsx'
import Talento from './components/Talento/Talento.jsx'
import ProtectedPage from './components/ProtectedPage/ProtectedPage.jsx'
import TalentoPasso1 from './components/TalentoPasso/TalentoPasso1.jsx'


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
  path: "Empresa",
  element: <Empresa></Empresa>
  },
  {
    path: "Talento",
    element: <Talento></Talento>
  },
  {
    path: "teste",
    element: <ProtectedPage></ProtectedPage>
  },
  {
    path: "TalentoPasso1",
    element: <TalentoPasso1></TalentoPasso1>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
