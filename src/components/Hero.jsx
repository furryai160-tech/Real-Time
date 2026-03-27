import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import './Hero.css';

// Typewriter hook
const useTypewriter = (texts, speed = 60, pauseBetween = 1500) => {
  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) {
      const pauseTimeout = setTimeout(() => {
        setIsPausing(false);
        setDisplayText('');
        setCharIndex(0);
        setLineIndex((prev) => (prev + 1) % texts.length);
      }, pauseBetween);
      return () => clearTimeout(pauseTimeout);
    }

    if (charIndex < texts[lineIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + texts[lineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // Done typing current line — pause before next
      const pauseTimeout = setTimeout(() => setIsPausing(true), pauseBetween);
      return () => clearTimeout(pauseTimeout);
    }
  }, [charIndex, lineIndex, isPausing, texts, speed, pauseBetween]);

  return displayText;
};

const Hero = () => {
  const typed = useTypewriter(
    [
      'مش بنعمل فيديوهات…',
      'إحنا بنعمل محتوى بيجيب عملاء'
    ],
    70,
    2000
  );

  return (
    <section className="hero-section" id="home">
      {/* Full cinematic background */}
      <div className="hero-bg-wrapper">
        <img
          src="/Gemini_Generated_Image_3u2olj3u2olj3u2o.jfif.jpeg"
          alt="Real-Time Production - بنحوّل شغلك لمحتوى بيجيب عملاء"
          className="hero-bg-img"
        />
        <div className="hero-bg-overlay"></div>
      </div>

      {/* Content */}
      <div className="container hero-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="hero-content"
        >
          {/* Brand cinematic image */}
          <motion.img
            src="/Gemini_Generated_Image_n1ksk7n1ksk7n1ks.jfif.jpeg"
            alt="Real-Time Production Brand"
            className="hero-brand-image"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />

          {/* Typewriter title */}
          <h1 className="hero-title">
            <span className="text-gradient typewriter-text">
              {typed}
              <span className="cursor-blink">|</span>
            </span>
          </h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            بنساعد الدكاترة والبزنس يظهروا بشكل احترافي ويحوّلوا المشاهدين لعملاء حقيقيين.
          </motion.p>

          <motion.a
            href="https://wa.me/201154626427"
            target="_blank"
            rel="noreferrer"
            className="btn-primary hero-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(255,106,0,0.4)' }}
          >
            <MessageCircle size={24} />
            احجز شغل دلوقتي (واتساب)
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
};

export default Hero;
