import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Philosophy from '../components/Philosophy';
import Portfolio from '../components/Portfolio';
import SocialProof from '../components/SocialProof';
import CTA from '../components/CTA';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home-wrapper">
      <Navbar />
      <Hero />
      <Services />
      <Philosophy />
      <Portfolio />
      <SocialProof />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Home;
