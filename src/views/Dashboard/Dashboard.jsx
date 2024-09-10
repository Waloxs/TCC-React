import MainUserTalento from '../../components/MainUserTalento/MainUserTalento.jsx';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css'
import { useState, useEffect } from 'react';
import { UserProvider as UserDados} from '../../services/UserContext.jsx';
import { UserProvider as UserDadosEmpresa} from '../../services/UserContextEmpresa.jsx';
import { UserProvider as VagasTag } from '../../services/UserContextVagasTag.jsx';

import { axiosInstance, setAuthToken } from '../../utils/api.js';

const Dashboard = () => {


  const [dadosTag, setDadosTag] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [notify, setNotify] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchFavoritas = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get(`/jobs/search?query=${encodeURIComponent(searchText)}&page=1`);

        setDadosTag(response.data.jobs);
      } catch (error) {
        console.error("Erro ao buscar vagas favoritas:", error);
      }
    };

    if (searchText !== '') {
      fetchFavoritas();
    }else{
      setSearchText(null);
    }
  }, [searchText]);


  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token); 

      try {
        const response = await axiosInstance.get('/notify');
        setNotify(response.data);
        console.log(response);
      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        setError('Erro ao carregar candidatos.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [notify]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div>
      <UserDados>
        <VagasTag>
        <UserDadosEmpresa>
        <Navbar showDashnone={false} img={true} userTalento={true} className='navDash' userData={true} barraPesquisa={true} setSearchText={setSearchText} notify={notify}/>
        <MainUserTalento dadosTag={dadosTag} notify={notify}/>
        </UserDadosEmpresa>
        </VagasTag>
      </UserDados>
    </div>
  );
};

export default Dashboard;
