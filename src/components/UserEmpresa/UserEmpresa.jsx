import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../services/UserContextEmpresa';

const UserEmpresa = ({ nome, ramo, email, prLet, id, cnpj, className, size}) => {
  const { data, loading, error } = useUser();

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={className} style={{display: 'inline'}}>
      {prLet && (
        <span style={{ color: '#fff', fontSize: size }}>{data.nome.charAt(0)}</span>
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
    </div>

    
  );
};

UserEmpresa.propTypes = {
  nome: PropTypes.bool,
  ramo: PropTypes.bool,
  email: PropTypes.bool,
  id: PropTypes.bool,
  prLet: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default UserEmpresa;
