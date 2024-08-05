import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css'

const Dashboard = () => {

  return (
    <div>
        <Navbar showDashnone={false} img={true} userTalento={true} className='navDash' userData={true}/>
    </div>
  );
};

export default Dashboard;
