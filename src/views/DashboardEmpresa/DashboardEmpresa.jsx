import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import axios from 'axios';

const DashboardEmpresa = () => {
  const navigate = useNavigate();
  const [userDataEmpresa, setUserDataEmpresa] = useState(null);
  const [dataVaga, setDataVaga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descric, setDescric] = useState('');
  const [requiriment, setRequiriment] = useState('');
  const [tags, setTags] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');

    if (form.checkValidity()) {
      let dados = {
        title: titulo,
        description: descric,
        requirements: requiriment,
        tags: tags.map(tag => tag.value)
      };

      const fetchDados = async () => {
        const token = localStorage.getItem('authToken');
        
        try {
          const response = await fetch('https://workzen.onrender.com/v1/jobs/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dados)
          });

          const data = await response.json();
          console.log(data);
          
        } catch (error) {
          console.log('Erro no try', error);
        }
      }
      fetchDados();
    } else {
      form.reportValidity();
    }
  }

  const handleTagChange = (selectedOptions) => {
    setTags(selectedOptions);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken'); 

      try {
        const response = await fetch('https://workzen.onrender.com/v1/empresa/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserDataEmpresa(data);
        console.log(data);
      } catch (error) {
        navigate('/Empresa');  
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchVaga = async () => {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get(`https://workzen.onrender.com/v1/jobs/companyJobs`, config);
        setDataVaga(response.data.jobs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

      fetchVaga();

  }, [userDataEmpresa]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tagOptions = [
    { value: 'Desenvolvedor', label: <span>Desenvolvedor</span> },
    { value: 'Full Stack', label: <span>Full Stack</span>},
    { value: 'React', label: <span>React</span>},
    { value: 'Node.js', label: <span>Node JS</span>},
    { value: 'SQL', label: <span>SQL</span>},
  ];

  return (
    <div>
      <Navbar showDashnone={false} img={false} NavEmpresa={true} className='navDash' userDataEmpresa={userDataEmpresa} />

      <form className='w-[30vw]' onSubmit={handleSave}>
        <label htmlFor="titulo">Insira um titulo</label>
        <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

        <label htmlFor="descric">Insira uma descricao</label>
        <input type="text" id="descric" value={descric} onChange={(e) => setDescric(e.target.value)} />

        <label htmlFor="requiriment">Insira um requirimento</label>
        <input type="text" id="requiriment" value={requiriment} onChange={(e) => setRequiriment(e.target.value)} />

        <label htmlFor="tags">Escolha os items:</label><br />
        <Select
          id="tags"
          value={tags}
          onChange={handleTagChange}
          options={tagOptions}
          isMulti
          isSearchable={false}
          placeholder="Selecione..."
        />

        <BtnPrincipal type='submit' texto='Criar Vaga' width='100%' back='#0866FF' color='#fff' hover='#3A61D4'/>
      </form>

      <div className="vaga">
       <h1>{dataVaga.map((item) => 
      
        <h1 key={item.id}>{item.title}</h1>
      
      )}</h1> 
      </div>
    </div>
  );
}

export default DashboardEmpresa;
