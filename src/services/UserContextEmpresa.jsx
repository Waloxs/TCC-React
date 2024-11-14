import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, setAuthToken } from '../utils/api.js';

const UserContextEmpresa = createContext();

export const useUser = () => {
  return useContext(UserContextEmpresa);
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      if (!token) {
        setLoading(false);
        return;
      }

      const decodedToken = jwt_decode(token);
      

      if (decodedToken.role === 'talento') {
        setLoading(false); 
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axiosInstance.get('/empresa/profile', config);
        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn('Empresa não encontrada.');
        } else {
          console.error('Erro na API:', error); // Debug API error
        }
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Buscar dados imediatamente ao montar o componente

    const intervalId = setInterval(() => {
      fetchData(); // Buscar dados a cada 60 segundos
    }, 60000); // 60 segundos

    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  return (
    <UserContextEmpresa.Provider value={{ data, loading, error }}>
      {children}
    </UserContextEmpresa.Provider>
  );
};
