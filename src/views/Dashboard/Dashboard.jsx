import MainUserTalento from '../../components/MainUserTalento/MainUserTalento.jsx';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css'
import { UserProvider } from '../../services/UserContext.jsx';

const Dashboard = () => {

  return (
    <div>
      <UserProvider>
        <Navbar showDashnone={false} img={true} userTalento={true} className='navDash' userData={true} barraPesquisa={true}/>
        <MainUserTalento/>
      </UserProvider>
    </div>
  );
};

export default Dashboard;
