'use client';

import { motion } from 'framer-motion';

/**
 * Horse Shadow Banner - A small running horse with a majestic Xích Thố war horse shadow.
 * The shadow appears larger and more heroic than the actual horse,
 * symbolizing potential and hidden greatness.
 */
export default function HorseShadowBanner() {
  return (
    <motion.div
      className="relative w-full flex flex-col items-center justify-center py-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Small running horse */}
      <motion.div
        className="relative z-10 horse-bounce"
        animate={{ x: [-8, 8, -8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="80" height="60" viewBox="0 0 100 75" fill="none">
          {/* Body */}
          <ellipse cx="50" cy="35" rx="22" ry="14" fill="#D4A017" />
          {/* Neck */}
          <path d="M68 30 Q72 18 66 8" stroke="#D4A017" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Head */}
          <ellipse cx="64" cy="8" rx="8" ry="6" fill="#D4A017" />
          {/* Ear */}
          <path d="M60 2 L58 -4 L63 1" fill="#B8860B" />
          {/* Eye */}
          <circle cx="67" cy="6" r="1.5" fill="#3E0000" />
          {/* Mane (red - áo dài style) */}
          <path d="M66 8 Q72 18 68 28 Q74 22 70 14" fill="#D32F2F" opacity="0.7" />
          <path d="M64 6 Q68 12 66 20 Q70 15 67 10" fill="#C62828" opacity="0.5" />
          {/* Tail */}
          <path d="M28 32 Q16 28 10 38 Q18 32 22 38" fill="#D32F2F" opacity="0.6" />
          <path d="M28 35 Q14 34 8 42 Q16 36 24 40" fill="#C62828" opacity="0.4" />
          {/* Front legs (galloping) */}
          <motion.line
            x1="60" y1="48" x2="68" y2="68"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [68, 72, 68], y2: [68, 66, 68] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="55" y1="48" x2="58" y2="68"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [58, 50, 58], y2: [68, 66, 68] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          />
          {/* Back legs (galloping) */}
          <motion.line
            x1="40" y1="48" x2="35" y2="68"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [35, 30, 35], y2: [68, 66, 68] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.line
            x1="35" y1="48" x2="28" y2="68"
            stroke="#B8860B" strokeWidth="4" strokeLinecap="round"
            animate={{ x2: [28, 34, 28], y2: [68, 66, 68] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          />
          {/* Hooves sparkle */}
          <motion.circle cx="68" cy="70" r="2" fill="#FFD700" opacity="0.6"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.6, repeat: Infinity }} />
          {/* Red sash (áo) on horse */}
          <path d="M42 28 Q50 24 58 28 Q50 32 42 28" fill="#D32F2F" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Majestic Xích Thố War Horse Shadow */}
      <motion.div
        className="shadow-pulse mt-[-8px] z-0"
        style={{
          filter: 'blur(1px)',
        }}
      >
        <svg width="180" height="45" viewBox="0 0 220 55" fill="none" opacity="0.22">
          {/* Heroic war horse silhouette - much larger and more dramatic */}
          {/* Body - powerful and muscular */}
          <ellipse cx="110" cy="22" rx="50" ry="18" fill="#1a0000" />
          {/* Neck - arched proudly */}
          <path d="M150 15 Q158 -5 148 -15 Q145 -18 140 -12" stroke="#1a0000" strokeWidth="14" fill="#1a0000" strokeLinecap="round" />
          {/* Head - noble profile */}
          <ellipse cx="145" cy="-16" rx="14" ry="9" fill="#1a0000" />
          {/* Ears - alert */}
          <path d="M138 -26 L135 -34 L142 -26" fill="#1a0000" />
          <path d="M142 -27 L141 -35 L147 -26" fill="#1a0000" />
          {/* Flowing mane */}
          <path d="M148 -15 Q160 5 152 20 Q165 10 158 -2" fill="#1a0000" opacity="0.8" />
          <path d="M146 -10 Q155 0 150 14 Q158 5 153 -4" fill="#1a0000" opacity="0.6" />
          {/* Tail - flowing dramatically */}
          <path d="M60 18 Q35 8 20 25 Q30 15 45 22" fill="#1a0000" opacity="0.7" />
          <path d="M60 22 Q30 18 15 32 Q28 22 50 28" fill="#1a0000" opacity="0.5" />
          <path d="M60 26 Q38 28 25 38 Q35 30 55 32" fill="#1a0000" opacity="0.3" />
          {/* Powerful legs */}
          <line x1="140" y1="38" x2="152" y2="54" stroke="#1a0000" strokeWidth="6" strokeLinecap="round" />
          <line x1="130" y1="38" x2="125" y2="54" stroke="#1a0000" strokeWidth="6" strokeLinecap="round" />
          <line x1="90" y1="38" x2="82" y2="54" stroke="#1a0000" strokeWidth="6" strokeLinecap="round" />
          <line x1="80" y1="38" x2="70" y2="54" stroke="#1a0000" strokeWidth="6" strokeLinecap="round" />
          {/* Armor suggestion on the shadow */}
          <path d="M95 12 Q110 8 125 12 Q110 16 95 12" fill="#2a0000" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Ground line */}
      <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-tet-gold/20 to-transparent mt-[-2px]" />
    </motion.div>
  );
}
