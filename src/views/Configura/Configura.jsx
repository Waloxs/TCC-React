import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import User from '../../services/UserProfile';
import './Configura.css';
import { FaPen } from "react-icons/fa";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import Footer from '../../components/Footer/Footer';
import { motion } from 'framer-motion';
import { FaCamera } from "react-icons/fa";



const Configura = () => {
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [userData, setUserData] = useState(null); 
    const [mostra, setMostra] = useState(true);
    const [image, setImage] = useState(null);


    const clickMostra = () => {
        setMostra(!mostra);
    }

    useEffect(() => {
        loadUserData(); // Carregar dados do usuário ao montar o componente
    }, []);

    const loadUserData = async () => {
        try {
            const response = await fetch('https://workzen.onrender.com/v1/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter os dados do usuário');
            }

            const userData = await response.json();
            setUserData(userData); // Atualiza o estado de userData com os dados da API
            setInput(userData.firstName || ''); // Inicializa o input com o valor do firstName
            setInput2(userData.lastName || ''); // Inicializa o input2 com o valor do lastName
            setInput3(userData.email || ''); // Inicializa o input3 com o valor do email
            setInput4(userData.image || ''); // Inicializa o input3 com o valor do email

        } catch (error) {
            console.error('Erro ao carregar os dados do usuário:', error); // Exibe o erro no console para depuração
            alert('Ocorreu um erro ao carregar os dados do usuário.');
        }
    };

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
        if (!userData) {
            console.error('Dados do usuário não estão carregados.');
            return;
        }

        const updatedUserData = { firstName: input, lastName: input2, email: input3, image: input4 };

        console.log(updatedUserData);

        try {
            const response = await fetch('https://workzen.onrender.com/v1/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(updatedUserData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar os dados');
            }

            setUserData(updatedUserData); // Atualiza o estado de userData com os novos dados
            alert('Dados atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error); // Exibe o erro no console para depuração
            alert('Ocorreu um erro ao atualizar os dados.');
        }
    };


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(file)); // Exibe a pré-visualização da imagem para o usuário
      
        // Prepara os dados para enviar via formData
        const formData = new FormData();
        formData.append('image', file); // 'profileImage' deve ser o nome do campo esperado pela API
      
        // Envia a requisição PUT
        
      const token = localStorage.getItem('authToken');
      
        fetch('https://workzen.onrender.com/v1/me/', {
          method: 'PUT',
          body: formData,
          headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          // Trata a resposta da API conforme necessário
          console.log('Imagem enviada com sucesso:', response);
          // Redireciona para a página de Dashboard após o envio
        })
        .catch(error => {
          console.error('Erro ao enviar imagem:', error);
          // Trata o erro conforme necessário
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

                    <div className='divPen' onClick={clickMostra} >
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
                    <BtnPrincipal texto="Salvar" color="#fff" width="200px" back="#3B82F6" hover='#3A61D4' click={saveChanges}>Salvar</BtnPrincipal> {/* Botão para salvar as mudanças */}
                </div>

            </motion.div>
            )}

            <Footer/>
        </div>
    );
};

export default Configura;
