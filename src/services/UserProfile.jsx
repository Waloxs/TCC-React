import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const User = ({ nome, sobrenome, email, prLet, id, ...props }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

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
      {prLet && (
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

User.propTypes = {
  nome: PropTypes.bool,
  sobrenome: PropTypes.bool,
  email: PropTypes.bool,
  id: PropTypes.bool,
  prLet: PropTypes.bool,
  size: PropTypes.string,
};

export default User;
