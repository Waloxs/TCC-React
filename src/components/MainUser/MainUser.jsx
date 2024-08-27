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
import './MainUser.css';

const MainUser = () => {
  const { data: userDataEmpresa, loading, error } = useUserEmpresa();
  const { data: userDataVagasEmpresa, loading2, error2 } = useUserVagasEmpresa();
  const [selectedButton, setSelectedButton] = useState('home');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Carregar a imagem de perfil da API no momento da montagem do componente
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
  
    try {
      const response = await axios.put('https://workzen.onrender.com/v1/empresa/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
  
      const data = response.data;
      if (data.image) {
        setImage(data.image);
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };
  

  return (
    userDataEmpresa && (
      <>
        <div>
          <div
            className='Container'
            style={{
              gridTemplateColumns: selectedButton !== 'home' && selectedButton !== 'criarVaga' && selectedButton !== 'configuracoes' 
                ? '1fr 5fr'
                : '1fr 4fr 1fr'
            }}
          >
            <div>
              <BtnPrincipal
                texto={<div className='flex justify-center gap-2'>Home {selectedButton === 'home' ? <img src="icons/icon-home.svg" alt="Ícone Home" /> : <img src="icons/icon-home-cinza.svg" alt="Ícone Home" />}</div>}
                back={selectedButton === 'home' ? '#3B82F6' : '#fff'}
                padding='15px'
                borderRadius='15px'
                color={selectedButton === 'home' ? '#fff' : '#64748B'}
                width="85%"
                weig="500"
                click={() => handleButtonClick('home')}
              />
              <BtnPrincipal
                texto={<div className='flex justify-center gap-2' style={{ whiteSpace: 'nowrap' }}>Criar Vaga {selectedButton === 'criarVaga' ? <img src="icons/icon-adc-branco.svg" alt="Ícone Criar Vaga" /> : <img src="icons/icon-adc.svg" alt="Ícone Criar Vaga" />}</div>}
                back={selectedButton === 'criarVaga' ? '#3B82F6' : '#fff'}
                padding='15px'
                borderRadius='15px'
                color={selectedButton === 'criarVaga' ? '#fff' : '#64748B'}
                width="85%"
                click={() => handleButtonClick('criarVaga')}
              />
              <BtnPrincipal
                texto={<div className='flex justify-center gap-2'>Configurações {selectedButton === 'configuracoes' ? <img src="icons/icon-config-branco.svg" alt="Ícone Configurações" /> : <img src="icons/icon-config.svg" alt="Ícone Configurações" />}</div>}
                back={selectedButton === 'configuracoes' ? '#3B82F6' : '#fff'}
                padding='15px'
                borderRadius='15px'
                color={selectedButton === 'configuracoes' ? '#fff' : '#64748B'}
                width="85%"
                click={() => handleButtonClick('configuracoes')}
              />
            </div>

            <div>
              {userDataVagasEmpresa && selectedButton === 'home' && (
                <div className='central' style={{paddingRight: '70px'}}>
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
                <div className='central' style={{paddingRight: '70px'}}>
                  <ConfiguracaoConta />
                </div>
              )}

              {selectedButton === 'Edit' && (
                <div className='centralEditVaga' style={{marginTop: '-40px'}}>
                  <EditEmpresa />
                  <div className='modalConfigura' style={{marginTop: '0px'}}>
                <div className='perEmp'>
                  <label htmlFor="file-upload">
                    {image ? (
                      <img src={image} alt="Profile" style={{ width: '100%', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <UserEmpresa className='' prLet={true} size={'3rem'} />
                    )}
                  </label>
                  <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                </div>
                <div className='flex flex-col items-center'>
                  <UserEmpresa nome={true} className='nomeEmp' />
                  <span className='span-texto'>Empresa</span>
                </div>
                <div className="linha"></div>
                <BtnPrincipal
                  texto={<div className='flex justify-center items-center gap-2'>Editar Perfil {selectedButton === 'Edit'}</div>}
                  back='#3B82F6'
                  padding='10px 24px'
                  borderRadius='20px'
                  color='#fff'
                  width="85%"
                  weig="500"
                  click={() => handleButtonClick('Edit')}
                  hoverColor='#609AFA'
                />
              </div>
                </div>
              )}

              {!userDataVagasEmpresa && selectedButton === 'home' && (
                <div className='central'>
                  <span className='vaga-tit'>Minhas Vagas</span>
                  <p>Você ainda não tem vagas criadas.</p>
                </div>
              )}
            </div>

            {(selectedButton === 'home' || selectedButton === 'criarVaga' || selectedButton === 'configuracoes') && (
              <div className='modalConfigura'>
                <div className='perEmp'>
                  <label htmlFor="file-upload">
                    {image ? (
                      <img src={image} alt="Profile" style={{ width: '100%', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <UserEmpresa className='' prLet={true} size={'3rem'} />
                    )}
                  </label>
                  <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                </div>
                <div className='flex flex-col items-center'>
                  <UserEmpresa nome={true} className='nomeEmp' />
                  <span className='span-texto'>Empresa</span>
                </div>
                <div className="linha"></div>
                <BtnPrincipal
                  texto={<div className='flex justify-center items-center gap-2'>Editar Perfil {selectedButton === 'Edit'}</div>}
                  back='#3B82F6'
                  padding='10px 24px'
                  borderRadius='20px'
                  color='#fff'
                  width="85%"
                  weig="500"
                  click={() => handleButtonClick('Edit')}
                  hoverColor='#609AFA'
                />
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default MainUser;
