import React, { useState, useEffect } from 'react';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import axios from 'axios';
import Input from '../Form/input.jsx';
import { Select } from "antd";
import ApplicantsList from '../ApplicantsList/ApplicantList.jsx';
import { useForm } from 'react-hook-form';
import CurrencyInput from '../CurrencyInput/CurrencyInput.jsx';
import './UserVagasEmpresa.css'
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import lixo from '../../../public/icons/icon-block.svg';
import lixoBranco from '../../../public/icons/iconWhite-block.svg';


const { Option } = Select;

const UserVagasEmpresa = () => {  
  const { data: userDataEmpresa, loading, error } = useUserEmpresa();
  const { data: initialVagas, loading2, error2 } = useUserVagasEmpresa();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [error3, setError] = useState(null);
  const [userDataVagasEmpresa, setUserDataVagasEmpresa] = useState(initialVagas);
  const [desc, setDesc] = useState('');
  const [local, setLocal] = useState('');
  const [requisits, setRequisits] = useState('');
  const [salar, setSalar] = useState('');
  const [tit, setTit] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [border3, setBorder3] = useState('#E2E8F0');
  const [showApplicants, setShowApplicants] = useState(false);
  const [jobId, setJobId] = useState('');
  const { handleSubmit, setValue, watch } = useForm();


  const handleShowApplicants = (index) => {
    const selectedJobId = userDataVagasEmpresa[index]._id; 
    setJobId(selectedJobId); 
    setShowApplicants(true); 
  };
  

  useEffect(() => {
    setUserDataVagasEmpresa(initialVagas);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      const vaga = userDataVagasEmpresa[selectedIndex];
    
      setTit(vaga.title);
      setDesc(vaga.description);
      setLocal(vaga.localizacao);
      setSalar(vaga.salario);
  
      // Verifique se as tags estão presentes e mapeie
      const updatedTags = vaga.tags?.length ? vaga.tags.map(tag => ({ value: tag, label: tag })) : [];
      setSelectedOptions(updatedTags);
    }
  }, [selectedIndex, userDataVagasEmpresa]);
  
  

  if (loading2) return <div><p>Loading...</p></div>;
  if (error2) return <p>Error: {error2.message}</p>;

  if (loading) return <div><p>Loading...</p></div>;
  if (error) return <p>Error: {error.message}</p>;

  const apagaVaga = (index) => {
    setSelectedIndex(index);
    setModal(true);
  };

  const editaVaga = (index) => {
    setSelectedIndex(index); 
    setModal2(true);
  };

  const cancelaVaga = () => {
    setModal(false);
    setModal2(false);
    setSelectedIndex(null);
  };

  const excluirVaga = async () => {
    const id = userDataVagasEmpresa[selectedIndex]._id;
  
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    try {
      const response = await axiosInstance.delete(`/jobs/delete/${id}`, config);
      console.log('Requisição bem-sucedida:', response);

      setUserDataVagasEmpresa(userDataVagasEmpresa.filter((_, i) => i !== selectedIndex));
        
    } catch (error) {
      console.error('Erro na exclusão:', error);
      setError(error);
    } finally {
      cancelaVaga();
      console.log('Finalizando a operação de exclusão');
    }
  };


  const salvarEdicao = async (data) => {

  console.log('Valor de salario antes de salvar:', salar);
  
    const id = userDataVagasEmpresa[selectedIndex]._id;
  
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    console.log('Valor de selectedOptions:', selectedOptions);
  
    // Validar e limpar selectedOptions
    if (!Array.isArray(selectedOptions)) {
      console.error('selectedOptions não é um array', selectedOptions);
      return;
    }
  
    // Verificar se é um array de objetos ou um array de strings
    const isArrayOfObjects = selectedOptions.every(option => typeof option === 'object' && option.hasOwnProperty('value'));
    const isArrayOfStrings = selectedOptions.every(option => typeof option === 'string');
  
    if (!isArrayOfObjects && !isArrayOfStrings) {
      console.error('selectedOptions não está no formato esperado', selectedOptions);
      return;
    }
  
    // Converter para o formato necessário
    const validSelectedOptions = isArrayOfObjects
      ? selectedOptions.filter(option => option && option.value).map(option => option.value)
      : selectedOptions.filter(option => option).map(option => option);
  
    const dados = {
      description: desc,
      localizacao: local,
      tags: validSelectedOptions,
      salario: data.salary || salar ,
      title: tit,
    };
  
    console.log('Dados enviados para atualização:', dados);
  
    try {
      const response = await axiosInstance.put(`/jobs/update/${id}`, dados, config);
      console.log('Resposta da API:', response.data);
  
      const updatedVaga = response.data.job;
      console.log('Vaga atualizada:', updatedVaga);
  
      const updatedVagas = [...userDataVagasEmpresa];
      updatedVagas[selectedIndex] = updatedVaga;
      console.log('Vagas atualizadas:', updatedVagas);
      setUserDataVagasEmpresa(updatedVagas);
  
      const updatedTags = updatedVaga.tags.length ? updatedVaga.tags : [];
      setSelectedOptions(updatedTags.map(tag => ({ value: tag, label: tag })));
  
      console.log('Dados da vaga atualizados:', response.data);

      setModal2(false);
    } catch (error) {
      console.error('Erro na edição:', error);
      setError(error);
    }
  };
  
  
 
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
    setRequisits(selected.map((option) => option.value));
  };

  const formatCurrencyValue = (value) => {
    if (!value) return "R$ 0,00";
  
    // Remove caracteres não numéricos e converte para número
    let numericValue = typeof value === 'number' 
      ? value.toFixed(2) 
      : value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    
    // Aumenta a escala em 100x
    numericValue = (parseInt(numericValue, 10) * 1).toFixed(2);
  
    const [integerPart, decimalPart] = numericValue.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    return `R$ ${formattedIntegerPart},${decimalPart}`;
  };
  
  
  
  return (
    <div className='container-central'>
      {modal && (
        <div>
          <div
            className='modal-overlay'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9,
            }}
            onClick={cancelaVaga}
          ></div>

          <div className='modalExcluir flex flex-col text-center'>
            <span>Deseja excluir vaga?</span>
            <div className='buttons flex self-center gap-5' style={{ marginTop: '30px' }}>
              <button className="flex items-center justify-center gap-2 cancelar-botao" onClick={cancelaVaga}>
                  Cancelar
              </button>
              <button className="flex items-center justify-center gap-2 deletar-botao" onClick={excluirVaga}>
                  Deletar Vaga
                  <img src={lixo} alt="" />
                  <img src={lixoBranco} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
 {showApplicants && (
  <ApplicantsList jobId={jobId} onClose={() => setShowApplicants(false)} />
 )}

{modal2 && (
        <div>
          <div
            className='modal-overlay'
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9,
            }}
            onClick={cancelaVaga}
          ></div>

          <div className='modalEditar flex flex-col'>
            <div className='flex gap-2'>
              <span className='titEdit'>Editar Vaga</span>
              <img src="icons/icon-pen.svg" alt="" style={{width: '20px'}}/>
            </div>
            <div className='flex flex-col justify-between' style={{ marginTop: '30px', width: '100%', height: '100%'}}>
              <div>
                <span>Título</span>
                <Input type='text' required value={tit} onChange={(e) => setTit(e.target.value)}/>
              </div>

              <div>
                <span>Localização</span>
                <Input type='text' required value={local} onChange={(e) => setLocal(e.target.value)}/>
              </div>

              <div className='flex flex-col'>
                <span>Descrição</span>
                <textarea
                  className='txAreaEm'
                  id="area2"
                  style={{ height: '200px', width: '100%',  resize: 'none', borderRadius: '10px' }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div>
                <span>Habilidades</span>
               
                <div
  style={{
    maxWidth: '100%',
    height: "max-content",
    overflowX: "auto",
    display: "flex",
    alignItems: "center",
    scrollSnapType: "x mandatory",
    borderRadius: '10px', 
    outline: 'none',
    border: `1px solid ${border3}`
  }}

  className="cx-sel"
>
  <Select
    mode="multiple"
    options={options}
    value={selectedOptions}
    onChange={handleChange}
    placeholder="Selecione as opções..."
    style={{ minHeight: "40px", flex: 1 , maxWidth: 'auto'}}
    dropdownStyle={{ maxHeight: 200, overflow: 'hidden' }}
    suffixIcon={null}
    tagRender={(props) => {
      const { label, closable, onClose } = props;

      return (
        <div
          style={{
            display: 'inline',
            whiteSpace: 'nowrap',
            marginRight: '8px',
            overflow: 'hidden',
            maxWidth: '100px'
          }}
        >
          <span className="tagSelect" style={{background: '#F1F5F9', borderRadius: '10px', padding: '3px 15px'}}>{label}</span>
          {closable && (
            <span onClick={onClose} style={{ cursor: 'pointer', marginLeft: '4px' }}>
              
            </span>
          )}
        </div>
      );
    }}
  />
</div>
              </div>

              <div>
  <span>Salário</span>
  <CurrencyInput
  value={formatCurrencyValue(watch('salary'))} // Exibe o valor escalado e formatado
  onChange={(formattedValue) => {
    // Remove formatação e converte para valor bruto
    const rawValue = formattedValue.replace(/[^\d]/g, ''); // Apenas números
    const scaledValue = parseInt(rawValue, 1) * 10; // Multiplica por 100
    setValue('salary', scaledValue); // Armazena o valor escalado
  }}
/>




</div>

            </div>

            <div className='flex gap-4 self-end' style={{marginTop: '50px'}}>
              <button className="flex items-center justify-center gap-2 cancelar-botao2" onClick={cancelaVaga}>
                  Cancelar
              </button>

              <button className="flex items-center justify-center gap-2 cancelar-botao" onClick={salvarEdicao}>
                  Salvar
              </button>
            </div>
          </div>
     
        </div>
      )}

<div className='flex flex-col gap-12'>
        {userDataVagasEmpresa.map((item, index) => (
          <div className='flex flex-col container-vagas' style={{ width: '100%' }} key={item._id}>
            <div>
              <span className='span-title'>{item.title}</span>
            </div>
            <div>
              <span className='span-localiza'>{item.localizacao}</span>
            </div>
            <div className='flex flex-col' style={{ marginTop: '20px', marginBottom: '20px' }}>
              <span className='span-empresa'>{userDataEmpresa.nome}</span>
              <span className='span-description'>{item.description}</span>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <span className='span-description' style={{ fontWeight: '400' }}>
              {formatCurrencyValue(item.salario)}</span>
            </div>
            <div className='flex justify-between caixa-tags' style={{ width: '100%' }}>
              <div className='flex gap-3'>
                {item.tags.map((tag, index) => (
                  <span className='span-tag' key={index}>{tag}</span>
                ))}
              </div>

              <div className='icons flex gap-4'>
                <img src='icons/icon-lixo.svg' alt='Minha Imagem' onClick={() => apagaVaga(index)} />
                <img src='icons/icon-pen.svg' alt='Minha Imagem' onClick={() => editaVaga(index)} />
                <img src='icons/icon-pessoa.svg' alt='Minha Imagem' onClick={() => handleShowApplicants(index)}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserVagasEmpresa;
