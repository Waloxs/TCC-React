import React from 'react';
import './ApplicantCard.css';
import BtnPrincipal from '../Buttons/BtnPrincipal';
import Swal from 'sweetalert2';  // Importando o SweetAlert2

const ApplicantCard = ({ applicant, onAceitarClick, onVerPerfilClick }) => {

  // Função para exibir o alerta quando o botão "Aceitar" for clicado
  const handleAceitarClick = () => {
    Swal.fire({
      title: 'Sucesso!',
      text: `Você aceitou ${applicant.firstName} ${applicant.lastName}.`,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#4ADA3D', // Cor do botão de confirmação
    });

    // Chama a função original de "Aceitar", caso fornecida
    if (onAceitarClick) {
      onAceitarClick();
    }
  };

  return (
    <div className='applicant-card' style={{ height: '430px', width: '350px', position: 'relative', borderRadius: '15px' }}>
      <div className="fundo">
        <div className='banner'>
          {applicant.image ? (
            <img className='applicant-image' src={applicant.image} alt={`${applicant.firstName}'s profile`} />
          ) : (
            <img src={`https://ui-avatars.com/api/?name=${applicant.firstName}+${applicant.lastName}&background=172554&rounded=true&color=fff`} alt='Foto não exibida' style={{ marginTop: '1rem', width: '50px', height: '50px' }} />
          )}
        </div>
        <div className='applicant-info'>
          <h4 className='applicant-name'>{applicant.firstName} {applicant.lastName}</h4>
          <p className='applicant-titulo'>{applicant.titulo}</p>
        </div>
      </div>

      <div style={{ padding: '20px', width: '100%' }}>
        {applicant.bio && (
          <p className='applicant-bio'>
            {applicant.bio.length > 150 ? (
              <>
                {applicant.bio.substring(0, 150)}... <button onClick={onVerPerfilClick}>Ver Mais</button>
              </>
            ) : (
              applicant.bio
            )}
          </p>
        )}

        <ul className='listaTag flex gap-2'>
          {applicant.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>

        <div className='flex flex-col gap-1' style={{ padding: '20px', bottom: '0px', position: 'absolute', width: '100%', left: '50%', transform: 'translateX(-50%)' }}>
          <BtnPrincipal
            texto="Aceitar"
            back='#3B82F6'
            padding='10px'
            borderRadius='20px'
            color='#fff'
            font='Lexend'
            width='100%'
            hoverColor='#609AFA'
            click={handleAceitarClick}  // Substituindo a função click aqui
          />

          <BtnPrincipal
            texto="Ver Perfil"
            back='#fff'
            padding='10px'
            borderRadius='20px'
            color='#3B82F6'
            font='Lexend'
            border='#3B82F6'
            width='100%'
            hoverColor='#3B82F6'
            click={onVerPerfilClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
