import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserVagasTag from '../UserVagasTag/UserVagasTag.jsx';
import UserVagasApl from '../UserVagasApl/UserVagasApl.jsx';
import { useUser as UsersVagasTag } from '../../services/UserContextVagasTag.jsx';
import { useUser } from '../../services/UserContext.jsx';
import ClipLoader from 'react-spinners/ClipLoader.js';
import './MainUserTalento.css';
import { useState, useEffect } from 'react';

const MainUser = () => {
  const { data2: userDataVagas, loading2, error2 } = UsersVagasTag();
  const { data, loading, error } = useUser(); // Adicionado carregamento e erro
  const [selectedButton, setSelectedButton] = useState('home');
  const [imagePerfil, setImagePerfil] = useState(null);

  useEffect(() => {
    if (data) {
      console.log(data.image);
      if (data.image === '') {
        setImagePerfil(<img src={`https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=172554&rounded=true&color=fff`} alt='Foto não exibida' style={{marginTop: '1rem', width: '120px'}}/>);
      } else {
        setImagePerfil(<img src={data.image} alt="Imagem de Perfil" style={{borderRadius: '50%', width: '120px', paddingTop: '1rem'}}/>);
      }
    }
  }, [data]); 

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

  return (
    userDataVagas && data && ( 
      <div className='flex flex-col' style={{marginTop: '40px'}}>
        <div className="containerTal">
          <div>
            <div className='flex flex-col gap-4' style={{border: '1px solid #E2E8F0', borderRadius: '20px', padding: '80px 0px'}}>
              <BtnPrincipal
                texto={<div className='flex justify-start gap-2' style={{width: '100%', marginLeft: '40px'}}>{selectedButton === 'home' ? <img src="icons/icon-home-azul.svg" alt="Ícone Home" /> : <img src="icons/icon-home-cinza2.svg" alt="Ícone Home" />} Home</div>}
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
                texto={<div className='flex justify-start gap-2' style={{ whiteSpace: 'nowrap', width: '100%', marginLeft: '40px' }}>{selectedButton === 'aplicacoes' ? <img src="icons/Aplication-azul.svg" alt="Ícone Criar Vaga" /> : <img src="icons/Aplication-cinza.svg" alt="Ícone Criar Vaga" />} Minhas Aplicações</div>}
                back={selectedButton === 'aplicacoes' ? '#fff' : '#fff'}
                padding='15px'
                borderRadius='0px'
                color={selectedButton === 'aplicacoes' ? '#3B82F6' : '#64748B'}
                width="85%"
                borderLeft={selectedButton === 'aplicacoes' ? '#3B82F6' : '#fff'}
                click={() => handleButtonClick('aplicacoes')}
              />
              <BtnPrincipal
                texto={<div className='flex justify-start gap-2' style={{width: '100%', marginLeft: '40px'}}>{selectedButton === 'configuracoes' ? <img src="icons/config-azul.svg" alt="Ícone Configurações" /> : <img src="icons/config-cinza.svg" alt="Ícone Configurações" />} Configurações</div>}
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

          {selectedButton === 'home' &&(
          <UserVagasTag/>
          )}

          {selectedButton === 'aplicacoes' &&(
          <UserVagasApl/>
          )}

          <div className='container-perfil flex flex-col items-center justify-between'>
            {imagePerfil}
            <div className='flex flex-col items-center'>
            <span className='nome-perfil'>{data.firstName + ' ' + data.lastName}</span>
            <span className='titulo-perfil'>{data.titulo}</span>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <BtnPrincipal
                texto={'Ver Perfil'}
                back={'#3B82F6'}
                padding='15px'
                borderRadius='20px'
                color={'#fff'}
                width="160px"
                click={''}
                />
            </div>
          </div>
        </div>
      </div>
    )
  );
};



export default MainUser;
