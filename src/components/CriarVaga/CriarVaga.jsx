import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import UserVagasEmpresa from '../UserVagasEmpresa/UserVagasEmpresa.jsx';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';
import Input from '../Form/input.jsx';
import Select from 'react-select';
import { useState } from 'react';
import axios from 'axios';

const CriarVaga = () => {
  const [profissional, setProfissional] = useState('');
  const [desc, setDesc] = useState('');
  const [salar, setSalar] = useState('');
  const [requisits, setRequisits] = useState('');
  const [local, setLocal] = useState('');
  const [tel, setTel] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);



  const options = [
    // Tecnologia
    { value: 'designer', label: 'Designer' },
    { value: 'front-end', label: 'Front-End' },
    { value: 'back-end', label: 'Back-End' },
    { value: 'full-stack', label: 'Full-Stack' },
    { value: 'ux-ui', label: 'UX/UI Designer' },
    { value: 'mobile', label: 'Desenvolvedor Mobile' },
    { value: 'devops', label: 'DevOps' },
    { value: 'qa', label: 'Quality Assurance (QA)' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'cyber-security', label: 'Cyber Security' },
    { value: 'cloud', label: 'Cloud Computing' },

    // Saúde
    { value: 'enfermeiro', label: 'Enfermeiro' },
    { value: 'medico', label: 'Médico' },
    { value: 'fisioterapeuta', label: 'Fisioterapeuta' },
    { value: 'nutricionista', label: 'Nutricionista' },
    { value: 'psicologo', label: 'Psicólogo' },
    { value: 'dentista', label: 'Dentista' },
    { value: 'farmaceutico', label: 'Farmacêutico' },
    { value: 'biomedico', label: 'Biomédico' },
    { value: 'veterinario', label: 'Veterinário' },

    // Educação
    { value: 'professor', label: 'Professor' },
    { value: 'coordenador-pedagogico', label: 'Coordenador Pedagógico' },
    { value: 'orientador-educacional', label: 'Orientador Educacional' },
    { value: 'diretor-escolar', label: 'Diretor Escolar' },
    { value: 'assistente-educacional', label: 'Assistente Educacional' },

    // Marketing e Comunicação
    { value: 'marketing', label: 'Marketing' },
    { value: 'publicidade', label: 'Publicidade' },
    { value: 'relações-públicas', label: 'Relações Públicas' },
    { value: 'jornalista', label: 'Jornalista' },
    { value: 'redator', label: 'Redator' },
    { value: 'social-media', label: 'Social Media Manager' },
    { value: 'seo', label: 'SEO Specialist' },
    { value: 'content-creator', label: 'Content Creator' },

    // Finanças e Administração
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'contabilista', label: 'Contabilista' },
    { value: 'auditor', label: 'Auditor' },
    { value: 'analista-financeiro', label: 'Analista Financeiro' },
    { value: 'gestor-de-recursos-humanos', label: 'Gestor de Recursos Humanos' },
    { value: 'administrador', label: 'Administrador' },
    { value: 'secretario', label: 'Secretário' },

    // Vendas e Atendimento ao Cliente
    { value: 'vendedor', label: 'Vendedor' },
    { value: 'representante-comercial', label: 'Representante Comercial' },
    { value: 'caixa', label: 'Operador de Caixa' },
    { value: 'gerente-de-loja', label: 'Gerente de Loja' },
    { value: 'atendente', label: 'Atendente' },

    // Engenharia e Construção
    { value: 'engenheiro-civil', label: 'Engenheiro Civil' },
    { value: 'engenheiro-eletrico', label: 'Engenheiro Elétrico' },
    { value: 'engenheiro-mecanico', label: 'Engenheiro Mecânico' },
    { value: 'arquiteto', label: 'Arquiteto' },
    { value: 'mestre-de-obras', label: 'Mestre de Obras' },
    { value: 'pedreiro', label: 'Pedreiro' },

    // Logística e Transporte
    { value: 'motorista', label: 'Motorista' },
    { value: 'entregador', label: 'Entregador' },
    { value: 'coordenador-de-logistica', label: 'Coordenador de Logística' },
    { value: 'operador-de-empilhadeira', label: 'Operador de Empilhadeira' },

    // Outros
    { value: 'advogado', label: 'Advogado' },
    { value: 'secretaria', label: 'Secretária' },
    { value: 'garcom', label: 'Garçom' },
    { value: 'cozinheiro', label: 'Cozinheiro' },
    { value: 'artista', label: 'Artista' },
    { value: 'fotografo', label: 'Fotógrafo' },
    { value: 'tradutor', label: 'Tradutor' },
    { value: 'bibliotecario', label: 'Bibliotecário' },
];


  const handleChange = (selected) => {
    setSelectedOptions(selected);
    setRequisits(selected.map(option => option.value));
  };

  const criarVaga = async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const data = {
          title: profissional,
          description: desc, // Corrigi de `descricao` para `desc`
          salario: salar,
          requirements: requisits,
          localizacao: local,
          tags: requisits,
        };

        const response = await axios.post('https://workzen.onrender.com/v1/jobs/create', data, config);

        console.log(response.data);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };

  return (
    <div className='formCriar flex flex-col'>
      <div className='flex flex-col justify-between' style={{ marginTop: '30px', width: '100%', height: '100%' }}>
        <div>
          <span>Título</span>
          <Input type='text' required value={profissional} onChange={(e) => setProfissional(e.target.value)} />
        </div>

        <div>
          <span>Localização</span>
          <Input type='text' required value={local} onChange={(e) => setLocal(e.target.value)} />
        </div>

        <div className='flex flex-col'>
          <span>Descrição</span>
          <textarea
            className='txAreaEmp'
            id="area2"
            style={{ height: '200px', width: '100%', resize: 'none', borderRadius: '10px' }}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>

        <div>
          <span>Habilidades</span>
          <Select
            isMulti
            className='lin'
            options={options}
            value={selectedOptions}
            onChange={handleChange}
          />
        </div>

        <div>
          <span>Salário</span>
          <Input type='text' value={salar} required onChange={(e) => setSalar(e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <BtnPrincipal
          texto="Salvar"
          back='#3B82F6'
          padding='10px'
          borderRadius='15px'
          color='#fff'
          font='Lexend'
          width='180px'
          click={criarVaga}
        />
      </div>
    </div>
  );
};

export default CriarVaga;
