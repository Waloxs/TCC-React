import React, { useState, useEffect } from 'react';
import { useUser } from '../../services/UserContextVagasTag.jsx';
import './UserVagasTag.css';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';

const UserVagasTag = () => {
  const { data2, loading2, error2 } = useUser();
  const [vagasCurtidas, setVagasCurtidas] = useState({ favoritedJobs: [] }); 
  const [modalIndex, setModalIndex] = useState(null);
  const [loading, setLoading] = useState(false);

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

        const favoritas = response.data.favoritedJobs || [];
        setVagasCurtidas({ favoritedJobs: favoritas });
      } catch (error) {
        console.error("Erro ao buscar vagas favoritas:", error);
      }
    };

    fetchFavoritas();
  }, []);

  const changeMarked = async (vaga) => {
    const isAlreadyLiked = vagasCurtidas.favoritedJobs.some((v) => v._id === vaga._id);

    try {
      setLoading(true);

      if (isAlreadyLiked) {
        await sendFavoriteStatus(vaga, false); // Envia requisição para descurtir
        setVagasCurtidas((prevState) => ({
          favoritedJobs: prevState.favoritedJobs.filter((v) => v._id !== vaga._id)
        }));
      } else {
        await sendFavoriteStatus(vaga, true); // Envia requisição para curtir
        setVagasCurtidas((prevState) => ({
          favoritedJobs: [...prevState.favoritedJobs, vaga]
        }));
      }

    } catch (error) {
      console.error("Erro ao atualizar o status de curtida:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendFavoriteStatus = async (vaga, isLiked) => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

    try {
      let response;

      if (isLiked) {
        response = await axiosInstance.put(`/jobs/favorite`, { jobId: vaga._id }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log("Vaga marcada como favorita:", response.data);
      } else {
        response = await axiosInstance.delete(`/jobs/favorite/${vaga._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log("Vaga desmarcada como favorita:", response.data);
      }

      return response.data;

    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw new Error('Erro ao atualizar vaga');
    }
  };


  const aplicarVaga = async (vaga) => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
  
    try {

      const response = await axiosInstance.post(`/jobs/${vaga._id}/apply`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      // Exibindo o console de sucesso
      console.log('Sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar vaga:', error);
      throw new Error('Erro ao atualizar vaga');
    }
  };
  

  const apareceModal = (index) => {
    setModalIndex(index);
  };

  const fechaModal = () => {
    setModalIndex(null);
  };

  if (loading2 || loading) return <div><p>Loading...</p></div>;
  if (error2) return <p>Error: {error2.message}</p>;

  return (
    <div className='flex flex-col gap-12' style={{position: 'relative'}}>
        <span className='flex title' style={{position: 'absolute', top: '-50px'}}>Vagas recomendadas</span>

      {data2.map((item, index) => (
        <div className='flex flex-col container-vagas' style={{ width: '100%' }} key={item._id}>
          <div>
            <span className='span-title'>{item.title}</span>
          </div>
          <div>
            <span className='span-description'>{item.localizacao}</span>
          </div>
          <div>
            <span className="span-empresa">{item.company.nome}</span>
          </div>
          <div onClick={() => apareceModal(index)}>
            <span className="span-description">{item.description}</span>
          </div>
          <div className='flex items-end'>
            <span className="span-re">
              {item.tags.map((req, tagIndex) => (
                <span key={tagIndex} className='re'>{req}</span>
              ))}
            </span>
            <div className='flex flex-col items-center'>
              <span className="span-description" style={{ whiteSpace: 'nowrap' }}>{item.salario}</span>
              <div onClick={() => changeMarked(item)}>
                {vagasCurtidas.favoritedJobs.some((v) => v._id === item._id) ? (
                  <img src="icons/heartPre.svg" alt="marked" style={{ width: '20px' }} />
                ) : (
                  <img src="icons/heart.svg" alt="not marked" style={{ width: '20px' }} />
                )}
              </div>
            </div>
          </div>

          {modalIndex === index && (
            <div className='moda'>
              <div className="moda-content">
                <div className='flex flex-col gap-12' style={{height: '100%', paddingTop: '0px'}}>

                <button onClick={fechaModal}><img src="icons/arrowLeft.svg" alt="" /></button>

              <div className='flex flex-col'>
                  <span className='apl-title'>{data2[index].title}</span>
                  <span className='apl-localizacao'>{data2[index].localizacao}</span>
              </div>

                  <span className='apl-description'>{data2[index].description}</span>

              <div className='flex flex-col'>
                  <span className='apl-title'>Responsabilidades</span>
                  <span className='flex flex-col'>
                    {data2[index].requirements.map((req, i) => (
                    <span key={i} className='flex items-center item-req'>{i < data2[index].requirements.length ? <div className='icone-circulo'></div> : ''}{req}</span>
                    ))}
                  </span>
              </div>


              <div className='flex flex-col'>
                  <span className='apl-title'>Preço</span>
                  <span className='item-req'>{data2[index].salario}</span>
              </div>

              <div className='flex flex-col'>
                  <span className='apl-title'>Habilidades e Expêriencias</span>
                  <span className='apl-tags flex gap-2' style={{maxWidth: '500px', overflowX: 'auto'}}>{data2[index].tags.map((tag, i ) => (
                    <span className='items-tags' key={i}>{tag}</span>
                  ))}</span>
              </div>



                </div>


                <div className='flex flex-col justify-between'>
                  <div className='apl-dados-empresa flex flex-col items-center'>
                    <span className=''><img src={data2[index].company.image} alt="" style={{borderRadius: '50%', width: '100px'}}/></span>
                    <span className='apl-title-empresa'>{data2[index].company.nome}</span>
                    <span className='apl-description-empresa'>Empresa</span> 
                  </div>


                  <div className='apl-buttons'>
                    <BtnPrincipal
                    texto={'Aplique agora'}
                    back={'#3B82F6'}
                    padding='15px'
                    borderRadius='20px'
                    color={'#fff'}
                    width="100%"
                    click={() => aplicarVaga(data2[index])}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserVagasTag;
