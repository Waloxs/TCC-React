import MainUserTalento from '../../components/MainUserTalento/MainUserTalento.jsx';
import Navbar from '../../components/Navbar/Navbar';
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
  const [loadingNotify, setLoadingNotify] = useState(true); // Carregamento só das notificações

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
        const newNotifications = response.data;

        // Obter as notificações armazenadas anteriormente no localStorage
        const storedNotifications = JSON.parse(localStorage.getItem('storedNotify')) || [];

        // Comparar para verificar se existem novas notificações
        if (JSON.stringify(storedNotifications) !== JSON.stringify(newNotifications)) {
          setNotify(newNotifications);
          localStorage.setItem('storedNotify', JSON.stringify(newNotifications)); // Armazenar novas notificações
        }

      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        setError('Erro ao carregar notificações.');
      } finally {
        setLoadingNotify(false);
      }
    };

    // Verificar se já temos notificações salvas
    const savedNotifications = JSON.parse(localStorage.getItem('storedNotify'));
    if (!savedNotifications || savedNotifications.length === 0) {
      // Se não houver notificações salvas, definir o delay de 3 segundos para buscar notificações
      const timer = setTimeout(() => {
        fetchApplicants();
      }, 3000); // Espera de 3 segundos

      return () => clearTimeout(timer); // Limpar o timeout ao desmontar
    } else {
      // Se já houver notificações salvas, exibir essas notificações diretamente
      setNotify(savedNotifications);
      setLoadingNotify(false);
    }
  }, []);

  // Exibição do dashboard sem esperar pelas notificações
  return (
    <div>
      <UserDados>
        <VagasTag>
          <UserDadosEmpresa>
            <Navbar showDashnone={false} img={true} userTalento={true} className="navDash" userData={true} barraPesquisa={true} setSearchText={setSearchText} notify={notify} />
            <MainUserTalento dadosTag={dadosTag} notify={notify} loadingNotify={loadingNotify} />
          </UserDadosEmpresa>
        </VagasTag>
      </UserDados>
    </div>
  );
};

export default Dashboard;
