import { useState } from 'react';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import UserVagasEmpresa from '../UserVagasEmpresa/UserVagasEmpresa.jsx';
import CriarVaga from '../CriarVaga/CriarVaga.jsx';
import EditEmpresa from '../EditarPerfilEmpresa/EditEmpresa.jsx'
import ClipLoader from 'react-spinners/ClipLoader.js';
import './MainUser.css';

const MainUser = () => {


  const { data: userDataEmpresa, loading, error } = useUserEmpresa();
  const { data: userDataVagasEmpresa, loading2, error2 } = useUserVagasEmpresa();

  const [selectedButton, setSelectedButton] = useState('home');
  const [containerPerfil, setContainerPerfil] = useState (false);
  const [suma, setSuma] = useState(true);

  const editarPerfil = () => {
    setContainerPerfil(true);
    setSuma('none')
  }
 

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

  return (
    userDataEmpresa && (
      <>
      <div className={''}>
      <div className='Container' style={{ gridTemplateColumns: selectedButton !== 'home' ? '1fr 4fr' : '1fr 3fr 1fr' }}>
        <div>
          <BtnPrincipal
            texto={<div className='flex justify-center gap-2'>Home {selectedButton === 'home' ? <img src="icons/icon-home.svg" alt="Minha Imagem"/> : <img src="icons/icon-home-cinza.svg" alt="Minha Imagem"/> }</div>}
            back={selectedButton === 'home' ? '#3B82F6' : '#fff'}
            padding='15px'
            borderRadius='15px'
            color={selectedButton === 'home' ? '#fff' : '#64748B'}
            width="85%"
            weig="500"
            click={() => handleButtonClick('home')}
          />
          <BtnPrincipal
            texto={<div className='flex justify-center gap-2'>Criar Vaga {selectedButton === 'criarVaga' ? <img src="icons/icon-adc-branco.svg" alt="Minha Imagem"/> : <img src="icons/icon-adc.svg" alt="Minha Imagem"/> }</div>}
            back={selectedButton === 'criarVaga' ? '#3B82F6' : '#fff'}
            padding='15px'
            borderRadius='15px'
            color={selectedButton === 'criarVaga' ? '#fff' : '#64748B'}
            width="85%"
            click={() => handleButtonClick('criarVaga')}
          />
          <BtnPrincipal
            texto={<div className='flex justify-center gap-2'>Configurações {selectedButton === 'configuracoes' ? <img src="icons/icon-config-branco.svg" alt="Minha Imagem"/> : <img src="icons/icon-config.svg" alt="Minha Imagem"/> }</div>}
            back={selectedButton === 'configuracoes' ? '#3B82F6' : '#fff'}
            padding='15px'
            borderRadius='15px'
            color={selectedButton === 'configuracoes' ? '#fff' : '#64748B'}
            width="85%"
            click={() => handleButtonClick('configuracoes')}
          />
          <BtnPrincipal
            texto={<div className='flex justify-center gap-2'>Ajuda {selectedButton === 'ajuda' ? <img src="icons/icon-pergunta-branco.svg" alt="Minha Imagem"/> : <img src="icons/icon-pergunta.svg" alt="Minha Imagem"/> }</div>}
            back={selectedButton === 'ajuda' ? '#3B82F6' : '#fff'}
            padding='15px'
            borderRadius='15px'
            color={selectedButton === 'ajuda' ? '#fff' : '#64748B'}
            width="85%"
            click={() => handleButtonClick('ajuda')}
          />
        </div>

        <div>
        {userDataVagasEmpresa && selectedButton === 'home' && (
          <div className='central'>
            {!containerPerfil && ( <span className='vaga-tit'>Minhas Vagas</span> )}
            <UserVagasEmpresa />
          </div>
        )}

        {selectedButton === 'criarVaga' && (
          <div className='central'>
            <CriarVaga />            
          </div>
        )}


        {containerPerfil &&(
          <div className='central'>  
            <EditEmpresa />
          </div>
        )}

        {!userDataVagasEmpresa && selectedButton === 'home' && (
          <div className='central'>
            <span className='vaga-tit'>Minhas Vagas</span>
            <p>Você ainda não tem vagas criadas.</p>
          </div>
        )}
        </div>

        {selectedButton === 'home' && (
          <div className='modalConfigura'>
            <div className='perEmp'>
              <UserEmpresa className='' prLet={true} size={'3rem'} />
            </div>
            <div className='flex flex-col items-center'>
              <UserEmpresa nome={true} className='nomeEmp' />
              <span className='span-texto'>Empresa</span>
            </div>
            <div className="linha"></div>
            <BtnPrincipal
              texto='Editar Perfil'
              back='#3B82F6'
              padding='15px'
              borderRadius='25px'
              color='#fff'
              width="85%"
              weig="500"
              click={editarPerfil}
            />
          </div>
        )}
      </div>
      </div>

      <div>

       </div>
      </>
    )
  );
};

export default MainUser;
