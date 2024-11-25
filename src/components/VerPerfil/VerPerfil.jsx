import React, { useState, useEffect } from 'react';
import BtnPrincipal from '../Buttons/BtnPrincipal';
import Input from '../Form/input';
import { LuPen } from "react-icons/lu";
import { Select } from "antd";
import { axiosInstance, setAuthToken } from '../../utils/api'; 
import './VerPerfil.css';
import axios from 'axios';
import User from '../UserProfile/UserProfile';
import UserEmpresa from '../UserEmpresa/UserEmpresa';

const VerPerfil = ({dadosUser, dadosEmpresa}) => {
  const [nome, setNome] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [telEmpresa, settelEmpresa] = useState('');
  const [titulo, setTitulo] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const [bio, setBio] = useState('');
  const [options, setOptions] = useState([]);
  const [isEditable, setIsEditable] = useState({
    nome: false,
    telefone: false,
    habilidades: false,
    biografia: false,
  });




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

    fetchProfessions(); 
  }, []);


  if(dadosUser) {

  useEffect(() => {
    setNome(dadosUser.firstName);
    setTitulo(dadosUser.titulo);
    setHabilidades(dadosUser.tags);
    setBio(dadosUser.bio);
  }, [dadosUser]);
  
  }

  if(dadosEmpresa) {

    useEffect(() => {
      setNomeEmpresa(dadosEmpresa.nome);
      settelEmpresa(dadosEmpresa.telefone);
    }, [dadosEmpresa]);
    
    }

  const handlePenClick = (field) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const PutUser = async () => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
  
    try {
      if (dadosUser) {
        const updatedUser = {
          firstName: nome,
          titulo,
          tags: habilidades,
          bio,
        };
  
        const response = await axiosInstance.put('/me', updatedUser);
        console.log('Dados do usuário atualizados com sucesso:', response.data);
  
      } else if (dadosEmpresa) {
        const updatedEmpresa = {
          nome: nomeEmpresa,
          telefone: telEmpresa
        };
  
        const response = await axiosInstance.put('/empresa/profile', updatedEmpresa);
        console.log('Dados da empresa atualizados com sucesso:', response.data);
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    }
  };
  

  if(dadosUser) {

  return (
    <div className='cx-form-edit flex flex-col'>
      <div className='flex items-center self-end gap-4'>
                      <div className='flex flex-col items-end'>
                        <h1 style={{color: '#020617', fontFamily: 'Lexend', fontSize: '1rem'}}>{dadosUser.firstName} {dadosUser.lastName}</h1>
                        <h1 style={{color: '#334155', fontFamily: 'Lexend', fontSize: '0.95rem'}}>{dadosUser.titulo}</h1>
                      </div>

                      <div>
                        {dadosUser && dadosUser.image && (
                          <div className="imgCadas" style={{width: '40px', height: '80px'}}>
                            <img src={dadosUser.image} alt="User Avatar" className='imgUser' />
                          </div>
                        )}
                        {dadosUser && !dadosUser.image && (
                          <div className="imgCadas">
                            <div className='imgUserNone' style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                              <User prLet={true} />
                            </div>
                          </div>
                        )}  
                      </div>  
                  </div>

      <div className='flex flex-col gap-5'>
        <div className="conteiner-editar flex flex-col gap-3">
          <span>Nome</span>
          <div className="input-editar">
            <Input
              type="text"
              className="lin2edit"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={!isEditable.nome}
            />
            <LuPen className="icon-pen" onClick={() => handlePenClick('nome')} />
          </div>

          <span>Título</span>
          <div className="input-editar">
            <Input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={!isEditable.titulo}
            />
            <LuPen className="icon-pen2" onClick={() => handlePenClick('titulo')} />
          </div>

          <span>Habilidades</span>
          <div className="input-editar" style={{border: '1px solid #E2E8F0', borderRadius: '0.5rem', width: '100%'}}>
            <Select
              mode="multiple"
              options={options}
              value={habilidades}
              onChange={(val) => setHabilidades(val)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', height: 'max-content', overflowX: 'auto' }}
              suffixIcon={null}
              disabled={!isEditable.habilidades}
              tagRender={(props) => {
                const { label, closable, onClose } = props;
                return (
                  <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', marginRight: '8px', maxWidth: '100%' }}>
                    <span className="tagSelect" style={{ background: '#F1F5F9', borderRadius: '10px', padding: '3px 15px', marginLeft: '10px'}}>{label}</span>
                    {closable && <span onClick={onClose} style={{ cursor: 'pointer', marginLeft: '4px' }}></span>}
                  </div>
                );
              }}
            />
            <LuPen className="icon-pen" onClick={() => handlePenClick('habilidades')} />
          </div>

          <span>Biografia</span>
          <div className="input-editar">
            <textarea
              className="txAreaEdit"
              style={{ height: "220px", resize: "none", border: `1px solid #E2E8F0`, outline: "none", width: '100%' }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!isEditable.biografia}
            />
            <LuPen className="icon-pen" onClick={() => handlePenClick('biografia')} />
          </div>
        </div>

        <div className='flex self-end'>
          <BtnPrincipal
            texto="Salvar"
            back='#3B82F6'
            padding='10px'
            borderRadius='20px'
            color='#fff'
            font='Lexend'
            width='200px'
            hoverColor='#609AFA'
            click={PutUser}
          />
        </div>
      </div>
    </div>
    );
  }
    if(dadosEmpresa){
      return (

        <div className='cx-form-edit flex flex-col'>
        <div className='flex items-center self-end gap-4'>
                        <div className='flex flex-col items-end'>
                          <h1 style={{color: '#020617', fontFamily: 'Lexend', fontSize: '1rem'}}>{dadosEmpresa.nome}</h1>
                          <h1 style={{color: '#334155', fontFamily: 'Lexend', fontSize: '0.95rem'}}>{dadosEmpresa.titulo}</h1>
                        </div>
  
                        <div>
                          {dadosEmpresa && dadosEmpresa.image && (
                            <div className="imgCadas" style={{width: '40px', height: '80px'}}>
                              <img src={dadosEmpresa.image} alt="User Avatar" className='imgUser' />
                            </div>
                          )}
                          {dadosEmpresa && !dadosEmpresa.image && (
                            <div className="imgCadas">
                              <div className='imgUserNone' style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                <UserEmpresa prLet={true} />
                              </div>
                            </div>
                          )}  
                        </div>  
                    </div>
  
        <div className='flex flex-col gap-5'>
          <div className="conteiner-editar flex flex-col gap-3">
            <span>Nome da Empresa</span>
            <div className="input-editar">
              <Input
                type="text"
                className="lin2edit"
                required
                value={nomeEmpresa}
                onChange={(e) => setNomeEmpresa(e.target.value)}
                disabled={!isEditable.nome}
              />
              <LuPen className="icon-pen" onClick={() => handlePenClick('nome')} />
            </div>
  
            <span>Telefone</span>
            <div className="input-editar">
              <Input
                type="text"
                required
                value={telEmpresa}
                onChange={(e) => settelEmpresa(e.target.value)}
                disabled={!isEditable.telEmpresa}
              />
              <LuPen className="icon-pen2" onClick={() => handlePenClick('titulo')} />
            </div>

          </div>
  
          <div className='flex self-end'>
            <BtnPrincipal
              texto="Salvar"
              back='#3B82F6'
              padding='10px'
              borderRadius='20px'
              color='#fff'
              font='Lexend'
              width='200px'
              hoverColor='#609AFA'
              click={PutUser}
            />
          </div>
        </div>
      </div>

      )
    }
  
};

export default VerPerfil;
