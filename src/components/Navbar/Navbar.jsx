import { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/Logo.png';
import LogoResp from '../../assets/logoResp.png';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import './Navbar.css';
import User from '../../components/UserProfile/UserProfile.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useUser as useUserTalento } from '../../services/UserContext';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';

const Navbar = ({ menu, setMenu, showDashnone = true, link = true, img = false, criConta = true, userTalento = false, NavEmpresa = false }) => {  
  const [clicked, setClicked] = useState(false);
  const [menuDrop1, setMenuDrop1] = useState(false);
  const [menuDrop2, setMenuDrop2] = useState(false);
  const [menuDropMobile1, setMenuDropMobile1] = useState(false);
  const [menuDropMobile2, setMenuDropMobile2] = useState(false);
  const [border, setBorder] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);


  const { data: user } = useUserTalento();
  const { data: userDataEmpresa } = useUserEmpresa();

  const sitModal = () => {
    setModal(!modal);
    setMenuDrop1(false);
    setMenuDrop2(false);
    setBorder(false);
  }

  const sitModal2 = () => {
    setModal2(!modal2);
    setMenuDrop1(false);
    setMenuDrop2(false);
    setBorder(false);
  }

  const ApagaToken = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/Login'; 
  };

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
            <div className='dnone'><Link to="/Login"><BtnPrincipal texto="Entrar" back="#fff" hover="#f7f7f7" color="#000" width="80px" borderRadius="20px" padding="10px"/></Link></div>

            {criConta && (
            <div className='dnone'><Link to="/Escolha"><BtnPrincipal texto="Criar Conta" back="#22C55E" hover="#11C11F" color="#fff" width="140px" borderRadius="20px" padding="10px"/></Link></div>
            )}

            <div className='menuHamb' onClick={handleClick}>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div> 
            </div>
          </div>
        )}

        {userTalento && (
          <>
            {img && user && user.image && (
              <div className="imgCadas" onClick={sitModal}>
                <img src={`${user.image}`} alt="User Avatar" className='imgUser' />
              </div>
            )}

            {img && user && !user.image && (
              <div className="imgCadas" onClick={sitModal}>
                <div className='imgUserNone'>
                  <User prLet={true}/>
                </div>
              </div>
            )}

            {modal && (
              <motion.div
                className='flex flex-col justify-between modal'
                ref={modalRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1 }}
              >
                <div className='flex flex-col items-center'>
                  {user.image ? (
                    <img src={`${user.image}`} alt="User Avatar" className='imgModal' />
                  ) : (
                    <div className='imgUserNone2'>
                      <User prLet={true} size={'2rem'} />
                    </div>
                  )}
                  <div>
                    <span>
                      <User nome={true} /> <User sobrenome={true} />
                    </span>
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <Link to="/Configura">
                    <div className='hv flex' style={{ cursor: 'pointer' }}>
                      <div className='flex gap-2 items-center' style={{ cursor: 'pointer', marginLeft: '20px' }}>
                        <IoMdSettings className='conf' />
                        <h1>Configurações</h1>
                      </div>
                    </div>
                  </Link>
                  <div className='hv flex' style={{ cursor: 'pointer' }}>
                    <div className='flex gap-2 items-center' style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={ApagaToken}>
                      <CiLogout className='conf' />
                      <h1>Sair</h1>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {NavEmpresa && (
          <>
            {img && userDataEmpresa && userDataEmpresa.image && (
              <div className="imgCadas" onClick={sitModal2}>
                <img src={`${userDataEmpresa.image}`} alt="User Avatar" className='imgUser' />
              </div>
            )}

            {img && userDataEmpresa && !userDataEmpresa.image && (
              <div className="imgCadas">
                <div className='imgUserNone'>
                  <UserEmpresa prLet={true} />
                </div>                
              </div>
            )}

            {modal2 && (
              <motion.div
                className='flex flex-col justify-between modal'
                ref={modalRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1 }}
              >
                <div className='flex flex-col items-center'>
                  {userDataEmpresa.image ? (
                    <img src={`${userDataEmpresa.image}`} alt="User Avatar" className='imgModal' />
                  ) : (
                    <div className='imgUserNone2'>
                      <UserEmpresa prLet={true} size={'2rem'} />
                    </div>
                  )}
                  <div>
                    <span>
                      <UserEmpresa nome={true} /> <UserEmpresa sobrenome={true} />
                    </span>
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <Link to="/Configura">
                    <div className='hv flex' style={{ cursor: 'pointer' }}>
                      <div className='flex gap-2 items-center' style={{ cursor: 'pointer', marginLeft: '20px' }}>
                        <IoMdSettings className='conf' />
                        <h1>Configurações</h1>
                      </div>
                    </div>
                  </Link>
                  <div className='hv flex' style={{ cursor: 'pointer' }}>
                    <div className='flex gap-2 items-center' style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={ApagaToken}>
                      <CiLogout className='conf' />
                      <h1>Sair</h1>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  menu: PropTypes.bool.isRequired,
  setMenu: PropTypes.func.isRequired,
  showDashnone: PropTypes.bool,
  link: PropTypes.bool,
  img: PropTypes.bool,
  criConta: PropTypes.bool,
  userTalento: PropTypes.bool,
  NavEmpresa: PropTypes.bool,
  userDataEmpresa: PropTypes.object,
};

export default Navbar;
