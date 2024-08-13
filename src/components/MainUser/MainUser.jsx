import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import UserVagasEmpresa from '../UserVagasEmpresa/UserVagasEmpresa.jsx';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import { useUser as useUserVagasEmpresa } from '../../services/UserContextVagasEmpresa.jsx';

import './MainUser.css';

const MainUser = () => {
  const { data: userDataEmpresa, loading, error } = useUserEmpresa();
  const { data: userDataVagasEmpresa, loading2, error2 } = useUserVagasEmpresa();


  if (loading || loading2) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
  }


  if (error2) {
    return <div>Error: {error2?.message}</div>;
  }

  return (
    userDataEmpresa && (
      <div className="Container">
        <div>Categoria</div>
        {userDataVagasEmpresa && (
          <UserVagasEmpresa/>
        )}
        <div className='modalConfigura'>
          <div className='perEmp'>
            <UserEmpresa className='' prLet={true} size={'3rem'} />
          </div>
          <div className='flex flex-col items-center'>
            <UserEmpresa nome={true} className='nomeEmp' />
            <span className='span-texto'>Empresa</span>
          </div>
          <div className="linha"></div>
          <BtnPrincipal texto='Editar Perfil' back='#2563EB' padding='15px' borderRadius='25px' color='#fff' width="85%" />
        </div>
      </div>
    )
  );
};

export default MainUser;
