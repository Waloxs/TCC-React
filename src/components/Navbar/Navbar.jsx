import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/Logo.png';
import LogoResp from '../../assets/logoResp.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import './Navbar.css';
import User from '../Request/Get/UserProfile.jsx';
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { motion } from 'framer-motion';


const Navbar = ({ menu, setMenu, showDashnone = true, link = true, img = false, criConta = true }) => {  
  const [clicked, setClicked] = useState(false);
  const [menuDrop1, setMenuDrop1] = useState(false);
  const [menuDrop2, setMenuDrop2] = useState(false);
  const [menuDropMobile1, setMenuDropMobile1] = useState(false);
  const [menuDropMobile2, setMenuDropMobile2] = useState(false);
  const [border, setBorder] = useState(false);
  const [userData, setUserData] = useState(null);
  const [modal, setModal] = useState(false);


  const sitModal = () => {
    setModal(!modal);
    setMenuDrop1(false);
    setMenuDrop2(false);
    setBorder(false);
  }


  const ApagaToken = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/Login'; 
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken'); // Substitua 'authToken' pela chave correta se necessário

      try {
        const response = await fetch('https://workzen.onrender.com/v1/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = () => {
    setMenu(!menu);
    setClicked(!clicked);
  };

  const toggleMenu1 = (e) => {
    e.preventDefault();
    setMenuDrop1(!menuDrop1);
    setMenuDrop2(false); 
    setBorder(!menuDrop1);
  };

  const toggleMenu2 = (e) => {
    e.preventDefault();
    setMenuDrop2(!menuDrop2);
    setMenuDrop1(false);
    setBorder(!menuDrop2);
  };

  const toggleMenuMobile1 = (e) => {
    e.preventDefault();
    setMenuDropMobile1(!menuDropMobile1);
    setMenuDropMobile2(false); 
  };

  const toggleMenuMobile2 = (e) => {
    e.preventDefault();
    setMenuDropMobile2(!menuDropMobile2);
    setMenuDropMobile1(false); 
  };

  const estiloBorder = border ? 'rounded-b-[0px]' : 'rounded-b-[0.9375rem]';
  const estiloSeta1 = menuDrop1 ? <IoIosArrowUp className='dropList novaCor'/> : <IoIosArrowDown className='dropList'/>;
  const estiloSeta2 = menuDrop2 ? <IoIosArrowUp className='dropList novaCor'/> : <IoIosArrowDown className='dropList'/>;

  const estiloSetaMobile1 = menuDropMobile1 ? <IoIosArrowUp className='dropList novaCor'/> : <IoIosArrowDown className='dropList'/>;
  const estiloSetaMobile2 = menuDropMobile2 ? <IoIosArrowUp className='dropList novaCor'/> : <IoIosArrowDown className='dropList'/>;

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={`navbar font-lexend h-16 w-[90vw] max-w-full mx-auto shadow-[0px_247px_69px_0px_rgba(0,0,0,0.00),_0px_158px_63px_0px_rgba(0,0,0,0.01),_0px_89px_53px_0px_rgba(0,0,0,0.05),_0px_40px_40px_0px_rgba(0,0,0,0.09),_0px_10px_22px_0px_rgba(0,0,0,0.10)] flex justify-between items-center md:text-center ${estiloBorder}`}>
        <div className="flex gap-5 items-center">
          <a href="/">
            <Link to="/"><img src={Logo} alt="Logo" className="Logo w-[6.5625rem] ml-[2rem]" /></Link>
            <Link to="/"><img src={LogoResp} alt="Logo" className="LogoResp" /></Link>
          </a>

        {link && (
          <div className="links flex gap-5">
            <a href="/" className="flex items-center text-sm text-grey-text-light" onClick={toggleMenu1}>Buscar Trabalho {estiloSeta1}</a>
            <a href="/" className="flex items-center text-sm text-grey-text-light" onClick={toggleMenu2}>Anunciar Vaga {estiloSeta2}</a>
          </div>
        )}

        </div>

        {showDashnone && (
          <div className="dashnone flex items-center gap-5 mr-[3rem]">
            <div className='dnone'><Link to="/Login"><BtnPrincipal texto="Entrar" back="#fff" hover="#f7f7f7" color="#000" width="80px"/></Link></div>

            {criConta && (
            <div className='dnone'><Link to="/Escolha"><BtnPrincipal texto="Criar Conta" back="#22C55E" hover="#11C11F" color="#fff" width="140px"/></Link></div>
            )}


            <div className='menuHamb' onClick={handleClick}>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div> 
            </div>
          </div>
        )}

        {img && userData && userData.image && (
          <div className="imgCadas" onClick={sitModal}>
            <img src={`${userData.image}`} alt="User Avatar" className='imgUser' />
          </div>
        )}

        {img && userData && !userData.image && (
          <div className="imgCadas" onClick={sitModal}>
            <div className='imgUserNone'>
              <User prLet={true}/>
            </div>
          </div>
        )}

        {modal &&(
          <>
          {!userData.image &&(
            <motion.div className='flex flex-col justify-between modal'  ref={modalRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1 }}>
            <div className='flex flex-col items-center'>
              <div className='imgUserNone2'>
                <User prLet={true} size={'2rem'}/>
              </div>
              <div>
                <span><User nome={true}/> <User sobrenome={true}/></span>
              </div>
            </div>
            <div style={{marginBottom: '15px'}}>

              <Link to="/Configura">
              <div className='hv flex' style={{cursor: 'pointer'}}>
              <div className='flex gap-2 items-center' style={{cursor: 'pointer', marginLeft: '20px'}}>
              <IoMdSettings className='conf'/> 
              <h1>Configurações</h1>
              </div>
              </div>
              </Link>

              <div className='hv flex' style={{cursor: 'pointer'}}>
              <div className='flex gap-2 items-center' style={{cursor: 'pointer', marginLeft: '20px'}} onClick={ApagaToken}>
              <CiLogout className='conf'/> 
              <h1>Sair</h1>
              </div>
              </div>
            </div>
            </motion.div>
          )}
          {userData.image &&(
                        <motion.div className='flex flex-col justify-between modal'  ref={modalRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1 }}>
                        <div className='flex flex-col items-center'>
                           <img src={`${userData.image}`} alt="User Avatar" className='imgModal' />
                        
                          <div>
                            <span><User nome={true}/> <User sobrenome={true}/></span>
                          </div>
                        </div>
                        <div style={{marginBottom: '15px'}}>
            
                          <Link to="/Configura">
                          <div className='hv flex' style={{cursor: 'pointer'}}>
                          <div className='flex gap-2 items-center' style={{cursor: 'pointer', marginLeft: '20px'}}>
                          <IoMdSettings className='conf'/> 
                          <h1>Configurações</h1>
                          </div>
                          </div>
                          </Link>
            
                          <div className='hv flex' style={{cursor: 'pointer'}}>
                          <div className='flex gap-2 items-center' style={{cursor: 'pointer', marginLeft: '20px'}} onClick={ApagaToken}>
                          <CiLogout className='conf'/> 
                          <h1>Sair</h1>
                          </div>
                          </div>
                        </div>
                        </motion.div>
          )}
          </>
        )}

      </div>

      {menuDrop1 && (
        <div className="flex justify-center">
          <div className="menuDrop flex gap-8 rounded-b-[0.9375rem] shadow-[0px_247px_69px_0px_rgba(0,0,0,0.00),_0px_158px_63px_0px_rgba(0,0,0,0.01),_0px_89px_53px_0px_rgba(0,0,0,0.05),_0px_40px_40px_0px_rgba(0,0,0,0.09),_0px_10px_22px_0px_rgba(0,0,0,0.10)]">
            <div>
              <h1 className='DropH1'>Maneiras de ganhar</h1>
              <p className='DropP'>Saiba por que a workzen tem as oportunidades certas para você.</p>
            </div>
            <div>
              <h1 className='DropH1'>Encontre o trabalho para as suas habilidades</h1>
              <p className='DropP'>Explore o trabalho disponível para sua área</p>
            </div>
          </div>
        </div>
      )}

      {menuDrop2 && (
        <div className="flex justify-center">
          <div className="menuDrop flex gap-8 rounded-b-[0.9375rem] shadow-[0px_247px_69px_0px_rgba(0,0,0,0.00),_0px_158px_63px_0px_rgba(0,0,0,0.01),_0px_89px_53px_0px_rgba(0,0,0,0.05),_0px_40px_40px_0px_rgba(0,0,0,0.09),_0px_10px_22px_0px_rgba(0,0,0,0.10)]">
            <div>
              <h1 className='DropH1'>Maneiras de ganhar</h1>
              <p className='DropP'>Saiba por que a workzen tem as oportunidades certas para você.</p>
            </div>
            <div>
              <h1 className='DropH1'>Encontre o trabalho para as suas habilidades</h1>
              <p className='DropP'>Explore o trabalho disponível para sua área</p>
            </div>
          </div>
        </div>
      )}


      {menu && (
        <div className="menu flex flex-col justify-between" style={{width: '100vw'}}>
          <div className="flex flex-col items-center gap-6" style={{marginTop: '2rem'}}>
            <div className="link flex justify-between items-center" onClick={toggleMenuMobile1}  style={{width: '90vw'}}>
              <a href="/" className="text-grey-text-light" style={{fontSize: '1.75rem', fontFamily: 'Lexend', color: 'var(--grey-text-light, #64748B)'}}>Buscar Trabalho</a>
              {estiloSetaMobile1}
            </div>
              {menuDropMobile1 && (
                <div className="flex justify-center">
                  <h1>oi1</h1>
                </div>
              )}
            <div className="link flex justify-between items-center" onClick={toggleMenuMobile2}  style={{width: '90vw'}}>
              <a href="/" className="text-grey-text-light" style={{fontSize: '1.75rem', fontFamily: 'Lexend', color: 'var(--grey-text-light, #64748B)'}}>Anunciar Vaga</a>
              {estiloSetaMobile2}
            </div>
          {menuDropMobile2 && (
            <div className="flex justify-center">
              <h1>oi2</h1>
            </div>
          )}
          </div>
          <div className="button flex flex-col mx-auto gap-5">
            <Link to="/Login"><BtnPrincipal texto="Entrar" color="#000" width="90vw" back="#fff" border="1px solid"/></Link>
            <Link to="/Escolha"><BtnPrincipal texto="Criar Conta" color="#fff" width="90vw" back="#3B82F6"/></Link> 
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
