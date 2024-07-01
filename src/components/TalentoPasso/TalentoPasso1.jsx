import React from 'react';
import Logo from '../../assets/Logo.png';
import { IoIosArrowBack } from "react-icons/io";
import './TalentoPasso1.css';
import { Link } from 'react-router-dom';
import Input from '../Form/input';
import BtnPrincipal from '../Buttons/BtnPrincipal';

const TalentoPasso1 = () => {
  const [block, setBlock] = React.useState(true);
  const [block2, setBlock2] = React.useState(true);


  const handleClick = (e) => {
    e.preventDefault();
    setBlock(!block);
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    setBlock2(!block2);
  };

  return (
    <div className='tudo flex justify-center' style={{ width: '100vw' }}>
      <div className='container2 flex flex-col justify-center items-center' style={{ width: '70rem', background: '#fff', height: '100vh', gap: '30px', marginTop: '10px', padding: '20px' }}>
        <div className="containerLogo2" style={{ width: '100%' }}>
          <Link to="/" style={{ width: '100%' }}>
            <img src={Logo} alt="Logo" style={{ height: '1.10rem' }} />
          </Link>
        </div>
        <div className="conteudo flex" style={{ width: '100%', height: 'auto', background: '#f7f7f7', borderRadius: '1.25rem' }}>
          <div className='flex flex-col' style={{ height: '35rem', width: '100%' }}>
            <Link to="/Talento"><IoIosArrowBack className='m-6' style={{ fontSize: '1.5rem', color: '#0866FF' }} /></Link>

            {block && (
              <div className='flex flex-col' style={{ height: '100%', gap: '5rem' }}>
                <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                  <h1 className='PassTit'>Muito bem, agora, adicione um título para contar ao mundo o que você faz.</h1>
                  <p className='PassPar'>É a primeira coisa que as Empresas veem, então faça valer a pena. Destaque-se descrevendo sua experiência com suas próprias palavras.</p>
                </div>

                <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem' }}>
                  <p className='func'>Sua função Profissional</p>
                  <Input type='text' placeholder='Ex: Programador Fullstack' className='lin' />
                </div>
              </div>
            )}


        {block2&& (
            <>
            {!block&& (
              <div className='flex flex-col justify-between' style={{ height: '100%', gap: '5rem' }}>
                <div className='pd2 flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                  <h1 className='PassTit2'>Ótimo, agora, se você tiver experiência profissional relevante, adicione-a aqui.</h1>
                  <p className='PassPar2'>Talentos que colocam sua experiência têm duas vezes mais chances de ganhar trabalho. Mas se você está apenas começando, ainda pode criar um ótimo perfil. Basta ir para a próxima página.</p>
                </div>

                <div className='cx flex flex-row gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem',  marginBottom: '3rem'}}>
                    <BtnPrincipal texto="Adicionar Expêriencia" color="#fff" width="200px" back="#3B82F6" className='fontbtn'/>
                    <BtnPrincipal texto="Pular por enquanto" color="#3B82F6" width="200px" back="#f7f7f7" className='fontbtn'/>
                </div>
              </div>
            )}
            </>
        )}

            {!block2&& (
              <div className='flex flex-col' style={{ height: '100%', gap: '5rem' }}>
                <div className='pd flex flex-row justify-between' style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
                    <div className="m flex flex-col gap-2" style={{marginRight: '30px'}}>
                        <h1 className='PassTit3'>Perfeito. Agora escreva uma biografia para contar ao mundo sobre você.</h1>
                        <p className='PassPar3'>Ajude as empresas a conhecer você rapidamente. Qual trabalho você faz melhor? Diga-lhes claramente, usando parágrafos ou marcadores. Você sempre pode editar mais tarde; apenas certifique-se de revisar agora.</p>
                    </div>

                    <div className='txArea flex flex-col gap-2'>
                        <span className='titArea'>Exemplo</span>
                        <h3 className='subArea'>Sou desenvolvedor front-end especializado em criar interfaces intuitivas para aplicativos web e móveis. Utilizo HTML5, CSS3 e JavaScript para transformar conceitos complexos em designs funcionais. Reconhecido por minha dedicação em superar expectativas, estou sempre em busca de desafios para aplicar minha paixão pela tecnologia em soluções impactantes.</h3>
                    </div>
                </div>

                <div className='pd flex flex-col gap-2' style={{ paddingLeft: '4rem', paddingRight: '4rem',  marginBottom: '5rem'}}>
                  <p className='PassPar2'>Sua Biografia</p>
                  <Input type='text' placeholder='' className='lin2'/>
                </div>
              </div>
            )}


            
                <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick}>
                    <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6"/>
                </div>
            {!block&& (
            <div>
                <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={handleClick2}>
                    <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6"/>
                </div>
            </div>
            )}

            {!block2&& (
            <div>
                <div className="btnProximo" style={{ paddingLeft: '4rem', paddingRight: '4rem', marginBottom: '3rem', cursor: 'pointer' }} onClick={''}>
                    <BtnPrincipal texto="Continuar" color="#fff" width="160px" back="#3B82F6"/>
                </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentoPasso1;
