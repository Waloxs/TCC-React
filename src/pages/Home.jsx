import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Main from '../components/Main/Main';
import Carousel from '../components/Carousel/Carousel';
import Section from '../components/Section/Section';
import Footer from '../components/Footer/Footer';


const Home = () => {
  const [menu, setMenu] = React.useState(false);

  

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
