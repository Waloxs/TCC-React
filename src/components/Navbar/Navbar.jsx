import React, { useState } from 'react';
import Logo from '../../assets/Logo.png';
import LogoResp from '../../assets/logoResp.png'
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx'
import './Navbar.css';
import { BiBorderRadius } from 'react-icons/bi';

const Navbar = ({ menu, setMenu}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
    setClicked(!clicked);
  };



  return (
    <>
      <div className="navbar font-lexend h-16 rounded-b-[0.9375rem] w-[90vw] max-w-full mx-auto shadow-[0px_247px_69px_0px_rgba(0,0,0,0.00),_0px_158px_63px_0px_rgba(0,0,0,0.01),_0px_89px_53px_0px_rgba(0,0,0,0.05),_0px_40px_40px_0px_rgba(0,0,0,0.09),_0px_10px_22px_0px_rgba(0,0,0,0.10)] flex justify-between items-center md:text-center">
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
        <div className="menu flex flex-col justify-between" style={{width: '100vw'}}>
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
          <Link to="/Login"><BtnPrincipal texto="Entrar" color="#000" width="90vw" back="#fff" border="1px solid"/></Link>
           <BtnPrincipal texto="Criar Conta" color="#fff" width="90vw" back="#3B82F6"/>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
