import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import Carousel from '../../components/Carousel/Carousel';
import Section from '../../components/Section/Section';
import Footer from '../../components/Footer/Footer';
import ImageSection from '../../assets/ImageSection.png';
import ClipLoader from 'react-spinners/ClipLoader';
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

  if (showLoader) {
    return (
      <div className='flex justify-center items-center' style={{height: '100vh'}}>
        <div>
          <ClipLoader color="#123abc" loading={true} size={100} />
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
