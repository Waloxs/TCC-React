// CriarVaga.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './CriarVaga.css';
import { Select } from "antd";
import CurrencyInput from '../CurrencyInput/CurrencyInput.jsx'; // Importe o componente CurrencyInput
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import Input from '../Form/input.jsx';
import { useForm } from 'react-hook-form';

const { Option } = Select;

const CriarVaga = () => {
  const [profissional, setProfissional] = useState('');
  const [desc, setDesc] = useState('');
  const [requisits, setRequisits] = useState('');
  const [local, setLocal] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [border3, setBorder3] = useState('#E2E8F0');
  const [textoVaga, setTextoVaga] = useState('Publicar Vaga');
  const [imagemVaga, setImagemVaga] = useState(null);
  const [backVaga, setBackVaga] = useState('#3B82F6');
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit, setValue, watch } = useForm();

  const options = [
    { value: 'designer', label: 'Designer' },
    { value: 'design', label: 'Design' },
    { value: 'front-end', label: 'Front-End' },
    { value: 'back-end', label: 'Back-End' },
    { value: 'full-stack', label: 'Full-Stack' },
    { value: 'project-manager', label: 'Project Manager' },
    { value: 'qa', label: 'Quality Assurance (QA)' },
    { value: 'devops', label: 'DevOps' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' },
    { value: 'mobile-developer', label: 'Mobile Developer' },
    { value: 'cloud-engineer', label: 'Cloud Engineer' },
    { value: 'security-analyst', label: 'Security Analyst' },
];


  const handleChange = (selected) => {
    setSelectedOptions(selected);
    setRequisits(selected.map(option => option.value));
  };

  const validarCampos = () => {
    if (!profissional || !desc || !local || selectedOptions.length === 0) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const criarVaga = async (data) => {
    if (!validarCampos()) {
      return;
    }

    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const postData = {
          title: profissional,
          description: desc,
          salario: data.salary + "R$",
          tags: selectedOptions,
          localizacao: local,
          requirements: requisits,
        };

        const response = await axios.post('https://workzen.onrender.com/v1/jobs/create', postData, config);

        console.log(response.data);

        if (response.data) {
          setImagemVaga(<img src="icons/correct.svg" alt="" />);
          setTextoVaga(<span style={{ whiteSpace: 'nowrap' }}>Vaga publicada</span>);
          setBackVaga('#4ADA3D');
        }

      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };

  // Função para formatar o valor para o formato monetário

const formatCurrencyValue = (value) => {
  if (!value) return '0,00';

  // Remove qualquer caractere não numérico
  let numericValue = value.replace(/[^\d]/g, '');

  // Se o valor tiver menos de 3 dígitos, formate com duas casas decimais
  if (numericValue.length <= 2) {
    return `0,${numericValue.padStart(2, '0')}`;
  }

  // Se o valor tiver mais de 2 dígitos, separe a parte inteira da parte decimal
  const integerPart = numericValue.slice(0, -2);
  const decimalPart = numericValue.slice(-2);

  // Adiciona os pontos de milhar e formata a parte decimal
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedIntegerPart},${decimalPart}`;
};


  return (
    <div className='formCriar flex flex-col'>
      <div className='flex flex-col gap-1' style={{ marginTop: '30px', width: '100%', height: '100%' }}>
        <div className='flex flex-col gap-2'>
          <span>Título</span>
          <Input type='text' required value={profissional} onChange={(e) => setProfissional(e.target.value)} />
        </div>

        <div className='flex flex-col gap-2'>
          <span>Localização</span>
          <Input type='text' required value={local} onChange={(e) => setLocal(e.target.value)} />
        </div>

        <div className='flex flex-col gap-2'>
          <span>Descrição</span>
          <textarea
            className='txAreaEmpCr'
            id="area2"
            style={{ height: '200px', width: '100%', resize: 'none', borderRadius: '10px' }}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            maxLength={500}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <span>Habilidades</span>
          <div
            style={{
              maxWidth: '100%',
              height: "40px",
              overflowX: "auto",
              overflowY: "hidden",
              display: "flex",
              alignItems: 'center',
              scrollSnapType: "x mandatory",
              borderRadius: '10px',
              outline: 'none',
              border: `1px solid ${border3}`,
            }}
            className="cx-selCr"
          >
            <Select
              mode="multiple"
              options={options}
              value={selectedOptions}
              onChange={handleChange}
              style={{ width: '100%', display: 'flex', alignItems: 'center' }}
              suffixIcon={null}
              tagRender={(props) => {
                const { label, closable, onClose } = props;

                return (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      marginRight: '8px',
                      overflow: 'hidden',
                      maxWidth: '100%'
                    }}
                  >
                    <span className="tagSelect" style={{ background: '#F1F5F9', borderRadius: '10px', padding: '3px 15px' }}>{label}</span>
                    {closable && (
                      <span onClick={onClose} style={{ cursor: 'pointer', marginLeft: '4px' }}></span>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <span>Salário</span>
          <CurrencyInput
            value={formatCurrencyValue(watch('salary'))}
            onChange={(formattedValue) => {
              setValue('salary', formattedValue);
            }}
          />
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className='flex self-end' style={{ marginTop: '40px', marginBottom: '40px' }}>
        <BtnPrincipal
          texto={textoVaga === 'Publicar Vaga' ? <>Publicar Vaga</> : <span className='flex gap-2' style={{ marginLeft: '6px' }}>{textoVaga} {imagemVaga}</span>}
          back={backVaga}
          padding='7px 10px'
          borderRadius='20px'
          color='#fff'
          font='Lexend'
          width='180px'
          click={() => {
            if (backVaga === '#3B82F6') {
              handleSubmit(criarVaga)();
            }
          }}
          hoverColor='#609AFA'
        />
      </div>
    </div>
  );
};

export default CriarVaga;
