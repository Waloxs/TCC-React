// MainUser.jsx
import { useState, useEffect } from 'react';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import UserVagasEmpresa from '../UserVagasEmpresa/UserVagasEmpresa.jsx';
import CriarVaga from '../CriarVaga/CriarVaga.jsx';
import EditEmpresa from '../EditarPerfilEmpresa/EditEmpresa.jsx';
import ConfiguracaoConta from '../ConfiguracaoConta/ConfiguracaoConta.jsx';
import ClipLoader from 'react-spinners/ClipLoader.js';
import axios from 'axios';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import './MainUser.css';
import Logo from '../../assets/Logo.png'

const MainUser = () => {
  const { data: userDataEmpresa, loading, error } = useUserEmpresa();
  const { data: userDataVagasEmpresa, loading2, error2 } = useUserVagasEmpresa();
  const [selectedButton, setSelectedButton] = useState('home');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (userDataEmpresa && userDataEmpresa.image) {
      setImage(userDataEmpresa.image);
    }
  }, [userDataEmpresa]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  if (loading || loading2) {
    return (
      <div className='flex justify-center items-center' style={{ background: '#fff', height: '100vh' }}>
        <ClipLoader color="#123abc" loading={true} size={100} />
      </div>
    );
  }

  if (error || error2) {
    return <div></div>;
  }


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  
    const formData = new FormData();
    formData.append('image', file);
  
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
  
    try {
      const response = await axiosInstance.put('/empresa/profile', formData, {

        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

  
      const data = response.data;
      if (data.image) {
        setImage(data.image);
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };

  const Logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/Login'; 
  }


  

  return (
    userDataEmpresa && (
      <>
        <div>
          <div
            className='Container'
          >

<div className='lateral-esquerda' style={{height: '100vh'}}>

  <div className='flex flex-col gap-12'>

  <div>
  <img src={Logo} alt="" style={{maxWidth: '180px', padding: '30px'}}/>
  <div className='line-decorativa'></div>
  </div>


  <div>
  
            <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ width: '100%', marginLeft: '30px' }}>{ <img src="icons/icon-home-cinza.svg" alt="Ícone Home" style={{ width: '20px' }} /> } Home</div>}
                back={selectedButton === 'home' ? '#FAFAFA' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={'#64748B'}
                width="100%"
                borderLeft={selectedButton === 'home' ? '#3B82F6' : '#fff'}
                weig="500"
                click={() => handleButtonClick('home')}
              />

            <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ whiteSpace: 'nowrap', width: '100%', marginLeft: '30px' }}>{<img src="icons/adc.svg" alt="Ícone Criar Vaga" style={{ width: '15px' }} /> } Criar Vaga</div>}
                back={selectedButton === 'criarVaga' ? '#FAFAFA' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={'#64748B'}
                width="100%"
                borderLeft={selectedButton === 'criarVaga' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('criarVaga')}
              />

     
            <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ width: '100%', marginLeft: '30px' }}>{<img src="icons/config-cinza.svg" alt="Ícone Configurações" style={{ width: '20px' }} />} Configurações</div>}
                back={selectedButton === 'configuracoes' ? '#FAFAFA' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={'#64748B'}
                width="100%"
                borderLeft={selectedButton === 'configuracoes' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('configuracoes')}
              />
      </div>
  </div>

  <div className='flex flex-col items-start'>
                <div style={{height: '2px', width: '90%', background: '#E2E8F0', margin: '0 auto'}}></div>
                <div className='flex items-center' style={{padding: '20px 0px 0px 40px', cursor: 'pointer'}} onClick={Logout}>
                  <img src="icons/logout.svg" alt="" style={{width: '30px'}}/>
                  <span>Sair</span>
                </div>
            </div>

</div>       

            <div style={{width: '70%'}}>
              {userDataVagasEmpresa && selectedButton === 'home' && (
                <div className='central' style={{marginTop: '64px'}}>
                  <span className='vaga-tit'>Minhas Vagas</span>
                  <UserVagasEmpresa />
                </div>
              )}

              {selectedButton === 'criarVaga' && (
                <div className='central'>
                  <CriarVaga />
                </div>
              )}

              {selectedButton === 'configuracoes' && (
                <div className='central'>
                  <ConfiguracaoConta />
                </div>
              )}

            

              {!userDataVagasEmpresa && selectedButton === 'home' && (
                <div className='central'>
                  <span className='vaga-tit'>Minhas Vagas</span>
                  <p>Você ainda não tem vagas criadas.</p>
                </div>
              )}
            </div>

           
          </div>
        </div>
      </>
    )
  );
};

export default MainUser;
