import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  
      if (!token) {
        navigate('./Login');
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
        console.error('API Error:', error); // Debug API error
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData(); // Fetch data immediately on mount
  
    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 60 seconds
    }, 60000); // 60 seconds
  
    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]); // Add `navigate` to the dependency array
  

  return (
    <UserContextEmpresa.Provider value={{ data, loading, error }}>
      {children}
    </UserContextEmpresa.Provider>
  );
};
