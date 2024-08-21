// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/index.css';

// Importando as views
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

// Importando os provedores de contexto
import { UserProvider as TalentoUserProvider } from './services/UserContext.jsx'; 
import { UserProvider as EmpresaUserProvider } from './services/UserContextEmpresa.jsx'; 
import { UserProvider as TodosTalentosVagasTag } from './services/UserContextVagasTag.jsx'; 
import { UserProvider as VagasEmpresa } from './services/UserContextVagasEmpresa.jsx'; 

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "Login", element: <Login /> },
  { path: "Escolha", element: <Escolha /> },
  { path: "Empresa", element: <Empresa /> },
  { path: "Talento", element: <Talento /> },
  { path: "teste", element: <ProtectedPage /> },
  { path: "TalentoPasso1", element: <TalentoPasso1 /> },
  { path: "EmpresaPasso", element: (
    <EmpresaUserProvider>
      <EmpresaPasso />
    </EmpresaUserProvider>
  )},
  { path: "Dashboard", element: <Dashboard /> },
  { path: "Configura", element: <Configura /> },
  { path: "Configura2", element: <Configura2 /> },
  { path: "Password", element: <Password /> },
  { path: "verificar-email/:token", element: <VerificEmail /> },
  { path: "recuperar-senha/:token", element: <PasswordReset /> },
  { path: "Magic", element: <Magic /> },
  { path: "DashboardEmpresa", element: <DashboardEmpresa /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <VagasEmpresa>
        <TodosTalentosVagasTag>
          <TalentoUserProvider>
            {/* Todos os provedores de contexto são aplicados aqui */}
          </TalentoUserProvider>
        </TodosTalentosVagasTag>
      </VagasEmpresa>
    </RouterProvider>
  </React.StrictMode>
);
