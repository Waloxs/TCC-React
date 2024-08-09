import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png';
import imgEmpresa from '../../assets/imgEmpresa.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal'
import './Empresa.css';
import Input from '../../components/Form/input';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';

const Empresa = () => {

  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ramo_atividade, setRamo_atividade] = useState('');
  const navigate = useNavigate();

  
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = imgEmpresa;
    
    const timeout = setTimeout(() => {
      setShowLoader(false); 
      image.onload = () => {
        setIsImageLoaded(!isImageLoaded); 
      };
    }, 2000);

    return () => clearTimeout(timeout); 
  }, [isImageLoaded]);

  const HandleSave = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');

    if (form.checkValidity()) {
      let dados = {
        email: email,
        password: senha,
        cnpj: cnpj,
        ramo_atividade: ramo_atividade,
        nome: nome
      };

      try {
        const response = await axios.post('https://workzen.onrender.com/v1/empresa/register', dados);

        const { token } = response.data;
        localStorage.setItem('authToken', token);
        navigate('/EmpresaPasso');
        
      }

      
      catch (error) {
        console.error('Erro ao enviar os dados:', error);
    } 
  }
  else {
    form.reportValidity();
  }
}
  if (showLoader) {
    return (
      <div className='flex justify-center items-center' style={{background: '#fff', height: '100vh'}}>
        <div className="loader-container">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#0866FF"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      </div>
    );
  }

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
              <form className='formTalento flex flex-col gap-3' style={{ padding: '3rem', marginTop: '-40px' }} onSubmit={HandleSave}>
                
                  <Input name='nome' placeholder='Nome da Empresa' type='text' className='s' value={nome} onChange={(e) => {setNome(e.target.value)}} />
                  
                  <Input name='email' placeholder='Email Comercial' type='email' className='s' value={email} onChange={(e) => {setEmail(e.target.value)}} />

                  <InputMask
                    mask="99.999.999/9999-99"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                          name="cnpj"
                          placeholder="CNPJ"
                          type="text"
                          className="s"
                      />
                    )}
                  </InputMask>


<div className="select-wrapper">
                  <select id="areaDeAtuacao" style={{width: '100%'}} value={ramo_atividade} onChange={(e) => {setRamo_atividade(e.target.value)}}>
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
                    value={senha}
                    onChange={(e) => {setSenha(e.target.value)}}
                  />
              
                  {passwordVisible2 ? (
                    <IoEyeOffSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  ) : (
                    <IoEyeSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  )}
                </div>
      
               <BtnPrincipal type='submit' texto='Criar Conta' width='100%' back='#0866FF' color='#fff' hover='#3A61D4'/>
                
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
