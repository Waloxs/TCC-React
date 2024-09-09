import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../utils/api'; 

const Notify = () => {
  const [notify, setNotify] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token); 

      try {
        const response = await axiosInstance.get(`/notify`);
        setNotify(response.data);
        console.log(response);
      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        setError('Erro ao carregar candidatos.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

};

export default Notify;
