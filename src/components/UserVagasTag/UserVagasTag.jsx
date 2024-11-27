import React, { useState, useEffect } from 'react';
import { useUser } from '../../services/UserContextVagasTag.jsx';
import './UserVagasTag.css';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx'
import Swal from 'sweetalert2';

const UserVagasTag = () => {
  const { data2, loading2, error2 } = useUser();
  const [vagasCurtidas, setVagasCurtidas] = useState({ favoritedJobs: [] }); 
  const [modalIndex, setModalIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aplicado, setAplicado] = useState({}); // Para controlar se o usuário já se candidatou

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
      // Atualizando o estado de forma otimista
      setVagasCurtidas((prevState) => ({
        favoritedJobs: isAlreadyLiked
          ? prevState.favoritedJobs.filter((v) => v._id !== vaga._id)
          : [...prevState.favoritedJobs, vaga],
      }));
  
      // Envia a requisição para a API após atualizar o estado
      if (isAlreadyLiked) {
        await sendFavoriteStatus(vaga, false); // Descurte a vaga
      } else {
        await sendFavoriteStatus(vaga, true); 
      }
    } catch (error) {
      console.error("Erro ao atualizar o status de curtida:", error);
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

      // Exibindo o Swal de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Candidatura realizada!',
        text: 'Sua candidatura foi enviada com sucesso.',
        showConfirmButton: true,
        timer: 3000, // Timer de 3 segundos para desaparecer
      });

      // Atualiza o estado para marcar que o usuário já se candidatou
      setAplicado((prev) => ({
        ...prev,
        [vaga._id]: true,
      }));

    } catch (error) {
      console.error('Erro ao aplicar para a vaga:', error);

      // Exibindo o Swal de erro
      Swal.fire({
        icon: 'error',
        title: 'Erro ao aplicar',
        text: 'Houve um erro ao enviar sua candidatura. Tente novamente.',
        showConfirmButton: true,
      });
    }
  };

  const apareceModal = (index) => {
    setModalIndex(index);
  };

  const fechaModal = () => {
    setModalIndex(null);
  };

  const formatarSalario = (valor) => {
    if (!valor) return '0,00R$';
  
    // Remove "R$", ".", ","
    const valorLimpo = valor.replace(/[^\d]/g, '');
    
    // Multiplica o número por 100 e converte de volta para string
    const valorCorrigido = (parseInt(valorLimpo, 10) * 100).toString();
  
    // Formata com separadores de milhar e duas casas decimais
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(valorCorrigido / 100);
  
    return valorFormatado;
  };

  return (
    <div className='flex flex-col gap-12' style={{position: 'relative', height: '70vh', overflowY: 'auto'}}>

{}

        
        <span className='flex title' style={{position: 'absolute', top: '-50px'}}>Vagas recomendadas</span>

      {data2.map((item, index) => (
        <div className='container-vagas' style={{ width: '100%' }} key={item._id} >
        <div className='flex flex-col gap-3' onClick={() => apareceModal(index)}>
        <div>
          <span className='span-title'>{item.title}</span>
        </div>
        <div>
          <span className='span-description'>{item.localizacao}</span>
        </div>
        <div>
          <span className="span-empresa">{item.company.nome}</span>
        </div>
        <div>
          <span className="span-description">{item.description}</span>
        </div>
        <div className='flex items-end'>
          <span className="span-re">
            {item.tags.map((req, tagIndex) => (
              <span key={tagIndex} className='re'>{req}</span>
            ))}
          </span>
          <div className='flex flex-col items-center'>
            <span className="span-description" style={{ whiteSpace: 'nowrap' }}>{formatarSalario(item.salario)}</span>
            <div 
              onClick={(event) => {
                event.stopPropagation();
                changeMarked(item);
              }}
            >
              {vagasCurtidas.favoritedJobs.some((v) => v._id === item._id) ? (
                <img src="icons/heartPre.svg" alt="marked" style={{ width: '20px' }} />
              ) : (
                <img src="icons/heart.svg" alt="not marked" style={{ width: '20px' }} />
              )}
            </div>
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
                  {data2[index].company.image ? (
  <span className="">
    <img
      src={data2[index].company.image}
      alt={data2[index].company.nome || 'Empresa'}
      style={{ borderRadius: '50%', width: '100px' }}
    />
  </span>
) : (
  <></>
)}



                    <span className='apl-title-empresa'>{data2[index].company.nome}</span>
                    <span className='apl-description-empresa'>Empresa</span> 
                  </div>


                  <div className='apl-dados'>
                    <BtnPrincipal
                      texto={aplicado[data2[index]._id] ? 'Candidatura Enviada' : 'Aplique agora'}
                      back={aplicado[data2[index]._id] ? '#B0B0B0' : '#3B82F6'} // Cor cinza quando já se candidatou
                      padding='15px'
                      borderRadius='20px'
                      color={aplicado[data2[index]._id] ? '#fff' : '#fff'}
                      width="100%"
                      click={() => aplicarVaga(data2[index])}
                      disabled={aplicado[data2[index]._id]} // Desabilita o botão se já se candidatou
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
