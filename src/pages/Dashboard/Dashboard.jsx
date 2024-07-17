import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css'

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


  const { image } = userData;

  return (
    <div>
        <Navbar showDashnone={false} img={true} className='navDash' />
  
        
          
    </div>
  );
};

export default Dashboard;
