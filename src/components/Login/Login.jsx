import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import img from '../../assets/login.png';
import Logo from '../../assets/Logo.png';
import LogoResp from '../../assets/logoResp.png';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Input from '../Form/input';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Login = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: event.target.email.value,
      senha: event.target.senha.value
    };

    try {
      const response = await axios.post('http://localhost:3000/v1/login', userData);
      localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
      navigate('/teste'); // Redireciona para '/teste'
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      // Tratamento de erro aqui
    }
  };

  const [password, setPassword] = useState(false);

  const togglePassword = () => {
    setPassword(!password);
  }

  useEffect(() => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  if (!isImageLoaded) {
    return (
      <div className='flex justify-center items-center' style={{ background: '#fff', height: '100vh' }}>
      </div>
    );
  }

  return (
    <div className='tudo flex justify-center items-center' style={{ background: '#fff', height: '100vh' }}>
      <div className="anime flex justify-between" style={{ width: '65rem', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
        <form className="form flex flex-col items-center justify-center gap-5" style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Link to='/'><img src={LogoResp} alt="Logo" style={{ width: '2rem', height: '1.10rem' }} className='logoResp' /></Link>
          <Link to='/'><img src={Logo} alt="Logo" style={{ width: '6rem', height: '1.10rem' }} className='imageout' /></Link>
          <div className="tituSub">
            <h1 className='titLogin'>Seja bem-vindo de volta!</h1>
            <span className='subLogin'>Realize o Login para acessar a Workzen.</span>
          </div>

          <div className='cpSenha flex flex-col gap-2' style={{width: '100%'}}>
          <Input name='email' placeholder='Email' type='email'  />
          <Input name='senha' placeholder='Senha' type={password ? 'text' : 'password'} />
          {password ? (
                    <IoEyeOffSharp className='Eye' onClick={togglePassword} />
                  ) : (
                    <IoEyeSharp className='Eye' onClick={togglePassword} />
                  )}
          </div>

          <span className='sub flex self-end'>Esqueceu a Senha?</span>
          <button type='submit' className='btnLogin'>Entrar</button>
          <div className="line"></div>
          <h3 className='cont'>Ou continuar com</h3>

          <div className="mid flex justify-center gap-2 items-center" style={{ maxWidth: '100%' }}>
              <FcGoogle style={{ width: '20px', height: '20px' }} />
              <h2 className='gog'>Google</h2>
          </div>
        </form>
        <img className='imgLogin' src={img} alt="Login Visual" style={{ maxWidth: '34rem', height: '40rem' }} />
      </div>
    </div>
  );
};

export default Login;
