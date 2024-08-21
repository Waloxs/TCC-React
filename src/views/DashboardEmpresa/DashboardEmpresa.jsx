import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import MainUser from '../../components/MainUser/MainUser';
import { UserProvider as UserProviderEmpresa } from '../../services/UserContextEmpresa';
import { UserProvider as UserProviderVagas } from '../../services/UserContextVagasEmpresa';
import { UserProvider as UserProviderTalento} from '../../services/UserContext.jsx';


const DashboardEmpresa = () => {
  return (
    <div style={{ height: '100vh' }}>
      <UserProviderTalento>
      <UserProviderEmpresa>
        <UserProviderVagas>
          <Navbar showDashnone={false} img={true} NavEmpresa={true} className='navDash' />
          <MainUser />
        </UserProviderVagas>
      </UserProviderEmpresa>
      </UserProviderTalento>
    </div>
  );
}

export default DashboardEmpresa;
