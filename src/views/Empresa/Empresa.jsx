import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import imgEmpresa from '../../assets/imgEmpresa.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal'
import './Empresa.css';
import Input from '../../components/Form/input';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import Swal from 'sweetalert2';


const Empresa = () => {

  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ramo_atividade, setRamo_atividade] = useState('');
  const navigate = useNavigate();
  const [areasDeAtuacao, setAreasDeAtuacao] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    const fetchAreasDeAtuacao = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v2/cnae/secoes');
        setAreasDeAtuacao(response.data);
      } catch (error) {
        console.error('Erro ao buscar áreas de atuação:', error);
      }
    };

    fetchAreasDeAtuacao();
  }, []);

  
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
      const dados = {
        email,
        password: senha,
        cnpj,
        ramo_atividade: selectedArea,
        nome,
        localizacao,
      };
  
      console.log(dados);
  
      try {
        const response = await axiosInstance.post('/empresa/register', dados);
        const { token } = response.data;
        setAuthToken(token);
  
        localStorage.setItem('authToken', token);
  
        navigate('/EmpresaPasso');    
  
        setTimeout(() => {
          window.location.reload();
        }, 600); 
  
      } catch (error) {
        // Verifique se o erro tem status 400 (email já registrado)
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Este e-mail já está registrado!',
          });
        } else {
          console.error('Erro ao enviar os dados:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro inesperado!',
          });
        }
      }
    } else {
      form.reportValidity();
    }
  };
  



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
        <div className='containerEmpresaInicial flex flex-col justify-center items-center' style={{ height: '100vh', gap: '30px', padding: '20px' }}>
  
          <div className="conteudo flex justify-between" style={{ width: 'max-content', height: 'auto', borderRadius: '1.25rem' }}>
            <div className='form-empresa flex flex-col' style={{ height: 'max-content' }}>
              <Link to="/Escolha"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>
              <div className='flex flex-col gap-3'>
                <h1 className='EscTit self-center'>Olá seja Bem-vindo!</h1>
                <p className='EscPar2 flex self-center'>Cadastre-se para encontrar os melhores talentos.</p>
              </div>
              <form className='formTalento flex flex-col gap-3 in' style={{ padding: '3rem', marginTop: '-40px' }} onSubmit={HandleSave} id="inputEmpresa">
                
                  <Input name='nome' placeholder='Nome da Empresa' type='text' className='s' value={nome} onChange={(e) => {setNome(e.target.value)}} id="inputEmpresa"/>
                  
                  <Input name='email' placeholder='Email Comercial' type='email' className='s' value={email} onChange={(e) => {setEmail(e.target.value)}} id="inputEmpresa"/>

                  <Input name='localizacao' placeholder='Localização da Sede' type='text' className='s' value={localizacao} onChange={(e) => {setLocalizacao(e.target.value)}} id="inputEmpresa"/>


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
                          id="inputEmpresa"
                      />
                    )}
                  </InputMask>


                  <div className="select-wrapper">
                  <select
  id="areaDeAtuacao"
  style={{ width: '100%', color: '#000' }}
  value={selectedArea}
  onChange={(e) => setSelectedArea(e.target.value)}
>
  <option value="" hidden>  </option>
  {areasDeAtuacao.map((area) => (
    <option
      key={area.id}
      value={area.id}
      style={{
        color: selectedArea === area.id ? 'red' : 'red', 
      }}
    >
      {area.descricao}
    </option>
  ))}
</select>


<IoIosArrowDown className="select-icon2" />

    </div>


             
                

                <div className="senha">
                  <Input
                    id="inputEmpresa"
                    name='senha'
                    placeholder='Senha'
                    type={passwordVisible2 ? 'text' : 'password'}
                    className='inputEye1'
                    value={senha}
                    onChange={(e) => {setSenha(e.target.value)}}
                  />
              
                  {passwordVisible2 ? (
                    <IoEyeOffSharp className='EyeEmp' onClick={togglePasswordVisibility2} />
                  ) : (
                    <IoEyeSharp className='EyeEmp' onClick={togglePasswordVisibility2} />
                  )}
                </div>
                  
                <BtnPrincipal type='submit' texto='Criar Conta' width='100%' back='#3B82F6' color='#fff' hover='#3A61D4' borderRadius='15px' font='Lexend' height='40px'/>

                
              </form>

        
            </div>
            <img className='imgTalento' src={imgEmpresa} alt="Login Visual" style={{ maxWidth: '35rem', height: '40rem', transform: 'translateX(40px)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Empresa
