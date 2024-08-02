import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken'); 

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
        navigate('/Login');  
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div>
        <Navbar showDashnone={false} img={true} userTalento={true} className='navDash' userData={userData}/>
    </div>
  );
};

export default Dashboard;
