import { useState, useEffect } from 'react';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import './TalentoPasso1.css';
import { Link } from 'react-router-dom';
import Input from '../../components/Form/input';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import User from '../../components/UserProfile/UserProfile.jsx';
import { useUser as useUserTalento } from '../../services/UserContext';


const TalentoPasso1 = () => {
  const [block, setBlock] = useState(true);
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
  const [experiencia, setExperiencia] = useState(null);
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [profissional, setProfissional] = useState('');
  const [biografia, setBiografia] = useState('');
  const { data: user } = useUserTalento();



  const handleRegister = async () => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
  
        const data = {
         titulo: profissional,
        };
  
        const response = await axios.put('https://workzen.onrender.com/v1/me', data, config);
        console.log('Dados enviados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };
  

  const handleRegister2 = async () => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
  
        const data = {
         bio: biografia,
        };
  
        const response = await axios.put('https://workzen.onrender.com/v1/me', data, config);
        console.log('Dados enviados com sucesso:', response.data);
        // Aqui você pode adicionar lógica adicional após enviar os dados
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        // Aqui você pode lidar com erros de requisição
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
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
    e.preventDefault();
    handleRegister();
    setBlock(!block);
    setBlock2(!block2);
    setValor('Azul50');
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    setBlock2(!block2);
    setBlock3(!block3);
    setValor('Azul75');

  };

  const handleClick3 = (e) => {
    e.preventDefault();
    handleRegister2();
    setBlock3(!block3);
    setBlock4(!block4);
    setValor('Azul100');
  };





  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    
    if (form.checkValidity()) {
      const experienciaData = {
        title: titulo,
        company: empresa,
        localizacao,
        dataInicio: inicio,
        dataTermino: fim,
        description: descricao
      };
  
  // Obter o token do localStorage
const token = localStorage.getItem('authToken');

// Verificar se o token existe
if (token) {
  try {
    // Configurar o header de autorização com o token
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    // Fazer a requisição POST usando Axios
    const response = await axios.post('https://workzen.onrender.com/v1/me/xp', experienciaData, config);
    const dados = await axios.get('https://workzen.onrender.com/v1/me/xp', config)

  

    setExperiencia(dados.data)

    console.log(dados);
    // Processar a resposta
    console.log('Dados enviados com sucesso:', response.data);
    // Aqui você pode adicionar lógica adicional após enviar os dados
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    // Aqui você pode lidar com erros de requisição
  }
} else {
  console.error('Token não encontrado no localStorage');
}

    } else {
      form.reportValidity();
    }
  };
  const handleBackClick = (e) => {
    e.preventDefault();
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

  fetch('https://workzen.onrender.com/v1/me/', {
    method: 'PUT',
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


  return (
    <>
    {user && (
    <div className={`${back ? 'back' : ''} tudo flex justify-center`} style={{ width: '100vw' }}>
      {modal && (
        <div className='containAdc' style={{ width: '35rem', height: '40rem' }}>
          <form action="" className='FormAdc' onSubmit={handleSave}>
            <IoIosArrowBack onClick={click} className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF', marginLeft: '-10px', marginBottom: '-10px', cursor: 'pointer' }} />
            <h1 className='titAdc'>Adicione sua experiência profissional</h1>
            <div className='flex flex-col gap-3' style={{ height: '80%', width: '100%', marginTop: '20px' }}>
              <div>
                <label htmlFor='titulo'>Título</label>
                <Input id='titulo' className='pdl' placeholder='Ex: Desenvolvedor Back-end' value={titulo} required onChange={(e) => setTitulo(e.target.value)}/>
              </div>
              <div>
                <label htmlFor='empresa'>Empresa</label>
                <Input id='empresa' className='pdl' placeholder='Ex: Hexalab' value={empresa} required onChange={(e) => setEmpresa(e.target.value)} />
              </div>
              <div>
                <div className='gr1'>
                  <div>
                  <label htmlFor="cidade">Cidade:</label><br/>
                  <div className='select-wrapper2'>
                      <select id="cidade" value={localizacao}  required onChange={(e) => setLocalizacao(e.target.value)} style={{width: '100%'}} >
                        <option value="">Selecione uma cidade</option>
                            {cidades.map((cidade, index) => (
                              <option key={index} value={cidade}>
                        {cidade}
                    </option>
                      ))}
                  </select>

                  
                  </div>
                  </div>

                  <div>        
                    <label htmlFor="estado">Estado:</label><br/>
                  <div className='select-wrapper2'>
                    <select id="estado" onChange={e => {setEstadoSelecionado(e.target.value) , setEstado(e.target.value)}} value={estado} style={{width: '100%'}} required>
                    <option value="" style={{marginLeft: '10px'}}>Selecione um estado</option>
                    {estados.map(estado => (
                    <option key={estado.codigo} value={estado.codigo}>
                    {estado.nome}
                    </option>
                    ))}
                    </select>
                  </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='gr2'>
                  <div>
                    <label htmlFor='inicio'>Data de Início</label>
                    <Input className='data' id='inicio' type='date' value={inicio} required onChange={(e) => setInicio(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor='fim'>Data de Termino</label>
                    <Input className='data' id='fim' type='date' value={fim} required onChange={(e) => setFim(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="area">Descrição</label>
                <textarea id="area" style={{ height: '120px', resize: 'none' }} value={descricao} required onChange={(e) => setDescricao(e.target.value)} maxLength={200}></textarea>
              </div>
              <div className='ct flex self-end'  onClick={handleSave} >
                <BtnPrincipal texto="Salvar" color="#fff" width="200px" back="#3B82F6" className='fontbtn' borderRadius="20px" padding="10px"/>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className={`${sombra ? 'sombra' : ''} container2 flex flex-col justify-center items-center`} style={{ width: '70rem', background: '#fff', height: '100vh', gap: '30px', marginTop: '10px', padding: '20px' }}>
        <div className="containerLogo2" style={{ width: '100%' }}>
          <Link to="/" style={{ width: '100%' }}>
            <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
          </Link>
        </div>
        <div className="conteudo flex" style={{ width: '100%', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
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
                <h1 className='PassTit'>Muito bem <User nome={true} />, agora, adicione um título para contar ao mundo o que você faz.</h1>
                  <p className='PassPar'>É a primeira coisa que as Empresas veem, então faça valer a pena. Destaque-se descrevendo sua experiência com suas próprias palavras.</p>
                </div>
                <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem' }}>
                  <p className='func'>Sua função Profissional</p>
                  <Input type='text' placeholder='Ex: Programador Fullstack' className='lin' required value={profissional} onChange={(e) => setProfissional(e.target.value)}/>
                </div>
              </div>
            )}
            {!block2 && (
                  <div className='animate flex flex-col justify-between' style={{ height: '100%', gap: '5rem' }}>
                    <div className='pd2 flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                      <h1 className='PassTit2'>Ótimo, agora, se você tiver experiência profissional relevante, adicione-a aqui.</h1>
                      <p className='PassPar2'>Talentos que colocam sua experiência têm duas vezes mais chances de ganhar trabalho. Mas se você está apenas começando, ainda pode criar um ótimo perfil. Basta ir para a próxima página.</p>
                    </div>
                    {experiencia && experiencia.length > 0 && (
  <div className='tudoExp flex flex-col gap-3' style={{paddingLeft: '4rem', paddingRight: '4rem', width: '100%'}}>
    <h1 className='expTitPr'>Sua Primeira Experiência</h1>
    <div className="flex gap-5">
      <div className='bord flex flex-col p-5 gap-2' style={{width: '250px'}}>
        <div className='flex flex-col'>
          <h1 className='expTit'>Título</h1>
          <span className='PassPar2'>{experiencia[0].title}</span>
        </div>

        <div className='flex flex-col'>
          <h1 className='expTit'>Empresa</h1>
          <span className='PassPar2'>{experiencia[0].company}</span>
        </div>

        <div className='flex flex-col'>
          <h1 className='expTit'>Localização</h1>
          <span className='PassPar2'>{experiencia[0].localizacao}</span>
        </div>

        <div className='flex flex-col'>
          <h1 className='expTit'>Data de Início e Término</h1>
          <span className='PassPar2'>{experiencia[0].dataInicio} - {experiencia[0].dataTermino}</span>
        </div>
      </div>

      <div className="bord p-5" style={{width: '250px'}}>
        <div className="flex flex-col">
          <h1 className='expTit'>Descrição</h1>
          <span className='descAdc'>{experiencia[0].description}</span>
        </div>
      </div>
    </div>
  </div>
)}

                    <div className='cx flex flex-row gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem' }}>
                      <div onClick={click} style={{ cursor: 'pointer' }}>
                        <BtnPrincipal texto="Adicionar Expêriencia" color="#fff" width="200px" back="#3B82F6" className='fontbtn' hover='#3A61D4' borderRadius="20px" padding="10px"/>
                      </div>
                      <div onClick={handleClick2} style={{cursor: 'pointer'}}>
                        <BtnPrincipal texto="Pular por enquanto" color="#3B82F6" width="200px" back="#f7f7f7" className='fontbtn' hoverColor="#3A61D4" borderRadius="20px" padding="10px"/>
                      </div>
                    </div>
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
                        <h3 className='subArea'>Sou desenvolvedor front-end especializado em criar interfaces intuitivas para aplicativos web e móveis. Utilizo HTML5, CSS3 e JavaScript para transformar conceitos complexos em designs funcionais. Reconhecido por minha dedicação em superar expectativas, estou sempre em busca de desafios para aplicar minha paixão pela tecnologia em soluções impactantes.</h3>
                      </div>
                    </div>
                    <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '5rem' }}>
                      <p className='PassPar2'>Sua Biografia</p>
                      <label htmlFor="area2">Biografia</label>
                    <textarea
                      id="area2"
                      style={{ height: '120px', maxWidth: '600px', resize: 'none' }}
                      value={biografia}
                      onChange={(e) => setBiografia(e.target.value)}
                    />
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
      <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
    </div>
    <div className='flex flex-col gap-2' style={{ marginTop: '-100px' }}>
      <label htmlFor="file-upload" className='user'>
        <BtnPrincipal texto="Carregar Foto" color="#3B82F6" width="260px" back="#fff" border="1px solid #3B82F6" borderRadius="20px" padding="10px"></BtnPrincipal>
      </label>
      <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
      <Link to='/Dashboard'><BtnPrincipal texto="Continuar" color="#fff" width="260px" back="#3B82F6" hover='#3A61D4' border="1px solid #3B82F6" /></Link>
    </div>
  </div>
               )}
              
                {block && (
                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick}>
                      <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6" hover='#3A61D4' borderRadius="20px" padding="10px"/>
                    </div>
                )}
                {!block2 && (
                    <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick2}>
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
