import MainUserTalento from '../../components/MainUserTalento/MainUserTalento.jsx';
import './Dashboard.css';
import { useState, useEffect } from 'react';
import { UserProvider as UserDados } from '../../services/UserContext.jsx';
import { UserProvider as UserDadosEmpresa } from '../../services/UserContextEmpresa.jsx';
import { UserProvider as VagasTag } from '../../services/UserContextVagasTag.jsx';
import { axiosInstance, setAuthToken } from '../../utils/api.js';

const Dashboard = () => {
  const [dadosTag, setDadosTag] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [notify, setNotify] = useState([]);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true); // Carregamento geral dos dados
  const [configUser, setConfigUser] = useState(false);

  useEffect(() => {
    // Função para buscar dados de vagas e notificações ao mesmo tempo
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        // Buscar vagas favoritas e notificações ao mesmo tempo
        const [vagasResponse, notifyResponse] = await Promise.all([
          axiosInstance.get(`/recommended`),
          axiosInstance.get('/notify')
        ]);

        setDadosTag(vagasResponse.data.jobs);

        console.log(vagasResponse.data.jobs);
        
        setNotify(notifyResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError('Erro ao carregar dados.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [searchText]);

  return (
    <div style={{ background: '#F8F8F8', height: '100vh'}}>
      <UserDados>
        <VagasTag>
          <UserDadosEmpresa>
            <MainUserTalento 
              dadosTag={loadingData ? [] : dadosTag} 
              notify={loadingData ? [] : notify}      
              loadingNotify={loadingData}             
              configUser={configUser} 
              showDashnone={false} 
              img={true} 
              userTalento={true} 
              className="navDash" 
              userData={true} 
              barraPesquisa={true} 
              setSearchText={setSearchText} 
              setConfigUser={setConfigUser} 
            />
          </UserDadosEmpresa>
        </VagasTag>
      </UserDados>
    </div>
  );
};

export default Dashboard;
