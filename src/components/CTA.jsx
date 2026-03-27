import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <motion.div
          className="cta-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Background glow orbs */}
          <div className="cta-orb cta-orb--left" />
          <div className="cta-orb cta-orb--right" />

          {/* Badge */}
          <motion.span
            className="cta-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            🚀 ابدأ رحلتك دلوقتي
          </motion.span>

          {/* Headline */}
          <motion.h2
            className="cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            لو عايز شغلك يكبر فعلاً…
            <br />
            <span className="cta-title-highlight">لازم تبدأ بمحتوى صح</span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            className="cta-sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            احجز دلوقتي وخلّي شغلك يوصل للناس الصح.
            <br />
            <span className="cta-sub-small">بنرد خلال ساعة ✓</span>
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="https://wa.me/201154626427"
            target="_blank"
            rel="noreferrer"
            className="cta-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="cta-btn-icon">
              <FaWhatsapp size={24} />
            </span>
            <span className="cta-btn-text">
              <span className="cta-btn-main">تواصل واتساب دلوقتي</span>
              <span className="cta-btn-hint eng-font">WhatsApp → مجاني وبدون التزام</span>
            </span>
          </motion.a>

          {/* Trust micro row */}
          <motion.div
            className="cta-trust-row"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <span>✅ بدون عقود مُلزمة</span>
            <span className="trust-dot" />
            <span>✅ استشارة مجانية</span>
            <span className="trust-dot" />
            <span>✅ نتائج من أول شهر</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
