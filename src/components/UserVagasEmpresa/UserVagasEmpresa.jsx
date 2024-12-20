import React, { useState, useEffect } from 'react';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import axios from 'axios';
import Input from '../Form/input.jsx';
import { Select } from "antd";
import ApplicantsList from '../ApplicantsList/ApplicantList.jsx';
import { useForm } from 'react-hook-form';

import CurrencyInput from 'react-currency-input-field';
import './UserVagasEmpresa.css'
import { axiosInstance, setAuthToken } from '../../utils/api.js';
import lixo from '../../../public/icons/icon-block.svg';
import lixoBranco from '../../../public/icons/iconWhite-block.svg';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


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
  const [options, setOptions] = useState([]); 


  const MySwal = withReactContent(Swal);
  

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
          console.log(data);
        } else {
          console.error("Dados recebidos da API não são um array:", data);
        }
      } catch (error) {
        console.error("Erro ao buscar as profissões:", error);
      }
    };

    fetchProfessions(); // Executa apenas na montagem do componente
  }, []); 

  

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
      setRequisits(vaga.requirements);

  
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
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axiosInstance.delete(`/jobs/delete/${id}`, config);
      console.log('Requisição bem-sucedida:', response);
  
      // Atualiza o estado para remover a vaga excluída
      setUserDataVagasEmpresa(userDataVagasEmpresa.filter((_, i) => i !== selectedIndex));
  
      // Exibe mensagem de sucesso
      MySwal.fire('Deletado!', 'A vaga foi excluída com sucesso.', 'success');
    } catch (error) {
      console.error('Erro na exclusão:', error);
      setError(error);
  
      // Exibe mensagem de erro
      MySwal.fire('Erro!', 'Não foi possível excluir a vaga.', 'error');
    } finally {
      cancelaVaga();
      console.log('Finalizando a operação de exclusão');
    }
  };
  
  const handleDeleteClick = () => {
    MySwal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        excluirVaga(); // Chama a função que faz a exclusão
      }
    });
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
      requirements: requisits,
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
              <button className="flex items-center justify-center gap-2 deletar-botao" onClick={handleDeleteClick}>
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
                <span>Requisitos</span>
                <Input type='text' required value={requisits} onChange={(e) => setRequisits(e.target.value)}/>
              </div>

              <div>
  <span>Salário</span>
  <CurrencyInput
        value={salar}
        onValueChange={(value) => setSalar(value)} // Captura o valor sem formatação
        prefix="R$ " // Prefixo do valor
        decimalSeparator="," // Define separador decimal como vírgula
        groupSeparator="." // Define separador de milhar como ponto
        decimalsLimit={2} // Limita a 2 casas decimais
        allowNegativeValue={false} // Impede valores negativos
        placeholder="R$ 0,00" // Valor padrão exibido quando vazio
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

              <div className='flex gap-3'>
                {item.requirements.map((req, index) => (
                  <span className='span-' style={{color: '#000', fontFamily: 'Lexend'}} key={index}>{req}</span>
                ))}
              </div>

            <div className='flex justify-between caixa-tags' style={{ width: '100%', marginTop: '10px' }}>
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
