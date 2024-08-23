import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import Input from '../Form/input.jsx';
import { useState } from 'react';
import axios from 'axios';
import './CriarVaga.css';
import { Select } from "antd";
import Inputmask from 'react-input-mask'; 

const { Option } = Select;

const CriarVaga = () => {
  const [profissional, setProfissional] = useState('');
  const [desc, setDesc] = useState('');
  const [salar, setSalar] = useState('');
  const [requisits, setRequisits] = useState('');
  const [local, setLocal] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [border3, setBorder3] = useState('#E2E8F0');
  const [textoVaga, setTextoVaga] = useState('Publicar Vaga');
  const [imagemVaga, setImagemVaga] = useState(null); 
  const [backVaga, setBackVaga] = useState('#93BBFD');
  const [errorMessage, setErrorMessage] = useState('');

  const options = [
    { value: 'designer', label: 'Designer' },
    { value: 'front-end', label: 'Front-End' },
    // Adicione outras opções aqui...
  ];

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    setRequisits(selected.map(option => option.value));
  };

  const validarCampos = () => {
    if (!profissional || !desc || !salar || !local || selectedOptions.length === 0) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const criarVaga = async () => {
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

        const data = {
          title: profissional,
          description: desc,
          salario: salar,
          requirements: selectedOptions,
          localizacao: local,
          tags: requisits,
        };

        const response = await axios.post('https://workzen.onrender.com/v1/jobs/create', data, config);

        console.log(response.data);

        if(response.data){ 
          setImagemVaga(<img src="icons/correct.svg" alt="" />);
          setTextoVaga(<span style={{whiteSpace: 'nowrap'}}>Vaga publicada</span>);
          setBackVaga('#4ADA3D');
        }

      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };

  const handleValueChange = (values) => {
    setSalar(values.salar);
  };

  return (
    <div className='formCriar flex flex-col'>
      <div className='flex flex-col justify-between' style={{ marginTop: '30px', width: '100%', height: '100%' }}>
        <div className='flex flex-col gap-2'>
          <span>Título</span>
          <Input type='text' required value={profissional} onChange={(e) => setProfissional(e.target.value)}/>
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

        <div className='flex flex-col gap-2'>
          <span>Salário</span>
          <Inputmask
      value={salar}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      onValueChange={handleValueChange}
      customInput={(props) => <input {...props} className="nubank-input" />}
      style={{ border: `1px solid ${border3}`, outline: 'none', height: '40px' }}
    />
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>} 

      <div className='flex self-end' style={{ marginTop: '40px', marginBottom: '40px' }}>
        <BtnPrincipal
          texto={textoVaga === 'Publicar Vaga' ? <>Publicar Vaga</> : <span className='flex gap-2' style={{marginLeft: '6px'}}>{textoVaga} {imagemVaga}</span>}
          back={backVaga}
          padding='10px'
          borderRadius='15px'
          color='#fff'
          font='Lexend'
          width='180px'
          click={() => {
            if (backVaga === '#93BBFD') {
              criarVaga(); 
            }
          }}
        />
      </div>
    </div>
  );
};

export default CriarVaga;
