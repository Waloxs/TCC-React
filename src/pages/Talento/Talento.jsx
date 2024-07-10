import React, { useState } from 'react';
import axios from 'axios';
import imgTalento from '../../assets/imgTalento.png';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal'
import './Talento.css';
import { Link, useNavigate } from 'react-router-dom'; // updated import
import Input from '../../components/Form/input';// assuming Input component is properly implemented
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";


const Talento = () => {
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const navigate = useNavigate(); // useNavigate hook

  
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      nome: event.target.nome.value,
      email: event.target.email.value,
      senha: event.target.senha.value,
      localizacao: event.target.localizacao.value,
      telefone: event.target.telefone.value
    };

    try {
      console.log('Tentando enviar os dados para o servidor:', userData);
      const response = await axios.post('http://localhost:3000/v1/register', userData);
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      if (error.response) {
        // O servidor respondeu com um código de status fora do intervalo 2xx
        console.error('Dados da resposta:', error.response.data);
        console.error('Status da resposta:', error.response.status);
        console.error('Cabeçalhos da resposta:', error.response.headers);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error('Requisição:', error.request);
      } else {
        // Algo aconteceu na configuração da requisição que acionou um erro
        console.error('Erro', error.message);
      }
      console.error('Configuração da requisição:', error.config);
    }
  };

  return (
    <div>
      <div className='tudo flex justify-center' style={{ width: '100vw' }}>
        <div className='container flex flex-col justify-center items-center' style={{ maxWidth: '70rem', background: '#fff', height: '100vh', gap: '30px', marginTop: '10px', padding: '20px' }}>
          <div className="containerLogo" style={{ width: '100%' }}>
            <Link to="/" style={{ width: '100%' }}>
              <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
            </Link>
          </div>
          <div className="conteudo flex justify-between" style={{ width: '100%', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
            <div className='ui flex flex-col' style={{ height: '35rem', width: '46rem' }}>
              <Link to="/Escolha"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>
              <div className='flex flex-col gap-3' style={{ marginTop: '-20px', padding: '2rem' }}>
                <h1 className='EscTit self-center'>Olá seja Bem-vindo!</h1>
                <p className='EscPar2 flex self-center'>Cadastre-se e encontre o trabalho ideal para você.</p>
              </div>
              <form className='formTalento flex flex-col gap-3' style={{ padding: '3rem', marginTop: '-40px' }} onSubmit={handleSubmit}>
                <div className='gri'>
                  <Input name='nome' placeholder='Nome' type='text' className='s'/>
                  
                  <Input name='sobrenome' placeholder='Sobrenome' type='text' className='s' />
                </div>
                
                <Input name='email' placeholder='Email' type='email' className='s' />

                <div className="senha">
                  <Input
                    name='senha'
                    placeholder='Senha'
                    type={passwordVisible2 ? 'text' : 'password'}
                    className='inputEye1'
                  />
              
                  {passwordVisible2 ? (
                    <IoEyeOffSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  ) : (
                    <IoEyeSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  )}
                </div>
      
                <Link to='/TalentoPasso1'><BtnPrincipal type='submit' texto='Criar Conta' width='100%' back='#0866FF' color='#fff' hover='#3A61D4'/></Link>
                
                <div className="line2 flex self-center"></div>
              </form>
              <h3 className='cont2 flex self-center'>Ou continuar com</h3>

              <div className='flex justify-center'>
              <div className="top mid flex justify-center gap-2 items-center" style={{ maxWidth: '85%' }}>
              <FcGoogle style={{ width: '20px', height: '20px' }} />
              <h2 className='gog'>Google</h2>
               </div>
               </div>
            </div>
            <img className='imgTalento' src={imgTalento} alt="Login Visual" style={{ maxWidth: '30rem', height: '35rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Talento;
