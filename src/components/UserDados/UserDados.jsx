import React from 'react';
import { useUser as useUserTalento } from '../../services/UserContext.jsx';
import { useUser as useUseEmpresa } from '../../services/UserContextEmpresa.jsx';
import User from '../UserProfile/UserProfile.jsx';
import UserEmpresa from '../UserEmpresa/UserEmpresa.jsx';

const UserDados = ({ toggleModal, empresa, talento }) => {
  const { data: user } = useUserTalento();
  const { data: user2 } = useUseEmpresa();

  if (talento === true) {
    return (
      <div className="flex items-center self-end gap-4">
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img src="icons/bell.svg" style={{ width: '20px' }} alt="Notificação" />
        </div>
        <div onClick={toggleModal}>
          {user && user.image ? (
            <div className="imgCadas">
              <img src={user.image} alt="User Avatar" className="imgUser" />
            </div>
          ) : (
            <div className="imgCadas">
              <div className="imgUserNone">
                <User prLet={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (empresa === true) {
    return (
      <div className="flex items-center self-end gap-4">
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img src="icons/bell.svg" style={{ width: '20px' }} alt="Notificação" />
        </div>
        <div onClick={toggleModal}>
          {user2 && user2.image ? (
            <div className="imgCadas">
              <img src={user2.image} alt="User Avatar" className="imgUser" />
            </div>
          ) : (
            <div className="imgCadas">
              <div className="imgUserNone">
                <UserEmpresa prLet={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null; 
};

export default UserDados;
