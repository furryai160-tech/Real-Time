import React from 'react';
import { motion } from 'framer-motion';
import './Philosophy.css';

const differentiators = [
  {
    icon: '🤝',
    title: 'بنشتغل ثقة',
    desc: 'مش إعلانات مدفوعة بتنتهي. بنبني محتوى يثبت كفاءتك ويخلي العميل يجي وحده.',
  },
  {
    icon: '📊',
    title: 'نتائج حقيقية',
    desc: 'بنقيس الأداء، بنحلّل، وبنحسّن. هدفنا مش الفيديو الكويس... هدفنا الحجز والبيع.',
  },
  {
    icon: '🎯',
    title: 'قبل / بعد فعلي',
    desc: 'بنوثّق التحول الحقيقي اللي بيحصل. صورة مكانك قبل شغلنا وبعده — الفرق بيتكلم.',
  },
  {
    icon: '🛡️',
    title: 'في إيد أمينة',
    desc: 'بنتعامل مع مكانك زي ما بنتعامل مع بتاعنا. احترافية، التزام، ومواعيد محترمة دايماً.',
  },
];

const stats = [
  { value: '+150', label: 'عميل سعيد' },
  { value: '3x', label: 'متوسط زيادة الحجوزات' },
  { value: '100%', label: 'التزام بالمواعيد' },
];

const Philosophy = () => {
  return (
    <section className="philosophy-section" id="philosophy">
      <div className="container">

        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">الفرق بيننا وبين غيرنا</span>
          <h2 className="section-title">إحنا مختلفين ليه؟</h2>
        </motion.div>

        {/* Cards grid */}
        <div className="diff-grid">
          {differentiators.map((item, idx) => (
            <motion.div
              key={idx}
              className="diff-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              <span className="diff-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((s, idx) => (
            <div key={idx} className="stat-item">
              <h4 className="eng-font">{s.value}</h4>
              <p>{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Philosophy;
