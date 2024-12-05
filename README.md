
---

# Workzen Frontend

Este é o repositório do front-end da aplicação **Workzen**, uma plataforma que conecta profissionais a oportunidades de emprego e empresas a talentos qualificados. Este projeto é desenvolvido utilizando **React**, **Vite**, e **Tailwind CSS** para a estilização. O aplicativo consome uma API externa para fornecer suas funcionalidades.

## Sumário

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) (para requisições HTTP)

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

Siga as etapas abaixo para configurar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/Waloxs/TCC-React
   cd workzen-frontend
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

   ou, se estiver usando Yarn:

   ```bash
   yarn
   ```

## Configuração

### Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias para a aplicação. Por exemplo:

```env
VITE_API_URL=https://sua-api-external.com
```

As variáveis de ambiente permitirão que a aplicação se conecte à API externa.

### Tailwind CSS

Tailwind CSS já está configurado no projeto. Se desejar personalizar, modifique o arquivo `tailwind.config.js`.

## Uso

Para iniciar a aplicação em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

ou, se estiver usando Yarn:

```bash
yarn dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173) ou na porta configurada em seu ambiente.

## Scripts Disponíveis

Aqui estão os principais scripts que você pode executar no projeto:

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Compila a aplicação para produção.
- `serve`: Serve a aplicação construída na pasta `dist`.
- `lint`: Executa a análise de linting nos arquivos do projeto.
- `format`: Formata o código com o Prettier.

### Exemplo de Comandos

```bash
# Rodar o servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Analisar linting
npm run lint

# Formatar código
npm run format
```

## Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
workzen-frontend/
|-- public/              # Arquivos públicos
|-- src/                 # Código-fonte da aplicação
|   |-- assets/          # Componentes reutilizáveis
|   |-- Axios/           # Páginas da aplicação
|   |-- components/      # Arquivos de estilo
|   |-- pages/           # Utilitários e funções auxiliares
|   `-- main.jsx         # Ponto de entrada
|-- .env.example         # Exemplo de arquivo de variáveis de ambiente
|-- tailwind.config.js   # Configuração do Tailwind CSS
|-- vite.config.js       # Configuração do Vite
|-- package.json         # Configurações do npm e dependências
`-- README.md            # Documentação do projeto
```

## Consumo da API

A aplicação utiliza **Axios** para fazer requisições à API externa. As configurações básicas do Axios podem ser encontradas no arquivo de configuração localizado em `src/Axios`. 

### Exemplo de Requisição

Aqui está um exemplo de como realizar uma requisição GET para obter dados de vagas de emprego:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
  }
};

fetchJobs();
```

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça commit de suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Envie para o repositório remoto (`git push origin minha-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

