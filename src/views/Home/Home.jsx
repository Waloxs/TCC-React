import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import Carousel from '../../components/Carousel/Carousel';
import Section from '../../components/Section/Section';
import Footer from '../../components/Footer/Footer';
import ImageSection from '../../assets/ImageSection.png';
import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';
import { UserProvider as ProviderTalento } from '../../services/UserContext';
import { UserProvider as ProviderEmpresa } from '../../services/UserContextEmpresa';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const Home = () => {
  const [menu, setMenu] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const image = new Image();
    image.src = ImageSection;
    
    image.onload = () => {
      setIsImageLoaded(true); 
    };

    const minLoaderTime = setTimeout(() => {
      if (isImageLoaded) {
        setShowLoader(false);
      }
    }, 3000);

    return () => {
      clearTimeout(minLoaderTime);
    };
  }, [isImageLoaded]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          // Token válido, redirecionar para o DashboardEmpresa
          navigate('/DashboardEmpresa');
        }else{
          navigate('/Login');
        }


      } catch (error) {
        console.error('Token inválido:', error);
      }
    }
  }, [navigate]);

  if (showLoader) {
    return (
      <div className='flex justify-center items-center' style={{ height: '100vh' }}>
        <div>
          <ClipLoader color="#123abc" loading={true} size={100} />
        </div>
      </div>
    );
  }

  return (
    <ProviderTalento>
      <ProviderEmpresa>
        <Navbar menu={menu} setMenu={setMenu} />
        {!menu && <Main />}
        {!menu && <Carousel />}
        {!menu && <Section />}
        {!menu && <Footer />}
      </ProviderEmpresa>
    </ProviderTalento>
  );
}

export default Home;
