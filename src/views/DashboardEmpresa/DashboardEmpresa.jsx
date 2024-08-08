import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import axios from 'axios';
import MainUser from '../../components/MainUser/MainUser';

const DashboardEmpresa = () => {

  return (
    <div>
      <Navbar showDashnone={false} img={true} NavEmpresa={true} className='navDash'/>
      <MainUser/>
    </div>
  );
}

export default DashboardEmpresa;
