import React, { useState } from 'react';
import imgTalento from '../../assets/imgTalento.png';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../Buttons/BtnPrincipal';
import './Talento.css';
import { Link } from 'react-router-dom';
import Input from '../Form/input';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
const Talento = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
      console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
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
            <div className='flex flex-col' style={{ height: '40rem', width: '46rem' }}>
              <Link to="/Escolha"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>
              <div className='flex flex-col gap-3' style={{ marginTop: '-20px', padding: '2rem' }}>
                <h1 className='EscTit text-center'>Olá seja Bem-vindo!</h1>
                <p className='EscPar2 flex self-center'>Cadastre-se e encontre o trabalho ideal para você.</p>
              </div>
              <form className='formTalento flex flex-col gap-3' style={{ padding: '3rem', marginTop: '-40px' }} onSubmit={handleSubmit}>
                <Input name='nome' placeholder='Nome' className='s' />
                <Input name='email' placeholder='Email' type='email' className='s' />
                <div className="senha">
                  <Input
                    name='senha'
                    placeholder='Senha'
                    type={passwordVisible ? 'text' : 'password'}
                    className='inputEye1'
                  />
                  {passwordVisible ? (
                    <IoEyeOffSharp className='Eye1' onClick={togglePasswordVisibility} />
                  ) : (
                    <IoEyeSharp className='Eye1' onClick={togglePasswordVisibility} />
                  )}
                </div>
                <Input name='localizacao' placeholder='Localização' type='text' className='s' />
                <Input name='telefone' placeholder='Telefone' type='text' className='s' />
                <button type='submit'><BtnPrincipal texto='Avançar' back='#0866FF' color='#fff' /></button>
                <div className="line2 flex self-center"></div>
              </form>
              <h3 className='cont2 flex self-center'>Ou continuar com</h3>
            </div>
            <img className='imgTalento' src={imgTalento} alt="Login Visual" style={{ maxWidth: '34rem', height: '40rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Talento;
