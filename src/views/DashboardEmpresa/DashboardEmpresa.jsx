import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import axios from 'axios';
import MainUser from '../../components/MainUser/MainUser';

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
      <Navbar showDashnone={false} img={true} NavEmpresa={true} className='navDash'/>
      <MainUser/>
    </div>
  );
}

export default DashboardEmpresa;
