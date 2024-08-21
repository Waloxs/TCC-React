import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContextVagaEmpresa = createContext();

export const useUser = () => {
  return useContext(UserContextVagaEmpresa);
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/Login'); // Redireciona para a página de login
      setLoading2(false);
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
    } catch (error) {
      setError2(error);
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchData(); // Buscar os dados inicialmente

    const intervalId = setInterval(fetchData, 60000); // Atualiza a cada 60 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente for desmontado
  }, [data]); 

  return (
    <UserContextVagaEmpresa.Provider value={{ data, loading2, error2 }}>
      {children}
    </UserContextVagaEmpresa.Provider>
  );
};
