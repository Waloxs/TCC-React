import { useState, useEffect } from 'react';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import { Select } from "antd";
import './TalentoPasso1.css';
import { Link } from 'react-router-dom';
import Input from '../../components/Form/input';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import User from '../../components/UserProfile/UserProfile.jsx'
import { useUser as useUserTalento } from '../../services/UserContext';
import { MdArrowDropDown } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { axiosInstance, setAuthToken } from '../../utils/api.js';


const TalentoPasso1 = () => {
  const [border3, setBorder3] = useState('#E2E8F0');
  const [block, setBlock] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [block2, setBlock2] = useState(true);
  const [block3, setBlock3] = useState(true);
  const [block4, setBlock4] = useState(true);
  const [modal, setModal] = useState(false);
  const [valor, setValor] = useState('Azul25');
  const [sombra, setSombra] = useState(false);
  const [back, setBack] = useState(false);
  const [image, setImage] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [estado, setEstado] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [profissional, setProfissional] = useState('');
  const [biografia, setBiografia] = useState('');
  const { data: user } = useUserTalento();
  const [modalExp, setModalExp] = useState(false);
  const [experiência, setExperiencia] = useState(null);
  const [dados, setDados] = useState([]);
  const [border, setBorder] = useState(null);
  const [border2, setBorder2] = useState(null);
  const [texto, setTexto] = useState(null);
  const [texto2, setTexto2] = useState(false);
  const [options, setOptions] = useState([]); 



  useEffect(() => {
    // Função para buscar dados da API
    const fetchProfessions = async () => {
      try {
        const response = await axios.get("https://gist.githubusercontent.com/wallacemaxters/7863699e750a48fc2e283892738f8ca5/raw/01c7748c4e1f2e1471ea73423b8e49fec6b23eab/lista_cargos.json");
        const data = response.data;

        // Transforme o array de strings em um array de objetos
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

    fetchProfessions(); // Chama a função de busca na montagem do componente
  }, []);

const handleChange = (selected) => {
  setSelectedOptions(selected);
};

  const data = {
    titulo: '',
    bio: '',
    tags: []
  }


  const handleRegister = () => {
    setDados(prevDados => ({
      ...prevDados,
      titulo: profissional,
      tags: selectedOptions
    }));
  
    console.log(profissional);
    console.log(selectedOptions);
  };
  
  const handleRegister2 = () => {
    setDados(prevDados => ({
      ...prevDados,
      bio: biografia
    }));
  
    console.log(biografia);
  };
  
  
  useEffect(() => {
    // Lista de estados com os códigos de UF
    const estadosBrasil = [
      { codigo: 'AC', nome: 'Acre' },
      { codigo: 'AL', nome: 'Alagoas' },
      { codigo: 'AM', nome: 'Amazonas' },
      { codigo: 'AP', nome: 'Amapá' },
      { codigo: 'BA', nome: 'Bahia' },
      { codigo: 'CE', nome: 'Ceará' },
      { codigo: 'DF', nome: 'Distrito Federal' },
      { codigo: 'ES', nome: 'Espírito Santo' },
      { codigo: 'GO', nome: 'Goiás' },
      { codigo: 'MA', nome: 'Maranhão' },
      { codigo: 'MG', nome: 'Minas Gerais' },
      { codigo: 'MS', nome: 'Mato Grosso do Sul' },
      { codigo: 'MT', nome: 'Mato Grosso' },
      { codigo: 'PA', nome: 'Pará' },
      { codigo: 'PB', nome: 'Paraíba' },
      { codigo: 'PE', nome: 'Pernambuco' },
      { codigo: 'PI', nome: 'Piauí' },
      { codigo: 'PR', nome: 'Paraná' },
      { codigo: 'RJ', nome: 'Rio de Janeiro' },
      { codigo: 'RN', nome: 'Rio Grande do Norte' },
      { codigo: 'RS', nome: 'Rio Grande do Sul' },
      { codigo: 'RO', nome: 'Rondônia' },
      { codigo: 'RR', nome: 'Roraima' },
      { codigo: 'SC', nome: 'Santa Catarina' },
      { codigo: 'SP', nome: 'São Paulo' },
      { codigo: 'SE', nome: 'Sergipe' },
      { codigo: 'TO', nome: 'Tocantins' }
    ];
    setEstados(estadosBrasil);
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
        .then(response => response.json())
        .then(data => {
          const cidadesData = data.map(cidade => cidade.nome);
          setCidades(cidadesData);
        })
        .catch(error => {
          console.error('Erro ao buscar cidades:', error);
        });
    }
  }, [estadoSelecionado]);
  

  const click = (event) => {
    event.preventDefault();
    setModal(!modal);
    setSombra(!sombra);
    setBack(!back);
  };

  const handleClick = (e) => {
    
    handleRegister();

    if (profissional.trim() === '') {
      setBorder('#EF4444');
      setTexto('Adicione uma função para continuar');
    } else {  
      e.preventDefault();
      setBlock(!block);
      setBlock2(!block2);
      setValor('Azul50');
    }
  };
  
  const handleClick2 = (e) => {
    e.preventDefault();
    setBlock2(!block2);
    setBlock3(!block3);
    setValor('Azul75');

  };

  const handleClick3 = (e) => {
    handleRegister2();
    
    if (biografia.trim() === '') {
      setBorder2('#EF4444');
      setTexto2(true);
    } else {
    e.preventDefault();
    setBlock3(!block3);
    setBlock4(!block4);
    setValor('Azul100');
    }
  };





  const handleSave = async (e) => {
    e.preventDefault();
  
    // Verifica se todos os campos estão preenchidos
    if (
      titulo.trim() === '' ||
      empresa.trim() === '' ||
      localizacao.trim() === '' ||
      estado.trim() === '' ||
      !inicio || // Verifica se `inicio` não é null ou undefined
      !fim || // Verifica se `fim` não é null ou undefined
      descricao.trim() === ''
    ) {
      setModalExp(false);
    } else {
      setModalExp(true);
  
      const novaExp = {
        title: titulo,
        empresa: empresa,
        localizacao: localizacao,
        estado: estado,
        dataInicio: inicio,
        dataTermino: fim,
        description: descricao,
        company: descricao,
      };
  
      setExperiencia(novaExp);
      setModal(false);
      setSombra(false);
    }
  };
  



  

  const handleBackClick = (e) => {
    e.preventDefault();

    setModalExp(false);
    if (block == true) {
      navigate('/talento');
    } else if (!block2 == true){
      setValor('Azul25antes')
      setBlock(true);
      setBlock2(true);
    } else if (!block3 == true){
      setValor('Azul50antes')
      setBlock(false)
      setBlock2(false);
      setBlock3(true);
    } else if (!block4 == true){
      setValor('Azul75antes')
      setBlock(false)
      setBlock2(true);
      setBlock3(false);
      setBlock4(true);
  }
  
}

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  setImage(URL.createObjectURL(file)); // Exibe a pré-visualização da imagem para o usuário

  // Prepara os dados para enviar via formData
  const formData = new FormData();
  formData.append('image', file); // 'profileImage' deve ser o nome do campo esperado pela API

  // Envia a requisição PUT
  
const token = localStorage.getItem('authToken');
setAuthToken(token);

  axiosInstance.put('/me/', {
    body: formData,
    headers: {
        'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    // Trata a resposta da API conforme necessário
    console.log('Imagem enviada com sucesso:', response);
    // Redireciona para a página de Dashboard após o envio
  })
  .catch(error => {
    console.error('Erro ao enviar imagem:', error);
    // Trata o erro conforme necessário
  });
};


const conta = () => {

const atualizandoDados = async () => {
  
  const token = localStorage.getItem('authToken');

  if (token) {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const dados = {
      titulo: profissional,
      bio: biografia,
      tags: selectedOptions 
    };

    console.log('Dados que serão enviados:', dados);

    try {
      const response = await axiosInstance.put('/me', dados, config);
      console.log('Dados atualizados com sucesso:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erro ao enviar dados:', error.response.data);
        console.error('Status do erro:', error.response.status);
      } else if (error.request) {
        console.error('Nenhuma resposta recebida:', error.request);
      } else {
        console.error('Erro ao configurar a requisição:', error.message);
      }
    }
  } else {
    console.error('Token não encontrado no localStorage');
  }
};
atualizandoDados();

  
  

const token = localStorage.getItem('authToken');

if (token) {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const updateDados = async () => {
    try {
      const response = await axiosInstance.post('/me/xp', experiência, config);
      console.log('Dados atualizados com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  updateDados();
} else {
  console.error('Token não encontrado no localStorage');
}





}

const handleInicioChange = (date) => {
  setInicio(date);
  if (fim && date > fim) {
    setFim(null); 
  }
};

const handleFimChange = (date) => {
  if (inicio && date < inicio) {
    alert('A data de término não pode ser anterior à data de início.');
    return;
  }
  setFim(date);
};


  return (
    <>
{user && modal && (
  <div className='ddd' style={{ position: 'absolute', width: '100vw', background: 'red' }}>
    <div className='containAdc' style={{ width: '40rem', height: '45rem' }}>
      <form action="" className='FormAdc2' onSubmit={handleSave}>
        <IoIosArrowBack 
          onClick={click} 
          className='m-6' 
          style={{ fontSize: '1.5rem', color: '#0866FF', marginLeft: '-10px', marginBottom: '-10px', cursor: 'pointer' }} 
        />
        <h1 className='titAdc'>Adicione sua experiência profissional</h1>
        <div className='flex flex-col justify-between' style={{ height: '80%', width: '100%', marginTop: '20px' }}>
          <div>
            <label htmlFor='titulo'>Título</label>
            <Input 
              id='titulo' 
              className='pdl' 
              placeholder='Ex: Desenvolvedor Back-end' 
              value={titulo} 
              required 
              onChange={(e) => setTitulo(e.target.value)} 
            />
          </div>
          <div>
            <label htmlFor='empresa'>Empresa</label>
            <Input 
              id='empresa' 
              className='pdl' 
              placeholder='Ex: Hexalab' 
              value={empresa} 
              required 
              onChange={(e) => setEmpresa(e.target.value)} 
            />
          </div>
          <div className='gr1'>
            <div>
              <label htmlFor="cidade">Cidade:</label><br />
              <div className='select-wrapper2' style={{ position: 'relative', width: '100%' }}>
                <select 
                  id="cidade" 
                  value={localizacao}  
                  required 
                  onChange={(e) => setLocalizacao(e.target.value)} 
                  style={{ width: '100%', paddingRight: '30px', position: 'relative' }} 
                >
                  <option value=""></option>
                  {cidades.map((cidade, index) => (
                    <option key={index} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
                <img 
                  className='icon-drop' 
                  src='icons/icon-drop.svg' 
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }} 
                />
              </div>
            </div>
            <div>        
              <label htmlFor="estado">Estado:</label><br />
              <div className='select-wrapper2' style={{ position: 'relative', width: '100%' }}>
                <select 
                  id="estado" 
                  onChange={e => { setEstadoSelecionado(e.target.value); setEstado(e.target.value) }} 
                  value={estado} 
                  required
                  style={{ width: '100%', paddingRight: '30px', position: 'relative' }} 
                >
                  <option value="" disabled></option>
                  {estados.map(estado => (
                    <option key={estado.codigo} value={estado.codigo}>
                      {estado.nome}
                    </option>
                  ))}
                </select>
                <img 
                  className='icon-drop'  
                  src='icons/icon-drop.svg' 
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }} 
                />
              </div>
            </div>
          </div>
          <div className='gr1'>
            <div className='flex flex-col' style={{ position: 'relative' }}>
              <label htmlFor='inicio'>Data de Início</label>
              <DatePicker 
                className='data' 
                id='inicio' 
                selected={inicio} 
                onChange={handleInicioChange} 
                dateFormat="yyyy-MM-dd" 
                required
              />
              <img 
                className='icon-drop' 
                src='icons/icon-drop.svg' 
                alt="" 
                style={{ position: 'absolute', bottom: '15px', right: '10px' }} 
              />
            </div>
            <div className='flex flex-col' style={{ position: 'relative' }}>
              <label htmlFor='fim'>Data de Termino</label>
              <DatePicker 
                className='data' 
                id='fim' 
                selected={fim} 
                onChange={handleFimChange} 
                dateFormat="yyyy-MM-dd" 
                required
              />
              <img 
                className='icon-drop'  
                src='icons/icon-drop.svg' 
                alt="" 
                style={{ position: 'absolute', bottom: '15px', right: '10px' }} 
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="area">Descrição</label>
            <textarea 
              id="area" 
              style={{ height: '120px', resize: 'none' }} 
              value={descricao} 
              required 
              onChange={(e) => setDescricao(e.target.value)} 
              maxLength={200}
            />
          </div>
          <div className='ct flex self-end' onClick={handleSave}>
            <BtnPrincipal 
              texto="Salvar" 
              color="#fff" 
              width="200px" 
              back="#3B82F6" 
              className='fontbtn' 
              borderRadius="20px" 
              padding="10px" 
            />
          </div>
        </div>
      </form>
    </div>
  </div>
)}
{user && (            
    <div className={`${sombra ? 'sombra' : ''} tudo flex justify-center`} style={{ width: '100vw' }}>
      <div className={`containerPasso flex flex-col justify-center items-center`} style={{ width: '70rem', background: '#fff', height: '100vh', gap: '30px', padding: '20px' }}>
        <div className="containerLogo2" style={{ width: '100%' }}>
          <Link to="/" style={{ width: '100%' }}>
            <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
          </Link>
        </div>
    <div className="conteudo flex" style={{ width: '100%', height: 'auto', background: '#fff', borderRadius: '1.25rem', border: '2px solid #E2E8F0'}}>
          <div className='flex flex-col' style={{ height: '35rem', width: '100%' }}>
            <div className='flex items-center'>
              <IoIosArrowBack onClick={handleBackClick} className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF', cursor: 'pointer' }} />
              <div className='cxCinza'>
                <div className={`cxAzul ${valor}`}></div>
              </div>
            </div>
            {block && (
              <div className='animate flex flex-col' style={{ height: '100%', gap: '5rem' }}>
                <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                <h1 className='PassTit'>Muito bem <User nome={true}/>, agora, adicione um título para contar ao mundo o que você faz.</h1>
                  <p className='PassPar'>É a primeira coisa que as Empresas veem, então faça valer a pena. Destaque-se descrevendo sua experiência com suas próprias palavras.</p>
                </div>
                <div className='ctx-input' style={{ padding: '0px 4rem 0px 4rem' }}>

                  <div>
                      <p className='func'>Sua função Profissional</p>
                     <Input type='text' placeholder='Ex: Programador Fullstack' className='lin' border={border} required value={profissional} onChange={(e) => setProfissional(e.target.value)} />
                  </div>

          <div>
          <p className='func'>Habilidades</p>
          <div
            style={{
              width: '100%',
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
              style={{ width: '100%', display: 'flex', alignItems: 'center', height: 'max-content', overflowX: 'auto' }}
              suffixIcon={null}
              placeholder='Insira uma Habilidade'
              tagRender={(props) => {
                const { label, closable, onClose } = props;

                return (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      marginRight: '8px',
                      maxWidth: '100%'
                    }}

                  >
                    <span className="tagSelect" style={{ background: '#F1F5F9', borderRadius: '10px', padding: '3px 15px'}}>{label}</span>
                    {closable && (
                      <span onClick={onClose} style={{ cursor: 'pointer', marginLeft: '4px' }}></span>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>

                  {texto && (
                    <span className='flex gap-2 items-center span-erro'>
                      <img src="icons/icon-erro.svg" alt="" />
                      {texto}
                    </span>
                  )}
                </div>

                
              </div>
            )}
            {!block2 && (
                  <div className='animate flex flex-col justify-between' style={{ height: '100%', gap: '5rem' }}>

                  {!modalExp &&(
                    <>
                    <div className='pd2Talento flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                      <h1 className='PassTit2'>Ótimo, agora, se você tiver experiência profissional relevante, adicione-a aqui.</h1>
                      <p className='PassPar2'>Talentos que colocam sua experiência têm duas vezes mais chances de ganhar trabalho. Mas se você está apenas começando, ainda pode criar um ótimo perfil. Basta ir para a próxima página.</p>
                    </div>

                    <div className='cx flex flex-row gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem' }}>
                      <div onClick={click} style={{ cursor: 'pointer' }}>
                        <BtnPrincipal texto="Adicionar Expêriencia" color="#fff" width="200px" back="#3B82F6" className='fontbtn' hover='#3A61D4' borderRadius="20px" padding="10px"/>
                      </div>
                      <div onClick={handleClick2} style={{cursor: 'pointer'}}>
                        <BtnPrincipal texto="Pular por enquanto" color="#3B82F6" width="200px" back="#fff" className='fontbtn' border="#3B82F6" borderRadius="20px" padding="10px"/>
                      </div>
                    </div>
                    </>
                    )}

                    {modalExp && (
                      <div style={{maxWidth: '500px', marginLeft: '40px'}}>
                      <span className='modalexpTit'>Experiências</span>
                      <form className='form-modalExp flex gap-4' style={{height: '100%'}}>
                        <div className='flex flex-col justify-between'>
                        <div>
                          <span>Titulo</span>
                          <Input id='titulo' className='pdl' placeholder='' value={titulo} required onChange={(e) => setTitulo(e.target.value)} readOnly/>
                        </div>


                        <div>
                          <span>Empresa</span>
                          <Input id='titulo' className='pdl' placeholder='' value={empresa} required onChange={(e) => setEmpresa(e.target.value)} readOnly/>
                        </div>


                        <div>
                          <span>Localização</span>
                          <Input id='titulo' className='pdl' placeholder='' value={localizacao} required onChange={(e) => setLocalizacao(e.target.value)} readOnly/>
                        </div>


                        <div>
                          <span>Data de Inicio</span>
                          <Input id='titulo' tipo='date' className='pdl' placeholder='' value={inicio ? format(inicio, 'yyyy-MM-dd') : ''} required onChange={(e) => setInicio(e.target.value)} readOnly/>
                        </div>

                        <div>
                          <span>Data de Término</span>
                          <Input id='titulo' tipo='date' className='pdl' placeholder='' value={fim ? format(fim, 'yyyy-MM-dd') : ''} required onChange={(e) => setFim(e.target.value)} readOnly/>
                        </div>

                        </div>
                        <div className='flex flex-col gap-1 descExp'>
                          <span>Descrição</span>
                          <textarea id="areaExp" style={{ resize: 'none', height: 'calc(100% - 24px)', outline: 'none' }} value={descricao} required onChange={(e) => setDescricao(e.target.value)} maxLength={200} readOnly></textarea>
                        </div>


                      </form>



                      </div>

                      
                    )}
                  </div>
            )}
            {!block3 && (
              <div className='animate flex flex-col' style={{ height: '100%', gap: '5rem' }}>
  <div className='pd flex flex-row justify-between' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
    <div className="m flex flex-col gap-2" style={{ marginRight: '30px' }}>
      <h1 className='PassTit3'>Perfeito. Agora escreva uma biografia para contar ao mundo sobre você.</h1>
      <p className='PassPar3'>Ajude as empresas a conhecer você rapidamente. Qual trabalho você faz melhor? Diga-lhes claramente, usando parágrafos ou marcadores. Você sempre pode editar mais tarde; apenas certifique-se de revisar agora.</p>
    </div>
    <div className='txArea flex flex-col gap-2'>
      <span className='titArea'>Exemplo</span>
      <h3 className='subArea'>
        Sou desenvolvedor front-end especializado em criar interfaces intuitivas para aplicativos web e móveis. Utilizo HTML5, CSS3 e JavaScript para transformar conceitos complexos em designs funcionais. Reconhecido por minha dedicação em superar expectativas, estou sempre em busca de desafios para aplicar minha paixão pela tecnologia em soluções impactantes.
      </h3>
    </div>
  </div>
  <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '5rem' }}>
    <p className='PassPar2'>Sua Biografia</p>
    <textarea
      id="area2"
      style={{ height: '120px', maxWidth: '600px', resize: 'none', border: `2px solid ${border2}`, outline: 'none'}}
      maxLength={270}
      value={biografia}
      onChange={(e) => setBiografia(e.target.value)}
    />
    {texto2 && (
      <span className='flex gap-1 items-center span-erro'>
        <img src="icons/icon-erro.svg" alt="" />
        Adicione uma biografia para continuar
      </span>
    )}
  </div>
</div>

                )}
            {!block4 && (
   <div className='animate flex flex-col items-center' style={{ height: '100%', gap: '5rem' }}>
   <div className='pd flex flex-col text-center gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
     <h1 className='PassTit3'>Últimos detalhes, agora, você pode verificar e publicar seu perfil.</h1>
     <p className='PassPar3 self-center'>Uma foto profissional ajuda você a construir a confiança das empresas.</p>
   </div>
   <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '5rem' }}>
     <label htmlFor="file-upload" className='user'>
       {image ? (
         <img src={image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
       ) : (
         <FaUserPlus />
       )}
     </label>
   </div>
   <div className='flex flex-col gap-2' style={{ marginTop: '-100px' }}>
     <BtnPrincipal
       texto="Carregar Foto"
       color="#3B82F6"
       width="260px"
       height='40px'
       back="#fff"
       border="#3B82F6"
       borderRadius="20px"
       click={() => document.getElementById('file-upload').click()}  // Adicionando onClick para acionar o upload
     />
     <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
     <Link to='/Dashboard'>
       <BtnPrincipal
         texto="Continuar"
         color="#fff"
         width="260px"
         height='40px'
         back="#3B82F6"
         hover='#3A61D4'
         border="#3B82F6"
         borderRadius="20px"
         click={conta}
       />
     </Link>
   </div>
 </div>
 
            

               )}
              
                {block && (
                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick}>
                      <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>
                )}
                {!block2 && (
                    <div className="btnProximo2" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick2}>
                      <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>
                )}
                {!block3 && (
                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick3}>
                      <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>
                )}
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
};

export default TalentoPasso1;
