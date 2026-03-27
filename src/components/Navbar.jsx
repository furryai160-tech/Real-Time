import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-section ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <img 
          src="/ChatGPT Image 27 مارس 2026، 12_46_53 ص.png" 
          alt="Real-Time Production" 
          className="navbar-logo"
        />
        
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>الرئيسية</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a>
          <a href="#philosophy" onClick={() => setMenuOpen(false)}>إحنا مين</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>الاعمال</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>آراء العملاء</a>
        </nav>

        <a href="#contact" className="btn-primary nav-btn eng-font">تواصل معنا</a>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
