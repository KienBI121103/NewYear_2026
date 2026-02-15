'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TOPICS } from '@/data/zodiac';

interface LandingScreenProps {
  onSubmit: (data: { name: string; birthYear: number; topic: string }) => void;
}

// Get basePath for static assets
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/NewYear_2026')) {
      return '/NewYear_2026';
    }
  }
  return '';
};

// Topic illustration SVGs
const TopicIllustrations: Record<string, React.ReactNode> = {
  love: (
    <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-2">
      <circle cx="30" cy="22" r="8" fill="#FFB6C1" opacity="0.8" />
      <circle cx="22" cy="30" r="8" fill="#FFB6C1" opacity="0.7" />
      <circle cx="38" cy="30" r="8" fill="#FFB6C1" opacity="0.7" />
      <circle cx="25" cy="38" r="8" fill="#FFB6C1" opacity="0.6" />
      <circle cx="35" cy="38" r="8" fill="#FFB6C1" opacity="0.6" />
      <circle cx="30" cy="32" r="4" fill="#FF8A80" />
      <path d="M26 29 Q30 22 34 29 Q34 35 30 38 Q26 35 26 29" fill="#CC2222" opacity="0.5" />
    </svg>
  ),
  career: (
    <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-2">
      <rect x="12" y="12" width="36" height="36" rx="4" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1.5" />
      <line x1="30" y1="12" x2="30" y2="48" stroke="#A5D6A7" strokeWidth="1.5" opacity="0.6" />
      <line x1="12" y1="30" x2="48" y2="30" stroke="#A5D6A7" strokeWidth="1.5" opacity="0.6" />
      <rect x="22" y="22" width="16" height="16" fill="#FFF8E1" opacity="0.2" rx="2" />
      <circle cx="30" cy="24" r="5" fill="#FFD700" opacity="0.6" stroke="#B8860B" strokeWidth="0.5" />
      <text x="30" y="27" textAnchor="middle" fontSize="6" fill="#B8860B" fontWeight="bold">$</text>
    </svg>
  ),
  education: (
    <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-2">
      <path d="M15 50 Q20 35 28 28 Q35 22 42 15" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M28 28 Q22 22 18 15" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
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
      <rect x="32" y="42" width="18" height="12" rx="1.5" fill="#FFF8E1" stroke="#B8860B" strokeWidth="0.8" transform="rotate(-8, 41, 48)" />
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

  const basePath = typeof window !== 'undefined' ? getBasePath() : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-start px-4 py-6 relative z-10"
    >
      {/* Horse Mascot Image Banner */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="w-full max-w-md mb-4"
      >
        <div className="horse-mascot-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/images/horse-mascot.png`}
            alt="Ngựa Mã Tiểu Dã - Chúc Mừng Năm Mới Bính Ngọ 2026"
            width={500}
            height={333}
            style={{ width: '100%', height: 'auto' }}
          />
          {/* Overlay text on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10" style={{ background: 'linear-gradient(transparent, rgba(42,14,4,0.85))' }}>
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              <span className="text-gradient-gold font-serif" style={{ fontFamily: 'Pattaya, serif' }}>
                Gieo Quẻ May Mắn
              </span>
            </h1>
            <h2 className="text-base md:text-lg font-medium text-tet-gold/80 text-center mt-1">
              Đầu Xuân Bính Ngọ 2026
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Divider with "Mã Đáo Thành Công" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-tet-gold/50" />
        <p className="text-sm text-center" style={{ fontFamily: 'Pattaya, serif', color: '#FFD700', textShadow: '0 0 10px rgba(255,215,0,0.3)' }}>
          ✨ Mã Đáo Thành Công ✨
        </p>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-tet-gold/50" />
      </motion.div>

      {/* Form Card */}
      <motion.form
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 space-y-5 pulse-glow"
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

        {/* Topic Selection */}
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
        className="text-xs text-tet-cream/40 mt-5 text-center max-w-xs"
      >
        🧧 Quẻ chỉ mang tính giải trí & chúc phúc đầu xuân
      </motion.p>
    </motion.div>
  );
}
