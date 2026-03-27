import React from 'react';
import { Camera, PenTool, Film, Smartphone, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import './Services.css';

const servicesList = [
  {
    id: 1,
    num: '01',
    title: 'تصوير داخل المكان',
    desc: 'بنيجي لعيادتك، مطعمك، أو شركتك ونصوّر بكاميرات سينمائية عالية الجودة. كل لقطة بتحكي قصة تخلي العميل يثق فيك قبل ما يزورك.',
    icon: <Camera size={28} />,
    tag: 'On-Location Shooting',
  },
  {
    id: 2,
    num: '02',
    title: 'كتابة سكريبت احترافي',
    desc: 'مش مجرد كلام… بنكتب سكريبت بيلمس ألم العميل، يجاوب على أسئلته، ويخليه يحس إن ده هو المكان الصح.',
    icon: <PenTool size={28} />,
    tag: 'Copywriting & Scripting',
  },
  {
    id: 3,
    num: '03',
    title: 'مونتاج سينمائي',
    desc: 'إخراج بصري بمستوى إعلانات عالمية — color grading، موسيقى، motion graphics، وتفاصيل بتخطف العين وتفضل في الدماغ.',
    icon: <Film size={28} />,
    tag: 'Cinematic Editing',
  },
  {
    id: 4,
    num: '04',
    title: 'إدارة صفحات السوشيال',
    desc: 'بنبني حضورك الرقمي من الصفر — تقويم محتوى، نشر منتظم، رد على التعليقات، وتحليل أداء الصفحة أسبوعياً.',
    icon: <Smartphone size={28} />,
    tag: 'Social Media Management',
  },
  {
    id: 5,
    num: '05',
    title: 'تسويق بالمحتوى',
    desc: 'بدل ما تصرف على إعلانات بتُنسى، بنبني محتوى بيبقى ويشتغل 24/7 عشان يجيب عملاء طبيعيين بيثقوا فيك من غير ضغط.',
    icon: <TrendingUp size={28} />,
    tag: 'Content Marketing',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">ما اللي بنقدمه</span>
          <h2 className="section-title">هنعملك إيه؟</h2>
          <p className="section-sub">خدمات متكاملة من الفكرة للنتيجة — كل حاجة تحتاجها في مكان واحد</p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesList.map((srv) => (
            <motion.div
              key={srv.id}
              variants={itemVariants}
              className="service-card"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Card number accent */}
              <span className="card-number eng-font">{srv.num}</span>

              {/* Icon */}
              <div className="icon-wrapper">
                {srv.icon}
              </div>

              {/* Text */}
              <div className="card-text">
                <h3>{srv.title}</h3>
                <span className="card-tag eng-font">{srv.tag}</span>
                <p>{srv.desc}</p>
              </div>

              {/* Bottom accent line */}
              <div className="card-accent-line"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
