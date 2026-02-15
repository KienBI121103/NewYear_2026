'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TOPICS } from '@/data/zodiac';
import ChibiHorseMascot from './ChibiHorseMascot';
import HorseShadowBanner from './HorseShadowBanner';

interface LandingScreenProps {
  onSubmit: (data: { name: string; birthYear: number; topic: string }) => void;
}

// Topic illustration SVGs
const TopicIllustrations: Record<string, React.ReactNode> = {
  love: (
    <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-2">
      {/* Hoa đào (peach blossom) for love */}
      <circle cx="30" cy="22" r="8" fill="#FFB6C1" opacity="0.8" />
      <circle cx="22" cy="30" r="8" fill="#FFB6C1" opacity="0.7" />
      <circle cx="38" cy="30" r="8" fill="#FFB6C1" opacity="0.7" />
      <circle cx="25" cy="38" r="8" fill="#FFB6C1" opacity="0.6" />
      <circle cx="35" cy="38" r="8" fill="#FFB6C1" opacity="0.6" />
      <circle cx="30" cy="32" r="4" fill="#FF8A80" />
      {/* Heart center */}
      <path d="M26 29 Q30 22 34 29 Q34 35 30 38 Q26 35 26 29" fill="#D32F2F" opacity="0.5" />
    </svg>
  ),
  career: (
    <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-2">
      {/* Bánh chưng */}
      <rect x="12" y="12" width="36" height="36" rx="4" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1.5" />
      <line x1="30" y1="12" x2="30" y2="48" stroke="#A5D6A7" strokeWidth="1.5" opacity="0.6" />
      <line x1="12" y1="30" x2="48" y2="30" stroke="#A5D6A7" strokeWidth="1.5" opacity="0.6" />
      {/* Lá dong wrapping */}
      <path d="M8 15 Q12 8 18 12" stroke="#388E3C" strokeWidth="1.5" fill="none" />
      <path d="M42 8 Q48 12 52 15" stroke="#388E3C" strokeWidth="1.5" fill="none" />
      {/* Center filling */}
      <rect x="22" y="22" width="16" height="16" fill="#FFF8E1" opacity="0.2" rx="2" />
      {/* Gold coin on top */}
      <circle cx="30" cy="24" r="5" fill="#FFD700" opacity="0.6" stroke="#B8860B" strokeWidth="0.5" />
      <text x="30" y="27" textAnchor="middle" fontSize="6" fill="#B8860B" fontWeight="bold">$</text>
    </svg>
  ),
  education: (
    <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-2">
      {/* Cành mai (apricot blossom branch) */}
      <path d="M15 50 Q20 35 28 28 Q35 22 42 15" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M28 28 Q22 22 18 15" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Hoa mai flowers */}
      <g transform="translate(42, 15)">
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="#FFD700" opacity="0.85" />
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="#FFD700" opacity="0.85" transform="rotate(72)" />
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="#FFD700" opacity="0.85" transform="rotate(144)" />
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="#FFD700" opacity="0.85" transform="rotate(216)" />
        <ellipse cx="0" cy="-5" rx="3" ry="5" fill="#FFD700" opacity="0.85" transform="rotate(288)" />
        <circle cx="0" cy="0" r="2.5" fill="#FFA000" />
      </g>
      <g transform="translate(18, 15)">
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFD700" opacity="0.75" />
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFD700" opacity="0.75" transform="rotate(72)" />
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFD700" opacity="0.75" transform="rotate(144)" />
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFD700" opacity="0.75" transform="rotate(216)" />
        <ellipse cx="0" cy="-4" rx="2.5" ry="4" fill="#FFD700" opacity="0.75" transform="rotate(288)" />
        <circle cx="0" cy="0" r="2" fill="#FFA000" />
      </g>
      <g transform="translate(32, 24)">
        <ellipse cx="0" cy="-3.5" rx="2" ry="3.5" fill="#FFD700" opacity="0.7" />
        <ellipse cx="0" cy="-3.5" rx="2" ry="3.5" fill="#FFD700" opacity="0.7" transform="rotate(72)" />
        <ellipse cx="0" cy="-3.5" rx="2" ry="3.5" fill="#FFD700" opacity="0.7" transform="rotate(144)" />
        <ellipse cx="0" cy="-3.5" rx="2" ry="3.5" fill="#FFD700" opacity="0.7" transform="rotate(216)" />
        <ellipse cx="0" cy="-3.5" rx="2" ry="3.5" fill="#FFD700" opacity="0.7" transform="rotate(288)" />
        <circle cx="0" cy="0" r="1.5" fill="#FFA000" />
      </g>
      {/* Book */}
      <rect x="32" y="42" width="18" height="12" rx="1.5" fill="#FFF8E1" stroke="#B8860B" strokeWidth="0.8" transform="rotate(-8, 41, 48)" />
      <line x1="41" y1="42" x2="41" y2="54" stroke="#B8860B" strokeWidth="0.5" opacity="0.3" transform="rotate(-8, 41, 48)" />
    </svg>
  ),
};

export default function LandingScreen({ onSubmit }: LandingScreenProps) {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [topic, setTopic] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentYear = 2026;
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i - 5);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!birthYear) newErrors.birthYear = 'Vui lòng chọn năm sinh';
    if (!topic) newErrors.topic = 'Vui lòng chọn chủ đề';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name: name.trim(), birthYear: parseInt(birthYear), topic });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10"
    >
      {/* Header with Chibi Horse */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-6"
      >
        {/* Chibi Horse Mascot */}
        <motion.div
          className="mb-2 flex justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChibiHorseMascot size={160} />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          <span className="text-gradient-gold font-serif">Gieo Quẻ May Mắn</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-tet-gold/80">
          Đầu Xuân Bính Ngọ 2026
        </h2>

        {/* Divider with "Vạn Sự Như Ý" */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-tet-gold/50" />
          <p className="text-sm text-thu-phap text-tet-gold/70 tracking-wider">
            ✨ Vạn Sự Như Ý ✨
          </p>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-tet-gold/50" />
        </div>

        {/* Horse Shadow Banner */}
        <HorseShadowBanner />
      </motion.div>

      {/* Form Card */}
      <motion.form
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 space-y-6 pulse-glow"
      >
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-tet-gold mb-2">
            🏮 Họ và tên
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); }}
            placeholder="Nhập họ tên của bạn..."
            className="input-tet"
            maxLength={50}
          />
          {errors.name && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-300 text-xs mt-1">
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Birth Year Select */}
        <div>
          <label className="block text-sm font-medium text-tet-gold mb-2">
            📅 Năm sinh (Dương lịch)
          </label>
          <select
            value={birthYear}
            onChange={(e) => { setBirthYear(e.target.value); setErrors(prev => ({ ...prev, birthYear: '' })); }}
            className="input-tet appearance-none cursor-pointer"
          >
            <option value="">-- Chọn năm sinh --</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.birthYear && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-300 text-xs mt-1">
              {errors.birthYear}
            </motion.p>
          )}
        </div>

        {/* Topic Selection - Card-based with illustrations */}
        <div>
          <label className="block text-sm font-medium text-tet-gold mb-3">
            🎯 Chủ đề gieo quẻ
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TOPICS.map((t) => (
              <motion.button
                key={t.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setTopic(t.id); setErrors(prev => ({ ...prev, topic: '' })); }}
                className={`topic-card text-center ${topic === t.id ? 'active' : ''}`}
              >
                {/* SVG illustration */}
                {TopicIllustrations[t.id] || <span className="text-3xl block mb-2">{t.icon}</span>}
                <span className="text-sm font-semibold topic-label block">{t.label}</span>
                <span className="text-[10px] topic-desc block mt-1">{t.description}</span>
              </motion.button>
            ))}
          </div>
          {errors.topic && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-300 text-xs mt-1 text-center">
              {errors.topic}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-tet w-full text-center block"
        >
          🎋 Bắt đầu Gieo Quẻ
        </motion.button>
      </motion.form>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-tet-cream/40 mt-6 text-center max-w-xs"
      >
        🧧 Quẻ chỉ mang tính giải trí & chúc phúc đầu xuân
      </motion.p>
    </motion.div>
  );
}
