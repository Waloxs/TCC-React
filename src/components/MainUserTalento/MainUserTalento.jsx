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
import VerPerfil from '../VerPerfil/VerPerfil.jsx';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import { motion } from 'framer-motion';


const MainUserTalento = ({ dadosTag, notify, configUser }) => {
  const { data2: userDataVagas, loading2, error2 } = UsersVagasTag();
  const { data, loading, error } = useUser(); 
  const [selectedButton, setSelectedButton] = useState('home');
  const [imagePerfil, setImagePerfil] = useState(null);
  const [shownNotifications, setShownNotifications] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const [mudaborder, setmudaborder] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [handleNotify, setHandleNotify] = useState(true);

  const VerDetalhes = (notification, index) => {
    setSelectedNotification(notification); 
    setmudaborder(index);
  }
  
  const teste = (notification) => {


    return(
      <>
      <motion.div 
       initial={{y: '-10px'}}
       animate={{ y: 0 }}
       transition={{ duration: 2, ease: 'easeOut' }}
       className='notification-container'
      >

        <div className='notification-item flex justify-between items-center'>
          <h1 className='notify-message-title'>{notification.job.title}</h1>
        
          <div className='flex gap-2 items-center'>
            <h1 className='notify-message-title'>Nome da Empresa</h1>
            <img src={notification.job.company.image} alt="" style={{maxWidth: '35px'}} />
          </div>
        </div>

      </motion.div>

<motion.div 
initial={{y: '-10px'}}
animate={{ y: 0 }}
transition={{ duration: 2, ease: 'easeOut' }}
className='notification-container'
>

<div className='flex flex-col gap-6'>

 <div className='notification-item flex flex-col'>
     <h1 className='notify-message-title'>Localização</h1>
     <h1 className='notify-message-title'>Localização do Job</h1>
 </div>


 <div className='notification-item flex flex-col'>
     <h1 className='notify-message-title'>Informações de Contato</h1>
     <h1 className='notify-message-title'>Telefone</h1>
     <h1 className='notify-message-title'>Email</h1>
 </div>

 </div>
 

</motion.div>
</>
    )
  }
  
  const getHoursDifference = (createdAt) => {
    const currentTime = new Date();
    const notificationTime = new Date(createdAt);
    const differenceInMs = currentTime - notificationTime; 
    const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60)); 
    return differenceInHours + 'h atrás';
  }


  
  const showNotification = (notification, index) => {

    return (
      <>
      <motion.div
        key={index}
        onClick={() => VerDetalhes(notification, index)} 
        className='notify-sucess'
        style={{ position: 'relative', marginBottom: '10px', borderRadius: mudaborder === index ? '15px 0px 0px 0px' : '15px 0px 15px 15px', cursor: 'pointer'  }}
        initial={{x: '100vw'}}
        animate={{ x: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        <div className='flex justify-between'>
          <div className='flex gap-2 items-center'>
            <span className='notify-message'>{notification.message}</span>
            <img src='icons/check.svg' alt='check icon' style={{ width: '20px', marginRight: '10px' }} />
          </div>

        <div className='flex items-center gap-5'>
          <span className='notify-message'>{getHoursDifference(notification.createdAt)}</span>
          <img  src={isHovered ? "icons/fechar-red.svg" : "icons/fechar.svg"}
          alt=""
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setHandleNotify(false)}/>
        </div>
        </div>
  
      </motion.div>

        {selectedNotification === notification && teste(notification)}
        
      </>
    );
  };

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
      notify.forEach((notification, index) => {
        if (!shownNotifications.includes(notification._id)) {
          showNotification(notification, index); 
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
  
      console.log('Sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw new Error('Erro ao atualizar vaga');
    }
  };



  

  
  return (
    userDataVagas && data && (
      <div className='flex flex-col' style={{ position: 'relative'}}>
        <div className="containerTalDash">
          <div className='lateral-esquerda'>
            <div className='flex flex-col gap-4' style={{ padding: '80px 0px' }}>
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

          {selectedButton === 'home' && !configUser &&(
            <>
            <div style={{marginTop: '64px' ,height: 'calc(104px + 100vh)'}}>
              {(!Array.isArray(dadosTag) || dadosTag.length === 0) && <UserVagasTag />}
            </div>

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

          {selectedButton === 'aplicacoes' && !configUser &&(
            <UserVagasApl />
          )}

          {selectedButton === 'curtidas' && !configUser &&(
            <UserVagasLike />
          )}

          {selectedButton === 'configuracoes' && !configUser &&(
            <ConfiguracaoConta />
          )}

          {configUser && (
            <VerPerfil dadosUser={data}/>
          )}

         </div>
 


         <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        pauseOnHover
        draggable
        pauseOnFocusLoss
        rtl={false}
        theme="light"
        className='toast-container'
      />


      {handleNotify && (
         <div className='notify-caixa'>
          {notify.map((notification, index) => showNotification(notification, index))}
         </div>
      )}



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