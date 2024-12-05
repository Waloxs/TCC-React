import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Carousel.css'
import Vector from '../../assets/Vector.png'
import image1 from '../../assets/img1.png'
import image2 from '../../assets/img2.png'
import image3 from '../../assets/img3.png'
import image4 from '../../assets/img4.png'
import image5 from '../../assets/img5.png'
import image6 from '../../assets/img6.png'


const Carousel = () => {
    const carousel = useRef();
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, [])

    return (
        <div style={{ width: '100%', overflow: 'hidden'}}>
            <motion.div ref={carousel} whileTap={{ cursor: 'grabbing' }} className="" style={{ overflow: 'hidden', cursor: 'grab'}}>
                <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="carousel flex gap-5" style={{ padding: '5rem 1rem', marginLeft: '120px'}}>
                    <div className='flex flex-col justify-between' style={{ padding: '20px', minWidth: '25rem', background: '#fff', borderRadius: '1rem', border: '1px solid var(--grey-disable-color, #94A3B8)' }}>
                        <img src={Vector} alt="" style={{width: '30px'}}/>
                        <p style={{color: '#000', fontFamily: 'Lexend', fontWeight: '300'}}>“ Workzen mudou minha vida. De enviar currículos sem resposta para encontrar oportunidades que me desafiam e realizam
                            profissionalmente - foi uma virada de jogo. Sou grato por ter encontrado não apenas um emprego, mas um caminho. ”</p>
                        <div className='flex gap-2'>
                            <img src={image1} alt="" style={{width: '60px'}}/>
                            <div className='flex flex-col justify-center'>
                                <span style={{color: '#000', fontFamily: 'Lexend'}}>Arthur Fernandes</span>
                                <span style={{color: 'var(--primary-400, #60A5FA)'}}>Analista de Dados</span>
                            </div>
                        </div>
                    </div>
                  
                    <div className='flex flex-col justify-between' style={{ padding: '20px', minWidth: '25rem', background: '#fff', borderRadius: '1rem', border: '1px solid var(--grey-disable-color, #94A3B8)'}}>
                        <img src={Vector} alt="" style={{width: '30px'}}/>
                        <p style={{color: '#000', fontFamily: 'Lexend', fontWeight: '300'}}>“ Obrigada, Workzen, por abrir portas que eu nem sabia que existiam. Encontrei um emprego que 
                            me permite crescer profissionalmente e contribuir de maneira significativa, e tudo começou com esta plataforma incrível. ”</p>
                            <div className='flex gap-2'>
                            <img src={image2} alt="" style={{width: '60px'}}/>
                            <div className='flex flex-col justify-center'>
                                <span style={{color: '#000', fontFamily: 'Lexend'}}>Loide Carvalho</span>
                                <span style={{color: 'var(--primary-400, #60A5FA)'}}>UI/UX Designer</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between' style={{ padding: '20px', minWidth: '25rem', background: '#fff', borderRadius: '1rem', border: '1px solid var(--grey-disable-color, #94A3B8)' }}>
                        <img src={Vector} alt="" style={{width: '30px'}}/>
                        <p style={{color: '#000', fontFamily: 'Lexend', fontWeight: '300'}}>“ Workzen me mostrou que há mais do que apenas enviar currículos. É sobre encontrar o ajuste certo entre
                             minhas habilidades e as necessidades das empresas. Estou animado para o que o futuro reserva. ”</p>
                            <div className='flex gap-2'>
                            <img src={image3} alt="" style={{width: '60px'}}/>
                            <div className='flex flex-col justify-center'>
                                <span style={{color: '#000', fontFamily: 'Lexend'}}>Edjalma Lemos</span>
                                <span style={{color: 'var(--primary-400, #60A5FA)'}}>Técnico em Sistemas</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between' style={{ padding: '20px', minWidth: '25rem', background: '#fff', borderRadius: '1rem', border: '1px solid var(--grey-disable-color, #94A3B8)' }}>
                        <img src={Vector} alt="" style={{width: '30px'}}/>
                        <p style={{color: '#000', fontFamily: 'Lexend', fontWeight: '300'}}>“ Workzen foi como uma luz no fim do túnel para mim. Depois de tanto tempo procurando emprego, finalmente 
                            encontrei uma plataforma que valoriza minhas habilidades e me conecta com oportunidades que realmente importam. ”</p>
                            <div className='flex gap-2'>
                            <img src={image4} alt="" style={{width: '60px'}}/>
                            <div className='flex flex-col justify-center'>
                                <span style={{color: '#000', fontFamily: 'Lexend'}}>Janes Ramos</span>
                                <span style={{color: 'var(--primary-400, #60A5FA)'}}>Analista de Dados</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between' style={{ padding: '20px', minWidth: '25rem', background: '#fff', borderRadius: '1rem', border: '1px solid var(--grey-disable-color, #94A3B8)' }}>
                        <img src={Vector} alt="" style={{width: '30px'}}/>
                        <p style={{color: '#000', fontFamily: 'Lexend', fontWeight: '300'}}>“ Encontrar um emprego que realmente se alinha com meus objetivos de carreira parecia uma tarefa impossível, até eu descobrir o Workzen. Agora estou trabalhando
                             em uma empresa que valoriza meu trabalho e me dá espaço para crescer. ”</p>
                            <div className='flex gap-2'>
                            <img src={image5} alt="" style={{width: '60px'}}/>
                            <div className='flex flex-col justify-center'>
                                <span style={{color: '#000', fontFamily: 'Lexend'}}>Ronisiz Michele</span>
                                <span style={{color: 'var(--primary-400, #60A5FA)'}}>Copywriter</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between gap-4' style={{ padding: '20px', minWidth: '25rem', background: '#fff', borderRadius: '1rem', border: '1px solid var(--grey-disable-color, #94A3B8)' }}>
                        <img src={Vector} alt="" style={{width: '30px'}}/>
                        <p style={{color: '#000', fontFamily: 'Lexend', fontWeight: '300'}}>“ Workzen não só me conectou a um emprego, mas também me conectou a uma comunidade de profissionais incríveis. Estou constantemente inspirada pelos colegas com quem trabalho e grato por ter encontrado esta plataforma.”</p>
                            <div className='flex gap-2'>
                            <img src={image6} alt="" style={{width: '60px'}}/>
                            <div className='flex flex-col justify-center'>
                                <span style={{color: '#000', fontFamily: 'Lexend'}}>Alcioni Correa</span>
                                <span style={{color: 'var(--primary-400, #60A5FA)'}}>Programador Back-end</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Carousel
