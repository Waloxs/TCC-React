import React from 'react'
import './Login.css'
import img from '../../assets/login.png'
import Logo from '../../assets/Logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";


const Login = () => {
  return (
    <div className='flex justify-center items-center' style={{background: '#202020', height: '100vh'}}>
      <div className="flex justify-between" style={{width: '65rem', height: 'auto' , background: '#fff', borderRadius: '1.25rem'}}>
        <div className="form flex flex-col items-center justify-center gap-5" style={{width: '100%'}}>
         <img src={Logo} alt="" style={{width: '6rem', height: '1.10rem'}}/>
         <div className="titSub">
         <h1 className='tit'>Seja bem-vindo de volta!</h1>
         <span className='sub'>Realize o Login para acessar a Workzen.</span>
         </div>
         <input type="text" placeholder='Email'/>
         <input type="password" placeholder='Senha'/>
         <span className='sub flex self-end'>Esqueceu a Senha?</span>
         <a className='btn' href="/">Entrar</a>
         <div className="line"></div>
         <h3 className='cont'>Ou continuar com</h3>

         <div className="redes flex justify-around" style={{width: '100%'}}>
          <div className="mid flex items-center gap-2">
          <FcGoogle style={{width: '20px', height: '20px'}}/>
            <h2 className='gog'>Google</h2>
          </div>
          <div className="mid flex items-center gap-2">
            <FaFacebook style={{width: '20px', height: '20px', color: '#0866FF'}}/>
            <h2 className='fac'>Facebook</h2>
          </div>
         </div>
        </div>
        <img src={img} alt="" style={{width: '34rem', height: '40rem'}}/>
      </div>
    </div>
  )
}

export default Login
