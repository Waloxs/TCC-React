import Navbar from '../../components/Navbar/Navbar';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa';
import './Configura.css';
import { FaPen } from "react-icons/fa";
import Footer from '../../components/Footer/Footer';
import { useUser } from '../../services/UserContextEmpresa';



const Configura2 = () => {


    const { data, loading, error } = useUser();


    return (
        <div>

            
      <Navbar showDashnone={false} img={false} NavEmpresa={true} className='navDash' userDataEmpresa={UserEmpresa}/>


            <div className='Conta'>
                <div>
                    <h1 className='tit'>Conta</h1>
                </div>

                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='subt'>Nome</h1>
                        <UserEmpresa nome={true} />
                    </div>

                    <div className='divPen' onClick={''} >
                        <FaPen style={{ fontSize: '2rem'}} className='pen'/>
                    </div>
                </div>

                <div>
                    <h1 className='subt'>Email</h1>
                    <UserEmpresa email={true} />
                </div>

                <div>
                    <h1 className='subt'>CNPJ</h1>
                    <UserEmpresa cnpj={true} />
                </div>

                <div>
                    <h1 className='subt'>Área em que Atua:</h1>
                    <UserEmpresa areaAtua={true} />
                </div>
            </div>
            

            <Footer/>
        </div>
    );
};

export default Configura2;
