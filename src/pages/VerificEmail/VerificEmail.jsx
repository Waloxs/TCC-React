import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VerificEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    const verificarEmail = async () => {
      try {
        const response = await fetch('https://workzen.onrender.com/v1/mail/verify', {
          method: 'POST',
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

