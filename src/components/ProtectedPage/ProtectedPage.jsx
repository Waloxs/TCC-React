import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProtectedPage.css';

const ProtectedPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get('http://localhost:3000/v1/protected', config);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">Erro ao carregar os dados: {error.message}</div>;
  }

  return (
    <div className="protected-page">
      <h1>Dados Protegidos</h1>
      <div className="data">
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Nenhum dado recebido.</p>
        )}
      </div>
    </div>
  );
};

export default ProtectedPage;