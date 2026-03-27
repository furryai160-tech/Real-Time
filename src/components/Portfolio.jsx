import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { detectPlatform, PLATFORM_META } from '../utils/videoUtils';
import './Portfolio.css';

const categories = ['All', 'Medical', 'Real Estate', 'Restaurants', 'Events', 'Ads'];

const DEMO_VIDEOS = [
  { id: 'demo1', title: 'إعلان عيادة أسنان', category: 'Medical', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { id: 'demo2', title: 'جولة في مطعم',     category: 'Restaurants', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'demo3', title: 'عقارات فاخرة',     category: 'Real Estate', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

/* ──────────────────────────────
   Platform Cover Thumbnail
────────────────────────────── */
const PlatformCover = ({ platform, thumbUrl, title }) => {
  const meta = PLATFORM_META[platform] || PLATFORM_META.unknown;
  return (
    <div className="v-platform-cover" style={{ '--platform-color': meta.color }}>
      {thumbUrl && (
        <img
          src={thumbUrl}
          alt={title}
          className="v-thumb"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
      <div className="v-cover-overlay">
        <div className="v-platform-badge eng-font">
          {meta.emoji} {meta.label}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────
   Video Modal
────────────────────────────── */
const VideoModal = ({ video, info, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-player"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className="modal-title">{video.title}</div>
        <div className="modal-media">
          {info.isIframe ? (
            <iframe
              src={info.embedUrl}
              className="modal-iframe"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          ) : (
            <video
              src={info.embedUrl}
              className="modal-video"
              autoPlay controls playsInline
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ──────────────────────────────
   Video Card
────────────────────────────── */
const VideoCard = ({ video, idx, onPlay }) => {
  const info = detectPlatform(video.url);
  const meta = PLATFORM_META[info.platform] || PLATFORM_META.unknown;

  return (
    <motion.div
      className="v-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: idx * 0.07, duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <button className="v-card-btn" onClick={() => onPlay(video, info)}>
        <div className="v-media-wrap">
          <PlatformCover
            platform={info.platform}
            thumbUrl={info.thumbUrl}
            title={video.title}
          />
          {/* Play button */}
          <div className="v-overlay">
            <div className="v-play-btn"><Play size={26} fill="#fff" /></div>
          </div>
        </div>
        <div className="v-info">
          <span className="v-title">{video.title}</span>
          <span
            className="v-platform-tag eng-font"
            style={{ color: meta.color }}
          >
            {meta.emoji} {meta.label}
          </span>
        </div>
      </button>
    </motion.div>
  );
};

/* ──────────────────────────────
   Portfolio Section
────────────────────────────── */
const Portfolio = () => {
  const [activeTab, setActiveTab]   = useState('All');
  const [videos, setVideos]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeInfo, setActiveInfo]   = useState(null);

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

  const handlePlay = useCallback((video, info) => {
    setActiveVideo(video);
    setActiveInfo(info);
  }, []);

  const closeModal = useCallback(() => {
    setActiveVideo(null);
    setActiveInfo(null);
  }, []);

  const filtered = activeTab === 'All'
    ? videos
    : videos.filter(v => v.category === activeTab);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">

        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow eng-font">Our Work</span>
          <h2 className="section-title">شوف شغلنا</h2>
          <p className="section-sub">اضغط على أي فيديو لمشاهدته — YouTube، TikTok، Drive، وأكتر</p>
        </motion.div>

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

        {loading ? (
          <div className="loading-state">جاري التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">مفيش فيديوهات في القسم ده حالياً.</div>
        ) : (
          <div className="videos-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((video, idx) => (
                <VideoCard key={video.id} video={video} idx={idx} onPlay={handlePlay} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} info={activeInfo} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
