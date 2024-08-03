import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const UserEmpresa = ({ nome, email, cnpj, areaAtua, prLet, ...props }) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('https://workzen.onrender.com/v1/empresa/profile', config);
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
        <span style={{ color: '#fff', fontSize: props.size }}>{data.nome.charAt(0)}</span>
      )}
      {nome && (
        <>{data.nome}</>
      )}
      {email && (
        <>{data.email}</>
      )}
      {cnpj && (
        <>{data.cnpj}</>
      )}
      {areaAtua && (
        <>{data.ramo_atividade}</>
      )}
    </>
  );
};

UserEmpresa.propTypes = {
  nome: PropTypes.string,
  email: PropTypes.string,
  cnpj: PropTypes.string,
  areaAtua: PropTypes.string,
  prLet: PropTypes.string,
  size: PropTypes.string,
};

export default UserEmpresa;
