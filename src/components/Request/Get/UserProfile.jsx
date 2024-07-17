import axios from 'axios';
import React, { useState, useEffect } from 'react';

const User = ({ nome, sobrenome, email, prLet, id, ...props }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://workzen.onrender.com/v1/me', config);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div>
      <p>Loading...</p>
    </div>
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {prLet && ( // Verifica se data.firstName está definido antes de usar charAt
        <span style={{ color: '#fff', fontSize: props.size }}>{data.firstName.charAt(0)}</span>
      )}
      {nome && (
        <>{data.firstName}</>
      )}
      {sobrenome && (
        <>{data.lastName}</>
      )}
      {email && (
        <>{data.email}</>
      )}
      {id && (
        <>{data._id}</>
      )}
    </>
  );
};

export default User;
