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
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo.png'
import User from '../UserProfile/UserProfile.jsx';
import { useUser as useUserTalento } from '../../services/UserContext.jsx';
import Notify from '../Notify/Notify.jsx';
import UserDados from '../UserDados/UserDados.jsx'
import heart from '../../../public/icons/heart.svg'
import heartPre from '../../../public/icons/heartPre.svg'


const MainUserTalento = ({ 
  dadosTag, 
  notify, 
  configUser,
  menu,
  setMenu,
  showDashnone = true,
  img = false,
  criConta = true,
  userTalento = false,
  NavEmpresa = false,
  barraPesquisa = false,
  setConfigUser,
  setSearchText
}) => {
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
  const [inputValue, setInputValue] = useState('');
  const [modal, setModal] = useState(false);
  const [vagasCurtidas, setVagasCurtidas] = useState({ favoritedJobs: [] }); 
  const [likedItems, setLikedItems] = useState({});
  
  const [searchResults, setSearchResults] = useState([]);




  useEffect(() => {
    const fetchFavoritas = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get('/jobs/favorite', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const favoritas = response.data.favoritedJobs || [];
        setVagasCurtidas({ favoritedJobs: favoritas });
      } catch (error) {
        console.error("Erro ao buscar vagas favoritas:", error);
      }
    };

    fetchFavoritas();
  }, []);

  const changeMarked = async (vaga) => {
    const isAlreadyLiked = vagasCurtidas.favoritedJobs.some((v) => v._id === vaga._id);
  
    try {
      // Atualizando o estado de forma otimista
      setVagasCurtidas((prevState) => ({
        favoritedJobs: isAlreadyLiked
          ? prevState.favoritedJobs.filter((v) => v._id !== vaga._id)
          : [...prevState.favoritedJobs, vaga],
      }));
  
      // Envia a requisição para a API após atualizar o estado
      if (isAlreadyLiked) {
        await sendFavoriteStatus(vaga, false); // Descurte a vaga
      } else {
        await sendFavoriteStatus(vaga, true); 
      }
    } catch (error) {
      console.error("Erro ao atualizar o status de curtida:", error);
    }
  };
  
  const sendFavoriteStatus = async (vaga, isLiked) => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    try {
      let response;

      if (isLiked) {
        response = await axiosInstance.put(`/jobs/favorite`, { jobId: vaga._id }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log("Vaga marcada como favorita:", response.data);
      } else {
        response = await axiosInstance.delete(`/jobs/favorite/${vaga._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log("Vaga desmarcada como favorita:", response.data);
      }

      return response.data;

    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw new Error('Erro ao atualizar vaga');
    }
  };

  console.log(searchResults);

  const fetchSearchResults = async (query) => {

    try {
      const response = await axiosInstance.get(`/jobs/search?query=${encodeURIComponent(query)}&page=1`);

      console.log(searchResults);

      setSearchResults(response.data.jobs); 
    } catch (error) {
      console.error('Erro ao buscar vagas por tag:', error);
    }
  };

  useEffect(() => {
    // Debounce para esperar um curto período antes de disparar a busca
    const delayDebounceFn = setTimeout(() => {
      if (inputValue) {
        fetchSearchResults(inputValue); // Chama a função de busca
      } else {
        setSearchResults([]); // Limpa os resultados se o campo estiver vazio
      }
    }, 500); // Tempo de debounce: 500ms

    // Limpa o timeout se o usuário continuar digitando antes dos 500ms
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);


  const handleHeart = async (jobId, index) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Token não encontrado');
  
      setAuthToken(token);
  
      const isLiked = likedItems[index];
  
      setLikedItems((prevLikedItems) => ({
        ...prevLikedItems,
        [index]: !isLiked,
      }));
  
      if (isLiked) {
        await axiosInstance.delete(`/jobs/favorite/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`Vaga ${jobId} desmarcada como favorita com sucesso!`);
      } else {
        await axiosInstance.put(
          '/jobs/favorite',
          { jobId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`Vaga ${jobId} marcada como favorita com sucesso!`);
      }
    } catch (error) {
      console.error('Erro ao marcar/desmarcar vaga como favorita:', error);
  
      setLikedItems((prevLikedItems) => ({
        ...prevLikedItems,
        [index]: likedItems[index],
      }));
    }
  };
  
  

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

  const Logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/Login'; 
  }



  const location = useLocation();
  const isHome = location.pathname === '/';
  

  const handleModal = () => {
      setModal(!modal);
  } 


  const formatarSalario = (valor) => {
    if (!valor) return '0,00R$';
  
    // Remove "R$", ".", ","
    const valorLimpo = valor.replace(/[^\d]/g, '');
    
    // Multiplica o número por 100 e converte de volta para string
    const valorCorrigido = (parseInt(valorLimpo, 10) * 100).toString();
  
    // Formata com separadores de milhar e duas casas decimais
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(valorCorrigido / 100);
  
    return valorFormatado;
  };
  


  return (
    userDataVagas && data && (
      <div className='flex flex-col' style={{ position: 'relative', height: '100vh' }}>
        <div className="containerTalDash">

          
          <div className='lateral-esquerda'>

            <div>
              <img src={Logo} alt="" style={{maxWidth: '180px', padding: '30px'}}/>
              <div className='line-decorativa'></div>
           

            <div className='flex flex-col gap-4' style={{ padding: '80px 0px 180px 0px' }}>
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
                texto={<div className='flex justify-start items-center gap-2' style={{ whiteSpace: 'nowrap', width: '100%', marginLeft: '30px' }}>{<img src="icons/Applicant-cinza.svg" alt="Ícone Criar Vaga" style={{ width: '20px' }} /> } Minhas Aplicações</div>}
                back={selectedButton === 'aplicacoes' ? '#FAFAFA' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={'#64748B'}
                width="100%"
                borderLeft={selectedButton === 'aplicacoes' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('aplicacoes')}
              />
              <BtnPrincipal
                texto={<div className='flex justify-start items-center gap-2' style={{ whiteSpace: 'nowrap', width: '100%', marginLeft: '30px' }}>{<img src="icons/love.svg" alt="Ícone Criar Vaga" style={{ width: '20px' }} />} Vagas Curtidas</div>}
                back={selectedButton === 'curtidas' ? '#FAFAFA' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={'#64748B'}
                width="100%"
                borderLeft={selectedButton === 'curtidas' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('curtidas')}
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

          <div style={{paddingRight: '200px'}}>
          {selectedButton === 'home' && (
            <>

          <div className='flex items-center justify-between' style={{marginTop: '20px'}}>
            <div className='flex items-center gap-12'>
              {barraPesquisa && (
                 <div className='pesquisa' style={{ position: 'relative' }}>
                 <input
                   type="text"
                   style={{ width: "300px", height: "35px" }}
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder={'Procurar'}
                 />
                 <img 
                   src="icons/Search.svg" 
                   alt="Search Icon" 
                   style={{
                     position: 'absolute', 
                     top: '50%', 
                     right: '10px', 
                     transform: 'translateY(-50%)', 
                     cursor: 'pointer'
                   }}
                 />
               </div>
              )}
          </div>


       <UserDados toggleModal={handleModal} talento={true}/>

            </div>



            {!modal && (searchResults.length === 0) && (
            <>
            <div style={{marginTop: '64px' ,height: 'max-content'}}>

              <h1 className='title-vagas'>Vagas recomendadas</h1>

              {(!Array.isArray(dadosTag) || dadosTag.length === 0) && <UserVagasTag />}
            </div>

              </>  
              )}

               {!modal && (searchResults.length > 0) && (

              <div style={{marginTop: '64px'}}>
                <h1 className='title-vagas'>Vagas encontradas</h1>

                <div className='flex flex-col gap-8' style={{height: '70vh', overflowY: 'auto'}}>

                {searchResults.map((item, index) => ( 

                <>
                <div className='flex flex-col gap-3 container-vagas' style={{ width: '100%' }} key={item._id} onClick={() => apareceModal(index)}>
                <div>
                  <span className='span-title'>{item.title}</span>
                </div>
                <div>
                  <span className='span-description'>{item.localizacao}</span>
                </div>
                <div>
                  <span className="span-empresa">{item.company.nome}</span>
                </div>
                <div>
                  <span className="span-description">{item.description}</span>
                </div>
                <div className='flex items-end'>
                  <span className="span-re">
                    {item.tags.map((req, tagIndex) => (
                      <span key={tagIndex} className='re'>{req}</span>
                    ))}
                  </span>
                  <div className='flex flex-col items-center'>
                    <span className="span-description" style={{ whiteSpace: 'nowrap' }}>{formatarSalario(item.salario)}</span>
                    <div onClick={(event) => {event.stopPropagation(); changeMarked(item);}}>
                      {vagasCurtidas.favoritedJobs.some((v) => v._id === item._id) ? (
                        <img src="icons/heartPre.svg" alt="marked" style={{ width: '20px' }} />
                      ) : (
                        <img src="icons/heart.svg" alt="not marked" style={{ width: '20px' }} />
                      )}
                    </div>
                </div>
                </div>
                </div>

                {modalIndex === index && (
            <div className='moda'>

              <div className="moda-content">
                <div className='flex flex-col gap-12' style={{height: '100%', paddingTop: '0px'}}>

                <button onClick={(event) => { event.stopPropagation(); fechaModal(); }}>
                  <img src="icons/arrowLeft.svg" alt="" />
                </button>


              <div className='flex flex-col'>
                  <span className='apl-title'>{searchResults[index].title}</span>
                  <span className='apl-localizacao'>{searchResults[index].localizacao}</span>
              </div>

                  <span className='apl-description'>{searchResults[index].description}</span>

              <div className='flex flex-col'>
                  <span className='apl-title'>Responsabilidades</span>
                  <span className='flex flex-col'>
                    {searchResults[index].requirements.map((req, i) => (
                    <span key={i} className='flex items-center item-req'>{i < searchResults[index].requirements.length ? <div className='icone-circulo'></div> : ''}{req}</span>
                    ))}
                  </span>
              </div>


              <div className='flex flex-col'>
                  <span className='apl-title'>Preço</span>
                  <span className='item-req'>{searchResults[index].salario}</span>
              </div>

              <div className='flex flex-col'>
                  <span className='apl-title'>Habilidades e Expêriencias</span>
                  <span className='apl-tags flex gap-2' style={{maxWidth: '500px', overflowX: 'auto'}}>{searchResults[index].tags.map((tag, i ) => (
                    <span className='items-tags' key={i}>{tag}</span>
                  ))}</span>
              </div>



                </div>


                <div className='flex flex-col justify-between'>
                  <div className='apl-dados-empresa flex flex-col items-center'>
                    <span className=''><img src={searchResults[index].company.image} alt="" style={{borderRadius: '50%', width: '100px'}}/></span>
                    <span className='apl-title-empresa'>{searchResults[index].company.nome}</span>
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
                    click={() => aplicarVaga(searchResults[index])}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

                </>
                ))}
                </div>
                </div>
               )}   


              {modal && (
                <div className='modal flex flex-col'>
                  <VerPerfil dadosUser={data}/>
                </div>
              )}       
            </>
          )}


          {selectedButton === 'aplicacoes' && !configUser &&(
            <>
            <UserVagasApl />
            </>
          )}

          {selectedButton === 'curtidas' && !configUser &&(
             <>
             <UserVagasLike />
             </>
          )}

          {selectedButton === 'configuracoes' && !configUser &&(
            <>
              <ConfiguracaoConta />
            </>
          )}

  
           {configUser && (
            <>
                <VerPerfil dadosUser={data}/>
            </>
        )}

        </div>

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