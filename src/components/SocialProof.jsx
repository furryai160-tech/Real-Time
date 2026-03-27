import React from 'react';
import { motion } from 'framer-motion';
import './SocialProof.css';

const testimonials = [
  {
    id: 1,
    initials: 'أخ',
    name: 'د. أحمد خليل',
    role: 'طبيب أسنان — عيادة أبوليو',
    result: '+40% حجوزات',
    text: 'من أول شهر لاحظت فرق حقيقي. الفيديوهات اللي عملوها خلّت الناس تثق في العيادة قبل ما تيجي. مش مجرد تصوير — ده تسويق فاهم.',
    stars: 5,
  },
  {
    id: 2,
    initials: 'كب',
    name: 'مطعم كبابجي',
    role: 'سلسلة مطاعم — القاهرة',
    result: 'x2 تفاعل السوشيال',
    text: 'الفرق بين شغلهم وشغل غيرهم واضح جداً. بيحسوا بروح المكان ويحطوه في الفيديو. الزباين قالولنا "شفناكوا على الريلز وعايزنا نيجي".',
    stars: 5,
  },
  {
    id: 3,
    initials: 'عق',
    name: 'شركة مِيراج العقارية',
    role: 'مدير المبيعات',
    result: 'عقود بأكثر من 3 مليون',
    text: 'المحتوى اللي اشتغلوه معانا أقنع عملاء بعقود بالملايين. لما الواحد يشوف التفاصيل بالصورة دي، بيبقى سهل جداً يتخذ قرار الشراء.',
    stars: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="social-proof-section" id="reviews">
      <div className="container">

        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">ما بيقولوه عنّا</span>
          <h2 className="section-title">النتائج بتتكلم</h2>
          <p className="section-sub">أهم حاجة عندنا هي نجاح العميل — والأرقام بتحكي الحكاية</p>
        </motion.div>

        {/* Cards */}
        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.55, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              {/* Big quote mark */}
              <span className="quote-mark eng-font">"</span>

              {/* Result badge */}
              <div className="result-badge">{t.result}</div>

              {/* Review text */}
              <p className="review-text">{t.text}</p>

              {/* Stars */}
              <div className="stars-row">
                {[...Array(t.stars)].map((_, i) => (
                  <svg key={i} className="star-svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034C2.18 8.72 2.58 7.479 3.549 7.479h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Divider */}
              <div className="client-divider" />

              {/* Client info */}
              <div className="client-row">
                <div className="client-avatar">
                  {t.initials}
                </div>
                <div className="client-meta">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
