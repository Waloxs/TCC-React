import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance, setAuthToken } from '../../utils/api';

const VerificEmail = () => {
  const { token } = useParams();
  setAuthToken(token);

  useEffect(() => {
    const verificarEmail = async () => {
      try {
        const response = await axiosInstance.post('https://workzen.onrender.com/v1/mail/verify', {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Erro na verificação de email');
        }

        const data = await response.json();
        console.log('Resposta da API:', data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    if (token) {
      verificarEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>Verificação de Email</h1>
      <p>Seu email foi verificado com sucesso!</p>
    </div>
  );
};

export default VerificEmail;

