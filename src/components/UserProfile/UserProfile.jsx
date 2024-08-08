import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../services/UserContext';

const User = ({ nome, sobrenome, email, id, titulo, ...props }) => {
  const { userData, loading2, error2 } = useUser();

  if (loading2) return <div><p>Loading...</p></div>;
  if (error2) return <p>Error: {error2.message}</p>;

  return (
    <>
      {nome && <>{userData?.firstName}</>}
      {sobrenome && <>{userData?.lastName}</>}
      {email && <>{userData?.email}</>}
      {id && <>{userData?._id}</>}
      {titulo && <>{userData?.titulo}</>}
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
