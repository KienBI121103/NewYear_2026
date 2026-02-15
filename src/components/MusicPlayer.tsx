'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Playlist: 4 Tết songs
const PLAYLIST = [
  { id: 'qDDFsYjmPsA', title: 'Vạn Sự Như Ý', artist: 'Trúc Nhân' },
  { id: 'OLsg3fHTvEo', title: 'Tết Đong Đầy', artist: 'Kay Trần' },
  { id: '_9MYysFz5d0', title: 'Đi Để Trở Về', artist: 'Soobin Hoàng Sơn' },
  { id: 'dTRiAXjmyBQ', title: 'Về Nhà Đón Tết', artist: 'Khắc Việt' },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerReadyRef = useRef(false);

  const currentSong = PLAYLIST[currentSongIndex];

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendCommand = useCallback((command: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      sendCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      if (!playerReadyRef.current) {
        playerReadyRef.current = true;
        setTimeout(() => sendCommand('playVideo'), 500);
      } else {
        sendCommand('playVideo');
      }
      setIsPlaying(true);
      setShowTooltip(false);
    }
  }, [isPlaying, sendCommand]);

  const changeSong = useCallback((index: number) => {
    setCurrentSongIndex(index);
    playerReadyRef.current = false;
    setIsPlaying(false);
    // Re-trigger play after iframe loads new video
    setTimeout(() => {
      playerReadyRef.current = true;
      sendCommand('playVideo');
      setIsPlaying(true);
    }, 1000);
    setShowPlaylist(false);
  }, [sendCommand]);

  const nextSong = useCallback(() => {
    const next = (currentSongIndex + 1) % PLAYLIST.length;
    changeSong(next);
  }, [currentSongIndex, changeSong]);

  return (
    <>
      {/* Hidden YouTube iframe */}
      <iframe
        ref={iframeRef}
        key={currentSong.id}
        src={`https://www.youtube.com/embed/${currentSong.id}?enablejsapi=1&loop=1&playlist=${currentSong.id}&rel=0&modestbranding=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        style={{ position: 'fixed', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', top: '-100px', left: '-100px' }}
        allow="autoplay; encrypted-media"
        title={`Nhạc Tết - ${currentSong.title}`}
      />

      {/* Music Widget - bottom right */}
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
              className="absolute bottom-[80px] right-0 w-56 bg-tet-red-deep/95 backdrop-blur-lg rounded-2xl p-3 shadow-2xl border border-tet-gold/20 mb-2"
            >
              <p className="text-tet-gold text-xs font-semibold mb-2 text-center">
                🎵 Chọn nhạc Tết
              </p>
              <div className="space-y-1.5">
                {PLAYLIST.map((song, i) => (
                  <button
                    key={song.id}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vinyl Disc */}
        <div className="flex items-center gap-2">
          {/* Skip button (tiny) */}
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

          <motion.button
            onClick={(e) => { e.stopPropagation(); toggleMusic(); }}
            onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); setShowPlaylist(!showPlaylist); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}
            aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
            title={isPlaying ? `Tắt nhạc - ${currentSong.title}` : `Bật nhạc Tết (click phải: chọn bài)`}
          >
            {/* Grooves */}
            <div className="absolute inset-[12px] rounded-full border border-white/5" />
            <div className="absolute inset-[16px] rounded-full border border-white/5" />
            <div className="absolute inset-[20px] rounded-full border border-white/5" />
            <div className="relative z-10 text-lg">
              {isPlaying ? '🎵' : '🎶'}
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
              {/* Equalizer bars */}
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
    </>
  );
}
