'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface FortuneResult {
  name: string;
  birthYear: number;
  zodiacAnimal: string;
  zodiacInfo: {
    name: string;
    emoji: string;
    element: string;
    luckyColor: string;
    luckyNumber: number[];
  };
  lunarAge: number;
  topic: string;
  fortune: {
    id: number;
    name: string;
    rating: number;
    title: string;
    poem: string;
    topicFortune: string;
    advice: string;
  };
  isAI: boolean;
}

interface ResultScreenProps {
  result: FortuneResult;
  onReset: () => void;
}

export default function ResultScreen({ result, onReset }: ResultScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Celebration confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 },
        colors: ['#FFD700', '#D32F2F', '#FF6B6B', '#FFA000', '#FFE082'],
        ticks: 100,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#B71C1C',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `que-may-man-2026-${result.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download error:', err);
      alert('Không thể tải ảnh, vui lòng thử chụp màn hình!');
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, result.name]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: `Quẻ may mắn 2026 - ${result.name}`,
      text: `🧧 ${result.name} đã gieo được quẻ "${result.fortune.title}" cho năm Bính Ngọ 2026! Vào gieo quẻ đầu xuân nào! ✨`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('Đã sao chép nội dung để chia sẻ!');
      } catch {
        // Ignore
      }
    }
  }, [result]);

  const stars = Array.from({ length: result.fortune.rating }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center px-4 py-6 relative z-10"
    >
      {/* Celebration header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <motion.div
          className="text-5xl mb-2"
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          🎊
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold font-serif">
          Kết Quả Gieo Quẻ
        </h2>
        <p className="text-tet-cream/60 text-sm mt-1">
          Xuân Bính Ngọ 2026 • {result.topic}
        </p>
      </motion.div>

      {/* Fortune Card with Dragon-Phoenix frame */}
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
        className="fortune-card dragon-phoenix-frame relative rounded-2xl w-full max-w-sm p-6 md:p-8 overflow-visible"
      >
        {/* Card header */}
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">{result.zodiacInfo.emoji}</div>
          <p className="text-tet-red-dark/60 text-xs font-medium uppercase tracking-wider">
            Quẻ #{result.fortune.id} • {result.fortune.name}
          </p>
          <div className="flex justify-center gap-1 mt-1">
            {stars.map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.15 }}
                className="text-lg"
              >
                ⭐
              </motion.span>
            ))}
          </div>
        </div>

        {/* Fortune title - calligraphy style */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl font-bold text-center text-tet-red-dark mb-4 text-calligraphy"
        >
          {result.fortune.title}
        </motion.h3>

        {/* Divider with dragon motif */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-tet-red/40 to-transparent" />
          <span className="text-tet-red/60 text-sm">🐉</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-tet-red/40 to-transparent" />
        </div>

        {/* Poem - calligraphy style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mb-5"
        >
          {result.fortune.poem.split('\n').map((line, i) => (
            <p key={i} className="text-tet-red-dark/85 text-sm md:text-base text-calligraphy-poem">
              {line}
            </p>
          ))}
        </motion.div>

        {/* Divider with phoenix motif */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-tet-red/40 to-transparent" />
          <span className="text-tet-red/60 text-sm">🔥</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-tet-red/40 to-transparent" />
        </div>

        {/* User info */}
        <div className="text-center mb-4">
          <p className="text-tet-red-dark font-semibold text-lg text-calligraphy">{result.name}</p>
          <p className="text-tet-red-dark/60 text-xs">
            Tuổi {result.zodiacInfo.name} • Mệnh {result.zodiacInfo.element} • {result.lunarAge} tuổi
          </p>
        </div>

        {/* Topic fortune */}
        <div className="bg-tet-red/5 rounded-xl p-4 mb-4 border border-tet-red/10">
          <p className="text-tet-red-dark/70 text-sm leading-relaxed text-center">
            {result.fortune.topicFortune}
          </p>
        </div>

        {/* Advice */}
        <div className="bg-tet-green/5 border border-tet-green/20 rounded-xl p-4">
          <p className="text-tet-green text-xs font-semibold mb-1 text-center">💡 Lời khuyên năm mới</p>
          <p className="text-tet-green/80 text-sm leading-relaxed text-center">
            {result.fortune.advice}
          </p>
        </div>

        {/* Lucky info */}
        <div className="mt-4 flex justify-center gap-3 text-xs text-tet-red-dark/50">
          <span>🎨 {result.zodiacInfo.luckyColor}</span>
          <span>🔢 {result.zodiacInfo.luckyNumber.join(', ')}</span>
        </div>

        {/* Watermark */}
        <p className="text-center text-[10px] text-tet-red-dark/30 mt-4">
          gieo-que-may-man.2026 • Xuân Bính Ngọ 🐴
        </p>
      </motion.div>

      {/* Zodiac Details Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setShowDetails(!showDetails)}
        className="mt-4 text-tet-gold/70 text-sm hover:text-tet-gold transition-colors"
      >
        {showDetails ? '▲ Ẩn chi tiết tử vi' : '▼ Xem chi tiết tử vi 2026'}
      </motion.button>

      {/* Zodiac Details Panel */}
      {showDetails && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="w-full max-w-sm glass-card-gold rounded-2xl p-5 mt-3"
        >
          <h4 className="text-tet-gold font-semibold text-center mb-3 text-calligraphy">
            {result.zodiacInfo.emoji} Tử Vi {result.zodiacInfo.name} - Năm Bính Ngọ 2026
          </h4>
          <div className="space-y-3 text-sm text-tet-cream/80">
            <div>
              <span className="text-tet-gold text-xs font-semibold">💕 Tình duyên:</span>
              <p className="mt-1 text-xs leading-relaxed">{result.fortune.topicFortune}</p>
            </div>
            <div>
              <span className="text-tet-gold text-xs font-semibold">🎨 Màu may mắn:</span>
              <p className="mt-1 text-xs">{result.zodiacInfo.luckyColor}</p>
            </div>
            <div>
              <span className="text-tet-gold text-xs font-semibold">🔢 Số may mắn:</span>
              <p className="mt-1 text-xs">{result.zodiacInfo.luckyNumber.join(', ')}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 w-full max-w-sm space-y-3"
      >
        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="btn-tet-gold w-full text-center block disabled:opacity-50 rounded-full py-3 px-6 font-semibold"
        >
          {isDownloading ? (
            <span className="loading-dots">
              Đang tạo ảnh<span>.</span><span>.</span><span>.</span>
            </span>
          ) : (
            '📸 Tải ảnh quẻ để chia sẻ'
          )}
        </button>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="w-full py-3 px-6 rounded-full bg-tet-green/80 hover:bg-tet-green text-white font-semibold text-center transition-all hover:shadow-lg"
        >
          🔗 Chia sẻ lên mạng xã hội
        </button>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="w-full py-3 px-6 rounded-full border-2 border-tet-gold/30 text-tet-gold/70 hover:border-tet-gold hover:text-tet-gold font-medium text-center transition-all text-sm"
        >
          🔄 Gieo quẻ lại
        </button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-[10px] text-tet-cream/30 mt-8 text-center"
      >
        🧧 Chúc {result.name} năm Bính Ngọ 2026 Mã Đáo Thành Công! 🧧
      </motion.p>
    </motion.div>
  );
}
