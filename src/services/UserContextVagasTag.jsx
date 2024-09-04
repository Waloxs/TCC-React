import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../utils/api';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [data2, setData2] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);


  useEffect(() => {
    
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        setLoading2(false);
        return;
      }
  
      setAuthToken(token);  // Define o token globalmente
  
      try {
        const response = await axiosInstance.get('/me/recommended');
        setData2(response.data);
        console.log("Dados do usuário recebidos:", response.data); 
      } catch (error) {
        console.error("Erro na requisição /me:", error);
        setError2(error);
      } finally {
        setLoading2(false);
      }
    };
  
    // Fetch initial data
    fetchUserData();

  }, []);


  

  return (
    <UserContext.Provider value={{ data2, loading2, error2}}>
      {children}
    </UserContext.Provider>
  );
};
