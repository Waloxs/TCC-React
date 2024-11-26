import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Importação do SweetAlert2
import axios from 'axios';
import './Login.css';
import img from '../../assets/login.png';
import Logo from '../../assets/Logo.png';
import LogoResp from '../../assets/logoResp.png';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Form/input';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import ClipLoader from 'react-spinners/ClipLoader';
import { axiosInstance, setAuthToken } from '../../utils/api.js';

const Login = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setPassword(!password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = {
      email: event.target.email.value,
      password: event.target.senha.value,
    };
  
    try {
      const response = await axiosInstance.post('/user/login', userData);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setAuthToken(token);
  
      Swal.fire({
        icon: 'success',
        title: 'Login bem-sucedido!',
        text: 'Você será redirecionado ao Dashboard.',
        timer: 3000,
        showConfirmButton: false,
      });
  
      setTimeout(() => {
        navigate('/Dashboard');
        window.location.reload();
      }, 3000);
    } catch (talentError) {
      console.log(talentError); 
    
      if (talentError.response?.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Credenciais inválidas.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Algo deu errado. Por favor, tente novamente mais tarde.',
        });
      }
    }
    
  };
  

  useEffect(() => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      setIsImageLoaded(true);
    };

    const Loader = setTimeout(() => {
      if (isImageLoaded) {
        setShowLoader(false);
      }
    }, 1000);

    return () => {
      clearTimeout(Loader);
    };
  }, [isImageLoaded]);

  if (showLoader) {
    return (
      <div className='flex justify-center items-center' style={{ background: '#fff', height: '100vh' }}>
        <ClipLoader color="#123abc" loading={true} size={100} />
      </div>
    );
  }

  return (
    <div className='tudo flex justify-center items-center' style={{ background: '#fff', height: '100vh' }}>
      <div className="anime flex justify-between" style={{ width: '65rem', height: 'auto', borderRadius: '1.25rem' }}>
        <form className="form flex flex-col items-center justify-center gap-5" style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Link to='/'><img src={LogoResp} alt="Logo" style={{ width: '2rem', height: '1.10rem' }} className='logoResp' /></Link>
          <Link to='/'><img src={Logo} alt="Logo" style={{ width: '6rem', height: '1.10rem' }} className='imageout' /></Link>
          <div className="tituSub">
            <h1 className='titLogin'>Seja bem-vindo de volta!</h1>
            <span className='subLogin flex justify-center'>Realize o Login para acessar a Workzen.</span>
          </div>

          <div className='cpSenha flex flex-col gap-2' style={{ width: '100%' }}>
            <Input name='email' placeholder='Email' type='email' />
            <Input name='senha' placeholder='Senha' type={password ? 'text' : 'password'} />
            {password ? (
              <IoEyeOffSharp className='Eye' onClick={togglePassword} />
            ) : (
              <IoEyeSharp className='Eye' onClick={togglePassword} />
            )}
          </div>

          <Link to="/Password" className='flex self-end'>
            <span className='sub'>Esqueceu a Senha?</span>
          </Link>

          <BtnPrincipal class="btnLogin" texto="Entrar" color="#fff" width="100%" back="#3B82F6" hover='#3A61D4' />
          <div className="lineLogin"></div>
          <span className='cont'>Ou continuar com</span>

          <a href='https://workzen.onrender.com/v1/auth/google' className="mid flex justify-center gap-2 items-center" style={{ maxWidth: '100%' }}>
            <FcGoogle style={{ width: '20px', height: '20px' }} />
            <span className='gog'>Google</span>
          </a>

          <div className='flex gap-2' style={{position: 'absolute', bottom: '10%'}}>
            <span className='sub'>Ainda não tem conta?</span> 
            <Link to="/escolha">
            <span className='sub' style={{color: '#3B82F6'}}>Crie uma!</span> 
            </Link>            
          </div>
        </form>
        <div>
          <img className='imgLogin' src={img} alt="Login Visual" style={{ maxWidth: '40rem', height: '40rem', transform: 'translateX(70px)' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
