import React from 'react'
import img1Main from '../../assets/img1Main.png'
import img2Main from '../../assets/img2Main.png'
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx'
import './Section.css'

const Section = () => {
  return (
  <div className='flex justify-center' style={{width: '100vw'}}>
    <div className='section flex flex-col gap-3' style={{width: '70rem'}}>
      <div className='padding flex items-center gap-11' style={{
        width: '100%',
        boxShadow: '143px 403px 120px 0px rgba(0, 0, 0, 0.00), 91px 258px 109px 0px rgba(0, 0, 0, 0.01), 51px 145px 92px 0px rgba(0, 0, 0, 0.05), 23px 64px 68px 0px rgba(0, 0, 0, 0.09), 6px 16px 38px 0px rgba(0, 0, 0, 0.10)',
         borderRadius: '1.5625rem 1.5625rem 0rem 0rem',
            background: 'var(--grey-background, #F8FAFC)'
     }}>
        <img className='imgMain' src={img1Main} alt="" style={{width: '29rem'}}/>
        <div className='flex flex-col gap-2'>
            <h1 className='titu' style={{fontFamily: 'Lexend', fontSize: '1.80rem', fontWeight: '700', width: '35rem'}}>Encontre os melhores talentos para sua Empresa</h1>

            <p className='subu' style={{fontFamily: 'Lexend', fontSize: '1rem', fontWeight: '300', color: 'var(--blackclear, #202020)', width: '35rem'}}>
                Conecte-se com os melhores talentos ao redor do mundo em minutos. Simplifique seu processo de recrutamento e encontre o ajuste perfeito para sua
             equipe. Junte-se a empresas líderes e leve seu negócio ao próximo nível conosco.</p>
             <div className='btn flex justify-center items-center' style={{width: '160px', height: '50px', borderRadius: '1rem', background: 'var(--primary-500, #3B82F6)'}}>
             <BtnPrincipal texto="Anuncie Agora" color="#fff"/>
            </div>
         </div>
      </div>
      <div className='padding flex items-center gap-11' style={{
        width: '100%',
        boxShadow: '143px 403px 120px 0px rgba(0, 0, 0, 0.00), 91px 258px 109px 0px rgba(0, 0, 0, 0.01), 51px 145px 92px 0px rgba(0, 0, 0, 0.05), 23px 64px 68px 0px rgba(0, 0, 0, 0.09), 6px 16px 38px 0px rgba(0, 0, 0, 0.10)',
        borderRadius: '0rem 0rem 1.5625rem 1.5625rem',
        background: 'var(--grey-background, #3B82F6)'
      }}>
         <div className='flex flex-col gap-2 pl-8'>
            <h1 className='titu' style={{fontFamily: 'Lexend', fontSize: '1.80em', fontWeight: '700', color: '#fff'}}>Dê o Próximo Passo em Sua Carreira</h1>
            <p className='subu' style={{fontFamily: 'Lexend', fontSize: '1rem', fontWeight: '300', color: 'var(--blackclear, #fff)', width: '35rem'}}>Conecte-se com os melhores talentos ao redor do mundo em minutos. Simplifique seu processo de recrutamento e encontre o ajuste perfeito para sua
             equipe. Junte-se a empresas líderes e leve seu negócio ao próximo nível conosco.</p>
             <div className='btn flex justify-center items-center' style={{width: '160px', height: '50px', borderRadius: '1rem', background: 'var(--primary-500, #fff)'}}>
                <a href="" style={{fontFamily: 'Lexend', color: '#3B82F6', fontSize: '1rem'}} 
                className="">Buscar Agora
                </a>
            </div>
         </div>
         
        <img className='imgMain' src={img2Main} alt="" style={{maxWidth: '30.5rem'}} />
      </div>
    </div>
    </div>
  )
}

export default Section
