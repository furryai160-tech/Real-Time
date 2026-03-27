import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import './Portfolio.css';

const categories = ['All', 'Medical', 'Real Estate', 'Restaurants', 'Events', 'Ads'];

const DEMO_VIDEOS = [
  { id: 'demo1', title: 'إعلان عيادة أسنان', category: 'Medical', isDrive: false, url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'demo2', title: 'جولة في مطعم', category: 'Restaurants', isDrive: false, url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'demo3', title: 'عقارات فاخرة', category: 'Real Estate', isDrive: false, url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

/* Extract FILE_ID and return preview URL */
const getDrivePreviewUrl = (url) => {
  const match = url.match(/\/d\/([\w-]+)\//);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
};

/* ──────────────────────────────
   Video Modal (fullscreen overlay)
────────────────────────────── */
const VideoModal = ({ video, onClose }) => {
  // Close on Escape key
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
    <AnimatePresence>
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
          {/* Close button */}
          <button className="modal-close" onClick={onClose}>
            <X size={22} />
          </button>

          {/* Title */}
          <div className="modal-title">{video.title}</div>

          {/* Player */}
          <div className="modal-media">
            {video.isDrive ? (
              <iframe
                src={getDrivePreviewUrl(video.url)}
                className="modal-iframe"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={video.title}
              />
            ) : (
              <video
                src={video.url}
                className="modal-video"
                autoPlay
                controls
                playsInline
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ──────────────────────────────
   Video Card (thumbnail)
────────────────────────────── */
const VideoCard = ({ video, idx, onPlay }) => (
  <motion.div
    className="v-card"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ delay: idx * 0.07, duration: 0.4 }}
    whileHover={{ y: -5 }}
  >
    <button className="v-card-btn" onClick={() => onPlay(video)}>
      <div className="v-media-wrap">
        {/* Thumbnail */}
        {!video.isDrive && (
          <video
            src={video.url}
            className="v-thumb"
            muted
            playsInline
            preload="metadata"
          />
        )}
        {/* Drive dark cover */}
        {video.isDrive && (
          <div className="v-drive-cover">
            <span className="drive-label eng-font">G Drive</span>
          </div>
        )}
        {/* Play button overlay */}
        <div className="v-overlay">
          <div className="v-play-btn">
            <Play size={26} fill="#fff" />
          </div>
        </div>
      </div>
      <div className="v-info">
        <span className="v-title">{video.title}</span>
        {video.isDrive && <span className="drive-badge eng-font">Drive</span>}
      </div>
    </button>
  </motion.div>
);

/* ──────────────────────────────
   Portfolio Section
────────────────────────────── */
const Portfolio = () => {
  const [activeTab, setActiveTab]   = useState('All');
  const [videos, setVideos]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

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

  const closeModal = useCallback(() => setActiveVideo(null), []);

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
          <p className="section-sub">محتوى حقيقي أنتجناه لعملائنا — اضغط لمشاهدة أي فيديو</p>
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
                <VideoCard
                  key={video.id}
                  video={video}
                  idx={idx}
                  onPlay={setActiveVideo}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={closeModal} />
      )}
    </section>
  );
};

export default Portfolio;
