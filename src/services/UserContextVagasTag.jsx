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

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
  
      if (!token) {
        setLoading2(false);
        return;
      }
  
      setAuthToken(token);  // Define o token globalmente
  
      try {
        const response = await axiosInstance.get('/me');
        setUserData(response.data);
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


  useEffect(() => {
    const fetchJobsData = async () => {


      if (!userData || !userData.tags) return;
  
      // Junte as tags diretamente com '&'
      const params = userData.tags.join('&');
      console.log("Parâmetros de consulta:", params);
  
      try {
        const response = await axiosInstance.get(`/jobs/search?tag=${params}`);
        setData2(response.data);
        console.log("Dados recebidos:", response.data); 
      } catch (error) {
        console.error("Erro na requisição /jobs/search:", error);
        setError2(error);
      }
    };
  
    fetchJobsData();
  }, [userData]);
  
  

  return (
    <UserContext.Provider value={{ data2, loading2, error2, userData }}>
      {children}
    </UserContext.Provider>
  );
};
