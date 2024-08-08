import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import UserVagasTag from '../UserVagasTag/UserVagasTag.jsx';
import { useUser as UsersVagasTag } from '../../services/UserContextVagasTag.jsx';
import './MainUserTalento.css'

const MainUser = () => {
  const { data2: userDataVagas, loading2, error2 } = UsersVagasTag();

  if (loading2) {
    return <div>Loading...</div>;
  }

  if (error2) {
    return <div>Error: {error2.message}</div>;
  }

  return (
    userDataVagas && (
      <div className='flex flex-col' style={{marginTop: '40px'}}>
        <span className='flex self-center title'>Vagas que você pode gostar</span>
        <div className="container2">
        <div>
            Avaliações....
        </div>
        <UserVagasTag/>
        <div>
            perfil
        </div>
        </div>
      </div>
    )
  );
};

export default MainUser;
