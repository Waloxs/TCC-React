import React from 'react'
import img from '../../assets/login.png';
import Logo from '../../assets/Logo.png';

const Escolha = () => {
  return (
    <div>
        <div className='flex flex-col justify-center items-center' style={{background: '#fff', height: '100vh', gap: '30px', marginTop: '-20px'}}>
        <div className="flex justify-start" style={{width: '65rem'}}>
        <img src={Logo} alt="Logo" style={{width: '6rem', height: '1.10rem'}}/>
        </div>
         <div className="anime flex justify-between" style={{width: '65rem', height: 'auto' , background: '#f7f7f7', borderRadius: '1.25rem'}}>
        <form className="form flex flex-col items-center justify-center gap-5" style={{width: '100%'}}>
          <div className="tituSub">
            <h1 className='titLogin'>Seja bem-vindo de volta!</h1>
            <span className='subLogin'>Realize o Login para acessar a Workzen.</span>
          </div>
          <input type="text" placeholder='Email'/>
          <input type="password" placeholder='Senha'/>
          <span className='sub flex self-end'>Esqueceu a Senha?</span>
          <a className='btnLogin' href="/" type='submit'>Entrar</a>

        </form>
        <img className='imgLogin' src={img} alt="Login Visual" style={{maxWidth: '34rem', height: '35rem'}}/>
      </div>
    </div>
    </div>
  )
}

export default Escolha
