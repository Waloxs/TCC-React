import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Main from '../components/Main/Main';
import Carousel from '../components/Carousel/Carousel';
import Section from '../components/Section/Section';
import Footer from '../components/Footer/Footer';
import ImageSection from '../assets/ImageSection.png';
import { ThreeDots } from 'react-loader-spinner';

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

    const timeout = setTimeout(() => {
      setShowLoader(false); 
    }, 9000);

    return () => clearTimeout(timeout); 
  }, []);

  if (showLoader && !isImageLoaded) {
    return (
      <div className='flex justify-center items-center' style={{background: '#fff', height: '100vh'}}>
        <div className="loader-container">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#0866FF"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
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
