import React from 'react';
import { useUser } from '../../services/UserContextVagasTag.jsx';
import './UserVagasTag.css';

const UserVagasTag = () => {  
  const { data2, loading2, error2 } = useUser();

  if (loading2) return <div><p>Loading...</p></div>;
  if (error2) return <p>Error: {error2.message}</p>;

  return (
    <div className='flex flex-col gap-12'>
      {data2.map(item => (
        <div className='flex flex-col container-vagas' style={{width: '100%'}} key={item.id}> 
          <div> 
            <span className='span-title'>{item.title}</span>
          </div>
          <div>
            <span className="span-empresa">{item.company.nome}</span>
          </div>
          <div>
            <span className="span-description">{item.description}</span>
          </div>
            <span className="span-req">
              {item.requirements.map((req, index) => (
                <span key={index} className='req'>{req}</span>
              ))}
            </span>
          </div>
      ))}
    </div>
  );
};

export default UserVagasTag;
