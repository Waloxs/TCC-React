import React, { useState, useEffect } from 'react';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import axios from 'axios';
import Input from '../Form/input.jsx';
import Select from 'react-select';


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
  const [tag, setTag] = useState([]);
  const [salar, setSalar] = useState('');
  const [tit, setTit] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);


  useEffect(() => {
    setUserDataVagasEmpresa(initialVagas);
    console.log(initialVagas);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      const vaga = userDataVagasEmpresa[selectedIndex];
      setTit(vaga.title);
      setDesc(vaga.description);
      setLocal(vaga.localizacao);
      setSalar(vaga.salario);
      const updatedTags = vaga.tags.length ? vaga.tags : [];
      setSelectedOptions(updatedTags.map(tag => ({ value: tag, label: tag })));
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
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    try {
      const response = await axios.delete(`https://workzen.onrender.com/v1/jobs/delete/${id}`, config);
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

  const salvarEdicao = async () => {
    const id = userDataVagasEmpresa[selectedIndex]._id;
  
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    const dados = {
      description: desc,
      localizacao: local,
      tags: selectedOptions.map(option => option.value),
      salario: salar,
      title: tit,
    };
  
  
    try {
      const response = await axios.put(`https://workzen.onrender.com/v1/jobs/update/${id}`, dados, config);
      const updatedVaga = response.data;
  
      const updatedVagas = [...userDataVagasEmpresa];
      updatedVagas[selectedIndex] = updatedVaga;
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
    // Suas opções aqui...
  ];

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <>
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
              <BtnPrincipal
                texto={<div className='flex justify-center gap-2'>Cancelar</div>}
                back='#3B82F6'
                padding='10px'
                borderRadius='25px'
                color='#fff'
                width='180px'
                click={cancelaVaga}
              />

              <BtnPrincipal
                texto={<div className='flex justify-center gap-2'>Excluir <img src="icons/icon-block.svg" alt="Minha Imagem"/> </div>} 
                back='#fff'
                padding='10px'
                borderRadius='25px'
                color='#EF4444'
                width='180px'
                border='#EF4444'
                click={excluirVaga}
              />
            </div>
          </div>
        </div>
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
                  className='txAreaEmp'
                  id="area2"
                  style={{ height: '200px', width: '100%',  resize: 'none', borderRadius: '10px' }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div>
                <span>Habilidades</span>
                <Select
                  isMulti
                  options={options}
                  value={selectedOptions}
                  onChange={handleChange}
                  className='lin'
                />
              </div>

              <div>
                <span>Salário</span>
                <Input type='text' required value={salar} onChange={(e) => setSalar(e.target.value)}/>
              </div>
            </div>

            <div className='flex gap-4 self-end' style={{marginTop: '50px'}}>
              <BtnPrincipal
                texto="Cancelar"
                back='#3B82F6'
                padding='10px'
                borderRadius='15px'
                color='#fff'
                font='Lexend'
                width='180px'
                click={cancelaVaga}
              />

              <BtnPrincipal
                texto="Salvar"
                back='#3B82F6'
                padding='10px'
                borderRadius='15px'
                color='#fff'
                font='Lexend'
                width='180px'
                click={salvarEdicao}
              />
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
              <span className='span-description' style={{ fontWeight: '400' }}>{item.salario}</span>
            </div>
            <div className='flex justify-between caixa-tags' style={{ width: '100%' }}>
              <div className='flex gap-3'>
                {item.requirements.map((tag, index) => (
                  <span className='span-tag' key={index}>{tag}</span>
                ))}
              </div>

              <div className='icons flex gap-4'>
                <img src='icons/icon-lixo.svg' alt='Minha Imagem' onClick={() => apagaVaga(index)} />
                <img src='icons/icon-pen.svg' alt='Minha Imagem' onClick={() => editaVaga(index)} />
                <img src='icons/icon-pessoa.svg' alt='Minha Imagem' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserVagasEmpresa;