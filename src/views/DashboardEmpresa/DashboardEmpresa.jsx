import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MainUser from '../../components/MainUser/MainUser';
import { UserProvider as UserProviderEmpresa } from '../../services/UserContextEmpresa';
import { UserProvider as UserProviderVagas } from '../../services/UserContextVagasEmpresa';
import { UserProvider as UserProviderTalento } from '../../services/UserContext.jsx';
import { jwtDecode } from 'jwt-decode'; // Corrigi o import de jwt-decode
import axios from 'axios'; // Para fazer a requisição de renovação do token

const DashboardEmpresa = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/Login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('authToken');
          navigate('/Login');
        } else {
          // Calcula o tempo restante até a expiração
          const timeUntilExpiration = (decodedToken.exp - currentTime) * 1000;

          // Renova o token 5 minutos antes de expirar
          const renewalTime = timeUntilExpiration - 5 * 60 * 1000;

          const renewToken = async () => {
            try {
              const response = await axios.post('URL_DA_API_DE_RENOVACAO_DE_TOKEN', {
                token: token,
              });
              const newToken = response.data.token;

              // Armazena o novo token e redefine o processo de renovação
              localStorage.setItem('authToken', newToken);
              scheduleTokenRenewal(newToken);
            } catch (error) {
              console.error('Erro ao renovar o token:', error);
              localStorage.removeItem('authToken');
              navigate('/Login');
            }
          };

          const scheduleTokenRenewal = (token) => {
            const decoded = jwtDecode(token);
            const current = Date.now() / 1000;
            const timeUntilExp = (decoded.exp - current) * 1000;
            const renewalTime = timeUntilExp - 5 * 60 * 1000;
            setTimeout(renewToken, renewalTime);
          };

          setTimeout(renewToken, renewalTime);
        }
      } catch (error) {
        console.error('Token inválido:', error);
        navigate('/Login');
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
