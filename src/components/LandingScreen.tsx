'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TOPICS } from '@/data/zodiac';

interface LandingScreenProps {
  onSubmit: (data: { name: string; birthYear: number; topic: string }) => void;
}

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
      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-8"
      >
        {/* Dong Ho Horse + decorations */}
        <motion.div
          className="mb-4 flex justify-center items-center gap-3"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            className="text-2xl md:text-3xl opacity-60"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌸
          </motion.span>
          <div className="text-7xl md:text-8xl filter drop-shadow-lg horse-gallop">🐴</div>
          <motion.span
            className="text-2xl md:text-3xl opacity-60"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            🌺
          </motion.span>
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          <span className="text-gradient-gold font-serif">Gieo Quẻ May Mắn</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-tet-gold/80">
          Đầu Xuân Bính Ngọ 2026
        </h2>

        {/* Subtitle with decorative line */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-tet-gold/50" />
          <p className="text-sm text-tet-cream/60">
            ✨ Vạn Sự Như Ý ✨
          </p>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-tet-gold/50" />
        </div>
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
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-300 text-xs mt-1"
            >
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
            <option value="" className="bg-tet-red-dark text-tet-cream">-- Chọn năm sinh --</option>
            {years.map((y) => (
              <option key={y} value={y} className="bg-tet-red-dark text-tet-cream">
                {y}
              </option>
            ))}
          </select>
          {errors.birthYear && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-300 text-xs mt-1"
            >
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
                <span className="text-3xl block mb-2">{t.icon}</span>
                <span className="text-sm font-semibold text-tet-cream block">{t.label}</span>
                <span className="text-[10px] text-tet-cream/50 block mt-1">{t.description}</span>
              </motion.button>
            ))}
          </div>
          {errors.topic && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-300 text-xs mt-1 text-center"
            >
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

      {/* Footer note */}
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
