import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MainUser from '../../components/MainUser/MainUser';
import { UserProvider as UserProviderEmpresa } from '../../services/UserContextEmpresa';
import { UserProvider as UserProviderVagas } from '../../services/UserContextVagasEmpresa';
import { UserProvider as UserProviderTalento } from '../../services/UserContext.jsx';
import {jwtDecode} from 'jwt-decode'; 

const DashboardEmpresa = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      // Se o token não existe, redirecionar para login
      navigate('/Login');
    } else {
      try {
        const decodedToken = jwtDecode(token); // Decodifica o token
        const currentTime = Date.now() / 1000; // Tempo atual em segundos

        // Se o token expirou, redirecionar para login
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('authToken'); // Remove o token expirado
          navigate('/Login');
        }
      } catch (error) {
        console.error('Token inválido:', error);
        navigate('/Login'); // Em caso de erro ao decodificar, redirecionar para login
      }
    }
  }, [navigate]);

  return (
    <div style={{ height: '100vh' }}>
      <UserProviderTalento>
        <UserProviderEmpresa>
          <UserProviderVagas>
            <Navbar showDashnone={false} img={true} NavEmpresa={true} className='navDash' />
            <MainUser />
          </UserProviderVagas>
        </UserProviderEmpresa>
      </UserProviderTalento>
    </div>
  );
}

export default DashboardEmpresa;
