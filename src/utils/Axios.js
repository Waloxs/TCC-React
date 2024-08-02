// Importe o axios e configure a baseURL globalmente
import axios from 'axios';

// Crie uma instância do axios com a baseURL definida
const instance = axios.create({
  baseURL: 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json',
    // Aqui você pode adicionar outros cabeçalhos comuns, se necessário
  }
});

// Função para configurar o token JWT
const setAuthToken = (token) => {
  if (token) {
    // Aplica o token JWT ao cabeçalho de autorização para todas as requisições
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove o cabeçalho de autorização caso não haja token (logout, por exemplo)
    delete instance.defaults.headers.common['Authorization'];
  }
};

export { instance as axiosInstance, setAuthToken };