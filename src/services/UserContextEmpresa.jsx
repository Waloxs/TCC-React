import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContextEmpresa = createContext();

export const useUser = () => {
  return useContext(UserContextEmpresa);
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        setError(new Error('Token de autenticação não encontrado.'));
        setLoading(false);
        return;
      }
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      try {
        const response = await axios.get('https://workzen.onrender.com/v1/empresa/profile', config);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <UserContextEmpresa.Provider value={{ data, loading, error }}>
      {children}
    </UserContextEmpresa.Provider>
  );
};

