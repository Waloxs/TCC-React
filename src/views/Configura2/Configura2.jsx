import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import UserEmpresa from '../../components/Request/Get/UserEmpresa';
import './Configura.css';
import { FaPen } from "react-icons/fa";
import Footer from '../../components/Footer/Footer';



const Configura2 = () => {



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
