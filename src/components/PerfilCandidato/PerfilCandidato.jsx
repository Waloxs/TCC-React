import React, { useState, useEffect } from 'react';
import BtnPrincipal from '../Buttons/BtnPrincipal';
import './PerfilCandidato.css';

const PerfilCandidato = ({applicant, onAceitarClick, volta}) => {

  const [aceitou, setAceitou] = useState(false);

    const AceitarClick = () => {
      setAceitou(true);
      if (onAceitarClick) {
        onAceitarClick(); 
      }
    };
    
 
  return (
    <div className='cx-form-candidato flex flex-col' style={{margin: '50px'}}>

      <img src="icons/arrowLeft.svg" onClick={volta} alt="" style={{width: '10px'}}/>
      <div className='flex flex-col items-center gap-4 '>

      <img className='applicant-image' src={applicant.image} alt={`${applicant.firstName}'s profile`} style={{width: '120px', height: '120px'}}/>
        <div className='flex flex-col items-center'>
          <h4 className='applicant-name'>{applicant.firstName} {applicant.lastName}</h4>
          <p className='applicant-titulo'>{applicant.titulo}</p>
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        <div className="conteiner-editar flex flex-col gap-3">
          <span>Biografia</span>
          <div>
            <h1 className='bio-perfil'>{applicant.bio}</h1>
          </div>

          <span>Experiências</span>
          <div className="input-editar">
          </div>

          <span>Habilidades</span>
          <div className='' style={{marginTop: '10px'}}>

            <span className='flex gap-4'>{applicant.tags.map((item, index) => (
                <span className='items-tags' key={index}>{item}</span>
            ))}</span>

          </div>

        </div>

        <div className='flex self-end' style={{marginTop: '10px'}}>
          <BtnPrincipal
            texto={aceitou ? "Aceito" : "Aceitar"}
            back='#3B82F6'
            padding='10px'
            borderRadius='20px'
            color='#fff'
            font='Lexend'
            width='200px'
            hoverColor='#609AFA'
            click={AceitarClick}
          />
        </div>
      </div>
    </div>
  );
};

export default PerfilCandidato;
