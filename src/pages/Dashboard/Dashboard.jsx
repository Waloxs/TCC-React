import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken'); // Substitua 'token' pela chave correta se necessário

      try {
        const response = await fetch('https://workzen.onrender.com/v1/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Supondo que 'userData' contenha um campo 'avatarUrl' que já é uma string base64
  const { image } = userData;

  return (
    <div>
      <Navbar showDashnone={false} />
      <div>
        <h1>User Data</h1>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        {image && (
          <div>
            <h2>Avatar</h2>
            <img src={`data:image/png;base64,${image}`} alt="User Avatar" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
