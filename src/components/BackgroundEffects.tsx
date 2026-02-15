'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG: Dong Ho style horse (simplified)
function DongHoHorse({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      fill="none"
    >
      {/* Body */}
      <ellipse cx="55" cy="55" rx="30" ry="20" fill="#D4A017" opacity="0.35" />
      {/* Neck */}
      <path d="M75 50 Q80 35 72 22" stroke="#D4A017" strokeWidth="6" fill="none" opacity="0.35" strokeLinecap="round" />
      {/* Head */}
      <circle cx="72" cy="18" r="8" fill="#D4A017" opacity="0.3" />
      {/* Ear */}
      <path d="M70 12 L67 4 L74 10" fill="#D4A017" opacity="0.3" />
      {/* Mane */}
      <path d="M75 20 Q82 30 78 42 Q85 35 80 25" fill="#B71C1C" opacity="0.25" />
      {/* Tail */}
      <path d="M25 50 Q12 42 8 55 Q15 48 20 56" fill="#B71C1C" opacity="0.25" />
      {/* Front legs */}
      <line x1="65" y1="70" x2="70" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      <line x1="55" y1="72" x2="58" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      {/* Back legs */}
      <line x1="42" y1="72" x2="38" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      <line x1="32" y1="70" x2="28" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="75" cy="17" r="1.5" fill="#B71C1C" opacity="0.4" />
      {/* Decorative dots (Dong Ho style) */}
      <circle cx="50" cy="50" r="2" fill="#B71C1C" opacity="0.2" />
      <circle cx="60" cy="48" r="1.5" fill="#B71C1C" opacity="0.2" />
      <circle cx="45" cy="55" r="1.5" fill="#FFD700" opacity="0.2" />
    </svg>
  );
}

// Petal component
function Petal({ delay, duration, left, size, type }: {
  delay: number;
  duration: number;
  left: number;
  size: number;
  type: 'mai' | 'dao' | 'sparkle';
}) {
  const colors = {
    mai: '#FFD700',
    dao: '#FFB6C1',
    sparkle: '#FFFFFF',
  };

  return (
    <motion.div
      className="petal"
      style={{
        left: `${left}%`,
        top: '-20px',
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
        opacity: [0, 0.8, 0.6, 0.3, 0],
        rotate: [0, 180, 360, 540, 720],
        x: [0, 30, -20, 40, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {type === 'sparkle' ? (
        <div
          className="w-full h-full rounded-full"
          style={{ background: `radial-gradient(circle, ${colors[type]}, transparent)` }}
        />
      ) : (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          {type === 'mai' ? (
            /* 5-petal mai flower */
            <g fill={colors[type]} opacity="0.85">
              <ellipse cx="12" cy="6" rx="3" ry="5" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(72, 12, 12)" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(144, 12, 12)" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(216, 12, 12)" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(288, 12, 12)" />
              <circle cx="12" cy="12" r="2" fill="#FFA000" />
            </g>
          ) : (
            /* Dao petal */
            <g fill={colors[type]} opacity="0.8">
              <ellipse cx="12" cy="8" rx="4" ry="6" />
              <ellipse cx="12" cy="8" rx="4" ry="6" transform="rotate(72, 12, 12)" />
              <ellipse cx="12" cy="8" rx="4" ry="6" transform="rotate(144, 12, 12)" />
              <ellipse cx="12" cy="8" rx="4" ry="6" transform="rotate(216, 12, 12)" />
              <ellipse cx="12" cy="8" rx="4" ry="6" transform="rotate(288, 12, 12)" />
              <circle cx="12" cy="12" r="2.5" fill="#FF8A80" />
            </g>
          )}
        </svg>
      )}
    </motion.div>
  );
}

// Firework burst
function Firework({ x, y, color, delay: d }: { x: number; y: number; color: string; delay: number }) {
  const particles = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const distance = 40 + Math.random() * 70;
    return {
      id: i,
      toX: Math.cos(angle) * distance,
      toY: Math.sin(angle) * distance,
      size: 3 + Math.random() * 4,
      duration: 0.8 + Math.random() * 0.6,
    };
  }), []);

  return (
    <div className="fixed pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 50 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.toX,
            y: p.toY,
            opacity: [1, 1, 0],
            scale: [1, 1.5, 0],
          }}
          transition={{ duration: p.duration, delay: d, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// Enhanced cloud with Thọ pattern
function CloudDecoration() {
  return (
    <>
      {/* Top left cloud with subtle 壽 */}
      <motion.div
        className="fixed top-[3%] -left-[3%] opacity-[0.07] pointer-events-none"
        animate={{ x: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="320" height="160" viewBox="0 0 320 160" fill="#FFD700">
          <path d="M40 130 Q70 60 120 95 Q155 40 200 70 Q235 25 280 55 Q310 45 300 120 Q290 150 40 140 Z" />
          <text x="160" y="110" textAnchor="middle" fontSize="50" fontFamily="Ma Shan Zheng, serif" fill="#FFD700" opacity="0.5">壽</text>
        </svg>
      </motion.div>

      {/* Top right cloud */}
      <motion.div
        className="fixed top-[12%] -right-[2%] opacity-[0.06] pointer-events-none"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="260" height="130" viewBox="0 0 260 130" fill="#FFD700">
          <path d="M30 105 Q60 45 105 75 Q135 25 175 55 Q205 20 240 50 Q270 42 255 100 Q240 120 30 115 Z" />
        </svg>
      </motion.div>

      {/* Bottom cloud */}
      <motion.div
        className="fixed bottom-[3%] left-[8%] opacity-[0.05] pointer-events-none"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="300" height="140" viewBox="0 0 300 140" fill="#FFD700">
          <path d="M35 115 Q65 55 115 82 Q145 30 195 60 Q225 25 265 52 Q295 42 280 108 Q265 130 35 125 Z" />
        </svg>
      </motion.div>

      {/* Mid-right cloud */}
      <motion.div
        className="fixed top-[45%] -right-[5%] opacity-[0.04] pointer-events-none"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="200" height="100" viewBox="0 0 200 100" fill="#FFD700">
          <path d="M20 80 Q40 35 75 58 Q95 20 130 42 Q155 15 180 38 Q200 30 192 75 Q180 90 20 85 Z" />
        </svg>
      </motion.div>
    </>
  );
}

// Lantern decorations
function Lanterns() {
  return (
    <>
      <motion.div
        className="fixed top-[-10px] left-[8%] text-4xl opacity-60 pointer-events-none"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        🏮
      </motion.div>
      <motion.div
        className="fixed top-[-10px] right-[8%] text-4xl opacity-60 pointer-events-none"
        animate={{ rotate: [3, -3, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🏮
      </motion.div>
      <motion.div
        className="fixed top-[-10px] left-[30%] text-3xl opacity-40 pointer-events-none"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🏮
      </motion.div>
      <motion.div
        className="fixed top-[-10px] right-[30%] text-3xl opacity-40 pointer-events-none"
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🏮
      </motion.div>
    </>
  );
}

// Enhanced firecrackers with burst effect
function Firecrackers() {
  const [bursts, setBursts] = useState<{ id: number; side: 'left' | 'right'; y: number }[]>([]);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 6) {
        const side = count % 2 === 0 ? 'left' : 'right';
        setBursts(prev => [...prev, { id: count, side, y: 30 + count * 25 }]);
        count++;
      }
    }, 800);

    const cleanup = setTimeout(() => {
      setBursts([]);
      clearInterval(interval);
    }, 6000);

    return () => { clearInterval(interval); clearTimeout(cleanup); };
  }, []);

  return (
    <>
      {/* Left firecracker string */}
      <div className="fixed top-0 left-0 opacity-40 pointer-events-none hidden md:block">
        <div className="flex flex-col items-center ml-3">
          <div className="w-1 h-10 bg-tet-gold" />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`fc-l-${i}`}
              className="w-6 h-7 rounded-sm bg-gradient-to-b from-red-400 to-red-700 my-[2px] shadow-sm relative"
              animate={{ x: [-1, 1, -1] }}
              transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-yellow-600" />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Right firecracker string */}
      <div className="fixed top-0 right-0 opacity-40 pointer-events-none hidden md:block">
        <div className="flex flex-col items-center mr-3">
          <div className="w-1 h-10 bg-tet-gold" />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`fc-r-${i}`}
              className="w-6 h-7 rounded-sm bg-gradient-to-b from-red-400 to-red-700 my-[2px] shadow-sm relative"
              animate={{ x: [1, -1, 1] }}
              transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-yellow-600" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Burst sparks */}
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={`burst-${b.id}`}
            className="fixed pointer-events-none z-50"
            style={{ [b.side]: '20px', top: `${b.y}px` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 40,
                  y: (Math.random() - 0.5) * 40,
                  opacity: 0,
                  scale: [1, 1.5, 0],
                }}
                transition={{ duration: 0.5, delay: j * 0.05 }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

// Dong Ho horses at header corners
function DongHoHorses() {
  return (
    <>
      <motion.div
        className="fixed top-2 left-2 w-20 h-16 md:w-28 md:h-22 opacity-40 pointer-events-none"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <DongHoHorse className="w-full h-full" />
      </motion.div>
      <motion.div
        className="fixed top-2 right-2 w-20 h-16 md:w-28 md:h-22 opacity-40 pointer-events-none"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <DongHoHorse className="w-full h-full" flip />
      </motion.div>
    </>
  );
}

// Banh chung & hoa mai/dao decorations
function CornerDecorations() {
  return (
    <>
      {/* Banh chung bottom left */}
      <motion.div
        className="fixed bottom-4 left-4 opacity-25 pointer-events-none"
        animate={{ rotate: [0, 3, 0, -3, 0], y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="45" height="45" viewBox="0 0 45 45">
          <rect x="5" y="5" width="35" height="35" rx="4" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1.5" />
          <line x1="22.5" y1="5" x2="22.5" y2="40" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="22.5" x2="40" y2="22.5" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <rect x="15" y="15" width="15" height="15" fill="#FFF8E1" opacity="0.15" rx="2" />
        </svg>
      </motion.div>

      {/* Banh chung bottom right */}
      <motion.div
        className="fixed bottom-4 right-4 opacity-25 pointer-events-none"
        animate={{ rotate: [0, -3, 0, 3, 0], y: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="45" height="45" viewBox="0 0 45 45">
          <rect x="5" y="5" width="35" height="35" rx="4" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1.5" />
          <line x1="22.5" y1="5" x2="22.5" y2="40" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="22.5" x2="40" y2="22.5" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <rect x="15" y="15" width="15" height="15" fill="#FFF8E1" opacity="0.15" rx="2" />
        </svg>
      </motion.div>

      {/* Hoa mai branch (left side) */}
      <motion.div
        className="fixed top-[25%] -left-2 opacity-20 pointer-events-none hidden md:block hoa-mai-sway"
      >
        <svg width="60" height="120" viewBox="0 0 60 120">
          <path d="M50 120 Q45 80 35 60 Q30 45 40 20" stroke="#5D4037" strokeWidth="2" fill="none" />
          <circle cx="40" cy="22" r="6" fill="#FFD700" opacity="0.7" />
          <circle cx="33" cy="48" r="5" fill="#FFD700" opacity="0.6" />
          <circle cx="38" cy="70" r="4" fill="#FFD700" opacity="0.5" />
          <circle cx="40" cy="22" r="2" fill="#FFA000" />
          <circle cx="33" cy="48" r="1.8" fill="#FFA000" />
        </svg>
      </motion.div>

      {/* Hoa dao branch (right side) */}
      <motion.div
        className="fixed top-[30%] -right-2 opacity-20 pointer-events-none hidden md:block"
        style={{ animation: 'hoaMaiSway 3.5s ease-in-out infinite', transformOrigin: 'bottom center' }}
      >
        <svg width="60" height="120" viewBox="0 0 60 120" style={{ transform: 'scaleX(-1)' }}>
          <path d="M50 120 Q45 80 35 60 Q30 45 40 20" stroke="#5D4037" strokeWidth="2" fill="none" />
          <circle cx="40" cy="22" r="6" fill="#FFB6C1" opacity="0.7" />
          <circle cx="33" cy="48" r="5" fill="#FFB6C1" opacity="0.6" />
          <circle cx="38" cy="70" r="4" fill="#FFB6C1" opacity="0.5" />
          <circle cx="40" cy="22" r="2" fill="#FF8A80" />
          <circle cx="33" cy="48" r="1.8" fill="#FF8A80" />
        </svg>
      </motion.div>
    </>
  );
}

export default function BackgroundEffects() {
  const [showFireworks, setShowFireworks] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setShowFireworks(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Generate petals data
  const petals = useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 7,
      left: Math.random() * 100,
      size: 10 + Math.random() * 12,
      type: (['mai', 'dao', 'sparkle'] as const)[Math.floor(Math.random() * 3)],
    }));
  }, [isClient]);

  const fireworks = useMemo(() => [
    { x: 20, y: 18, color: '#FFD700', delay: 0.2 },
    { x: 75, y: 12, color: '#FF6B6B', delay: 0.5 },
    { x: 50, y: 22, color: '#FFD700', delay: 0.9 },
    { x: 30, y: 32, color: '#FF69B4', delay: 1.3 },
    { x: 70, y: 28, color: '#FFD700', delay: 1.7 },
    { x: 15, y: 38, color: '#FF6B6B', delay: 2.0 },
    { x: 85, y: 18, color: '#FF69B4', delay: 2.4 },
    { x: 45, y: 12, color: '#FFD700', delay: 2.8 },
    { x: 60, y: 35, color: '#FF6B6B', delay: 3.2 },
    { x: 35, y: 10, color: '#FFD700', delay: 3.6 },
  ], []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Dong Ho horses at corners */}
      <DongHoHorses />

      {/* Cloud decorations with Thọ */}
      <CloudDecoration />

      {/* Lanterns */}
      <Lanterns />

      {/* Enhanced firecrackers */}
      <Firecrackers />

      {/* Corner decorations: banh chung, hoa mai, hoa dao */}
      <CornerDecorations />

      {/* Falling petals */}
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}

      {/* Initial fireworks */}
      <AnimatePresence>
        {showFireworks && fireworks.map((fw, i) => (
          <Firework key={i} {...fw} />
        ))}
      </AnimatePresence>

      {/* Subtle golden vignette */}
      <div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(183, 28, 28, 0.3) 100%)',
        }}
      />
    </div>
  );
}
