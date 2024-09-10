import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import { Bars } from 'react-loader-spinner'; // Exemplo de loader
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';

const UserVagasApl = () => {
  const [vagasAplicadas, setVagasAplicadas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchFavoritas = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get('/me/applications', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setVagasAplicadas(response.data.applications);
        console.log('res', response.data);
      } catch (error) {
        console.error("Erro ao buscar vagas aplicadas:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchFavoritas();
  }, []);

  return (
    <div className="flex flex-col gap-12">
  {loading ? (
    <div className="flex justify-center">
      <Bars height="80" width="80" color="#3B82F6" ariaLabel="loading" visible={true} />
    </div>
  ) : vagasAplicadas && vagasAplicadas.length > 0 ? (
    vagasAplicadas.map((vaga, index) => (
        <div key={vaga._id} className="container-vagas p-4">
          <div className='flex justify-between'>
            <span className='span-title'>{vaga.job.title}</span>
            <span className='span-espera'>{vaga.status}</span>
          </div>
          <div>
            <span className='span-description'>{vaga.job.localizacao}</span>
          </div>
          <div>
            <span className="span-empresa">{vaga.job.company.nome}</span>
          </div>
          <div className='' style={{marginBottom: '30px'}}>
            <span className="span-description">{vaga.job.description}</span>
          </div>
          <div className='flex items-center'>
            <span className="span-re">
              {vaga.job.tags && vaga.job.tags.length > 0 ? (
                vaga.job.tags.map((req, tagIndex) => (
                  <span key={tagIndex} className='re'>{req}</span>
                ))
              ) : (
                <span>Tags não disponíveis</span>
              )}
            </span>
            <span className="span-description" style={{ whiteSpace: 'nowrap' }}>
              {vaga.job.salario}
            </span>
          </div>
        </div>
    ))
  ) : (
    <p>Você ainda não aplicou para nenhuma vaga.</p>
  )}
</div>

  );
};

export default UserVagasApl;
