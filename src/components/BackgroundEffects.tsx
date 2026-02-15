'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// SVG: Dong Ho style horse (simplified)
function DongHoHorse({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 100"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      fill="none"
    >
      <ellipse cx="55" cy="55" rx="30" ry="20" fill="#D4A017" opacity="0.35" />
      <path d="M75 50 Q80 35 72 22" stroke="#D4A017" strokeWidth="6" fill="none" opacity="0.35" strokeLinecap="round" />
      <circle cx="72" cy="18" r="8" fill="#D4A017" opacity="0.3" />
      <path d="M70 12 L67 4 L74 10" fill="#D4A017" opacity="0.3" />
      <path d="M75 20 Q82 30 78 42 Q85 35 80 25" fill="#B71C1C" opacity="0.25" />
      <path d="M25 50 Q12 42 8 55 Q15 48 20 56" fill="#B71C1C" opacity="0.25" />
      <line x1="65" y1="70" x2="70" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      <line x1="55" y1="72" x2="58" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      <line x1="42" y1="72" x2="38" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      <line x1="32" y1="70" x2="28" y2="92" stroke="#D4A017" strokeWidth="4" opacity="0.3" strokeLinecap="round" />
      <circle cx="75" cy="17" r="1.5" fill="#B71C1C" opacity="0.4" />
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
  const colors = { mai: '#FFD700', dao: '#FFB6C1', sparkle: '#FFFFFF' };
  return (
    <motion.div
      className="petal"
      style={{ left: `${left}%`, top: '-20px', width: `${size}px`, height: `${size}px` }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
        opacity: [0, 0.8, 0.6, 0.3, 0],
        rotate: [0, 180, 360, 540, 720],
        x: [0, 30, -20, 40, -10, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      {type === 'sparkle' ? (
        <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle, ${colors[type]}, transparent)` }} />
      ) : (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          {type === 'mai' ? (
            <g fill={colors[type]} opacity="0.85">
              <ellipse cx="12" cy="6" rx="3" ry="5" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(72, 12, 12)" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(144, 12, 12)" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(216, 12, 12)" />
              <ellipse cx="12" cy="6" rx="3" ry="5" transform="rotate(288, 12, 12)" />
              <circle cx="12" cy="12" r="2" fill="#FFA000" />
            </g>
          ) : (
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
    return { id: i, toX: Math.cos(angle) * distance, toY: Math.sin(angle) * distance, size: 3 + Math.random() * 4, duration: 0.8 + Math.random() * 0.6 };
  }), []);

  return (
    <div className="fixed pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 50 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: color, boxShadow: `0 0 8px ${color}, 0 0 16px ${color}` }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.toX, y: p.toY, opacity: [1, 1, 0], scale: [1, 1.5, 0] }}
          transition={{ duration: p.duration, delay: d, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// Enhanced ornate cloud decorations (NO Chinese characters)
function CloudDecoration() {
  return (
    <>
      <motion.div
        className="fixed top-[3%] -left-[3%] opacity-[0.08] pointer-events-none"
        animate={{ x: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="360" height="180" viewBox="0 0 360 180" fill="#FFD700">
          <path d="M30 145 Q55 55 115 92 Q150 30 210 68 Q250 15 300 50 Q340 38 330 130 Q310 165 30 155 Z" />
          <path d="M60 130 Q75 80 110 100 Q130 65 165 82 Q190 50 220 70 Q235 58 225 120 Q215 140 60 135 Z" fill="#FFE082" opacity="0.3" />
          <path d="M155 95 Q165 80 180 90 Q190 75 200 88 Q185 100 170 95 Z" fill="#FFE082" opacity="0.25" />
        </svg>
      </motion.div>

      <motion.div
        className="fixed top-[10%] -right-[2%] opacity-[0.07] pointer-events-none"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="300" height="150" viewBox="0 0 300 150" fill="#FFD700">
          <path d="M25 120 Q50 42 100 75 Q130 20 180 52 Q215 12 255 45 Q285 35 270 108 Q255 135 25 128 Z" />
          <path d="M120 75 Q135 60 150 72 Q160 58 175 68" stroke="#FFE082" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        className="fixed bottom-[2%] left-[5%] opacity-[0.06] pointer-events-none"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="340" height="120" viewBox="0 0 340 120" fill="#FFD700">
          <path d="M20 95 Q45 35 100 65 Q135 18 185 48 Q220 10 270 40 Q305 25 295 85 Q280 110 20 102 Z" />
          <path d="M80 80 Q90 60 110 72 Q120 55 140 65" stroke="#FFE082" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M180 62 Q195 45 215 58 Q225 42 245 52" stroke="#FFE082" strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
      </motion.div>

      <motion.div
        className="fixed top-[45%] -right-[5%] opacity-[0.05] pointer-events-none"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="220" height="110" viewBox="0 0 220 110" fill="#FFD700">
          <path d="M15 88 Q35 30 75 58 Q95 15 140 42 Q170 10 200 35 Q220 28 210 80 Q200 100 15 92 Z" />
        </svg>
      </motion.div>

      <motion.div
        className="fixed top-[65%] -left-[3%] opacity-[0.04] pointer-events-none"
        animate={{ x: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="160" height="80" viewBox="0 0 160 80" fill="#FFD700">
          <path d="M10 65 Q25 20 55 42 Q70 10 100 32 Q120 8 145 28 Q160 22 152 58 Q145 72 10 68 Z" />
        </svg>
      </motion.div>
    </>
  );
}

// Vietnamese Calligraphy Couplets (Pattaya font, NO Chinese characters)
function CalligraphyCouplets() {
  return (
    <>
      {/* Left: Mã Đáo Thành Công */}
      <motion.div
        className="cau-doi cau-doi-left cau-doi-sway hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      >
        <div className="cau-doi-inner">
          <span>Mã</span>
          <span>Đáo</span>
          <span>Thành</span>
          <span>Công</span>
        </div>
      </motion.div>

      {/* Right: Vạn Sự Như Ý */}
      <motion.div
        className="cau-doi cau-doi-right cau-doi-sway hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        style={{ animationDelay: '1s' }}
      >
        <div className="cau-doi-inner">
          <span>Vạn</span>
          <span>Sự</span>
          <span>Như</span>
          <span>Ý</span>
        </div>
      </motion.div>
    </>
  );
}

// Cây Nêu (Traditional Tết Pole)
function CayNeu() {
  return (
    <motion.div
      className="fixed bottom-0 right-[12%] opacity-30 pointer-events-none hidden lg:block cay-neu-sway"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 0.3 }}
      transition={{ duration: 1.5, delay: 1 }}
    >
      <svg width="80" height="320" viewBox="0 0 80 320" fill="none">
        {/* Main bamboo pole */}
        <rect x="35" y="40" width="10" height="280" rx="5" fill="url(#bambooGrad)" />
        {/* Bamboo nodes */}
        <rect x="33" y="100" width="14" height="4" rx="2" fill="#5D4037" opacity="0.6" />
        <rect x="33" y="160" width="14" height="4" rx="2" fill="#5D4037" opacity="0.6" />
        <rect x="33" y="220" width="14" height="4" rx="2" fill="#5D4037" opacity="0.6" />
        {/* Red flag at top */}
        <g className="bag-sway">
          <path d="M40 40 L20 10 Q40 -5 60 10 Z" fill="#D32F2F" stroke="#FFD700" strokeWidth="1" />
          <circle cx="40" cy="12" r="5" fill="#FFD700" opacity="0.7" />
        </g>
        {/* Hanging carp shape */}
        <g transform="translate(50, 60)">
          <ellipse cx="8" cy="6" rx="8" ry="6" fill="#FFD700" opacity="0.5" />
          <path d="M16 6 L24 0 L24 12 Z" fill="#FFD700" opacity="0.4" />
          <circle cx="5" cy="5" r="1" fill="#5C0000" opacity="0.5" />
        </g>
        {/* Red ribbon strips */}
        <path d="M38 50 Q25 70 30 90" stroke="#D32F2F" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M42 50 Q55 65 52 85" stroke="#D32F2F" strokeWidth="2" fill="none" opacity="0.5" />
        {/* Gold coins */}
        <circle cx="28" cy="92" r="5" fill="#FFD700" opacity="0.4" stroke="#B8860B" strokeWidth="0.5" />
        <circle cx="54" cy="87" r="4" fill="#FFD700" opacity="0.35" stroke="#B8860B" strokeWidth="0.5" />
        {/* Ground base */}
        <ellipse cx="40" cy="318" rx="20" ry="4" fill="#5D4037" opacity="0.4" />
        <defs>
          <linearGradient id="bambooGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6D4C41" />
            <stop offset="30%" stopColor="#8D6E63" />
            <stop offset="70%" stopColor="#6D4C41" />
            <stop offset="100%" stopColor="#5D4037" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// Gold coins floating decoration
function GoldCoins() {
  const coins = useMemo(() => [
    { left: '5%', top: '55%', size: 20, delay: 0, duration: 4 },
    { left: '92%', top: '40%', size: 16, delay: 1, duration: 5 },
    { left: '88%', top: '75%', size: 14, delay: 2, duration: 3.5 },
    { left: '8%', top: '80%', size: 18, delay: 0.5, duration: 4.5 },
    { left: '50%', top: '90%', size: 12, delay: 1.5, duration: 3.8 },
  ], []);

  return (
    <>
      {coins.map((coin, i) => (
        <motion.div
          key={`coin-${i}`}
          className="fixed pointer-events-none gold-coin z-[2]"
          style={{ left: coin.left, top: coin.top }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: coin.delay + 1 }}
        >
          <svg width={coin.size} height={coin.size} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="7" fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.5" />
            <rect x="10" y="10" width="4" height="4" rx="1" fill="#B8860B" opacity="0.4" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

// Red silk ribbons
function RedSilkRibbons() {
  return (
    <>
      <motion.div
        className="fixed top-[15%] -left-2 opacity-20 pointer-events-none hidden md:block ribbon-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.5 }}
      >
        <svg width="40" height="160" viewBox="0 0 40 160">
          <path d="M20 0 Q25 30 18 60 Q12 90 22 120 Q30 140 15 160" stroke="#D32F2F" strokeWidth="6" fill="none" opacity="0.6" />
          <path d="M20 0 Q25 30 18 60 Q12 90 22 120 Q30 140 15 160" stroke="#FF6B6B" strokeWidth="3" fill="none" opacity="0.3" />
        </svg>
      </motion.div>
      <motion.div
        className="fixed top-[20%] -right-2 opacity-20 pointer-events-none hidden md:block"
        style={{ animation: 'ribbonFloat 4.5s ease-in-out infinite', animationDelay: '1s' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2 }}
      >
        <svg width="40" height="140" viewBox="0 0 40 140" style={{ transform: 'scaleX(-1)' }}>
          <path d="M20 0 Q28 25 15 55 Q8 80 25 110 Q32 125 18 140" stroke="#D32F2F" strokeWidth="5" fill="none" opacity="0.6" />
          <path d="M20 0 Q28 25 15 55 Q8 80 25 110 Q32 125 18 140" stroke="#FF6B6B" strokeWidth="2.5" fill="none" opacity="0.3" />
        </svg>
      </motion.div>
    </>
  );
}

// Lanterns
function Lanterns() {
  return (
    <>
      <motion.div className="fixed top-[-10px] left-[8%] text-4xl opacity-60 pointer-events-none"
        animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🏮</motion.div>
      <motion.div className="fixed top-[-10px] right-[8%] text-4xl opacity-60 pointer-events-none"
        animate={{ rotate: [3, -3, 3] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>🏮</motion.div>
      <motion.div className="fixed top-[-10px] left-[30%] text-3xl opacity-40 pointer-events-none"
        animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>🏮</motion.div>
      <motion.div className="fixed top-[-10px] right-[30%] text-3xl opacity-40 pointer-events-none"
        animate={{ rotate: [2, -2, 2] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>🏮</motion.div>
    </>
  );
}

// Firecrackers
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
    const cleanup = setTimeout(() => { setBursts([]); clearInterval(interval); }, 6000);
    return () => { clearInterval(interval); clearTimeout(cleanup); };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 opacity-40 pointer-events-none hidden md:block">
        <div className="flex flex-col items-center ml-3">
          <div className="w-1 h-10 bg-tet-gold" />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={`fc-l-${i}`} className="w-6 h-7 rounded-sm bg-gradient-to-b from-red-400 to-red-700 my-[2px] shadow-sm relative"
              animate={{ x: [-1, 1, -1] }} transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-yellow-600" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="fixed top-0 right-0 opacity-40 pointer-events-none hidden md:block">
        <div className="flex flex-col items-center mr-3">
          <div className="w-1 h-10 bg-tet-gold" />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={`fc-r-${i}`} className="w-6 h-7 rounded-sm bg-gradient-to-b from-red-400 to-red-700 my-[2px] shadow-sm relative"
              animate={{ x: [1, -1, 1] }} transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-yellow-600" />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div key={`burst-${b.id}`} className="fixed pointer-events-none z-50"
            style={{ [b.side]: '20px', top: `${b.y}px` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[...Array(6)].map((_, j) => (
              <motion.div key={j} className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 40, opacity: 0, scale: [1, 1.5, 0] }}
                transition={{ duration: 0.5, delay: j * 0.05 }} />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

// Dong Ho horses at corners
function DongHoHorses() {
  return (
    <>
      <motion.div className="fixed top-2 left-2 w-20 h-16 md:w-28 md:h-22 opacity-40 pointer-events-none"
        animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <DongHoHorse className="w-full h-full" />
      </motion.div>
      <motion.div className="fixed top-2 right-2 w-20 h-16 md:w-28 md:h-22 opacity-40 pointer-events-none"
        animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        <DongHoHorse className="w-full h-full" flip />
      </motion.div>
    </>
  );
}

// Corner decorations
function CornerDecorations() {
  return (
    <>
      <motion.div className="fixed bottom-4 left-4 opacity-25 pointer-events-none"
        animate={{ rotate: [0, 3, 0, -3, 0], y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="45" height="45" viewBox="0 0 45 45">
          <rect x="5" y="5" width="35" height="35" rx="4" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1.5" />
          <line x1="22.5" y1="5" x2="22.5" y2="40" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="22.5" x2="40" y2="22.5" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <rect x="15" y="15" width="15" height="15" fill="#FFF8E1" opacity="0.15" rx="2" />
        </svg>
      </motion.div>
      <motion.div className="fixed bottom-4 right-4 opacity-25 pointer-events-none"
        animate={{ rotate: [0, -3, 0, 3, 0], y: [0, -4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="45" height="45" viewBox="0 0 45 45">
          <rect x="5" y="5" width="35" height="35" rx="4" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1.5" />
          <line x1="22.5" y1="5" x2="22.5" y2="40" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="22.5" x2="40" y2="22.5" stroke="#A5D6A7" strokeWidth="1" opacity="0.5" />
          <rect x="15" y="15" width="15" height="15" fill="#FFF8E1" opacity="0.15" rx="2" />
        </svg>
      </motion.div>
      <motion.div className="fixed top-[25%] -left-2 opacity-20 pointer-events-none hidden md:block hoa-mai-sway">
        <svg width="60" height="120" viewBox="0 0 60 120">
          <path d="M50 120 Q45 80 35 60 Q30 45 40 20" stroke="#5D4037" strokeWidth="2" fill="none" />
          <circle cx="40" cy="22" r="6" fill="#FFD700" opacity="0.7" />
          <circle cx="33" cy="48" r="5" fill="#FFD700" opacity="0.6" />
          <circle cx="38" cy="70" r="4" fill="#FFD700" opacity="0.5" />
          <circle cx="40" cy="22" r="2" fill="#FFA000" />
          <circle cx="33" cy="48" r="1.8" fill="#FFA000" />
        </svg>
      </motion.div>
      <motion.div className="fixed top-[30%] -right-2 opacity-20 pointer-events-none hidden md:block"
        style={{ animation: 'hoaMaiSway 3.5s ease-in-out infinite', transformOrigin: 'bottom center' }}>
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

// Wind chime sound synthesis (replaces old "dump dump")
function playWindChime(audioCtx: AudioContext) {
  const now = audioCtx.currentTime;
  const frequencies = [2093, 2637, 3136, 2349]; // C7, E7, G7, D7
  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.06);
    gain.gain.setValueAtTime(0.04, now + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.8);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.8);
  });
}

// Click-anywhere firework handler with wind chime sound
function ClickFireworks({ children }: { children: React.ReactNode }) {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const audioContextRef = useState<AudioContext | null>(null);

  const playClickSound = useCallback(() => {
    try {
      const ctx = audioContextRef[0] || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (!audioContextRef[0]) audioContextRef[0] = ctx;
      playWindChime(ctx);
    } catch {
      // Audio not supported
    }
  }, [audioContextRef]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    const x = e.clientX;
    const y = e.clientY;
    setClicks(prev => [...prev, { id, x, y }]);
    playClickSound();

    const xNorm = x / window.innerWidth;
    const yNorm = y / window.innerHeight;
    confetti({
      particleCount: 30 + Math.floor(Math.random() * 30),
      spread: 60 + Math.random() * 50,
      origin: { x: xNorm, y: yNorm },
      colors: ['#FFD700', '#D32F2F', '#FF6B6B', '#FFA000', '#FFE082', '#FF69B4'],
      ticks: 60,
      gravity: 1.2,
      scalar: 0.8 + Math.random() * 0.4,
      startVelocity: 15 + Math.random() * 15,
    });

    setTimeout(() => setClicks(prev => prev.filter(c => c.id !== id)), 1200);
  }, [playClickSound]);

  return (
    <div onClick={handleClick} className="contents">
      {children}
      <AnimatePresence>
        {clicks.map(c => (
          <motion.div
            key={c.id}
            className="fixed pointer-events-none z-[100]"
            style={{ left: c.x - 40, top: c.y - 40 }}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,107,107,0.3) 40%, transparent 70%)',
            }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { ClickFireworks };

export default function BackgroundEffects() {
  const [showFireworks, setShowFireworks] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setShowFireworks(false), 4500);
    return () => clearTimeout(timer);
  }, []);

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
      <DongHoHorses />
      <CloudDecoration />
      <CalligraphyCouplets />
      <Lanterns />
      <Firecrackers />
      <CornerDecorations />
      <CayNeu />
      <GoldCoins />
      <RedSilkRibbons />
      {petals.map((p) => <Petal key={p.id} {...p} />)}
      <AnimatePresence>
        {showFireworks && fireworks.map((fw, i) => <Firework key={i} {...fw} />)}
      </AnimatePresence>
      <div className="fixed inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(92, 0, 0, 0.35) 100%)' }} />
      <div className="fixed bottom-0 left-0 right-0 h-16 wave-pattern opacity-80 pointer-events-none" />
    </div>
  );
}
