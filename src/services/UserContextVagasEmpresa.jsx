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
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {


        const response = await axios.get(`https://workzen.onrender.com/v1/jobs/companyJobs`, config);

        setData(response.data.jobs);

        console.log(response);

      } catch (error) {
        setError2(error);
      } finally {
        setLoading2(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContextVagaEmpresa.Provider value={{ data, loading2, error2 }}>
      {children}
    </UserContextVagaEmpresa.Provider>
  );
};


