import React, { useState } from 'react';
import Logo from '../../assets/Logo.png';
import LogoResp from '../../assets/logoResp.png'
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ menu, setMenu}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
    setClicked(!clicked);
  };



  return (
    <>
      <div className="navbar font-lexend h-16 rounded-b-none xl:rounded-b-[0.9375rem] w-[80.1875rem] max-w-full mx-auto shadow-[0px_247px_69px_0px_rgba(0,0,0,0.00),_0px_158px_63px_0px_rgba(0,0,0,0.01),_0px_89px_53px_0px_rgba(0,0,0,0.05),_0px_40px_40px_0px_rgba(0,0,0,0.09),_0px_10px_22px_0px_rgba(0,0,0,0.10)] flex justify-between items-center md:text-center">
        <div className="flex gap-5 items-center">
          <a href="/">
            <img src={Logo} alt="Logo" className="Logo w-[6.5625rem] ml-[2rem]" />
            <img src={LogoResp} alt="Logo" className="LogoResp" />
          </a>

          <div className="links flex gap-5">
            <a href="/" className="flex items-center text-sm text-grey-text-light">Buscar Trabalho <IoIosArrowDown className='dropList' /></a>
            <a href="/" className="flex items-center text-sm text-grey-text-light">Anunciar Vaga <IoIosArrowDown className='dropList' /></a>
          </div>
        </div>

        <div className="flex items-center gap-5 mr-[3rem]">
          <Link to="/Login" className="buttons text-sm text-grey-text-light">Entrar</Link>
          <a href="/" className="buttons text-sm rounded-md text-white p-2 bg-btnCriar">Criar Conta</a>
          <div className='menuHamb' onClick={handleClick}>
            <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
            <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
            <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div> 
          </div>
        </div>
      </div>

      {menu && (
        <div className="menu flex flex-col justify-between" style={{width: '100%', height: '90vh'}}>
          <div className="flex flex-col items-center gap-6" style={{marginTop: '2rem'}}>

            <div className="link flex justify-between items-center" style={{width: '90vw'}}>
              <a href="/" className="text-grey-text-light" style={{fontSize: '1.75rem', fontFamily: 'Lexend', color: 'var(--grey-text-light, #64748B)'}}>Buscar Trabalho</a>
              <IoIosArrowDown className='dropList'/>
            </div>

            <div className="link flex justify-between items-center" style={{width: '90vw'}}>
              <a href="/" className="text-grey-text-light" style={{fontSize: '1.75rem', fontFamily: 'Lexend', color: 'var(--grey-text-light, #64748B)'}}>Anunciar Vaga</a>
              <IoIosArrowDown className='dropList'/>
            </div>
          </div>
          <div className="button flex flex-col mx-auto gap-5">
            <a href="/" className="flex justify-center items-center text-center" style={{fontFamily: 'Lexend', fontSize: '1.5rem', borderRadius: '1.5rem', border: '2px solid #64748B', height: '4rem', color: '#64748B'}}>Entrar</a>
            <a href="/" className="flex justify-center items-center text-white p-2 bg-primary text-center" style={{width: '90vw', height: '4rem', fontFamily: 'Lexend', fontSize: '1.5rem', borderRadius: '1.5rem'}}>Criar Conta</a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
