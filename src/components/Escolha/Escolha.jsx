import React, { useState } from 'react';
import img from '../../assets/login.png';
import imgEscolha from '../../assets/imgEscolha.png';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../Buttons/BtnPrincipal';
import './Escolha.css';
import { Link } from 'react-router-dom';

const Escolha = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [btnProps, setBtnProps] = useState({
    color: '#CBD5E1',
    back: '#fff',
    border: '2px solid #CBD5E1'
  });

  const ativaBtn = (option) => {
    setSelectedOption(option);
    setBtnProps({
      color: '#fff',
      back: '#0866FF', 
      border: '2px solid #0866FF' 
    });
  };

  const getLinkPath = () => {
    if (selectedOption === 'empresa') {
      return '/Empresa';
    } else if (selectedOption === 'talento') {
      return '/Talento';
    }
    return '';
  };

  return (
    <div className='flex justify-center' style={{width: '100vw'}}>
      <div className='container flex flex-col justify-center items-center' style={{ background: '#fff', height: '100vh', gap: '30px', marginTop: '10px', maxWidth: '65rem', padding: '40px'}}>
        <div className="flex self-start" style={{ maxWidth: '65rem' }}>
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ width: '6rem', height: '1.10rem' }} />
          </Link>
        </div>
        <div className="flex justify-between" style={{ maxWidth: '65rem', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
          <div className='flex flex-col' style={{height: '35rem'}}>
            <Link to="/"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>
            <div className='flex flex-col gap-3' style={{ marginTop: '-20px', padding: '2rem'}}>
              <h1 className='EscTit'>Agora sim, nos conte como podemos te ajudar, o que você é?</h1>
              <p className='EscPar'>Conectamos empresas e talentos para transformar objetivos em realidade. Estamos aqui para ajudar tanto empresas quanto profissionais a alcançar suas metas.</p>
            </div>

            <div className='flex flex-col gap-5' style={{padding: '2rem'}}>
              <div className='Empresa flex flex-col gap-3'>
                <h1 className='titEnt'>Sou uma Empresa</h1>
                <div className='camph2 flex justify-around' onClick={() => ativaBtn('empresa')}>
                  <h2>Em busca de um Talento</h2>
                  <div className='radio'>
                    <div className={`azul ${selectedOption === 'empresa' ? 'selected' : ''}`}></div>
                  </div>
                </div>
              </div>
              
              <div className='Talento flex flex-col gap-3'>
                <h1 className='titEnt'>Sou um Talento</h1>
                <div className='camph2 flex justify-around' onClick={() => ativaBtn('talento')}>
                  <h2>Em busca de um Emprego</h2>
                  <div className='radio'>
                    <div className={`azul ${selectedOption === 'talento' ? 'selected' : ''}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className='imgEscolha' src={imgEscolha} alt="Login Visual" style={{ maxWidth: '34rem', height: '35rem' }} />
        </div>
        <div className='flex self-end' style={{ marginTop: '-20px', maxWidth: '65rem' }}>
          <Link to={getLinkPath()}><BtnPrincipal texto="Continuar" color={btnProps.color} width="160px" back={btnProps.back} border={btnProps.border} /></Link>
        </div>
      </div>
    </div>
  );
}

export default Escolha;
