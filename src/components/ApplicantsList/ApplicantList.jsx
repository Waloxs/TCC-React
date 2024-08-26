import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../utils/api'; 
import ApplicantCard from '../ApplicantCard/ApplicantCard';
import './ApplicantsList.css'; 

const ApplicantsList = ({ jobId, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const AceitarCandidato = (applicant, index) => {
    console.log('Candidato Aceito:', applicant, 'Index:', index);
  };

  const VerPerfil = (applicant, index) => {
    console.log('Ver Perfil do Candidato:', applicant, 'Index:', index);
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem('authToken');
      setAuthToken(token); 

      try {
        const response = await axiosInstance.get(`/jobs/${jobId}/applicants`);
        setApplicants(response.data.applicants);
      } catch (error) {
        console.error('Erro ao buscar candidatos:', error);
        setError('Erro ao carregar candidatos.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div>
      <div className='modal-overlay' onClick={onClose}></div>

      <div className='modalApplicants'>
  
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='error-message'>{error}</div>
        ) : applicants.length === 0 ? (
          <div className='no-candidates'>Não há candidatos.</div>
        ) : (
          <div className='flex flex-col' style={{width: 'max-content', height: 'max-content'}}>
             <div onClick={onClose} style={{cursor: 'pointer', marginBottom: '25px', marginLeft: '0px', marginTop: '20px'}}>
             <img src="icons/arrowLeft.svg" alt="" width='11px'/>
          </div>
             <span className='modal-title flex gap-2 self-start' style={{marginLeft: '16px'}}>Aplicações <img src="icons/icon-pessoa.svg" alt="" width='20px'/></span>
             <div className='applicants-container'>
            {applicants.map((applicant, index) => (
              <div key={index}> 
              <ApplicantCard 
              applicant={applicant} 
              onAceitarClick={() => AceitarCandidato(applicant, index)} 
              onVerPerfilClick={() => VerPerfil(applicant, index)}
            />
          </div>
  ))}
</div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
