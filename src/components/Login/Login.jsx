import React, { useState, useEffect } from 'react';
import './Login.css';
import img from '../../assets/login.png';
import Logo from '../../assets/Logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

 


  useEffect(() => {
    const image = new Image();
    image.src = img;
    image.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  if (!isImageLoaded) {
    return (
      <div className='flex justify-center items-center' style={{background: '#fff', height: '100vh'}}>
      </div>
    );
  }

  return (
    <div className='tudo flex justify-center items-center' style={{background: '#fff', height: '100vh'}}>
      <div className="anime flex justify-between" style={{width: '65rem', height: 'auto' , background: '#f7f7f7', borderRadius: '1.25rem'}}>
        <form className="form flex flex-col items-center justify-center gap-5" style={{width: '100%'}}>
          <img src={Logo} alt="Logo" style={{width: '6rem', height: '1.10rem'}}/>
          <div className="tituSub">
            <h1 className='titLogin'>Seja bem-vindo de volta!</h1>
            <span className='subLogin'>Realize o Login para acessar a Workzen.</span>
          </div>
          <input type="text" placeholder='Email'/>
          <input type="password" placeholder='Senha'/>
          <span className='sub flex self-end'>Esqueceu a Senha?</span>
          <a className='btnLogin' href="/" type='submit'>Entrar</a>
          <div className="line"></div>
          <h3 className='cont'>Ou continuar com</h3>

          <div className="redes flex justify-around gap-5" style={{maxWidth: '100%'}}>
            <div className="mid flex items-center gap-2">
              <FcGoogle style={{maxWidth: '20px', height: '20px'}}/>
              <h2 className='gog'>Google</h2>
            </div>
            <div className="mid flex items-center gap-2">
              <FaFacebook style={{maxWidth: '20px', height: '20px', color: '#0866FF'}}/>
              <h2 className='fac'>Facebook</h2>
            </div>
          </div>
        </form>
        <img className='imgLogin' src={img} alt="Login Visual" style={{maxWidth: '34rem', height: '40rem'}}/>
      </div>
    </div>
  );
};

export default Login;
