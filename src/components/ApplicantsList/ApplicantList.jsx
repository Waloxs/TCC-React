import React, { useState, useEffect } from 'react';
import axiosInstance, { setAuthToken } from '../../utils/api'; 
import ApplicantCard from '../ApplicantCard/ApplicantCard';
import './ApplicantsList.css'; 

const ApplicantsList = ({ jobId, onClose }) => {
  const [applicants, setApplicants] = useState([]);
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

  return (
    <div>
      <div className='modal-overlay' onClick={onClose}></div>

      <div className='modalApplicants'>
        <span className='modal-title'>Aplicações</span>
        <button 
          className='close-button'
          onClick={onClose}
        >
          Fechar
        </button>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='error-message'>{error}</div>
        ) : applicants.length === 0 ? (
          <div className='no-candidates'>Não há candidatos.</div>
        ) : (
          <div className='applicants-container'>
            {applicants.map((applicant, index) => (
              <ApplicantCard key={index} applicant={applicant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;