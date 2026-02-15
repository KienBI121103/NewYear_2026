'use client';

import { motion } from 'framer-motion';

/**
 * Horse Shadow Banner - "Tiểu Dã & Xích Thố" concept.
 * A small determined horse (Tiểu Dã) running with effort,
 * whose shadow is the mighty Xích Thố war horse.
 * Symbolizes hidden potential and extraordinary effort.
 */
export default function HorseShadowBanner() {
  return (
    <motion.div
      className="relative w-full flex flex-col items-center justify-center py-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Dust particles behind the running horse */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            background: 'rgba(212, 160, 23, 0.3)',
            bottom: `${32 + Math.random() * 10}%`,
            left: `${35 + Math.random() * 30}%`,
          }}
          animate={{
            x: [0, -30 - Math.random() * 40, -80],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0],
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Small running horse (Tiểu Dã) */}
      <motion.div
        className="relative z-10"
        animate={{ x: [-6, 6, -6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="90" height="65" viewBox="0 0 110 80" fill="none">
          {/* Body - warm golden color matching the illustration */}
          <ellipse cx="55" cy="38" rx="24" ry="15" fill="#D4A017" />
          <ellipse cx="55" cy="40" rx="18" ry="10" fill="#FFCC80" opacity="0.3" />
          {/* Neck */}
          <path d="M74 32 Q78 20 72 10" stroke="#D4A017" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Head */}
          <ellipse cx="70" cy="10" rx="9" ry="7" fill="#D4A017" />
          <ellipse cx="72" cy="12" rx="5" ry="4" fill="#FFCC80" opacity="0.3" />
          {/* Ear */}
          <path d="M66 3 L64 -3 L69 2" fill="#B8860B" />
          {/* Eye */}
          <circle cx="73" cy="8" r="2" fill="#3E0000" />
          <circle cx="74" cy="7.5" r="0.8" fill="white" opacity="0.8" />
          {/* Mane (red - áo dài style) */}
          <path d="M72 10 Q78 20 74 30 Q80 24 76 16" fill="#CC2222" opacity="0.7" />
          <path d="M70 8 Q74 14 72 22 Q76 17 73 12" fill="#CC2222" opacity="0.5" />
          {/* Saddle */}
          <path d="M46 30 Q55 26 64 30 Q55 34 46 30" fill="#8B1A1A" opacity="0.6" />
          <ellipse cx="55" cy="30" rx="6" ry="3" fill="#FFD700" opacity="0.3" />
          {/* Tail */}
          <path d="M31 35 Q18 30 12 40 Q20 34 26 40" fill="#CC2222" opacity="0.6" />
          <path d="M31 38 Q16 36 10 44 Q18 38 28 42" fill="#CC2222" opacity="0.4" />
          {/* Front legs (galloping) */}
          <motion.line
            x1="66" y1="52" x2="74" y2="72"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [74, 78, 74], y2: [72, 70, 72] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="60" y1="52" x2="63" y2="72"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [63, 56, 63], y2: [72, 70, 72] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.12 }}
          />
          {/* Back legs (galloping) */}
          <motion.line
            x1="45" y1="52" x2="40" y2="72"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [40, 35, 40], y2: [72, 70, 72] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
          />
          <motion.line
            x1="40" y1="52" x2="33" y2="72"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [33, 38, 33], y2: [72, 70, 72] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.37 }}
          />
          {/* Hoof sparkles */}
          <motion.circle cx="74" cy="74" r="2" fill="#FFD700" opacity="0.5"
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 0.5, repeat: Infinity }} />
          <motion.circle cx="40" cy="74" r="2" fill="#FFD700" opacity="0.5"
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }} />
        </svg>
      </motion.div>

      {/* Majestic Xích Thố War Horse Shadow */}
      <motion.div
        className="shadow-pulse mt-[-6px] z-0"
        style={{ filter: 'blur(1.5px)' }}
      >
        <svg width="200" height="50" viewBox="0 0 240 60" fill="none" opacity="0.2">
          {/* Heroic war horse silhouette */}
          <ellipse cx="120" cy="24" rx="55" ry="20" fill="#1a0800" />
          {/* Powerful neck */}
          <path d="M165 16 Q172 -4 162 -16 Q158 -20 153 -14" stroke="#1a0800" strokeWidth="15" fill="#1a0800" strokeLinecap="round" />
          {/* Noble head */}
          <ellipse cx="158" cy="-18" rx="15" ry="10" fill="#1a0800" />
          {/* Alert ears */}
          <path d="M150 -28 L147 -36 L154 -28" fill="#1a0800" />
          <path d="M154 -29 L153 -37 L160 -28" fill="#1a0800" />
          {/* Flowing mane */}
          <path d="M162 -16 Q174 4 166 22 Q178 12 172 -2" fill="#1a0800" opacity="0.8" />
          <path d="M160 -12 Q170 0 164 16 Q172 6 167 -4" fill="#1a0800" opacity="0.6" />
          {/* Dramatic tail */}
          <path d="M65 20 Q38 10 22 28 Q34 16 50 24" fill="#1a0800" opacity="0.7" />
          <path d="M65 24 Q32 20 18 35 Q32 24 55 30" fill="#1a0800" opacity="0.5" />
          {/* Powerful legs */}
          <line x1="155" y1="42" x2="168" y2="58" stroke="#1a0800" strokeWidth="7" strokeLinecap="round" />
          <line x1="142" y1="42" x2="138" y2="58" stroke="#1a0800" strokeWidth="7" strokeLinecap="round" />
          <line x1="98" y1="42" x2="90" y2="58" stroke="#1a0800" strokeWidth="7" strokeLinecap="round" />
          <line x1="85" y1="42" x2="75" y2="58" stroke="#1a0800" strokeWidth="7" strokeLinecap="round" />
          {/* Armor silhouette */}
          <path d="M100 14 Q120 10 140 14 Q120 18 100 14" fill="#2a0800" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Ground line */}
      <div className="w-52 h-[1px] bg-gradient-to-r from-transparent via-tet-gold/25 to-transparent mt-[-2px]" />

      {/* Caption */}
      <motion.p
        className="text-[10px] text-tet-gold/40 mt-1 tracking-wide"
        style={{ fontFamily: 'Pattaya, serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Tiểu Dã giấu bóng Xích Thố
      </motion.p>
    </motion.div>
  );
}
