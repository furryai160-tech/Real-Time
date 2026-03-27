import React, { useState, useEffect } from 'react';
import {
  collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { LogOut, Film, Trash2, Plus, LayoutDashboard, Video, AlertCircle } from 'lucide-react';
import './Dashboard.css';
import { detectPlatform, PLATFORM_META } from '../utils/videoUtils';

/* ─── Google Drive helper (kept for backward compat) ─── */
const DRIVE_REGEX = /drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/;

export function convertDriveLink(input) {
  const info = detectPlatform(input);
  return { embed: info.embedUrl, isDrive: info.platform === 'drive' };
}

export function isDriveUrl(url = '') {
  return DRIVE_REGEX.test(url);
}

const ADMIN_PASS = 'rt2024admin';

const CATEGORIES = ['Medical', 'Real Estate', 'Restaurants', 'Events', 'Ads'];

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', icon: <FaInstagram /> },
  { id: 'tiktok', label: 'TikTok', icon: <FaTiktok /> },
  { id: 'facebook', label: 'Facebook', icon: <FaFacebookF /> },
  { id: 'youtube', label: 'YouTube', icon: <FaYoutube /> },
  { id: 'whatsapp', label: 'WhatsApp Status', icon: <FaWhatsapp /> },
];

/* ────────────────────────────────────────
   LOGIN SCREEN
──────────────────────────────────────── */
const LoginScreen = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="admin-login-bg">
      <div className={`login-card ${shake ? 'shake' : ''}`}>
        <div className="login-logo">
          <img src="/ChatGPT Image 27 مارس 2026، 12_46_53 ص.png" alt="RT" />
        </div>
        <h1 className="login-title eng-font">Admin Panel</h1>
        <p className="login-sub">Real-Time Production</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false); }}
              placeholder="••••••••"
              autoFocus
            />
          </div>
          {error && (
            <div className="login-error">
              <AlertCircle size={16} /> كلمة المرور غلط
            </div>
          )}
          <button type="submit" className="login-btn">دخول</button>
        </form>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────
   DASHBOARD
──────────────────────────────────────── */
const Dashboard = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('rt_admin') === '1');

  // Form state
  const [title, setTitle]         = useState('');
  const [url, setUrl]             = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState(null);
  const [category, setCategory]   = useState(CATEGORIES[0]);
  const [platforms, setPlatforms] = useState([]);

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    if (val.trim()) {
      const { platform } = detectPlatform(val);
      setDetectedPlatform(platform !== 'unknown' ? platform : null);
    } else {
      setDetectedPlatform(null);
    }
  };

  // Data state
  const [videos, setVideos]     = useState([]);
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState(null);   // { type:'success'|'error', text }
  const [activeTab, setActiveTab] = useState('all');

  /* fetch */
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setVideos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { if (authed) fetchVideos(); }, [authed]);

  const handleLogin = () => {
    sessionStorage.setItem('rt_admin', '1');
    setAuthed(true);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('rt_admin');
    setAuthed(false);
  };

  const togglePlatform = (id) => {
    setPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const notify = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  /* add video */
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return notify('error', 'الرجاء ملء العنوان والرابط');
    setSaving(true);
    try {
      const info = detectPlatform(url);
      await addDoc(collection(db, 'videos'), {
        title,
        url: info.embedUrl,
        originalUrl: url,
        isDrive: info.platform === 'drive',
        platform: info.platform,
        category,
        platforms,
        createdAt: serverTimestamp()
      });
      setTitle(''); setUrl(''); setPlatforms([]); setDetectedPlatform(null);
      await fetchVideos();
      notify('success', 'تم رفع الفيديو بنجاح ✓');
    } catch (e) {
      notify('error', 'حصل خطأ أثناء الرفع');
    }
    setSaving(false);
  };

  /* delete video */
  const handleDelete = async (id) => {
    if (!window.confirm('متأكد من المسح؟')) return;
    try {
      await deleteDoc(doc(db, 'videos', id));
      setVideos(v => v.filter(x => x.id !== id));
      notify('success', 'تم المسح ✓');
    } catch {
      notify('error', 'حصل خطأ');
    }
  };

  /* stats */
  const stats = {
    total: videos.length,
    byCategory: CATEGORIES.map(c => ({ name: c, count: videos.filter(v => v.category === c).length }))
  };

  const filtered = activeTab === 'all' ? videos : videos.filter(v => v.category === activeTab);

  /* ─── not authed ─── */
  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  /* ─── dashboard ─── */
  return (
    <div className="dash-layout">

      {/* ── Sidebar ── */}
      <aside className="dash-sidebar">
        <div className="sidebar-logo">
          <img src="/ChatGPT Image 27 مارس 2026، 12_46_53 ص.png" alt="RT" />
        </div>

        <nav className="sidebar-nav">
          <span className="nav-label">القسم الحالي</span>
          <button className="nav-item active">
            <Video size={18} /> إدارة الفيديوهات
          </button>
          <button className="nav-item">
            <LayoutDashboard size={18} /> الإحصائيات
          </button>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={16} /> تسجيل خروج
        </button>
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">

        {/* Top bar */}
        <header className="dash-topbar">
          <div>
            <h1>لوحة التحكم <span className="eng-font">Admin</span></h1>
            <p className="topbar-sub">Real-Time Production — إدارة المحتوى</p>
          </div>
          <div className="topbar-stats">
            {stats.byCategory.map(c => (
              <span key={c.name} className="topbar-stat eng-font">
                {c.name} <b>{c.count}</b>
              </span>
            ))}
            <span className="topbar-stat total">إجمالي <b>{stats.total}</b></span>
          </div>
        </header>

        {/* Notification toast */}
        {msg && (
          <div className={`toast toast--${msg.type}`}>{msg.text}</div>
        )}

        {/* ──── Upload form ──── */}
        <section className="dash-card">
          <h2 className="card-heading"><Plus size={18} /> رفع فيديو جديد</h2>
          <form onSubmit={handleAdd} className="upload-form">
            <div className="form-row">
              <div className="form-group">
                <label>عنوان الفيديو</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="مثال: إعلان عيادة د. أحمد"
                />
              </div>
              <div className="form-group">
                <label>القسم (Category)</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="eng-font">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="url-label-row">
                <label>رابط الفيديو</label>
                {detectedPlatform && (
                  <span className="drive-detected">
                    {PLATFORM_META[detectedPlatform]?.emoji} {PLATFORM_META[detectedPlatform]?.label} — تم الاكتشاف ✓
                  </span>
                )}
              </div>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="YouTube / TikTok / Instagram / Drive / رابط MP4 مباشر..."
                className="eng-font"
              />
              <span className="url-hint eng-font">
                📎 يمكنك لصق رابط من أي منصة — هيتحوّل تلقائياً
              </span>
            </div>

            <div className="form-group">
              <label>المنصات اللي نشرت عليها</label>
              <div className="platforms-row">
                {PLATFORMS.map(p => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`platform-btn eng-font ${platforms.includes(p.id) ? 'active' : ''}`}
                  >
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving} className="upload-btn">
              {saving ? 'جاري الرفع...' : <><Plus size={18} /> رفع الفيديو</>}
            </button>
          </form>
        </section>

        {/* ──── Videos list ──── */}
        <section className="dash-card">
          <div className="list-header">
            <h2 className="card-heading"><Film size={18} /> الفيديوهات المرفوعة</h2>
            <div className="filter-tabs">
              <button className={activeTab === 'all' ? 'filter-tab active' : 'filter-tab'} onClick={() => setActiveTab('all')}>الكل</button>
              {CATEGORIES.map(c => (
                <button key={c} className={`filter-tab eng-font ${activeTab === c ? 'active' : ''}`} onClick={() => setActiveTab(c)}>{c}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="list-empty">جاري التحميل...</p>
          ) : filtered.length === 0 ? (
            <p className="list-empty">مفيش فيديوهات في القسم ده.</p>
          ) : (
            <div className="video-table">
              <div className="table-head">
                <span>العنوان</span>
                <span className="eng-font">Category</span>
                <span>المنصات</span>
                <span>إجراء</span>
              </div>
              {filtered.map((v) => (
                <div key={v.id} className="table-row">
                  <span className="row-title">
                    {v.title}
                    {v.isDrive && <span className="drive-badge eng-font">Drive</span>}
                  </span>
                  <span className="eng-font row-cat">{v.category}</span>
                  <span className="row-platforms">
                    {(v.platforms || []).map(pid => {
                      const p = PLATFORMS.find(x => x.id === pid);
                      return p ? <span key={pid} className="plat-badge">{p.icon}</span> : null;
                    })}
                    {(!v.platforms || v.platforms.length === 0) && <span className="no-plat">—</span>}
                  </span>
                  <button className="delete-btn" onClick={() => handleDelete(v.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
