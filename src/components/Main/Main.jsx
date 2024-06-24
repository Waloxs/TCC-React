import React from 'react'
import ImageSection from '../../assets/ImageSection.png'
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx'
import { Link } from 'react-router-dom';

import './Main.css'

const Main = () => {
  return (
    <div className="main max-w-[80rem] grid grid-cols-2 gap-4 items-center justify-center mx-auto mt-8">
      <div className="titSub flex flex-col items-start gap-4 w-full">
        <h1 className="titulo font-lexend text-7xl font-bold max-w-2xl">Seja bem-vindo <br /> ao Workzen!</h1>
        <p className="parag font-lexend font-normal text-black max-w-lg">
          Aqui nós estamos comprometidos em <span className="text-primary-700">conectar talentos</span> e 
          <span className="text-primary-700"> oportunidades de carreira!</span>
        </p>
       <Link to="/Escolha"><BtnPrincipal texto="Começar" color="#fff" width="160px" back="#3B82F6"/></Link> 
      </div>
      
      <div className="flex w-full justify-center">
        <img
          src={ImageSection}
          alt="Workzen"
          className="image max-w-[520px] filter drop-shadow-[10px_11px_33px_rgba(0,0,0,0.15)] drop-shadow-[40px_43px_59px_rgba(0,0,0,0.13)] drop-shadow-[91px_98px_80px_rgba(0,0,0,0.08)] drop-shadow-[162px_174px_95px_rgba(0,0,0,0.02)] drop-shadow-[253px_272px_104px_rgba(0,0,0,0)]"
        />
      </div>
    </div>
  )
}

export default Main
