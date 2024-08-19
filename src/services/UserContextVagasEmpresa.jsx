import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContextVagaEmpresa = createContext();

export const useUser = () => {
  return useContext(UserContextVagaEmpresa);
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);



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
        const response = await axios.get('https://workzen.onrender.com/v1/jobs/companyJobs', config);
        setData(response.data.jobs);
        console.log(response);
      } catch (error) {
        setError2(error);
      } finally {
        setLoading2(false);
      }
    };

    // Use um pequeno atraso para garantir que o token esteja disponível
    setTimeout(fetchData, 100); // Ajuste o tempo conforme necessário
  }, []);

  return (
    <UserContextVagaEmpresa.Provider value={{ data, loading2, error2 }}>
      {children}
    </UserContextVagaEmpresa.Provider>
  );
};


