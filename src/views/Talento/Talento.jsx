import { useState, useEffect } from 'react';
import axios from 'axios';
import imgTalento from '../../assets/imgTalento.png';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import './Talento.css';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Form/input';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { ThreeDots } from 'react-loader-spinner';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import Swal from 'sweetalert2';



const Talento = () => {
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    if (form.checkValidity()) {
      let dados = {
        firstName: nome,
        lastName: sobrenome,
        email,
        password: senha
      };
  
      try {
        const response = await axiosInstance.post('/user/register', dados);
        console.log(response.data);
  
        if (response.status === 201) {
          const { token } = response.data;
          setAuthToken(token);
          localStorage.setItem('authToken', token);
  
          try {
            const emailResponse = await axiosInstance.post('/mail/send/verify', { email });
            console.log('Email de verificação enviado:', emailResponse.data);
  
            Swal.fire({
              title: 'Conta criada com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              navigate("/TalentoPasso1"); // Redireciona após confirmar o SweetAlert
            });
          } catch (emailError) {
            console.error('Erro ao enviar o email de verificação:', emailError);
          }
        }
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        if (error.response && error.response.status === 400) {
          Swal.fire({
            title: 'Erro',
            text: 'O email já está cadastrado!',
            icon: 'error',
            confirmButtonText: 'Tentar novamente'
          });
        } else {
          Swal.fire({
            title: 'Erro',
            text: 'Algo deu errado. Tente novamente mais tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    } else {
      form.reportValidity();
    }
  };
  

  
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = imgTalento;
    
    const timeout = setTimeout(() => {
      setShowLoader(false); 
      image.onload = () => {
        setIsImageLoaded(!isImageLoaded); 
      };
    }, 2000);

    return () => clearTimeout(timeout); 
  }, [isImageLoaded]);


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
        <div className='containerTalento flex flex-col justify-center items-center' style={{ maxWidth: '70rem', background: '#fff', height: '100vh', gap: '30px', padding: '20px' }}>
          <div className="containerLogo" style={{ width: '100%' }}>
            <Link to="/" style={{ width: '100%' }}>
              <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
            </Link>
          </div>
          <div className="conteudo flex justify-between" style={{ width: '100%', height: 'auto', borderRadius: '1.25rem' }}>
            <div className='ui flex flex-col' style={{ height: '35rem' }}>
              <Link to="/Escolha"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>
              <div className='flex flex-col gap-3' style={{ marginTop: '-20px', padding: '2rem' }}>
                <h1 className='EscTit self-center'>Olá seja Bem-vindo!</h1>
                <p className='EscPar2 flex self-center'>Cadastre-se e encontre o trabalho ideal para você.</p>
              </div>
              <form className='formTalento flex flex-col gap-3' style={{ padding: '3rem', marginTop: '-40px' }} onSubmit={handleSave}>
                <div className='gri'>
                  <Input name='nome' placeholder='Nome' type='text' className='s' value={nome} onChange={(e) => setNome(e.target.value)} required/>
                  <Input name='sobrenome' placeholder='Sobrenome' type='text' className='s' value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required/>
                </div>
                <Input name='email' placeholder='Email' type='email' className='s' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <div className="senha">
                  <Input
                    name='senha'
                    placeholder='Senha'
                    type={passwordVisible2 ? 'text' : 'password'}
                    className='inputEye1'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  {passwordVisible2 ? (
                    <IoEyeOffSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  ) : (
                    <IoEyeSharp className='Eye2' onClick={togglePasswordVisibility2} />
                  )}
                </div>
                <BtnPrincipal type='submit' texto='Criar Conta' width='100%' back='#3B82F6' color='#fff' hover='#3A61D4' borderRadius='15px' font='Lexend' height='40px'/>

                <div className="line2 flex self-center"></div>
              </form>
              <span className='cont2 flex self-center'>Ou continuar com</span>
              <div className='flex justify-center items-center'>
                <a href='https://workzen.onrender.com/v1/auth/google' className="top mid flex justify-center gap-2" style={{ maxWidth: '85%' }}>
                  <FcGoogle style={{ width: '20px', height: '20px' }} />
                  <span className='gog'>Google</span>
                </a>
              </div>
            </div>
            <img className='imgTalento' src={imgTalento} alt="Login Visual" style={{ maxWidth: '100%', height: '35rem', transform: 'translateX(40px)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Talento;
