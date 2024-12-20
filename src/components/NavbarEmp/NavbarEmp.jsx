import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import User from '../UserProfile/UserProfile.jsx';
import UserEmpresa from '../UserEmpresa/UserEmpresa.jsx';
import { useUser as useUserTalento } from '../../services/UserContext.jsx';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import Logo from '../../assets/Logo.png';
import LogoResp from '../../assets/logoResp.png';
import './NavbarEmp.css';
import Notify from '../Notify/Notify.jsx';




const NavbarEmp = ({
  menu,
  setMenu,
  showDashnone = true,
  img = false,
  criConta = true,
  userTalento = false,
  NavEmpresa = false,
  barraPesquisa = false,
  configUser = false,
  setConfigUser,
  setSearchText, 
  notify
}) => {
  const [clicked, setClicked] = useState(false);
  const [menuDrop1, setMenuDrop1] = useState(false);
  const [menuDrop2, setMenuDrop2] = useState(false);
  const [border, setBorder] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalNotify, setModalNotify] = useState(false);


  const handleModal = () => {
    setModalNotify(!modalNotify);
    console.log(notify);
  }
 

  // Debounce para pesquisa em tempo real
  useEffect(() => {
    if (inputValue.trim() !== '') {
      setSearchText(inputValue); // Atualiza o texto da pesquisa imediatamente
    }
  }, [inputValue, setSearchText]);
  
  const { data: user } = useUserTalento();
  const { data: userDataEmpresa } = useUserEmpresa();

  const sitModal = () => {
    setConfigUser(!configUser);
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

  const estiloSeta1 = menuDrop1 ? <IoIosArrowUp className='dropList novaCor'/> : <IoIosArrowDown className='dropList'/>;
  const estiloSeta2 = menuDrop2 ? <IoIosArrowUp className='dropList novaCor'/> : <IoIosArrowDown className='dropList'/>;

  const modalRef = useRef(null);





  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/Login';
  };

  const location = useLocation();
  const isHome = location.pathname === '/';



  return (
    (userDataEmpresa || user || isHome) && (
 
        <>
        {showDashnone && (
          <div className="dashnone flex items-center gap-5 mr-[3rem]">
            <div className='dnone'>
              <Link to="/Login">
                <BtnPrincipal texto="Entrar" back="#fff" hover="#f7f7f7" color="#000" width="80px" borderRadius="20px" padding="10px"/>
              </Link>
            </div>
            {criConta && (
              <div className='dnone'>
                <Link to="/Escolha">
                  <BtnPrincipal texto="Criar Conta" back="#22C55E" hover="#11C11F" color="#fff" width="140px" borderRadius="20px" padding="10px"/>
                </Link>
              </div>
            )}
            <div className='menuHamb' onClick={handleClick}>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div>
              <div className={`line ${clicked ? 'clicked' : 'unclicked'}`}></div> 
            </div>
          </div>
        )}

        {userTalento && user && (
          <>
            <div className='flex items-center gap-12'>
              {barraPesquisa && (
                <div className='pesquisa' style={{position: 'relative'}}>
                  <input 
                    type="text" 
                    style={{ width: "300px", height: "35px" }} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder={'Procurar'} 
                  />
                  <img src="icons/Search.svg" alt="Search Icon" style={{position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer'}}/>
                </div>
              )}

              <div style={{position: 'relative', cursor: 'pointer'}} onClick={handleModal}>
              <img src='icons/bell.svg' style={{width: '20px'}}/>
              {notify && (
                <div style={{position: 'absolute', top: '0px', right: '0px'}}>
                  <Notify notify={notify}/>

                  {modalNotify && (
                    <div style={{position: 'absolute'}}>asdsa</div>
                  )}
                </div>
              )}
              
              </div>

              {img && user && user.image && (
                <div className="imgCadas" onClick={sitModal}>
                  <img src={user.image} alt="User Avatar" className='imgUser' />
                </div>
              )}
              {img && user && !user.image && (
                <div className="imgCadas" onClick={sitModal}>
                  <div className='imgUserNone'>
                    <User prLet={true} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {NavEmpresa && userDataEmpresa && (
          <>
            <div className='flex items-center gap-10'>
              {barraPesquisa && (
                <div className='pesquisa' style={{position: 'relative'}}>
                  <input 
                    type="text" 
                    style={{ width: "300px", height: "35px" }} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder={'Procurar'} 
                  />
                  <img src="icons/Search.svg" alt="Search Icon" style={{position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer'}}/>
                </div>
              )}
            </div>
            {modal2 && userDataEmpresa && (
              <motion.div
                className='flex flex-col justify-between modal'
                ref={modalRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 1 }}
              >
                <div className='flex flex-col items-center'>
                  {userDataEmpresa.image ? (
                    <img src={userDataEmpresa.image} alt="Company Avatar" className='imgModal' />
                  ) : (
                    <div className='imgUserNone2'>
                      <UserEmpresa prLet={true} />
                    </div>
                  )}
                  <div>
                    <span>
                      <strong>{userDataEmpresa.name}</strong>
                    </span>
                  </div>
                </div>
                <div className='flex flex-col items-start justify-around ml-[1.5rem] mt-[1rem] text-black'>
                  <Link to="/ConfiguracaoEmpresa">
                    <span className='cursor-pointer'>
                      <IoMdSettings className='mr-[0.3rem]'/> Configurações
                    </span>
                  </Link>
                  <span className='cursor-pointer' onClick={handleLogout}>
                    <CiLogout className='mr-[0.3rem]'/> Sair
                  </span>
                </div>
              </motion.div>
            )}
          </>
        )}
        </>
    )
  );
};

NavbarEmp.propTypes = {
  menu: PropTypes.bool,
  setMenu: PropTypes.func,
  showDashnone: PropTypes.bool,
  link: PropTypes.bool,
  img: PropTypes.bool,
  criConta: PropTypes.bool,
  userTalento: PropTypes.bool,
  NavEmpresa: PropTypes.bool,
  barraPesquisa: PropTypes.bool,
  setSearchText: PropTypes.func,
};

export default NavbarEmp;
