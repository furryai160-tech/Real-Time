import React from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-brand">
          <img
            src="/ChatGPT Image 27 مارس 2026، 12_46_53 ص.png"
            alt="Real-Time Production"
            className="footer-logo"
          />
          <p>بنساعدك تبني محتوى يزود مبيعاتك ويثبت علامتك التجارية.</p>
        </div>
        
        <div className="footer-social">
          <a href="#" className="social-icon"><FaInstagram size={20} /></a>
          <a href="#" className="social-icon"><FaFacebookF size={20} /></a>
          <a href="#" className="social-icon"><FaTiktok size={20} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Real-Time Production. All rights reserved.</p>
        <p className="footer-dev eng-font">
          Made with <span className="heart">❤</span> by Yassin Sabri Al-Awami
        </p>
      </div>
    </footer>
  );
};

export default Footer;
