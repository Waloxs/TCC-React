import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Main from '../components/Main/Main';
import Carousel from '../components/Carousel/Carousel';
import Section from '../components/Section/Section';
import Footer from '../components/Footer/Footer';
import ImageSection from '../assets/ImageSection.png';
import { ThreeDots } from 'react-loader-spinner';
import Logo from '../assets/Logo.png';
import './Home.css'

const Home = () => {
  const [menu, setMenu] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false); 

  useEffect(() => {
    const image = new Image();
    image.src = ImageSection;
    
    image.onload = () => {
      setIsImageLoaded(true); 
    };

    // Garantir que o loader apareça por pelo menos 5 segundos
    const minLoaderTime = setTimeout(() => {
      if (isImageLoaded) {
        setShowLoader(false);
      }
    }, 5000);

    // Ocultar o loader após 10 segundos, independentemente do carregamento da imagem
    const maxLoaderTime = setTimeout(() => {
      setShowLoader(false);
    }, 10000);

    return () => {
      clearTimeout(minLoaderTime);
      clearTimeout(maxLoaderTime);
    };
  }, [isImageLoaded]);

  if (showLoader) {
    return (
      <div className='flex justify-center items-center' style={{background: '#fff', height: '100vh'}}>
        <div className="flex flex-col items-center loader-container">
          <img src={Logo} alt=""/>
          <div>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#0866FF"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
            style={{position: 'absolute'}}
          />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar menu={menu} setMenu={setMenu} />
      {!menu && <Main />}
      {!menu && <Carousel />}
      {!menu && <Section />}
      {!menu && <Footer />}
    </div>
  );
}

export default Home;
