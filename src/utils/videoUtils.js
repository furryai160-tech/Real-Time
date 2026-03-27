/**
 * Universal video URL detector & converter
 * Supports: YouTube, TikTok, Instagram, Facebook, Google Drive, Direct MP4
 */

const PATTERNS = {
  youtube: [
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /youtube\.com\/shorts\/([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,   // already-converted embed URL
  ],
  tiktok:    [/tiktok\.com\/@[\w.]+\/video\/(\d+)/],
  instagram: [/instagram\.com\/(p|reel|tv)\/([\w-]+)/],
  facebook:  [/facebook\.com\/.+\/videos?\/(\d+)/],
  drive:     [
    /drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/,
    /drive\.google\.com\/file\/d\/([\w-]+)\/preview/,  // already-converted
  ],
};

export function detectPlatform(url = '') {
  if (!url) return { platform: 'unknown', embedUrl: url, thumbUrl: null };

  for (const [platform, patterns] of Object.entries(PATTERNS)) {
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return buildEmbed(platform, match, url);
      }
    }
  }

  // Direct video file (mp4, webm, etc.)
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)) {
    return { platform: 'direct', embedUrl: url, thumbUrl: null, isIframe: false };
  }

  return { platform: 'unknown', embedUrl: url, thumbUrl: null, isIframe: false };
}

function buildEmbed(platform, match, originalUrl) {
  switch (platform) {
    case 'youtube': {
      const id = match[1];
      return {
        platform: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
        thumbUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        isIframe: true,
      };
    }

    case 'tiktok': {
      const id = match[1];
      return {
        platform: 'tiktok',
        embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
        thumbUrl: null, // TikTok doesn't expose thumbnails publicly
        isIframe: true,
      };
    }

    case 'instagram': {
      const [, type, id] = match;
      return {
        platform: 'instagram',
        embedUrl: `https://www.instagram.com/${type}/${id}/embed/`,
        thumbUrl: null,
        isIframe: true,
      };
    }

    case 'facebook': {
      const encoded = encodeURIComponent(originalUrl);
      return {
        platform: 'facebook',
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encoded}&width=560&show_text=false`,
        thumbUrl: null,
        isIframe: true,
      };
    }

    case 'drive': {
      const id = match[1];
      return {
        platform: 'drive',
        embedUrl: `https://drive.google.com/file/d/${id}/preview`,
        thumbUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w600`,
        isIframe: true,
      };
    }

    default:
      return { platform: 'unknown', embedUrl: originalUrl, thumbUrl: null, isIframe: false };
  }
}

export const PLATFORM_META = {
  youtube:   { label: 'YouTube',   color: '#FF0000', emoji: '▶️' },
  tiktok:    { label: 'TikTok',    color: '#010101', emoji: '🎵' },
  instagram: { label: 'Instagram', color: '#E1306C', emoji: '📸' },
  facebook:  { label: 'Facebook',  color: '#1877F2', emoji: '📘' },
  drive:     { label: 'Drive',     color: '#4285F4', emoji: '☁️' },
  direct:    { label: 'Video',     color: '#FF6A00', emoji: '🎬' },
  unknown:   { label: 'Video',     color: '#555',    emoji: '🎬' },
};
