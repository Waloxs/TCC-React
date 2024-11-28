import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import { Bars } from 'react-loader-spinner'; // Exemplo de loader
import UserDados from '../UserDados/UserDados.jsx';
import { useUser as useUserTalento } from '../../services/UserContext.jsx';
import VerPerfil from '../VerPerfil/VerPerfil.jsx';


const UserVagasApl = () => {
  const [vagasAplicadas, setVagasAplicadas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null); // Estado para controlar o modal

const abreModal = (id) => {
  setModalId(id); // Define o ID da vaga para abrir o modal
};

const fechaModal = () => {
  setModalId(null); // Reseta o ID para fechar o modal
};



  
  const {data: user} = useUserTalento();

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

  const handleModal = () => {
    setModal(!modal);
} 

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
    <div className="flex flex-col gap-12" style={{height: '100%', paddingTop: '25px'}}>

    <UserDados toggleModal={handleModal}/>

    {!modal && (
    <>
      {vagasAplicadas.length === 0 && (
        <p>Nenhuma vaga aplicada.</p>
      )}
    </>
    )}

  {loading ? (
    <div className="flex justify-center">
      <Bars height="80" width="80" color="#3B82F6" ariaLabel="loading" visible={true} />
    </div>
  ) 
  : vagasAplicadas && vagasAplicadas.length > 0 && !modal ?(

    <>
    <div style={{height: '70vh', overflowY: 'auto', marginTop: '50px'}} className='flex flex-col gap-6'>
    {vagasAplicadas.map((vaga) => (
  <div key={vaga._id} className="flex flex-col gap-3 container-vagas p-4" onClick={() => abreModal(vaga._id)}>
    <div className="flex justify-between">
      <span className="span-title">{vaga.job.title}</span>
      <span className="span-espera">{vaga.status}</span>
    </div>
    <div>
      <span className="span-description">{vaga.job.localizacao}</span>
    </div>
    <div>
      <span className="span-empresa">{vaga.job.company.nome}</span>
    </div>
    <div className="" style={{ marginBottom: '10px' }}>
      <span className="span-description">{vaga.job.description}</span>
    </div>
    <div className="flex items-center">
      <span className="span-re">
        {vaga.job.tags && vaga.job.tags.length > 0 ? (
          vaga.job.tags.map((req, tagIndex) => (
            <span key={tagIndex} className="re">
              {req}
            </span>
          ))
        ) : (
          <span>Tags não disponíveis</span>
        )}
      </span>
      <span className="span-description" style={{ whiteSpace: 'nowrap' }}>
        {formatarSalario(vaga.job.salario)}
      </span>
    </div>

    {/* Modal */}
    {modalId === vaga._id && (
      <div className='moda'>
      <div className="moda-content">
        <div className='flex flex-col gap-12' style={{height: '100%', paddingTop: '0px'}}>
  
        <button onClick={(event) => { event.stopPropagation(); fechaModal(); }}>
          <img src="icons/arrowLeft.svg" alt="" />
        </button>

  
      <div className='flex flex-col'>
          <span className='apl-title'>{vaga.job.title}</span>
          <span className='apl-localizacao'>{vaga.job.localizacao}</span>
      </div>
  
          <span className='apl-description'>{vaga.job.description}</span>
  
     
  
      <div className='flex flex-col'>
          <span className='apl-title'>Preço</span>
          <span className='item-req'>{formatarSalario(vaga.job.salario)}</span>
      </div>
  
      <div className='flex flex-col'>
          <span className='apl-title'>Habilidades e Expêriencias</span>
          <span className='apl-tags flex gap-2' style={{maxWidth: '500px', overflowX: 'auto'}}>{vaga.job.tags.map((tag, i ) => (
            <span className='items-tags' key={i}>{tag}</span>
          ))}</span>
      </div>
  
  
  
        </div>
  
  
        <div className='flex flex-col justify-between'>
          <div className='apl-dados-empresa flex flex-col items-center'>
            <span className=''><img src={vaga.job.company.image} alt="" style={{borderRadius: '50%', width: '100px'}}/></span>
            <span className='apl-title-empresa'>{vaga.job.company.nome}</span>
            <span className='apl-description-empresa'>Empresa</span> 
          </div>
        </div>
      </div>
    </div>
    )}
  </div>
))}

    </div>
</>
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

export default UserVagasApl;
