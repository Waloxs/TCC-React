import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../../utils/api.js';
import { Bars } from 'react-loader-spinner'; 

const UserVagasLike = () => {
  const [vagasCurtidas, setVagasCurtidas] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFavoritas = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token);

      try {
        const response = await axiosInstance.get('/jobs/favorite', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        setVagasCurtidas(response.data.favoritedJobs);
        console.log('ttt:', response.data.favoritedJobs);
      } catch (error) {
        console.error("Erro ao buscar vagas curtidas:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchFavoritas();
  }, []);

  const toggleLike = async (vagaId) => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    if (vagasCurtidas.some((vaga) => vaga._id === vagaId)) {
      try {
        await axiosInstance.delete(`/jobs/favorite/${vagaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setVagasCurtidas((prevVagasCurtidas) =>
          prevVagasCurtidas.filter((vaga) => vaga._id !== vagaId)
        );
      } catch (error) {
        console.error("Erro ao desfavoritar a vaga:", error);
      }
    } 
  };

  return (
    <div className="flex flex-col gap-12">
      {loading ? (
        <div className="flex justify-center">
          <Bars height="80" width="80" color="#3B82F6" ariaLabel="loading" visible={true}/>
        </div>
      ) : vagasCurtidas.length > 0 ? (
        vagasCurtidas.map((vaga) => (
          <div key={vaga._id} className="container-vagas p-4">
            <div className='flex justify-between'>
              <span className='span-title'>{vaga.title}</span>
              <span className='span-espera'>{vaga.status}</span>
            </div>
            <div>
              <span className='span-description'>{vaga.localizacao}</span>
            </div>
            <div>
              <span className="span-empresa">{vaga.company.nome}</span>
            </div>
            <div className='' style={{ marginBottom: '30px' }}>
              <span className="span-description">{vaga.description}</span>
            </div>
            <div className='flex items-center'>
            <span className="span-re">
              {vaga.tags && vaga.tags.length > 0 ? (
                vaga.tags.map((req, tagIndex) => (
                  <span key={tagIndex} className='re'>{req}</span>
                ))
              ) : (
                <span>Tags não disponíveis</span>
              )}
            </span>
            <div className='flex flex-col items-center'>
              <span className="span-description" style={{ whiteSpace: 'nowrap' }}>{vaga.salario}</span>
              <div onClick={() => toggleLike(vaga._id)}>
                {vagasCurtidas.some((v) => v._id === vaga._id) ? (
                  <img src="icons/heartPre.svg" alt="marked" style={{ width: '20px' }} />
                ) : (
                  <img src="icons/heart.svg" alt="not marked" style={{ width: '20px' }} />
                )}
              </div>
            </div>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhuma vaga curtida.</p>
      )}
    </div>
  );
};

export default UserVagasLike;
