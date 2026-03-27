import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import './Portfolio.css';

const categories = ['All', 'Medical', 'Real Estate', 'Restaurants', 'Events', 'Ads'];

const DEMO_VIDEOS = [
  { id: 'demo1', title: 'إعلان عيادة أسنان', category: 'Medical', isDrive: false, url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'demo2', title: 'جولة في مطعم', category: 'Restaurants', isDrive: false, url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'demo3', title: 'عقارات فاخرة', category: 'Real Estate', isDrive: false, url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

/* Click-to-play video card */
const VideoCard = ({ video, idx }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      key={video.id}
      className="v-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: idx * 0.07, duration: 0.4 }}
    >
      <div className="v-media-wrap">
        {/* ── Drive iframe ── */}
        {video.isDrive ? (
          !playing ? (
            <button className="v-cover v-cover--drive" onClick={() => setPlaying(true)}>
              <div className="v-play-btn"><Play size={28} fill="#fff" /></div>
              <span className="v-play-label">Drive — اضغط للتشغيل</span>
            </button>
          ) : (
            <iframe
              src={video.url + '&autoplay=1'}
              className="v-iframe"
              allow="autoplay; fullscreen"
              allowFullScreen
              title={video.title}
            />
          )
        ) : (
          /* ── Direct MP4 ── */
          !playing ? (
            <button className="v-cover" onClick={() => setPlaying(true)}>
              <video src={video.url} className="v-thumb" muted playsInline preload="metadata" />
              <div className="v-play-btn"><Play size={28} fill="#fff" /></div>
            </button>
          ) : (
            <video
              src={video.url}
              className="v-iframe"
              autoPlay
              controls
              playsInline
            />
          )
        )}
      </div>

      {/* Bottom info */}
      <div className="v-info">
        <span className="v-title">{video.title}</span>
        <a href={video.isDrive ? video.url : video.url} target="_blank" rel="noreferrer" className="v-link">
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setVideos(data.length > 0 ? data : DEMO_VIDEOS);
      } catch {
        setVideos(DEMO_VIDEOS);
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  const filtered = activeTab === 'All'
    ? videos
    : videos.filter(v => v.category === activeTab);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">

        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow eng-font">Our Work</span>
          <h2 className="section-title">شوف شغلنا</h2>
          <p className="section-sub">محتوى حقيقي أنتجناه لعملائنا</p>
        </motion.div>

        {/* Tabs */}
        <div className="tabs-container">
          {categories.map(cat => (
            <button
              key={cat}
              className={`tab-btn eng-font ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="loading-state">جاري التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">مفيش فيديوهات في القسم ده حالياً.</div>
        ) : (
          <div className="videos-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((video, idx) => (
                <VideoCard key={video.id} video={video} idx={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};

export default Portfolio;
