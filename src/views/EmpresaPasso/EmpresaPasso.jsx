import { useState, useEffect } from 'react';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import './EmpresaPasso.css';
import { Link } from 'react-router-dom';
import Input from '../../components/Form/input';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';

const EmpresaPasso = () => {
  const [block, setBlock] = useState(true);
  const [block2, setBlock2] = useState(true);
  const [block3, setBlock3] = useState(true);
  const [block4, setBlock4] = useState(true);
  const [valor, setValor] = useState('Azul25');
  const [sombra, setSombra] = useState(false);
  const [back, setBack] = useState(false);
  const [image, setImage] = useState(null);
  const [descricao, setDescricao] = useState('Descrição padrão'); 
  const navigate = useNavigate();
  const [profissional, setProfissional] = useState('x');
  const { data: userEmpresa } = useUserEmpresa();

  const handleRegister = async () => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
  
        const data = {
         title: profissional,
         description: descricao
        };
  
        const response = await axios.post('https://workzen.onrender.com/v1/jobs/create', data, config);
        console.log('Dados enviados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };
  
  const handleRegister2 = async () => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
  
        const data = {
         title: profissional,
         description: descricao,
        };

  
        const response = await axios.post('https://workzen.onrender.com/v1/jobs/create', data, config);
        console.log('Dados enviados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };


  const handleRegisterFalse = async () => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
  
        const data = {
         title: 'x',
         description: descricao
        };
  
        const response = await axios.post('https://workzen.onrender.com/v1/jobs/create', data, config);
        console.log('Dados enviados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };




  const handleClickFalse = (e) => {
    e.preventDefault();
    handleRegisterFalse();
    setBlock(!block);
    setBlock2(!block2);
    setValor('Azul50');
  };
  

  const handleClick = (e) => {
    e.preventDefault();
    if (profissional.trim() !== '') {
      handleRegister();
      setBlock(!block);
      setBlock2(!block2);
      setValor('Azul50');
    } else {
      alert('Clique em PULAR burro');
    }
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    handleRegister2();
  };

  const handleClick3 = (e) => {
    e.preventDefault();
    setBlock3(!block3);
    setBlock4(!block4);
    setValor('Azul100');
  };




  const handleBackClick = (e) => {
    e.preventDefault();
    if (block === true) {
      navigate('/empresa');
    } else if (block2 === false){
      setValor('Azul25antes')
      setBlock(true);
      setBlock2(true);
    } else if (block3 === false){
      setValor('Azul50antes')
      setBlock(false)
      setBlock2(false);
      setBlock3(true);
    } else if (block4 === false){
      setValor('Azul75antes')
      setBlock(false)
      setBlock2(true);
      setBlock3(false);
      setBlock4(true);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file)); 

    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('authToken');

    fetch('https://workzen.onrender.com/v1/me/', {
    method: 'PUT',
    body: formData,
    headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Imagem enviada com sucesso:', response);
  })
  .catch(error => {
    console.error('Erro ao enviar imagem:', error);
  });
};


  return (
    <>
    {userEmpresa && (
    <div className={`${back ? 'back' : ''} tudo flex justify-center`} style={{ width: '100vw' }}>
      <div className={`${sombra ? 'sombra' : ''} containerEmpresa flex flex-col justify-center items-center`} style={{ width: '70rem', background: '#fff', height: '100vh', gap: '30px', marginTop: '10px', padding: '20px' }}>
        <div className="containerLogo2" style={{ width: '100%' }}>
          <Link to="/" style={{ width: '100%' }}>
            <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
          </Link>
        </div>
        <div className="conteudo flex" style={{ width: '100%', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
          <div className='flex flex-col' style={{ height: '35rem', width: '100%' }}>
            <div className='flex items-center'>
              <IoIosArrowBack onClick={handleBackClick} className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF', cursor: 'pointer' }} />
              <div className='cxCinza'>
                <div className={`cxAzul ${valor}`}></div>
              </div>
            </div>
            {block && (
              <div className='animate flex flex-col' style={{ height: '100%', gap: '5rem' }}>
                <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                <h1 className='PassTit'>Seja bem-vindo <UserEmpresa nome={true}/>, para começarmos, adicione um título para que tipo de profissional você procura.</h1>
                  <p className='PassPar'>É a primeira coisa que as Talentos veem. Destaque-se descrevendo sua função Profissional.</p>
                </div>
                <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem' }}>
                  <p className='func'>Sua função Profissional</p>
                  <Input type='text' placeholder='Ex: Programador Fullstack' className='lin' required value={profissional} onChange={(e) => setProfissional(e.target.value)}/>
                </div>
              </div>
            )}

                        {!block2 && (
                  <div className='animate flex flex-col' style={{ height: '100%', gap: '5rem' }}>
                    <div className='pd flex flex-row justify-between' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                      <div className="m flex flex-col gap-2" style={{ marginRight: '30px' }}>
                        <h1 className='PassTitEmp'>Muito bem, agora adicione uma descrição para sua vaga.</h1>
                        <p className='PassPar3'>Ajude os talentos a conhecer sua empresa rapidamente e diga a eles qual o profissional ideal para sua empresa. Diga-lhes claramente, usando parágrafos ou marcadores. Você sempre pode editar mais tarde; apenas certifique-se de revisar agora.</p>
                      </div>
                      <div className='txArea flex flex-col gap-2'>
                        <span className='titArea'>Exemplo</span>
                        <h3 className='subAreaEmp'>A Hexalab está em busca de um Programador Back-End talentoso para se juntar à nossa equipe de desenvolvimento em Itapeva. Você trabalhará em projetos desafiadores...</h3>
                      </div>
                    </div>
                    <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '5rem' }}>
                      <p className='PassPar2'>Sua Biografia</p>
                    <textarea
                      className='txAreaEmp'
                      id="area2"
                      style={{ height: '120px', maxWidth: '600px', resize: 'none' }}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                    </div>
                  </div>
                )}
            {!block4 && (
    <div className='animate flex flex-col items-center' style={{ height: '100%', gap: '5rem' }}>
    <div className='pd flex flex-col text-center gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
      <h1 className='PassTit3'>Últimos detalhes, agora, você pode verificar e publicar seu perfil.</h1>
      <p className='PassPar3 self-center'>Uma foto profissional ajuda você a construir a confiança das empresas.</p>
    </div>
    <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '5rem' }}>
      <label htmlFor="file-upload" className='user'>
        {image ? (
          <img src={image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <FaUserPlus />
        )}
      </label>
      <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
    </div>
    <div className='flex flex-col gap-2' style={{ marginTop: '-100px' }}>
      <label htmlFor="file-upload" className='user'>
        <BtnPrincipal texto="Carregar Foto" color="#3B82F6" width="260px" back="#fff" border="1px solid #3B82F6" borderRadius="20px" padding="10px"></BtnPrincipal>
      </label>
      <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
      <Link to='/Dashboard'><BtnPrincipal texto="Continuar" color="#fff" width="260px" back="#3B82F6" hover='#3A61D4' border="1px solid #3B82F6" /></Link>
    </div>
  </div>
               )}
              
                {block && (
                  <div>
                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer', marginRight: '200px' }} onClick={handleClickFalse}>
                      <BtnPrincipal texto="Pular" color="#3B82F6" width="160px" back="#fff" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>

                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick}>
                      <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>
                  </div>
                )}
                {!block2 && (
                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick2}>
                      <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>
                )}
                {!block3 && (
                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick3}>
                      <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>
                )}
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
};

export default EmpresaPasso;
