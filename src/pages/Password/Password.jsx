import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { HiOutlineMailOpen } from "react-icons/hi";
import './Password.css'
import BtnPrincipal from '../../components/Buttons/BtnPrincipal';
import { MdMarkEmailRead } from "react-icons/md";
import Input from '../../components/Form/input';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";




const Password = () => {

const [modal, setModal] = useState(true);
const [modal2, setModal2] = useState(false);
const [modal3, setModal3] = useState(false);

const [password, setPassword] = useState(false);
const [password2, setPassword2] = useState(false);


  const togglePassword = () => {
    setPassword(!password);
  }


  
  const togglePassword2 = () => {
    setPassword2(!password2);
  }



const handleModal = () => {
    setModal(false);
    setModal2(true);
}

const handleModal2 = () => {
    setModal2(false);
    setModal3(true);
}

  return (
    <div className='scr'>
        <Navbar link={false} criConta={false}/>

        {modal && (
    <div className='flex justify-center items-center' style={{height: '100%'}}>
        <div className='flex flex-col items-center justify-center br'>
            <HiOutlineMailOpen style={{fontSize: '12rem'}}/>


          <div>
            <div className='flex flex-col items-center'>
                <h1 className='titSenha'>Atualize sua Senha</h1>
                <h1 className='subSenha'>Insira seu endereço de Email e clique em <span className='env'>Enviar Email</span></h1>
            </div>

            <div style={{marginTop: '20px'}}>
                <h1 className='subSenha'>Email</h1>
                <input type="Email" />
            </div>

            <div style={{marginTop: '20px'}} className='flex items-center justify-end gap-6'>
                <h1 style={{color: '#1D4ED8'}} className='cancel'>Cancelar</h1>
                <BtnPrincipal texto="Enviar Email" color="#fff" width="200px" back="#3B82F6" hover='#3A61D4' click={handleModal}/>
            </div>
          </div>
        </div>
    </div>
        )}


        {modal2 && (
    <div className='flex justify-center items-center' style={{height: '100%'}}>
        <div className='flex flex-col items-center justify-center br' style={{ margin: '0 auto'}}>
            <MdMarkEmailRead style={{fontSize: '12rem'}}/>


          <div>
            <div className='flex flex-col items-center'>
                <h1 className='titSenha'>Email enviado!</h1>
            </div>

            <div style={{marginTop: '20px'}}>
                <h1 className='subSenha2'>Nós enviamos um email para você, Siga os passos fornecidos para atualizar sua senha ou clique em Entrar se você não deseja mudar sua senha agora.</h1>
            </div>

            <div style={{marginTop: '40px'}} className='flex items-center justify-end'>
                <BtnPrincipal texto="Entrar" color="#fff" width="200px" back="#3B82F6" hover='#3A61D4' click={handleModal2} />
            </div>
          </div>
        </div>
    </div>
        )}

    {modal3 && (
    <div className='flex justify-center items-center' style={{height: '100%'}}>
        <div className='flex flex-col items-center justify-center br' style={{ margin: '0 auto'}}>
            <RiLockPasswordLine style={{fontSize: '7rem'}}/>


          <div style={{width: '100%'}}>
            <div className='flex flex-col items-center'>
                <h1 className='titSenha'>Atualizar Senha</h1>
            </div>

            <div className='cpSenha' style={{marginTop: '20px'}}>
                <h1 className='subSenha2'>Nova Senha</h1>
                <Input name='senha' placeholder='Senha' type={password ? 'text' : 'password'} />
                {password ? (
                    <IoEyeOffSharp className='Eye' onClick={togglePassword} />
                  ) : (
                    <IoEyeSharp className='Eye' onClick={togglePassword} />
                  )}
            </div>


            <div className='cpSenha' style={{marginTop: '20px'}}>
                <h1 className='subSenha2'>Confirmar Senha</h1>
                <Input name='senha' placeholder='Confirmar Senha' type={password2 ? 'text' : 'password'} />
                {password2 ? (
                    <IoEyeOffSharp className='Eye' onClick={togglePassword2} />
                  ) : (
                    <IoEyeSharp className='Eye' onClick={togglePassword2} />
                  )}
            </div>

            <div style={{marginTop: '40px'}} className='flex items-center justify-center'>
                <BtnPrincipal texto="Atualizar Senha" color="#fff" width="200px" back="#3B82F6" hover='#3A61D4' />
            </div>
          </div>
        </div>
    </div>
    )}

    </div>
  )
}

export default Password
