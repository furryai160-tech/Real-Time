import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import './Portfolio.css';

const categories = ['Medical', 'Real Estate', 'Restaurants', 'Events', 'Ads'];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Medical');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos: ", error);
        // Fallback demo data
        setVideos([
          { id: '1', title: 'دعاية عيادة أسنان', url: 'https://www.w3schools.com/html/mov_bbb.mp4', category: 'Medical' },
          { id: '2', title: 'إعلان مطعم فاخر', url: 'https://www.w3schools.com/html/mov_bbb.mp4', category: 'Restaurants' },
          { id: '3', title: 'تسويق عقارات', url: 'https://www.w3schools.com/html/mov_bbb.mp4', category: 'Real Estate' },
        ]);
      }
      setLoading(false);
    };
    
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(v => v.category === activeTab);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">شوف شغلنا</h2>
          <p className="section-sub eng-font">Portfolio</p>
        </div>

        <div className="tabs-container">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`tab-btn eng-font ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="videos-grid">
          {loading ? (
            <div className="loading-state">جاري التحميل...</div>
          ) : filteredVideos.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={video.id} 
                  className="video-card glass-card"
                >
                  <div className="video-wrapper">
                    <video 
                      src={video.url} 
                      muted 
                      loop 
                      playsInline 
                      autoPlay
                      className="portfolio-video"
                    ></video>
                    <div className="video-overlay">
                      <Play fill="#fff" size={40} className="play-icon" />
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="empty-state">مفيش فيديوهات في القسم ده حالياً.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
