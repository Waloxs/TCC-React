import React from 'react';
import BtnPrincipal from '../Buttons/BtnPrincipal';


const PerfilCandidato = ({applicant, volta}) => (
<div className='flex flex-col'>
            <div onClick={volta} style={{cursor: 'pointer', marginBottom: '25px', marginLeft: '0px', marginTop: '20px'}}>
              <img src="icons/arrowLeft.svg" alt="" width='11px'/>
            </div>

    <div className='flex flex-col items-center'>
        <img className='applicant-image' src={applicant.image} alt={`${applicant.firstName}'s profile`} style={{width: '120px', height: '120px'}}/>
        <h4 className='applicant-name'>{applicant.firstName} {applicant.lastName}</h4>
        <p className='applicant-titulo'>{applicant.titulo}</p>

    </div>


    <div className='flex flex-col gap-5'>
    <div>
        <h1>Biografia</h1>
        <p className='applicant-titulo'>{applicant.bio}</p>
    </div>


    <div>
        <h1>Habilidades</h1>
        <ul className='listaTag flex gap-2'>
          {applicant.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
          ))}
        </ul>
    </div>
    </div>

    <div className='flex self-end'>
    <BtnPrincipal
        texto="Aceitar"
        back='#3B82F6'
        padding='10px'
        borderRadius='20px'
        color='#fff'
        font='Lexend'
        width='200px'
        hoverColor='#609AFA'
        click={''}
      />
    </div>
</div>
);

export default PerfilCandidato;
