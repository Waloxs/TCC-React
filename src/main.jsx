import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home.jsx';
import './assets/styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login/Login.jsx';
import Escolha from './pages/Escolha/Escolha.jsx';
import Empresa from './pages/Empresa/Empresa.jsx';
import Talento from './pages/Talento/Talento.jsx';
import ProtectedPage from './pages/ProtectedPage/ProtectedPage.jsx';
import TalentoPasso1 from './pages/TalentoPasso/TalentoPasso1.jsx';
import EmpresaPasso from './pages/EmpresaPasso/EmpresaPasso.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Configura from './pages/Configura/Configura.jsx';
import Password from './pages/Password/Password.jsx';
import VerificEmail from './pages/VerificEmail/VerificEmail.jsx';
import PasswordReset from './pages/PasswordReset/PasswordReset.jsx';
import Magic from './pages/Magic/Magic.jsx';

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
  },
  {
    path: "EmpresaPasso",
    element: <EmpresaPasso></EmpresaPasso>
  },
  {
    path: "Dashboard",
    element: <Dashboard></Dashboard>
  },
  {
    path: "Configura",
    element: <Configura></Configura>
  },
  {
    path: "Password",
    element: <Password></Password>
  },
  {
    path: "verificar-email/:token",
    element: <VerificEmail></VerificEmail>
  },
  {
    path: "recuperar-senha/:token",
    element: <PasswordReset></PasswordReset>
  },
  {
    path: "Magic",
    element: <Magic></Magic>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
