import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/index.css';

import Home from './views/Home/Home.jsx';
import Login from './views/Login/Login.jsx';
import Escolha from './views/Escolha/Escolha.jsx';
import Empresa from './views/Empresa/Empresa.jsx';
import Talento from './views/Talento/Talento.jsx';
import ProtectedPage from './views/ProtectedPage/ProtectedPage.jsx';
import TalentoPasso1 from './views/TalentoPasso/TalentoPasso1.jsx';
import EmpresaPasso from './views/EmpresaPasso/EmpresaPasso.jsx';
import Dashboard from './views/Dashboard/Dashboard.jsx';
import Configura from './views/Configura/Configura.jsx';
import Configura2 from './views/Configura2/Configura2.jsx';
import Password from './views/Password/Password.jsx';
import VerificEmail from './views/VerificEmail/VerificEmail.jsx';
import PasswordReset from './views/PasswordReset/PasswordReset.jsx';
import Magic from './views/magic/magic.jsx';
import DashboardEmpresa from './views/DashboardEmpresa/DashboardEmpresa.jsx';

import { UserProvider } from './services/UserContext.jsx'; 

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
    path: "Configura2",
    element: <Configura2></Configura2>
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
  },
  {
    path: "DashboardEmpresa",
    element: <DashboardEmpresa></DashboardEmpresa>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* Envolva a aplicação com UserProvider */}
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>,
);
