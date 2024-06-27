import React, { useState, useEffect } from 'react';
import imgTalento from '../../assets/imgTalento.png';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../Buttons/BtnPrincipal';
import './Talento.css';
import { Link } from 'react-router-dom';
import Input from '../Form/input';

const Talento = () => {
  return (
    <div>
      <div className='tudo2 flex justify-center' style={{width: '100vw'}}>
      <div className='container flex flex-col justify-center items-center' style={{ background: '#fff', height: '100vh', gap: '30px', marginTop: '10px', maxWidth: '65rem', padding: '20px'}}>
        
        <div className="containerLogo" style={{ width: '100%'}}>
          <Link to="/" style={{width: '100%'}}>
            <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
          </Link>
        </div>
      
     
        <div className="flex justify-between" style={{ maxWidth: '65rem', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
          <div className='flex flex-col' style={{height: '35rem', width: '100%'}}>
            <Link to="/Escolha"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>
            <div className='flex flex-col gap-3' style={{ marginTop: '-20px', padding: '2rem'}}>
              <h1 className='EscTit text-center'>Olá seja Bem-vindo!</h1>
              <p className='EscPar text-center'>Cadastre-se e encontre o trabalho ideal para você.</p>
            </div>

            <form action="" className='flex flex-col gap-3' style={{padding: '3rem', marginTop: '-40px'}}>
              <div className="nameSob flex justify-center gap-8">
                <Input placeholder='Nome'/>
                <Input placeholder='Sobrenome'/>
              </div>
                 <Input placeholder='Email' type='email'/>
              <div className="senhaCon flex justify-center gap-8">
                <Input placeholder='Senha' type='password'/>
                <Input placeholder='Confirmar Senha' type='password'/>
              </div>
              <button type='submit'><BtnPrincipal texto='Avançar' back='#0866FF' color='#fff'/></button>
            </form>
          </div>
          <img className='imgTalento' src={imgTalento} alt="Login Visual" style={{ maxWidth: '34rem', height: '35rem' }} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Talento
