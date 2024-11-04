import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { HiOutlineMailOpen } from "react-icons/hi";
import './Password.css';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import { MdMarkEmailRead } from "react-icons/md";
import Footer from '../../components/Footer/Footer';
import { axiosInstance } from '../../utils/api.js';


const Password = () => {
  const [modal, setModal] = useState(true);
  const [modal2, setModal2] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleModal = async () => {
    if (!email) {
      setError('Por favor, insira um endereço de email.');
      return;
    }
  
    setLoading(true);
    setError('');
    setMessage('');
  
    try {
      const response = await axiosInstance.post('/mail/send/reset', {
        email
      });
  
      setMessage('Email de redefinição de senha enviado com sucesso!');
      setModal(false);
      setModal2(true);
    } catch (error) {
      setError('Erro ao enviar o email de redefinição de senha.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='scr'>
      <Navbar link={false} criConta={false}/>

      {modal && (
        <div className='flex justify-center items-center' style={{height: '100%'}}>
          <div className='flex flex-col items-center justify-center br'>
            <HiOutlineMailOpen style={{fontSize: '12rem'}}/>

            <div>
              <div className='flex flex-col items-center'>
                <h1 className='titSenha'>Atualize sua Senha</h1>
                <h1 className='subSenha'>Insira seu endereço de Email e clique em <span className='env'>Enviar Email</span></h1>
              </div>

              <div style={{marginTop: '20px'}}>
                <h1 className='subSenha'>Email</h1>
                <input type="Email" value={email} onChange={handleEmailChange} />
              </div>

              <div style={{marginTop: '20px'}} className='flex items-center justify-end gap-6'>
                <h1 style={{color: '#1D4ED8'}} className='cancel'>Cancelar</h1>
                <BtnPrincipal texto={loading ? 'Enviando...' : 'Enviar Email'} color="#fff" width="200px" back="#3B82F6" hover='#3A61D4' click={handleModal}/>
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {message && <p style={{ color: 'green' }}>{message}</p>}
            </div>
          </div>
        </div>
      )}

      {modal2 && (
        <div className='flex justify-center items-center' style={{height: '100%'}}>
          <div className='flex flex-col items-center justify-center br' style={{ margin: '0 auto'}}>
            <MdMarkEmailRead style={{fontSize: '12rem'}}/>

            <div>
              <div className='flex flex-col items-center'>
                <h1 className='titSenha'>Email enviado!</h1>
              </div>

              <div style={{marginTop: '20px'}}>
                <h1 className='subSenha2'>Nós enviamos um email para você, Siga os passos fornecidos para atualizar sua senha ou clique em Entrar se você não deseja mudar sua senha agora.</h1>
              </div>

              <div style={{marginTop: '40px'}} className='flex items-center justify-end'>
                <BtnPrincipal texto="Entrar" color="#fff" width="200px" back="#3B82F6" hover='#3A61D4'/>
              </div>
            </div>
          </div>
        </div>
      )}

     
      <Footer/>
    </div>
  );
}

export default Password;
