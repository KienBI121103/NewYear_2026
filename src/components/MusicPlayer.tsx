'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const YOUTUBE_VIDEO_ID = 'qDDFsYjmPsA'; // Vạn Sự Như Ý - Trúc Nhân

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerReadyRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsReady(true);
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

  return (
    <>
      {/* Hidden YouTube iframe */}
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&rel=0&modestbranding=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        style={{ position: 'fixed', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', top: '-100px', left: '-100px' }}
        allow="autoplay; encrypted-media"
        title="Nhạc Tết - Vạn Sự Như Ý"
      />

      {/* Vinyl Disc Music Widget - bottom right */}
      <div className="music-player-wrapper">
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

        {/* Vinyl Disc */}
        <motion.button
          onClick={toggleMusic}
          disabled={!isReady}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}
          aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          title={isPlaying ? 'Tắt nhạc - Vạn Sự Như Ý' : 'Bật nhạc Tết - Vạn Sự Như Ý (Trúc Nhân)'}
        >
          {/* Grooves (vinyl lines) */}
          <div className="absolute inset-[12px] rounded-full border border-white/5" />
          <div className="absolute inset-[16px] rounded-full border border-white/5" />
          <div className="absolute inset-[20px] rounded-full border border-white/5" />

          {/* Center label */}
          <div className="relative z-10 text-lg">
            {isPlaying ? '🎵' : '🎶'}
          </div>
        </motion.button>

        {/* Song name when playing */}
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
              <span className="text-[9px] text-tet-gold/60 font-medium whitespace-nowrap">
                Vạn Sự Như Ý
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
