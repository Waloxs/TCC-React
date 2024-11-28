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
import Swal from 'sweetalert2';

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
    if (!email) {
      setErrorMessage('Por favor, preencha o e-mail.');
      return false;
    }
    
    if ((novaSenha || confirmarSenha) && novaSenha !== confirmarSenha) {
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
      if (email) {
        const responseEmail = await axiosInstance.put('/empresa/profile', { email });
        if (responseEmail.status === 200) {
          setTextoBotao('Atualizado');
          setBackBotao('#4ADA3D');
          
          Swal.fire({
            title: 'Sucesso!',
            text: 'Seu e-mail foi salvo com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4ADA3D',
          });
        }
      }
  
      if (novaSenha && novaSenha === confirmarSenha) {
        const responseSenha = await axiosInstance.put('/empresa/profile', { password: novaSenha });
        if (responseSenha.status === 200) {
          setTextoBotao('Atualizado');
          setBackBotao('#4ADA3D');
          
          Swal.fire({
            title: 'Sucesso!',
            text: 'Sua senha foi salva com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4ADA3D',
          });
        }
      }
  
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setErrorMessage('Houve um erro ao salvar as configurações.');
    }
  };
  

  return (
    <>


    <div className='formConfiguracao flex flex-col'>


      {!modal && (
      <>
      <div className='flex flex-col gap-2' style={{ width: '100%', height: '100%' }}>
        
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
