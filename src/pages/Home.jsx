import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Main from '../components/Main/Main';
import Carousel from '../components/Carousel/Carousel';
import Section from '../components/Section/Section';
import Footer from '../components/Footer/Footer';
import ImageSection from '../assets/ImageSection.png';
import Logo from '../assets/logoResp.png';
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

   
    return () => {
      clearTimeout(minLoaderTime);
    };
  }, [isImageLoaded]);

  if (!showLoader) {
    return (
      <div className='flex justify-center items-center' style={{background: '#fff', height: '100vh'}}>
        <div className="flex flex-col items-center loader-container">
          <div className='flex items-end' style={{height: '100%'}}>
            <img src={Logo} alt="" className='anim'/>
            <div className='ex flex'>
              <h1 style={{fontSize: '6rem', marginBottom: '-25px'}}>o</h1>
              <h1 style={{fontSize: '6rem', marginBottom: '-25px'}}>r</h1>
              <h1 style={{fontSize: '6rem', marginBottom: '-25px'}}>k</h1>
              <h1 style={{fontSize: '6rem', marginBottom: '-25px'}}>z</h1>
              <h1 style={{fontSize: '6rem', marginBottom: '-25px'}}>e</h1>
              <h1 style={{fontSize: '6rem', marginBottom: '-25px'}}>n</h1>
            </div>
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
