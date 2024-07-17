import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import User from '../../components/Request/Get/UserProfile';
import './Configura.css';
import { FaPen } from "react-icons/fa";
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';

const Configura = () => {
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [userData, setUserData] = useState(null); 

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

        const updatedUserData = { ...userData, firstName: input, lastName: input2, email: input3 };

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

                    <FaPen style={{ cursor: 'pointer', fontSize: '2rem'}} />
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

            <div className="Conta2">
                <h1 className='tit'>Conta</h1>

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

            </div>
        </div>
    );
};

export default Configura;
