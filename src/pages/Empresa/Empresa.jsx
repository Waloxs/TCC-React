import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png';
import imgEmpresa from '../../assets/imgEmpresa.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal'
import './Empresa.css';
import Input from '../../components/Form/input';// assuming Input component is properly implemented
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { RiArrowDropDownLine } from "react-icons/ri";

const Empresa = () => {

  const [passwordVisible2, setPasswordVisible2] = useState(false);

  
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };


  return (
    <div>
            <div className='tudo flex justify-center' style={{ width: '100vw' }}>
        <div className='container flex flex-col justify-center items-center' style={{ maxWidth: '70rem', background: '#fff', height: '100vh', gap: '30px', marginTop: '10px', padding: '20px' }}>
          <div className="containerLogo" style={{ width: '100%' }}>
            <Link to="/" style={{ width: '100%' }}>
              <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
            </Link>
          </div>
          <div className="conteudo flex justify-between" style={{ width: '100%', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
            <div className='ui flex flex-col' style={{ height: '35rem', width: '46rem' }}>
              <Link to="/Escolha"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>
              <div className='flex flex-col gap-3' style={{ marginTop: '-20px', padding: '2rem' }}>
                <h1 className='EscTit self-center'>Olá seja Bem-vindo!</h1>
                <p className='EscPar2 flex self-center'>Cadastre-se para encontrar os melhores talentos.</p>
              </div>
              <form className='formTalento flex flex-col gap-3' style={{ padding: '3rem', marginTop: '-40px' }}>
                
                  <Input name='nome' placeholder='Nome da Empresa' type='text' className='s'/>
                  
                  <Input name='email' placeholder='Email Comercial' type='email' className='s' />

                  <Input name='cnpj' placeholder='CNPJ' type='email' className='s' />


<div className="select-wrapper">
                  <select id="areaDeAtuacao" style={{width: '100%'}}>
  <option value="" hidden>Área de Atuação</option>
  <option value="Administracao">Administração</option>
  <option value="Agricultura">Agricultura</option>
  <option value="AlimentosEBebidas">Alimentos e Bebidas</option>
  <option value="Automobilistica">Automobilística</option>
  <option value="ConstrucaoCivil">Construção Civil</option>
  <option value="Consultoria">Consultoria</option>
  <option value="Educacao">Educação</option>
  <option value="Energia">Energia</option>
  <option value="Financeiro">Financeiro</option>
  <option value="Industria">Indústria</option>
  <option value="Logistica">Logística</option>
  <option value="MarketingEPublicidade">Marketing e Publicidade</option>
  <option value="Saude">Saúde</option>
  <option value="TecnologiaDaInformacao">Tecnologia da Informação</option>
  <option value="Telecomunicacoes">Telecomunicações</option>
  <option value="Varejo">Varejo</option>
</select>

<RiArrowDropDownLine className="select-icon" />

</div>
             
                

                <div className="senha">
                  <Input
                    name='senha'
                    placeholder='Senha'
                    type={passwordVisible2 ? 'text' : 'password'}
                    className='inputEye1'
                  />
              
                  {passwordVisible2 ? (
                    <IoEyeOffSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  ) : (
                    <IoEyeSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  )}
                </div>
      
                <Link to='/TalentoPasso1'><BtnPrincipal type='submit' texto='Criar Conta' width='100%' back='#0866FF' color='#fff' hover='#3A61D4'/></Link>
                
                <div className="line2 flex self-center"></div>
              </form>
              <h3 className='cont3 flex self-center'>Ou continuar com</h3>

              <div className='flex justify-center'>
              <div className="top mid flex justify-center gap-2 items-center" style={{ maxWidth: '85%' }}>
              <FcGoogle style={{ width: '20px', height: '20px' }} />
              <h2 className='gog'>Google</h2>
               </div>
               </div>
            </div>
            <img className='imgTalento' src={imgEmpresa} alt="Login Visual" style={{ maxWidth: '35rem', height: '40rem' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Empresa
