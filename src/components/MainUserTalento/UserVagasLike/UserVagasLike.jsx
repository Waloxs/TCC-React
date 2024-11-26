import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../../utils/api.js';
import { Bars } from 'react-loader-spinner'; 
import { useUser as useUserTalento } from '../../../services/UserContext.jsx';
import UserDados from '../../UserDados/UserDados.jsx';
import VerPerfil from '../../VerPerfil/VerPerfil.jsx';
import BtnPrincipal from '../../Buttons/BtnPrincipal.jsx';


const UserVagasLike = () => {
  const [vagasCurtidas, setVagasCurtidas] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [modal, setModal] = useState(false);
  const {data: user} = useUserTalento();
  const [modalIndex, setModalIndex] = useState(null);




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


  const handleModal = () => {
    setModal(!modal);
} 

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

  const apareceModal = (index) => {
    setModalIndex(index);
  };

  const fechaModal = () => {
    setModalIndex(null);
  };

  return (
    <div className="flex flex-col gap-12" style={{paddingTop: '25px'}}>


    <UserDados toggleModal={handleModal}/>

          {!modal && (
          <>
            {vagasCurtidas.length === 0 && (
              <p>Nenhuma vaga curtida.</p>
            )}
          </>
          )}


      {loading ? (
        <div className="flex justify-center">
          <Bars height="80" width="80" color="#3B82F6" ariaLabel="loading" visible={true}/>
        </div>
      ) : vagasCurtidas.length > 0  && !modal ?(
        <div className='flex flex-col gap-8' style={{height: '70vh', overflowY: 'auto'}}>
        {vagasCurtidas.map((vaga, index) => (
          <div>
          <div key={vaga._id} className="flex flex-col container-vagas p-4 gap-3" onClick={() => apareceModal(index)}>
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
            <span className="span-description" style={{ whiteSpace: 'nowrap' }}>
  {vaga.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
</span>

              <div onClick={(event) => {event.stopPropagation(); toggleLike(vaga._id);}}>
                {vagasCurtidas.some((v) => v._id === vaga._id) ? (
                  <img src="icons/heartPre.svg" alt="marked" style={{ width: '20px' }} />
                ) : (
                  <img src="icons/heart.svg" alt="not marked" style={{ width: '20px' }} />
                )}
              </div>
            </div>
            </div>
          </div>


<>
{modalIndex === index && (
  <div className='moda'>
    <div className="moda-content">
      <div className='flex flex-col gap-12' style={{height: '100%', paddingTop: '0px'}}>

      <button onClick={fechaModal}><img src="icons/arrowLeft.svg" alt="" /></button>

    <div className='flex flex-col'>
        <span className='apl-title'>{vagasCurtidas[index].title}</span>
        <span className='apl-localizacao'>{vagasCurtidas[index].localizacao}</span>
    </div>

        <span className='apl-description'>{vagasCurtidas[index].description}</span>

    <div className='flex flex-col'>
        <span className='apl-title'>Responsabilidades</span>
    </div>


    <div className='flex flex-col'>
        <span className='apl-title'>Preço</span>
        <span className='item-req'>{vagasCurtidas[index].salario}</span>
    </div>

    <div className='flex flex-col'>
        <span className='apl-title'>Habilidades e Expêriencias</span>
        <span className='apl-tags flex gap-2' style={{maxWidth: '500px', overflowX: 'auto'}}>{vagasCurtidas[index].tags.map((tag, i ) => (
          <span className='items-tags' key={i}>{tag}</span>
        ))}</span>
    </div>



      </div>


      <div className='flex flex-col justify-between'>
        <div className='apl-dados-empresa flex flex-col items-center'>
          <span className=''><img src={vagasCurtidas[index].company.image} alt="" style={{borderRadius: '50%', width: '100px'}}/></span>
          <span className='apl-title-empresa'>{vagasCurtidas[index].company.nome}</span>
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
          click={() => aplicarVaga(vagasCurtidas[index])}
          />
        </div>
      </div>
    </div>
  </div>
)}
</>
</div>
        ))}
        </div>
      ) : (
        <>
        {modal && (
          <div className='modal flex flex-col'>
            <VerPerfil dadosUser={user}/>
          </div>
        )}
        </> 
      )}
    </div>
  );
};

export default UserVagasLike;
