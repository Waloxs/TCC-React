import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import User from '../../components/UserProfile/UserProfile.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useUser as useUserTalento } from '../../services/UserContext';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import './MainUser.css';

const MainUser = () => {  
  
  const { data: user } = useUserTalento();
  const { data: userDataEmpresa } = useUserEmpresa();


  return (
    <div>

    {(userDataEmpresa && 
        <div className = "Container">
            <div>
                Categoria
            </div>

            <div>
                Talentos que voce pode gostar
            </div>

            <div className='modalConfigura'>
                <div className='perEmp'>
                    <UserEmpresa className='' prLet={true} size={'3rem'}  ></UserEmpresa>
                </div>

                <div className='flex flex-col'>
                    <UserEmpresa nome={true}></UserEmpresa>
                    <span>Empresa</span>
                </div>

                <div className="linha"></div>

                <BtnPrincipal texto='Editar Perfil' back='#2563EB' padding='15px 30px' borderRadius='20px' color='#fff'/>

            </div>
        </div>
    )}

    </div>
  );
};

export default MainUser;
