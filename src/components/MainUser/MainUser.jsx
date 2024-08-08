import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import './MainUser.css';

const MainUser = () => {
  const { data: userDataEmpresa, loading, error } = useUserEmpresa();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    userDataEmpresa && (
      <div className="Container">
        <div>Categoria</div>
        <div>oi</div>
        <div className='modalConfigura'>
          <div className='perEmp'>
            <UserEmpresa className='' prLet={true} size={'3rem'} />
          </div>
          <div className='flex flex-col items-center'>
            <UserEmpresa nome={true} className='nomeEmp' />
            <span>Empresa</span>
          </div>
          <div className="linha"></div>
          <BtnPrincipal texto='Editar Perfil' back='#2563EB' padding='15px 55px' borderRadius='20px' color='#fff' width="100%"/>
          <BtnPrincipal texto='Criar Vaga' back='#fff' padding='15px 55px' borderRadius='20px' color='#2563EB' width="100%" border="#2563EB"/>
        </div>
      </div>
    )
  );
};

export default MainUser;
