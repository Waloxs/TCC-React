import MainUserTalento from '../../components/MainUserTalento/MainUserTalento.jsx';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css'
import { UserProvider as UserDados} from '../../services/UserContext.jsx';
import { UserProvider as UserDadosEmpresa} from '../../services/UserContextEmpresa.jsx';
import { UserProvider as VagasTag } from '../../services/UserContextVagasTag.jsx';

const Dashboard = () => {


  return (
    <div>
      <UserDados>
        <VagasTag>
        <UserDadosEmpresa>
        <Navbar showDashnone={false} img={true} userTalento={true} className='navDash' userData={true} barraPesquisa={true}/>
        <MainUserTalento/>
        </UserDadosEmpresa>
        </VagasTag>
      </UserDados>
    </div>
  );
};

export default Dashboard;
