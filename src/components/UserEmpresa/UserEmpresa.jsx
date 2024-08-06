import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../services/UserContextEmpresa';

const UserEmpresa = ({ nome, ramo, email, prLet, id, cnpj, ...props }) => {
  const { data, loading, error } = useUser();

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {prLet && (
        <span style={{ color: '#fff', fontSize: props.size }}>{data.nome.charAt(0)}</span>
      )}
      {nome && (
        <>{data.nome}</>
      )}
      {ramo && (
        <>{data.ramo_atividade}</>
      )}
      {id && (
        <>{data._id}</>
      )}
      {email && (
        <>{data.email}</>
      )}
      {cnpj && (
        <>{data.cnpj}</>
      )}
    </>
  );
};

UserEmpresa.propTypes = {
  nome: PropTypes.bool,
  sobrenome: PropTypes.bool,
  email: PropTypes.bool,
  id: PropTypes.bool,
  prLet: PropTypes.bool,
  size: PropTypes.string,
};

export default UserEmpresa;
