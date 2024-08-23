import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import Input from '../Form/input.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './EditEmpresa.css';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { RiArrowDropDownLine } from 'react-icons/ri';

const EditEmpresa = () => {
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [ramo_atividade, setRamoAtividade] = useState('');
  const [texto, setTexto] = useState(false);

  const { data: userDataEmpresa, loading, error } = useUserEmpresa();


  useEffect(() => {
    if (userDataEmpresa) {
      setNome(userDataEmpresa.nome || '');
      setLocalizacao(userDataEmpresa.localizacao || '');
      setRamoAtividade(userDataEmpresa.ramo_atividade || '');
    }
  }, [userDataEmpresa]);

  const editarEmpresa = async () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const data = {
          nome,
          localizacao,
          ramo_atividade,
        };

        const response = await axios.put('https://workzen.onrender.com/v1/empresa/profile', data, config);


        setNome(response.data.nome || '');
        setLocalizacao(response.data.localizacao || '');
        setRamoAtividade(response.data.ramo_atividade || '');

        console.log(response.data)


        setTexto(true);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    } else {
      console.error('Token não encontrado no localStorage');
    }
  };


  return (
    userDataEmpresa && (
      <div className='formCriar flex flex-col'>
        <div className='flex flex-col gap-4' style={{ marginTop: '30px', width: '100%', height: '100%' }}>
          <div className='flex flex-col gap-2'>
            <span>Nome da Empresa</span>
            <Input type='text' required value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2'>
            <span>Localização</span>
            <Input type='text' required value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2'>
            <span>Área de Atuação</span>

            <div className="select-wrapper">
                  <select id="areaDeAtuacao2" style={{width: '100%'}} value={ramo_atividade} onChange={(e) => {setRamoAtividade(e.target.value)}}>
  <option value="" hidden>Área de Atuação</option>
  <option value="Administracao">Administração</option>
  <option value="Agricultura">Agricultura</option>
  <option value="AlimentosEBebidas">Alimentos e Bebidas</option>
  <option value="Automobilistica">Automobilística</option>
  <option value="ConstrucaoCivil">Construção Civil</option>
  <option value="Consultoria">Consultoria</option>
  <option value="Educacao">Educação</option>
  <option value="Energia">Energia</option>
  <option value="Financeiro">Financeiro</option>
  <option value="Industria">Indústria</option>
  <option value="Logistica">Logística</option>
  <option value="MarketingEPublicidade">Marketing e Publicidade</option>
  <option value="Saude">Saúde</option>
  <option value="TecnologiaDaInformacao">Tecnologia da Informação</option>
  <option value="Telecomunicacoes">Telecomunicações</option>
  <option value="Varejo">Varejo</option>
</select>

<RiArrowDropDownLine className="select-icon" />

</div>
          
          </div>
        </div>

        <div className='flex self-end' style={{ marginTop: '40px', marginBottom: '40px' }}>
          <BtnPrincipal
            texto="Editar Perfil"
            back='#3B82F6'
            padding='10px'
            borderRadius='15px'
            color='#fff'
            font='Lexend'
            width='180px'
            click={editarEmpresa}
          />
        </div>

        {texto && (
          <div>Perfil atualizado com sucesso!</div>
        )}
      </div>
    )
  );
};

export default EditEmpresa;
