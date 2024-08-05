import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../services/UserContext';

const User = ({ nome, sobrenome, email, prLet, id, ...props }) => {
  const { data, loading, error } = useUser();

  if (loading) return <div><p>Loading...</p></div>;
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
