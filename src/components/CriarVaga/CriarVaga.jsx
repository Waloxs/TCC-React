import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CriarVaga.css';
import { Select } from "antd";
import CurrencyInput from '../CurrencyInput/CurrencyInput.jsx'; // Importe o componente CurrencyInput
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import Input from '../Form/input.jsx';
import { useForm } from 'react-hook-form';
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

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
  const [options, setOptions] = useState([]); 

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await axios.get("https://gist.githubusercontent.com/wallacemaxters/7863699e750a48fc2e283892738f8ca5/raw/01c7748c4e1f2e1471ea73423b8e49fec6b23eab/lista_cargos.json");
        const data = response.data;

        if (Array.isArray(data)) {
          const formattedOptions = data.map(profession => ({
            value: profession,
            label: profession
          }));
          setOptions(formattedOptions);
        } else {
          console.error("Dados recebidos da API não são um array:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar as profissões:", error);
      }
    };

    fetchProfessions(); // Executa apenas na montagem do componente
  }, []); 

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
    setAuthToken(token);
  
    if (token) {
      try {
        // Confirmar se o usuário quer publicar a vaga
        const result = await Swal.fire({
          title: 'Tem certeza que deseja publicar?',
          text: 'Esta ação não pode ser revertida!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, publicar!',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          Swal.fire({
            title: 'Publicando Vaga...',
            text: 'Aguarde enquanto sua vaga está sendo criada.',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const originalSalary = data.salary.replace(/[^\d]/g, '');
          const salaryInCents = parseInt(originalSalary, 10) / 100;
          const formattedSalary = formatCurrencyValue(salaryInCents.toString());

          const postData = {
            title: profissional,
            description: desc,
            salario: formattedSalary + 'R$',
            tags: selectedOptions,
            localizacao: local,
            requirements: requisits,
          };

          const response = await axiosInstance.post('/jobs/create', postData, config);

          if (response.data) {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Sua vaga foi publicada com sucesso.',
              confirmButtonText: 'OK',
            });

            setImagemVaga(<img src="icons/correct.svg" alt="" />);
            setTextoVaga(<span style={{ whiteSpace: 'nowrap' }}>Vaga publicada</span>);
            setBackVaga('#4ADA3D');
          }
        }
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Ocorreu um erro ao publicar sua vaga. Por favor, tente novamente.',
          confirmButtonText: 'OK',
        });
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };
  
  // Função para formatar o valor monetário
  const formatCurrencyValue = (value) => {
    if (!value) return '0,00';
  
    let numericValue = value.replace(/[^\d]/g, '');
  
    if (numericValue.length <= 2) {
      return `0,${numericValue.padStart(2, '0')}`;
    }
  
    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);
  
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedIntegerPart},${decimalPart}`;
  };

  return (
    <div className='formCriar flex flex-col'>
      <div className='flex flex-col gap-1' style={{ width: '100%', height: '100%' }}>
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
          <span>Requisitos</span>
          <Input type='text' required value={requisits} onChange={(e) => setRequisits(e.target.value)} />
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

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
