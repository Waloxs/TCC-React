import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserVagasTag from '../UserVagasTag/UserVagasTag.jsx';
import UserVagasApl from '../UserVagasApl/UserVagasApl.jsx';
import { useUser as UsersVagasTag } from '../../services/UserContextVagasTag.jsx';
import { useUser } from '../../services/UserContext.jsx';
import ClipLoader from 'react-spinners/ClipLoader.js';
import './MainUserTalento.css';
import { useState, useEffect } from 'react';
import UserVagasLike from './UserVagasLike/UserVagasLike.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfiguracaoConta from '../ConfiguracaoConta/ConfiguracaoConta.jsx'
import PerfilCandidato from '../PerfilCandidato/PerfilCandidato.jsx';
import { axiosInstance, setAuthToken } from '../../utils/api.js';



const showNotification = (notification) => {
  toast.success(
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src='icons/check.svg' alt='check icon' style={{ width: '20px', marginRight: '10px' }} />
      {`${notification.message} - ${new Date(notification.createdAt).toLocaleTimeString()}`}
    </div>
  );
};

const MainUserTalento = ({ dadosTag, notify }) => {
  const { data2: userDataVagas, loading2, error2 } = UsersVagasTag();
  const { data, loading, error } = useUser(); // Adicionado carregamento e erro
  const [selectedButton, setSelectedButton] = useState('home');
  const [imagePerfil, setImagePerfil] = useState(null);
  const [shownNotifications, setShownNotifications] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);



  useEffect(() => {
    if (data) {
      if (data.image === '') {
        setImagePerfil(<img src={`https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=172554&rounded=true&color=fff`} alt='Foto não exibida' style={{ marginTop: '1rem', width: '120px' }} />);
      } else {
        setImagePerfil(<img src={data.image} alt="Imagem de Perfil" style={{ borderRadius: '50%', width: '120px', marginTop: '1rem' }} />);
      }
    }
  }, [data]);



  useEffect(() => {
    if (notify.length > 0) {
      notify.forEach(notification => {
        if (!shownNotifications.includes(notification._id)) {
          showNotification(notification); 
          setShownNotifications(prev => [...prev, notification._id]); 
        }
      });
    }
  }, [notify]);

  if (loading || loading2) {
    return (
      <div className='flex justify-center items-center' style={{ background: '#fff', height: '100vh' }}>
        <ClipLoader color="#123abc" loading={true} size={100} />
      </div>
    );
  }

  if (error || error2) {
    return <div>Error: {error?.message || error2?.message}</div>;
  }

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const apareceModal = (index) => {
    setModalIndex(index);
  };

  const fechaModal = () => {
    setModalIndex(null);
  };


  const aplicarVaga = async (vaga) => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

  
    try {

      console.log(vaga._id);

      const response = await axiosInstance.post(`/jobs/${vaga._id}/apply`, {}, {

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      // Exibindo o console de sucesso
      console.log('Sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw new Error('Erro ao atualizar vaga');
    }
  };
  

  return (
    userDataVagas && data && (
      <div className='flex flex-col' style={{ marginTop: '40px' }}>
        <div className="containerTal">
          <div>
            <div className='flex flex-col gap-4' style={{ border: '1px solid #E2E8F0', borderRadius: '20px', padding: '80px 0px' }}>
              <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ width: '100%', marginLeft: '30px' }}>{selectedButton === 'home' ? <img src="icons/icon-home-azul.svg" alt="Ícone Home" style={{ width: '20px' }} /> : <img src="icons/icon-home-cinza2.svg" alt="Ícone Home" style={{ width: '20px' }} />} Home</div>}
                back={selectedButton === 'home' ? '#fff' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={selectedButton === 'home' ? '#3B82F6' : '#64748B'}
                width="85%"
                borderLeft={selectedButton === 'home' ? '#3B82F6' : '#fff'}
                weig="500"
                click={() => handleButtonClick('home')}
              />
              <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ whiteSpace: 'nowrap', width: '100%', marginLeft: '30px' }}>{selectedButton === 'aplicacoes' ? <img src="icons/Aplication-azul.svg" alt="Ícone Criar Vaga" style={{ width: '20px' }} /> : <img src="icons/Aplication-cinza.svg" alt="Ícone Criar Vaga" style={{ width: '20px' }} />} Minhas Aplicações</div>}
                back={selectedButton === 'aplicacoes' ? '#fff' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={selectedButton === 'aplicacoes' ? '#3B82F6' : '#64748B'}
                width="85%"
                borderLeft={selectedButton === 'aplicacoes' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('aplicacoes')}
              />
              <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ whiteSpace: 'nowrap', width: '100%', marginLeft: '30px' }}>{selectedButton === 'curtidas' ? <img src="icons/love-azul.svg" alt="Ícone Criar Vaga" style={{ width: '20px' }} /> : <img src="icons/love.svg" alt="Ícone Criar Vaga" style={{ width: '20px' }} />} Vagas Curtidas</div>}
                back={selectedButton === 'curtidas' ? '#fff' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={selectedButton === 'curtidas' ? '#3B82F6' : '#64748B'}
                width="85%"
                borderLeft={selectedButton === 'curtidas' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('curtidas')}
              />
              <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ width: '100%', marginLeft: '30px' }}>{selectedButton === 'configuracoes' ? <img src="icons/config-azul.svg" alt="Ícone Configurações" style={{ width: '20px' }} /> : <img src="icons/config-cinza.svg" alt="Ícone Configurações" style={{ width: '20px' }} />} Configurações</div>}
                back={selectedButton === 'configuracoes' ? '#fff' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={selectedButton === 'configuracoes' ? '#3B82F6' : '#64748B'}
                width="85%"
                borderLeft={selectedButton === 'configuracoes' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('configuracoes')}
              />
            </div>
          </div>

          {selectedButton === 'home' && (
            <>
              {/* Verifique se dadosTag é um array vazio ou se não é um array válido */}
              {(!Array.isArray(dadosTag) || dadosTag.length === 0) && <UserVagasTag />}

              {/* Verifique se dadosTag é um array e contém elementos */}
              {Array.isArray(dadosTag) && dadosTag.length > 0 && (
                <div className='flex flex-col'>
                  {dadosTag.map((item, index) => (
                    <div className='flex flex-col container-vagas' style={{ width: '100%' }} key={item._id}>
                      <div>
                        <span className='span-title'>{item.title}</span>
                      </div>
                      <div>
                        <span className='span-description'>{item.localizacao}</span>
                      </div>
                      <div>
                        <span className="span-empresa">{item.company.nome}</span>
                      </div>
                      <div onClick={() => apareceModal(index)}>
                        <span className="span-description">{item.description}</span>
                      </div>
                      <div className='flex items-end'>
                        <span className="span-re">
                          {item.tags.map((req, tagIndex) => (
                            <span key={tagIndex} className='re'>{req}</span>
                          ))}
                        </span>
                        <div className='flex flex-col items-center'>
                          <span className="span-description" style={{ whiteSpace: 'nowrap' }}>{item.salario}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {selectedButton === 'aplicacoes' && (
            <UserVagasApl />
          )}

          {selectedButton === 'curtidas' && (
            <UserVagasLike />
          )}

          {selectedButton === 'configuracoes' && (
            <ConfiguracaoConta />
          )}

          {selectedButton === 'perfilCandidato' && (
            <PerfilCandidato/>
          )}

          <div className='container-perfil flex flex-col items-center gap-4'>
            {imagePerfil}
            <div className='flex flex-col items-center'>
              <span className='nome-perfil'>{data.firstName + ' ' + data.lastName}</span>
              <span className='titulo-perfil'>{data.titulo}</span>
            </div>
            <div style={{ marginBottom: '1rem', width: '80%' }}>
              <BtnPrincipal
                 texto={'Ver Perfil'}
                 back={'#3B82F6'}
                 color={'#fff'}
                 width={'100%'}
                 padding={'10px'}
                 borderRadius={'15px'}
                click={() => handleButtonClick('perfilCandidato')}
               />
             </div>
           </div>
         </div>
 
         <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        rtl={false}
        theme="light"
        className='toast-container'
      />

    
    {dadosTag.map((item, index) => (
      <>
      {modalIndex === index && (
            <div className='moda'>
              <div className="moda-content">
                <div className='flex flex-col gap-12' style={{height: '100%', paddingTop: '0px'}}>

                <button onClick={fechaModal}><img src="icons/arrowLeft.svg" alt="" /></button>


              <div className='flex flex-col'>
                  <span className='apl-title'>{dadosTag[index].title}</span>
                  <span className='apl-localizacao'>{dadosTag[index].localizacao}</span>
              </div>

                  <span className='apl-description'>{dadosTag[index].description}</span>

              <div className='flex flex-col'>
                  <span className='apl-title'>Responsabilidades</span>
                  <span className='flex flex-col'>
                    {dadosTag[index].requirements.map((req, i) => (
                    <span key={i} className='flex items-center item-req'>{i < dadosTag[index].requirements.length ? <div className='icone-circulo'></div> : ''}{req}</span>
                    ))}
                  </span>
              </div>


              <div className='flex flex-col'>
                  <span className='apl-title'>Preço</span>
                  <span className='item-req'>{dadosTag[index].salario}</span>
              </div>

              <div className='flex flex-col'>
                  <span className='apl-title'>Habilidades e Expêriencias</span>
                  <span className='apl-tags flex gap-2' style={{maxWidth: '500px', overflowX: 'auto'}}>{dadosTag[index].tags.map((tag, i ) => (
                    <span className='items-tags' key={i}>{tag}</span>
                  ))}</span>
              </div>



                </div>


                <div className='flex flex-col justify-between'>
                  <div className='apl-dados-empresa flex flex-col items-center'>
                    <span className=''><img src={dadosTag[index].company.image} alt="" style={{borderRadius: '50%', width: '100px'}}/></span>
                    <span className='apl-title-empresa'>{dadosTag[index].company.nome}</span>
                    <span className='apl-description-empresa'>Empresa</span> 
                  </div>


                  <div className='apl-buttons'>
                    <BtnPrincipal
                    texto={'Aplique agora'}
                    back={'#3B82F6'}
                    padding='15px'
                    borderRadius='20px'
                    color={'#fff'}
                    width="100%"
                    click={() => aplicarVaga(dadosTag[index])}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          </>
        ))}
       </div>
     )
   );
 };
 
 export default MainUserTalento;