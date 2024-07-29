import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



const DashboardEmpresa = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      
      const token = localStorage.getItem('authToken'); 

      try {
        const response = await fetch('https://workzen.onrender.com/v1/empresa/profile', {
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
        console.log(data);
      } catch (error) {
        navigate('/Empresa');  
        setError(error);
        console.log(error);
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
      <Navbar showDashnone={false} img={false} className='navDash' />
    </div>
  )
}

export default DashboardEmpresa
