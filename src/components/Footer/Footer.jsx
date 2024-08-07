import React from 'react'
import './Footer.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";


const Footer = () => {
  const [dropStates, setDropStates] = React.useState({
    empresas: false,
    talentos: false,
    recursos: false,
  });

  function clicou(section) {
    setDropStates(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  }

  return (
    <div className="flex justify-center">
      <div className='footer flex justify-between' style={{
          marginTop: '2rem',
          padding: '5rem',
          borderRadius: '1.5625rem 1.5625rem 0rem 0rem',
          background: 'var(--blackclear, #202020)',
          width: '90vw',
          marginLeft: '20px',
          marginRight: '20px',
      }}>
        <div>
          <h1 className='h1Footer'>Para Empresas</h1>
          <a href='' className='linkfooter SubFooter'>Como anunciar vaga</a>
        </div>

        <div>
          <h1 className='h1Footer'>Para Talentos</h1>
          <a href='' className='linkfooter SubFooter'>Como encontrar trabalho</a>
        </div>

        <div>
          <h1 className='h1Footer'>Recursos</h1>
          <a href='' className='linkfooter SubFooter'>Como encontrar trabalho</a>
        </div>

        <div>
          <h1 className='h1Footer'>Entre em contato</h1>
          <h2 className='SubFooter'>Endereço: Rua Edilson Araújo, Cará-cará - Ponta Grossa/PR</h2>
          <h2 className='SubFooter'>Tel: (15) 99665-1551</h2>

          <div className="flex justify-end gap-8">
            <a href='https://www.instagram.com/workzenup/' className="contain1">
              <FaInstagram className='iconRedes1'/>
            </a>

            <a href='https://github.com/Waloxs/TCC-React' className="contain2">
              <IoLogoGithub className='iconRedes2'/>
            </a>

            <a href='mailto:waloxgustavo0@gmail.com' className="contain3">
              <MdOutlineEmail className='iconRedes3'/>
            </a>
          </div>
        </div>
      </div>

      <div className='footerTabMob flex flex-col justify-between' style={{
          marginTop: '2rem',
          padding: '2rem',
          gap: '20px',
          borderRadius: '1.5625rem 1.5625rem 0rem 0rem',
          background: 'var(--blackclear, #202020)',
          width: '90vw',
          marginLeft: '20px',
          marginRight: '20px',
      }}>
        <div style={{cursor: 'pointer'}}>
          <div className='flex justify-between items-center' onClick={() => clicou('empresas')}>
            <h1 className='h1Footer'>Para Empresas</h1>
            {dropStates.empresas ? (
              <IoIosArrowUp className='down' style={{color: '#fff'}} />
            ) : (
              <IoIosArrowDown className='down' style={{color: '#fff'}}  />
            )}
          </div>
          <div className="linef"></div>
          {dropStates.empresas && (
            <div>
              <a href='/' className='linkfooter spanFooter'>Como anunciar vaga</a>
            </div>
          )}
        </div>

        <div style={{cursor: 'pointer'}}>
          <div className='flex justify-between items-center' onClick={() => clicou('talentos')}>
            <h1 className='h1Footer'>Para Talentos</h1>
            {dropStates.talentos ? (
              <IoIosArrowUp className='down' style={{color: '#fff'}} />
            ) : (
              <IoIosArrowDown className='down' style={{color: '#fff'}}/>
            )}
          </div>
          <div className="linef"></div>
          {dropStates.talentos && (
            <div>
              <a href='/' className='linkfooter spanFooter'>Como achar um emprego</a>
            </div>
          )}
        </div>

        <div style={{cursor: 'pointer'}}>
          <div className='flex justify-between items-center' onClick={() => clicou('recursos')}>
            <h1 className='h1Footer'>Recursos</h1>
            {dropStates.recursos ? (
              <IoIosArrowUp className='down' style={{color: '#fff'}} />
            ) : (
              <IoIosArrowDown className='down' style={{color: '#fff'}} />
            )}
          </div>
          <div className="linef"></div>
          {dropStates.recursos && (
            <div>
              <a href='/' className='linkfooter spanFooter'>História de Sucesso</a>
            </div>
          )}
        </div>

        <div>
          <h1 className='h1Footer'>Entre em contato</h1>
          <h2 className='SubFooter'>Endereço: Rua Edilson Araújo, Cará-cará-Ponta Grossa/PR</h2>
          <h2 className='SubFooter'>Tel: (15) 99665-1551</h2>

          
          <div className="flex gap-8" style={{marginTop: '30px'}}>
            <a href='https://www.instagram.com/workzenup/' className="contain1">
              <FaInstagram className='iconRedes1'/>
            </a>

            <a href='https://github.com/Waloxs/TCC-React' className="contain2">
              <IoLogoGithub className='iconRedes2'/>
            </a>

            <a href='mailto:waloxgustavo0@gmail.com' className="contain3">
              <MdOutlineEmail className='iconRedes3'/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
