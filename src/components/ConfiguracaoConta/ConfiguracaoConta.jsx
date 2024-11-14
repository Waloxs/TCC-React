import React, { useState, useEffect } from 'react';
import './ConfiguracaoConta.css';
import Input from '../Form/input.jsx';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import { useForm } from 'react-hook-form';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import UserDados from '../UserDados/UserDados.jsx';
import { useUser as useUserTalento } from '../../services/UserContext.jsx';
import VerPerfil from '../VerPerfil/VerPerfil.jsx';


const ConfiguracaoConta = () => {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);  // Para alternar visibilidade da nova senha
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);  // Para alternar visibilidade da confirmação de senha
  const [errorMessage, setErrorMessage] = useState('');
  const [textoBotao, setTextoBotao] = useState('Salvar');
  const [backBotao, setBackBotao] = useState('#3B82F6');
  const { handleSubmit } = useForm();
  const [modal, setModal] = useState(false);
  const {data: user} = useUserTalento();



  const handleModal = () => {
    setModal(!modal);
} 


  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        
        const response = await axiosInstance.get('/empresa/profile');
        if (response.status === 200) {
          setEmail(response.data.email);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    carregarDadosUsuario();
  }, []);

  const validarCampos = () => {
    if (!email || !novaSenha || !confirmarSenha) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    if (novaSenha !== confirmarSenha) {
      setErrorMessage('As senhas não coincidem.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const salvarConfiguracoes = async (data) => {
    if (!validarCampos()) {
      return;
    }

    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    try {
      const response = await axiosInstance.put('/empresa/profile', {
        email,
        password: novaSenha,
      });

      if (response.status === 200) {
        setTextoBotao('Configurações Salvas');
        setBackBotao('#4ADA3D');
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setErrorMessage('Houve um erro ao salvar as configurações.');
    }
  };

  return (
    <>


    <div className='formConfiguracao flex flex-col' style={{paddingTop: '25px'}}>

      <UserDados toggleModal={handleModal}/>


      {!modal && (
      <>
      <div className='flex flex-col gap-2' style={{ marginTop: '30px', width: '100%', height: '100%' }}>
        
        <div className='flex flex-col gap-2'>
          <span>Email</span>
          <Input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <span>Nova Senha</span>
          <div className='input-password-container'>
            <Input
              type={mostrarSenha ? 'text' : 'password'}
              required
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <IoEyeOffSharp /> : <IoEyeSharp />}
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <span>Confirmar Senha</span>
          <div className='input-password-container'>
            <Input
              type={mostrarConfirmarSenha ? 'text' : 'password'}
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            >
              {mostrarConfirmarSenha ? <IoEyeOffSharp /> : <IoEyeSharp />}
            </button>
          </div>
        </div>

      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className='flex self-end' style={{ marginTop: '40px', marginBottom: '40px' }}>
        <BtnPrincipal
          texto={textoBotao}
          back={backBotao}
          padding='7px 10px'
          borderRadius='20px'
          color='#fff'
          font='Lexend'
          width='180px'
          click={() => handleSubmit(salvarConfiguracoes)()}
          hoverColor='#609AFA'
        />
      </div>
      </>
      )}
    </div>
      {modal && (
        <div className='modal flex flex-col'>
          <VerPerfil dadosUser={user}/>
        </div>
      )}
    </>

  );
};

export default ConfiguracaoConta;
