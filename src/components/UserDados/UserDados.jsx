import React from 'react';
import { useUser as useUserTalento } from '../../services/UserContext.jsx';
import User from '../UserProfile/UserProfile.jsx';

const UserDados = ({ toggleModal }) => {
  const { data: user } = useUserTalento();

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
};

export default UserDados;
