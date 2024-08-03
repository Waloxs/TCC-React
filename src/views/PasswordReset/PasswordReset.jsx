import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../components/Form/input'; 
import BtnPrincipal from '../../components/Buttons/BtnPrincipal'; 
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';

const PasswordReset = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePassword2 = () => {
    setPassword2Visible(!password2Visible);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('https://workzen.onrender.com/v1/mail/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Erro ao redefinir a senha.');
      }

      setMessage('Senha redefinida com sucesso!');
    } catch (error) {
      setError('Erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center' style={{ height: '100vh' }}>
      <div className='flex flex-col items-center justify-center br'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center'>
            <h1 className='titSenha'>Atualizar Senha</h1>
          </div>

          <div className='cpSenha' style={{ marginTop: '20px' }}>
            <h1 className='subSenha2'>Nova Senha</h1>
            <Input
              name='senha'
              placeholder='Senha'
              type={passwordVisible ? 'text' : 'password'}
              value={newPassword}
              onChange={handlePasswordChange}
            />
            {passwordVisible ? (
              <IoEyeOffSharp className='Eye' onClick={togglePassword} />
            ) : (
              <IoEyeSharp className='Eye' onClick={togglePassword} />
            )}
          </div>

          <div className='cpSenha' style={{ marginTop: '20px' }}>
            <h1 className='subSenha2'>Confirmar Senha</h1>
            <Input
              name='confirmarSenha'
              placeholder='Confirmar Senha'
              type={password2Visible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              width="100%"
            />
            {password2Visible ? (
              <IoEyeOffSharp className='Eye' onClick={togglePassword2} />
            ) : (
              <IoEyeSharp className='Eye' onClick={togglePassword2} />
            )}
          </div>

          <div style={{ marginTop: '40px' }} className='flex items-center justify-center'>
            <BtnPrincipal
              texto={loading ? 'Redefinindo...' : 'Atualizar Senha'}
              color="#fff"
              width="200px"
              back="#3B82F6"
              hover='#3A61D4'
              type='submit'
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
