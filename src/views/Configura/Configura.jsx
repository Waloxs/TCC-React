import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import User from '../../components/UserProfile/UserProfile';
import './Configura.css';
import { FaPen, FaCamera } from "react-icons/fa";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import Footer from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import { useUser } from '../../services/UserContext';
import { axiosInstance, setAuthToken } from '../../utils/api.js';



const Configura = () => {
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [userData, setUserData] = useState(null); 
    const [mostra, setMostra] = useState(true);
    const [image, setImage] = useState(null);

    const { data, loading, error } = useUser();

    useEffect(() => {
        if (data) {
            setInput(data.firstName || '');
            setInput2(data.lastName || '');
            setInput3(data.email || '');
            setUserData(data);
        }
    }, [data]);

    if (loading) return <div><p>Loading...</p></div>;
    if (error) return <p>Error: {error.message}</p>;

    const clickMostra = () => {
        setMostra(!mostra);
    }

    const handleInputChange1 = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const handleInputChange2 = (e) => {
        const { value } = e.target;
        setInput2(value);
    };

    const handleInputChange3 = (e) => {
        const { value } = e.target;
        setInput3(value);
    };
    const saveChanges = async () => {
        if (!data) {
            console.error('Dados do usuário não estão carregados.');
            return;
        }
    
        const updatedUserData = { firstName: input, lastName: input2, email: input3 };
    
        console.log(updatedUserData);
    
        try {
            const response = await axiosInstance.put('/me', updatedUserData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
    
            setUserData(response.data); // Atualiza o estado de userData com os dados retornados pela API
            alert('Dados atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
            alert('Ocorreu um erro ao atualizar os dados.');
        }
    };
    

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file)); 
    
        const formData = new FormData();
        formData.append('image', file); 
    
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
    
        axiosInstance.put('/me/image', formData, { 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' 
            }
        })
        .then(response => {
            console.log('Imagem enviada com sucesso:', response);
        })
        .catch(error => {
            console.error('Erro ao enviar imagem:', error);
        });
    };
    
    return (
        <div>
            <Navbar showDashnone={false} img={true} className='navDash' />

            <div className='Conta'>
                <div>
                    <h1 className='tit'>Conta</h1>
                </div>

                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='subt'>ID Usuário</h1>
                        <User id={true} />
                    </div>

                    <div className='divPen' onClick={clickMostra}>
                        <FaPen style={{ fontSize: '2rem'}} className='pen'/>
                    </div>
                </div>

                <div>
                    <h1 className='subt'>Nome</h1>
                    <User nome={true} />
                </div>

                <div>
                    <h1 className='subt'>Sobrenome</h1>
                    <User sobrenome={true} />
                </div>

                <div>
                    <h1 className='subt'>Email</h1>
                    <User email={true} />
                </div>
            </div>
            
            {!mostra && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 1 }} className="Conta2">
                    <div className='flex items-center justify-between'>
                        <h1 className='tit'>Conta</h1>

                        <div>
                            <label htmlFor="file-upload" className='user'>
                                {image ? (
                                    <img src={image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    userData && userData.image && (
                                        <img src={`${userData.image}`} alt="User Avatar" className='imgModal2' />
                                    )
                                )}
                                <FaCamera className="cameraIcon" />
                            </label>
                            <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div>
                        <label className='subt'>Nome</label>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange1}
                        />
                    </div>

                    <div>
                        <label className='subt'>Sobrenome</label>
                        <input
                            type="text"
                            value={input2}
                            onChange={handleInputChange2}
                        />
                    </div>

                    <div>
                        <label className='subt'>Email</label>
                        <input
                            type="email"
                            value={input3}
                            onChange={handleInputChange3}
                        />
                    </div>

                    <div style={{marginTop: '20px'}}>
                        <BtnPrincipal texto="Salvar" color="#fff" width="200px" back="#3B82F6" hover='#3A61D4' click={saveChanges}>Salvar</BtnPrincipal>
                    </div>
                </motion.div>
            )}

            <Footer/>
        </div>
    );
};

export default Configura;
