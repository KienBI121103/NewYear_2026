'use client';

import { motion } from 'framer-motion';

interface ChibiHorseMascotProps {
  className?: string;
  size?: number;
}

export default function ChibiHorseMascot({ className = '', size = 200 }: ChibiHorseMascotProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size * 1.1 }}
    >
      {/* Floating gold coins around */}
      <motion.div
        className="absolute gold-coin"
        style={{ top: '5%', left: '-8%', fontSize: size * 0.12 }}
        animate={{ y: [0, -8, 0], rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        🪙
      </motion.div>
      <motion.div
        className="absolute gold-coin"
        style={{ top: '15%', right: '-5%', fontSize: size * 0.1 }}
        animate={{ y: [0, -10, 0], rotate: [0, -360] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        🪙
      </motion.div>
      <motion.div
        className="absolute gold-coin"
        style={{ bottom: '25%', left: '-12%', fontSize: size * 0.09 }}
        animate={{ y: [0, -6, 0], rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        🪙
      </motion.div>

      {/* Sparkle particles */}
      {[
        { top: '0%', left: '20%', delay: 0 },
        { top: '10%', right: '10%', delay: 0.8 },
        { bottom: '30%', right: '-5%', delay: 1.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          style={{ ...pos, fontSize: size * 0.08 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
        >
          ✦
        </motion.div>
      ))}

      {/* Main SVG: Chibi Horse in Áo Dài on Golden Cloud */}
      <svg
        viewBox="0 0 220 250"
        width={size}
        height={size * 1.14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === Golden Cloud Base === */}
        <g opacity="0.9">
          <ellipse cx="110" cy="230" rx="85" ry="18" fill="url(#cloudGrad)" />
          <ellipse cx="70" cy="225" rx="35" ry="12" fill="url(#cloudGrad)" />
          <ellipse cx="150" cy="225" rx="35" ry="12" fill="url(#cloudGrad)" />
          <ellipse cx="110" cy="222" rx="60" ry="14" fill="url(#cloudGradLight)" />
          {/* Cloud swirl details */}
          <path d="M50 228 Q60 218 75 224 Q85 215 100 222" stroke="#FFE082" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M120 220 Q135 212 148 220 Q158 214 170 222" stroke="#FFE082" strokeWidth="1" fill="none" opacity="0.5" />
        </g>

        {/* === Horse Body === */}
        {/* Main body - round chibi shape */}
        <ellipse cx="110" cy="160" rx="42" ry="38" fill="url(#bodyGrad)" />
        {/* Belly highlight */}
        <ellipse cx="110" cy="165" rx="30" ry="24" fill="#FFCC80" opacity="0.3" />

        {/* === Áo Dài (Yellow/Gold) === */}
        <path
          d="M78 142 Q80 125 110 120 Q140 125 142 142 L145 195 Q128 205 110 208 Q92 205 75 195 Z"
          fill="url(#aoDaiGrad)"
          stroke="#B8860B"
          strokeWidth="1.5"
        />
        {/* Áo dài collar (cổ áo) */}
        <path d="M98 127 L110 140 L122 127" stroke="#B8860B" strokeWidth="2" fill="none" />
        <path d="M100 128 L110 138 L120 128" fill="#FFE082" opacity="0.5" />
        {/* Áo dài pattern - flower */}
        <circle cx="105" cy="155" r="4" fill="#D32F2F" opacity="0.5" />
        <circle cx="118" cy="168" r="3" fill="#D32F2F" opacity="0.4" />
        <circle cx="100" cy="175" r="3.5" fill="#D32F2F" opacity="0.4" />
        {/* Áo dài gold button dots */}
        <circle cx="110" cy="145" r="1.5" fill="#B8860B" />
        <circle cx="110" cy="155" r="1.5" fill="#B8860B" />
        <circle cx="110" cy="165" r="1.5" fill="#B8860B" />

        {/* === Khăn Đóng (Traditional headpiece) === */}
        <path
          d="M85 75 Q88 65 110 62 Q132 65 135 75 L132 80 Q110 77 88 80 Z"
          fill="#D32F2F"
          stroke="#B71C1C"
          strokeWidth="1"
        />
        {/* Khăn đóng ribbon */}
        <path d="M88 78 Q82 82 78 95" stroke="#D32F2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M132 78 Q138 82 142 95" stroke="#D32F2F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Gold decoration on khan dong */}
        <circle cx="110" cy="70" r="3" fill="#FFD700" />
        <path d="M106 70 L110 66 L114 70 L110 74 Z" fill="#FFE44D" opacity="0.7" />

        {/* === Horse Head === */}
        {/* Head main shape */}
        <ellipse cx="110" cy="92" rx="30" ry="27" fill="url(#bodyGrad)" />
        {/* Snout */}
        <ellipse cx="110" cy="108" rx="16" ry="10" fill="#FFCC80" />
        {/* Snout highlight */}
        <ellipse cx="110" cy="106" rx="12" ry="7" fill="#FFE0B2" opacity="0.5" />

        {/* === Eyes (big chibi eyes) === */}
        {/* Left eye white */}
        <ellipse cx="97" cy="90" rx="9" ry="10" fill="white" />
        {/* Left eye iris */}
        <ellipse cx="98" cy="91" rx="6" ry="7" fill="#3E2723" />
        {/* Left eye pupil */}
        <ellipse cx="99" cy="90" rx="3" ry="3.5" fill="black" />
        {/* Left eye shine */}
        <circle cx="101" cy="88" r="2.5" fill="white" opacity="0.9" />
        <circle cx="96" cy="93" r="1.2" fill="white" opacity="0.5" />

        {/* Right eye white */}
        <ellipse cx="123" cy="90" rx="9" ry="10" fill="white" />
        {/* Right eye iris */}
        <ellipse cx="122" cy="91" rx="6" ry="7" fill="#3E2723" />
        {/* Right eye pupil */}
        <ellipse cx="121" cy="90" rx="3" ry="3.5" fill="black" />
        {/* Right eye shine */}
        <circle cx="123" cy="88" r="2.5" fill="white" opacity="0.9" />
        <circle cx="118" cy="93" r="1.2" fill="white" opacity="0.5" />

        {/* Blush cheeks */}
        <ellipse cx="88" cy="100" rx="7" ry="4" fill="#FF8A80" opacity="0.5" />
        <ellipse cx="132" cy="100" rx="7" ry="4" fill="#FF8A80" opacity="0.5" />

        {/* Happy smile */}
        <path d="M102 106 Q110 114 118 106" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Nostrils */}
        <circle cx="106" cy="108" r="1.2" fill="#8D6E63" />
        <circle cx="114" cy="108" r="1.2" fill="#8D6E63" />

        {/* === Ears === */}
        {/* Left ear */}
        <path d="M82 78 Q78 62 85 55 Q90 62 86 76" fill="url(#bodyGrad)" stroke="#D4A017" strokeWidth="0.5" />
        <path d="M84 74 Q81 65 86 59" fill="#FFB74D" opacity="0.4" />
        {/* Right ear */}
        <path d="M138 78 Q142 62 135 55 Q130 62 134 76" fill="url(#bodyGrad)" stroke="#D4A017" strokeWidth="0.5" />
        <path d="M136 74 Q139 65 134 59" fill="#FFB74D" opacity="0.4" />

        {/* === Mane === */}
        <path d="M95 68 Q100 55 105 65 Q108 50 112 63 Q116 48 118 62 Q122 52 125 68"
          fill="#5D4037" opacity="0.6" />
        <path d="M97 70 Q102 58 106 67 Q109 54 113 65 Q117 52 120 66 Q123 55 125 70"
          fill="#8D6E63" opacity="0.4" />

        {/* === Front Legs (short chibi legs) === */}
        <rect x="90" y="195" width="12" height="24" rx="6" fill="url(#bodyGrad)" />
        <rect x="118" y="195" width="12" height="24" rx="6" fill="url(#bodyGrad)" />
        {/* Hooves */}
        <rect x="89" y="214" width="14" height="6" rx="3" fill="#5D4037" />
        <rect x="117" y="214" width="14" height="6" rx="3" fill="#5D4037" />

        {/* === Tail === */}
        <path
          d="M68 155 Q55 145 50 160 Q48 170 55 175 Q50 168 58 158 Q62 150 68 155"
          fill="#5D4037" opacity="0.6"
        />
        <path
          d="M70 158 Q60 150 56 162 Q54 168 58 172"
          stroke="#8D6E63" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"
        />

        {/* === Gradients === */}
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFCC80" />
            <stop offset="50%" stopColor="#FFB74D" />
            <stop offset="100%" stopColor="#FFA726" />
          </linearGradient>
          <linearGradient id="aoDaiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="40%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
          <radialGradient id="cloudGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="60%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFC107" stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="cloudGradLight" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#FFF8E1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFE082" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
