import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../services/UserContext';

const User = ({ nome, sobrenome, email, id, titulo, ...props }) => {
  const { data, loading, error } = useUser();

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {nome && <>{data?.firstName}</>}
      {sobrenome && <>{data?.lastName}</>}
      {email && <>{data?.email}</>}
      {id && <>{data?._id}</>}
      {titulo && <>{data?.titulo}</>}
    </>
  );
};

User.propTypes = {
  nome: PropTypes.bool,
  sobrenome: PropTypes.bool,
  email: PropTypes.bool,
  id: PropTypes.bool,
  titulo: PropTypes.bool,
  size: PropTypes.string,
};

export default User;
