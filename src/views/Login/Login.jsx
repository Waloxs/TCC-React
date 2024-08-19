import { useState, useEffect } from 'react';
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


const Login = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email: event.target.email.value,
      password: event.target.senha.value
    };
    
    try {
      const response = await axios.post('https://workzen.onrender.com/v1/user/login', userData);
      localStorage.setItem('authToken', response.data.token);
      navigate('/Dashboard');
    } catch (error) {
      console.error('Erro ao tentar login de usuário:', error);
      try {
        const responseEmpresa = await axios.post('https://workzen.onrender.com/v1/empresa/login', userData);
        localStorage.setItem('authToken', responseEmpresa.data.token);
        navigate('/DashboardEmpresa');
      } catch (empresaError) {
        console.error('Erro ao tentar login de empresa:', empresaError);
      }
    }
  }

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

    const Loader = setTimeout(() => {
      if(isImageLoaded){
        setShowLoader(false);
      }
    }, 1000);

    return () => {
      clearTimeout(Loader)
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

          <Link to="/Password" className='flex self-end'>
            <span className='sub'>Esqueceu a Senha?</span>
          </Link>


          <BtnPrincipal class="btnLogin" texto="Entrar" color="#fff" width="100%" back="#3B82F6" hover='#3A61D4' /> {/* Botão para salvar as mudanças */}
          
          <div className="lineLogin"></div>
          <span className='cont'>Ou continuar com</span>

          <a href='https://workzen.onrender.com/v1/auth/google' className="mid flex justify-center gap-2 items-center" style={{ maxWidth: '100%' }}>
              <FcGoogle style={{ width: '20px', height: '20px' }} />
              <span className='gog'>Google</span>
          </a>
        </form>
        <div>
        <img className='imgLogin' src={img} alt="Login Visual" style={{ maxWidth: '40rem', height: '40rem', transform: 'translateX(70px)' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
