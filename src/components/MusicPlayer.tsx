'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Get basePath for static assets
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    // Detect GitHub Pages deployment
    if (window.location.pathname.startsWith('/NewYear_2026')) {
      return '/NewYear_2026';
    }
  }
  return '';
};

// Playlist: Tết songs using local .mp3 files
const PLAYLIST = [
  { file: 'music/van-su-nhu-y.mp3', title: 'Vạn Sự Như Ý', artist: 'Trúc Nhân' },
  { file: 'music/tet-dong-day.mp3', title: 'Tết Đong Đầy', artist: 'KHOA x Kay Trần' },
  { file: 'music/di-de-tro-ve.mp3', title: 'Đi Để Trở Về', artist: 'Soobin Hoàng Sơn' },
  { file: 'music/ve-nha-la-co-tet.mp3', title: 'Về Nhà Là Có Tết', artist: 'Bùi Công Nam' },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const basePathRef = useRef('');

  const currentSong = PLAYLIST[currentSongIndex];

  // Get URL for a song
  const getSongUrl = useCallback((file: string) => {
    return `${basePathRef.current}/${file}`;
  }, []);

  // Initialize audio element
  useEffect(() => {
    basePathRef.current = getBasePath();
    const audio = new Audio();
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle ended event for auto-next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const nextIdx = (currentSongIndex + 1) % PLAYLIST.length;
      setCurrentSongIndex(nextIdx);
      // Auto-play next
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = getSongUrl(PLAYLIST[nextIdx].file);
          audioRef.current.play().catch(() => {});
        }
      }, 300);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentSongIndex, getSongUrl]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Set source if not loaded
      if (!audio.src || audio.src === window.location.href || audio.src === '') {
        audio.src = getSongUrl(currentSong.file);
      }
      audio.play().then(() => {
        setIsPlaying(true);
        setShowTooltip(false);
      }).catch((err) => {
        console.log('Play blocked:', err.message);
      });
    }
  }, [isPlaying, currentSong.file, getSongUrl]);

  const changeSong = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setShowPlaylist(false);

    const audio = audioRef.current;
    if (audio) {
      audio.src = getSongUrl(PLAYLIST[index].file);
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, [getSongUrl]);

  const nextSong = useCallback(() => {
    const next = (currentSongIndex + 1) % PLAYLIST.length;
    changeSong(next);
  }, [currentSongIndex, changeSong]);

  return (
    <div className="music-player-wrapper" style={{ zIndex: 60 }}>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-tet-red/90 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-full shadow-lg whitespace-nowrap mb-1"
          >
            🎵 Bật nhạc Tết nào!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlist dropdown */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-[80px] right-0 w-60 bg-tet-red-deep/95 backdrop-blur-lg rounded-2xl p-3 shadow-2xl border border-tet-gold/20 mb-2"
          >
            <p className="text-tet-gold text-xs font-semibold mb-2 text-center">
              🎵 Chọn nhạc Tết
            </p>
            <div className="space-y-1.5">
              {PLAYLIST.map((song, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); changeSong(i); }}
                  className={`playlist-item w-full text-left flex items-center gap-2 ${i === currentSongIndex ? 'active' : ''}`}
                >
                  <span className="text-base flex-shrink-0">
                    {i === currentSongIndex && isPlaying ? '🔊' : '🎵'}
                  </span>
                  <div className="overflow-hidden min-w-0">
                    <p className="font-medium truncate text-[11px]">{song.title}</p>
                    <p className="text-[9px] opacity-60 truncate">{song.artist}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Volume slider */}
            <div className="mt-3 flex items-center gap-2 px-1">
              <span className="text-tet-gold/60 text-[10px]">🔉</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-tet-gold/20 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#FFD700' }}
              />
              <span className="text-tet-gold/60 text-[10px]">🔊</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vinyl Disc & Controls */}
      <div className="flex items-center gap-2">
        {/* Skip button */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => { e.stopPropagation(); nextSong(); }}
            className="w-8 h-8 rounded-full bg-tet-red-dark/80 border border-tet-gold/30 text-tet-gold text-xs flex items-center justify-center hover:bg-tet-red hover:border-tet-gold/50 transition-all"
            title="Bài tiếp"
          >
            ⏭
          </motion.button>
        )}

        {/* Main vinyl disc button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
          onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); setShowPlaylist(!showPlaylist); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}
          aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          title={isPlaying ? `🔊 ${currentSong.title}` : 'Bật nhạc Tết'}
        >
          <div className="absolute inset-[12px] rounded-full border border-white/5" />
          <div className="absolute inset-[16px] rounded-full border border-white/5" />
          <div className="absolute inset-[20px] rounded-full border border-white/5" />
          <div className="relative z-10 text-lg">
            {isPlaying ? '🔊' : '🔇'}
          </div>
        </motion.button>
      </div>

      {/* Playlist toggle button */}
      <motion.button
        onClick={(e) => { e.stopPropagation(); setShowPlaylist(!showPlaylist); }}
        className="text-[10px] text-tet-gold/50 hover:text-tet-gold/80 transition-colors mt-0.5"
      >
        {showPlaylist ? '▼ Ẩn' : '▲ Playlist'}
      </motion.button>

      {/* Song info + Equalizer when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex gap-0.5 items-end h-4">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-tet-gold rounded-full"
                  animate={{ height: ['4px', '14px', '6px', '16px', '4px'] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
                />
              ))}
            </div>
            <span className="text-[9px] text-tet-gold/60 font-medium whitespace-nowrap max-w-[80px] truncate">
              {currentSong.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
