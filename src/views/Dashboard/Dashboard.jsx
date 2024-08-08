import MainUserTalento from '../../components/MainUserTalento/MainUserTalento.jsx';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css'

const Dashboard = () => {

  return (
    <div>
        <Navbar showDashnone={false} img={true} userTalento={true} className='navDash' userData={true} barraPesquisa={true}/>
        <MainUserTalento/>
    </div>
  );
};

export default Dashboard;
