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

  useEffect(() => {
    const fetchFavoritas = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get(`/jobs/search?query=${encodeURIComponent(searchText)}`);

        setDadosTag(response.data);
        console.log(response.data);
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

  return (
    <div>
      <UserDados>
        <VagasTag>
        <UserDadosEmpresa>
        <Navbar showDashnone={false} img={true} userTalento={true} className='navDash' userData={true} barraPesquisa={true} setSearchText={setSearchText}/>
        <MainUserTalento dadosTag={dadosTag}/>
        </UserDadosEmpresa>
        </VagasTag>
      </UserDados>
    </div>
  );
};

export default Dashboard;
