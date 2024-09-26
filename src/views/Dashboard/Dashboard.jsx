import MainUserTalento from '../../components/MainUserTalento/MainUserTalento.jsx';
import './Dashboard.css';
import { useState, useEffect } from 'react';
import { UserProvider as UserDados } from '../../services/UserContext.jsx';
import { UserProvider as UserDadosEmpresa } from '../../services/UserContextEmpresa.jsx';
import { UserProvider as VagasTag } from '../../services/UserContextVagasTag.jsx';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import NavbarDashboard from '../../components/NavbarDashboard/NavbarDashboard.jsx';

const Dashboard = () => {
  const [dadosTag, setDadosTag] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [notify, setNotify] = useState([]);
  const [error, setError] = useState(null);
  const [loadingNotify, setLoadingNotify] = useState(true); // Carregamento só das notificações
  const [configUser, setConfigUser] = useState(false);

  // Função para buscar as vagas favoritas
  useEffect(() => {
    const fetchFavoritas = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get(`/jobs/search?query=${encodeURIComponent(searchText)}&page=1`);
        setDadosTag(response.data.jobs);
      } catch (error) {
        console.error('Erro ao buscar vagas favoritas:', error);
      }
    };

    if (searchText !== '') {
      fetchFavoritas();
    } else {
      setSearchText(null);
    }
  }, [searchText]);

  // Função para buscar notificações 3 segundos após montagem
  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get('/notify');
        setNotify(response.data);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        setError('Erro ao carregar notificações.');
      } finally {
        setLoadingNotify(false);
      }
    };

    // Definir o delay de 3 segundos
    const timer = setTimeout(() => {
      fetchApplicants();
    }, 3000); // Espera de 3 segundos

    return () => clearTimeout(timer); // Limpar o timeout ao desmontar
  }, []);

  return (
    <div style={{background: '#F8F8F8', height: '100vh', overflowY: 'hidden'}}>
      <UserDados>
        <VagasTag>
          <UserDadosEmpresa>
            <NavbarDashboard showDashnone={false} img={true} userTalento={true} className="navDash" userData={true} barraPesquisa={true} setSearchText={setSearchText} notify={notify} configUser={configUser} setConfigUser={setConfigUser}/>
            <MainUserTalento dadosTag={dadosTag} notify={notify} loadingNotify={loadingNotify} configUser={configUser}/>
          </UserDadosEmpresa>
        </VagasTag>
      </UserDados>
    </div>
  );
};

export default Dashboard;
