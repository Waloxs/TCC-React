import React from 'react'
import './Footer.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
          width: '80rem',
          marginLeft: '20px',
          marginRight: '20px',
      }}>
        <div>
          <h1 className='h1Footer'>Para Empresas</h1>
          <a href='' className='SubFooter'>Como anunciar vaga</a>
        </div>

        <div>
          <h1 className='h1Footer'>Para Talentos</h1>
          <a href='' className='SubFooter'>Como encontrar trabalho</a>
        </div>

        <div>
          <h1 className='h1Footer'>Recursos</h1>
          <a href='' className='SubFooter'>Como encontrar trabalho</a>
        </div>

        <div>
          <h1 className='h1Footer'>Entre em contato</h1>
          <h2 className='SubFooter'>Endereço: Rua Edilson Araújo, Cará-cará - Ponta Grossa/PR</h2>
          <h2 className='SubFooter'>Tel: (15) 99665-1551</h2>
        </div>
      </div>

      <div className='footerTabMob flex flex-col justify-between' style={{
          marginTop: '2rem',
          padding: '2rem',
          gap: '20px',
          borderRadius: '1.5625rem 1.5625rem 0rem 0rem',
          background: 'var(--blackclear, #202020)',
          width: '80rem',
          marginLeft: '20px',
          marginRight: '20px',
      }}>
        <div>
          <div className='flex justify-between items-center'>
            <h1 className='h1Footer'>Para Empresas</h1>
            {dropStates.empresas ? (
              <IoIosArrowUp className='down' style={{color: '#fff'}} onClick={() => clicou('empresas')} />
            ) : (
              <IoIosArrowDown className='down' style={{color: '#fff'}} onClick={() => clicou('empresas')} />
            )}
          </div>
          <div className="line"></div>
          {dropStates.empresas && (
            <div>
              <span className='spanFooter'>Como anunciar vaga</span>
            </div>
          )}
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <h1 className='h1Footer'>Para Talentos</h1>
            {dropStates.talentos ? (
              <IoIosArrowUp className='down' style={{color: '#fff'}} onClick={() => clicou('talentos')} />
            ) : (
              <IoIosArrowDown className='down' style={{color: '#fff'}} onClick={() => clicou('talentos')} />
            )}
          </div>
          <div className="line"></div>
          {dropStates.talentos && (
            <div>
              <span className='spanFooter'>Como encontrar trabalho</span>
            </div>
          )}
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <h1 className='h1Footer'>Recursos</h1>
            {dropStates.recursos ? (
              <IoIosArrowUp className='down' style={{color: '#fff'}} onClick={() => clicou('recursos')} />
            ) : (
              <IoIosArrowDown className='down' style={{color: '#fff'}} onClick={() => clicou('recursos')} />
            )}
          </div>
          <div className="line"></div>
          {dropStates.recursos && (
            <div>
              <span className='spanFooter'>Ajuda e Suporte</span><br />
              <span className='spanFooter'>Histórias de Sucesso</span>
            </div>
          )}
        </div>

        <div>
          <h1 className='h1Footer'>Entre em contato</h1>
          <h2 className='SubFooter'>Endereço: Rua Edilson Araújo, Cará-cará - Ponta Grossa/PR</h2>
          <h2 className='SubFooter'>Tel: (15) 99665-1551</h2>
        </div>
      </div>
    </div>
  )
}

export default Footer
