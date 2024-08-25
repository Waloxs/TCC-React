import React from 'react';
import './ApplicantCard.css';

const ApplicantCard = ({ applicant }) => (
  <div className='applicant-card'>
    <div className='banner'>
      <img className='applicant-image' src={applicant.image} alt={`${applicant.firstName}'s profile`} />
    </div>
    <div className='applicant-info'>
      <h4 className='applicant-name'>{applicant.firstName} {applicant.lastName}</h4>
      <p className='applicant-email'>{applicant.email}</p>
      {applicant.bio && <p className='applicant-bio'>{applicant.bio}</p>}
    </div>
  </div>
);

export default ApplicantCard;
