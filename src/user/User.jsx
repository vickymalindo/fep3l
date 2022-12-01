import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import banner from './../images/banner.png';
import About from './About';
import Menus from './Menus';

const User = () => {
  return (
    <>
      <Nav />
      <img src={banner} alt='banner' className='banner' />
      <About />
      <Menus />
      <Footer />
    </>
  );
};

export default User;
