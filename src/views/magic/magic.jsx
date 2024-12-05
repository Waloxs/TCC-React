import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Magic = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      navigate('/Dashboard');
    }
  }, [navigate]);

  return (
    <div>
    </div>
  );
};

export default Magic;
