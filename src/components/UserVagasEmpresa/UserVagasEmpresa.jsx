import React from 'react';


import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';


const UserVagasEmpresa = () => {  
  const { data: userDataEmpresa, loading, error } = useUserEmpresa();
  const { data: userDataVagasEmpresa, loading2, error2 } = useUserVagasEmpresa();


  if (loading2) return <div><p>Loading...</p></div>;
  if (error2) return <p>Error: {error2.message}</p>;

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
<div className='flex flex-col gap-12'>
  {userDataVagasEmpresa.map(item => (
    <div className='flex flex-col container-vagas' style={{width: '100%'}} key={item.id}> 
      <div> 
        <span className='span-title'>{item.title}</span>
      </div>
      <div>
        <span className="span-localiza">{item.localizacao}</span>
      </div>
      <div className='flex flex-col' style={{marginTop: '20px', marginBottom: '20px'}}>
        <span className="span-empresa">{userDataEmpresa.nome}</span>
        <span className="span-description">{item.description}</span>
      </div>
      <div style={{marginBottom: '20px'}}>
        <span className="span-description" style={{fontWeight: '400'}}>{item.salario}</span>
      </div>
      <div className='caixa-tags'>
        {item.tags.map((tag, index) => (
          <span className="span-tag" key={index}>{tag}</span>
        ))}
      </div>

      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 4.5H13.5" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 4.5H12V13.5C12 13.7652 11.8946 14.0196 11.7071 14.2071C11.5196 14.3946 11.2652 14.5 11 14.5H4C3.73478 14.5 3.48043 14.3946 3.29289 14.2071C3.10536 14.0196 3 13.7652 3 13.5V4.5Z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 4.5V4C5 3.33696 5.26339 2.70107 5.73223 2.23223C6.20107 1.76339 6.83696 1.5 7.5 1.5C8.16304 1.5 8.79893 1.76339 9.26777 2.23223C9.73661 2.70107 10 3.33696 10 4V4.5" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 7.50146V11.503" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 7.50146V11.503" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </div>
  ))}
</div>
  );
};

export default UserVagasEmpresa;
