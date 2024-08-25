import React, { useState } from 'react';
import './ConfiguracaoConta.css';
import Input from '../Form/input.jsx';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import { useForm } from 'react-hook-form';
import { axiosInstance, setAuthToken } from '../../utils/api.js';

const ConfiguracaoConta = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [textoBotao, setTextoBotao] = useState('Salvar');
  const [backBotao, setBackBotao] = useState('#93BBFD');
  const { handleSubmit } = useForm();

  const validarCampos = () => {
    if (!email || !senha) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
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
        password: senha
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
    <div className='formConfiguracao flex flex-col'>
      <div className='flex flex-col justify-between' style={{ marginTop: '30px', width: '100%', height: '100%' }}>
        
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
          <span>Senha</span>
          <Input
            type='password'
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className='flex self-end' style={{ marginTop: '40px', marginBottom: '40px' }}>
        <BtnPrincipal
          texto={textoBotao}
          back={backBotao}
          padding='10px'
          borderRadius='15px'
          color='#fff'
          font='Lexend'
          width='180px'
          click={() => handleSubmit(salvarConfiguracoes)()}
        />
      </div>
    </div>
  );
};

export default ConfiguracaoConta;
