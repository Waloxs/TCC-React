import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';

const UserVagasApl = () => {


  const [vagasAplicadas, setVagasAplicadas] = useState(null);
   

  useEffect(() => {
    const fetchFavoritas = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get('/me/applications', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        setVagasAplicadas(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar vagas aplicadas:", error);
      }
    };

    fetchFavoritas();
  }, []);


  return (
    <div className='flex flex-col gap-12'>
        oi
   </div>
  );
};

export default UserVagasApl;
