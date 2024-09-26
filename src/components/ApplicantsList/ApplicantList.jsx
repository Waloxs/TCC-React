import React, { useState, useEffect } from 'react';
import { axiosInstance, setAuthToken } from '../../utils/api'; 
import ApplicantCard from '../ApplicantCard/ApplicantCard';
import VerPerfil from '../VerPerfil/VerPerfil';
import './ApplicantsList.css'; 
import Notify from '../Notify/Notify';
import PerfilCandidato from '../PerfilCandidato/PerfilCandidato';

const ApplicantsList = ({ jobId, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleVerPerfilClick = (applicant) => {
    setSelectedApplicant(applicant); 
  };

  const AceitarCandidato = (applicant) => {

    
      const acceptUser = async () => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token); 
  
        try {
          const response = await axiosInstance.post(`/jobs/${jobId}/accept/${applicant._id}`);
          console.log(response);
        } catch (error) {
          console.error('Erro ao buscar candidatos:', error);
          setError('Erro ao carregar candidatos.');
        } finally {
          setLoading(false);
        }
      };
  
      acceptUser();




  }

  const handleClosePerfil = () => {
    setSelectedApplicant(null); 
  };

  return (
    <>
      {applicants.map((applicant, index) => (
      <>
      <div className='modal-overlay' onClick={onClose}></div>

      <div className='modalApplicants'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='error-message'>{error}</div>
        ) : selectedApplicant ? (
          <PerfilCandidato applicant={selectedApplicant} onClose={handleClosePerfil} volta={handleClosePerfil} onAceitarClick={() => AceitarCandidato(applicant, index)} />
        ) : applicants.length === 0 ? (
          <div className='no-candidates'>Não há candidatos.</div>
        ) : (
          <div className='flex flex-col' style={{width: 'max-content', height: 'max-content'}}>
            <div onClick={onClose} style={{cursor: 'pointer', marginBottom: '25px', marginLeft: '0px', marginTop: '20px'}}>
              <img src="icons/arrowLeft.svg" alt="" width='11px'/>
            </div>
            <span className='modal-title flex gap-2 self-start' style={{marginLeft: '16px'}}>
              Aplicações <img src="icons/icon-pessoa.svg" alt="" width='20px'/>
            </span>
            <div className='applicants-container'>
              {applicants.map((applicant, index) => (
                <div key={index}> 
                  <ApplicantCard 
                    applicant={applicant} 
                    onAceitarClick={() => AceitarCandidato(applicant, index)} 
                    onVerPerfilClick={() => handleVerPerfilClick(applicant)} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </>
      ))}
    </>
  );
};

export default ApplicantsList;
