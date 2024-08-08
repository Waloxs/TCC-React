import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../utils/api'; 

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setLoading(false);
        return;
      }

      setAuthToken(token);  // Define o token globalmente
      
      try {
        const response = await axiosInstance.get('/me');  
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
    <UserContext.Provider value={{ data, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
