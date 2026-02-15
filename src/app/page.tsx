'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import LandingScreen from '@/components/LandingScreen';
import ShakingScreen from '@/components/ShakingScreen';
import ResultScreen from '@/components/ResultScreen';
import { generateFortune } from '@/lib/generateFortune';

// Dynamic import for heavy components (better performance)
const BackgroundEffects = dynamic(() => import('@/components/BackgroundEffects'), {
  ssr: false,
});
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), {
  ssr: false,
});

type Screen = 'landing' | 'shaking' | 'loading' | 'result';

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

interface FormData {
  name: string;
  birthYear: number;
  topic: string;
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission - generate fortune client-side
  const handleSubmit = useCallback(async (data: FormData) => {
    setFormData(data);
    setScreen('shaking');
    setError(null);

    try {
      // Generate fortune client-side (works on static hosting like GitHub Pages)
      const fortuneResult = generateFortune(data.name, data.birthYear, data.topic);
      // Small delay to simulate loading and let shaking animation play
      await new Promise(resolve => setTimeout(resolve, 500));
      setResult(fortuneResult);
    } catch (err) {
      console.error('Fortune generation error:', err);
      setError('Không thể lấy quẻ, vui lòng thử lại!');
    }
  }, []);

  // Handle shaking animation complete
  const handleShakingComplete = useCallback(() => {
    if (error) {
      setScreen('landing');
      alert(error);
    } else if (result) {
      setScreen('result');
    } else {
      // API still loading, show loading state briefly then result
      setScreen('loading');
      const checkResult = setInterval(() => {
        setResult((current) => {
          if (current) {
            clearInterval(checkResult);
            setScreen('result');
          }
          return current;
        });
      }, 500);

      // Timeout after 15 seconds
      setTimeout(() => {
        clearInterval(checkResult);
        setScreen((current) => {
          if (current === 'loading') {
            alert('Quẻ đang tải lâu quá, vui lòng thử lại!');
            return 'landing';
          }
          return current;
        });
      }, 15000);
    }
  }, [error, result]);

  // Handle reset
  const handleReset = useCallback(() => {
    setScreen('landing');
    setFormData(null);
    setResult(null);
    setError(null);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Music Player */}
      <MusicPlayer />

      {/* Screen Router */}
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingScreen key="landing" onSubmit={handleSubmit} />
        )}

        {screen === 'shaking' && formData && (
          <ShakingScreen
            key="shaking"
            onComplete={handleShakingComplete}
            userName={formData.name}
          />
        )}

        {screen === 'loading' && (
          <div key="loading" className="min-h-screen flex flex-col items-center justify-center relative z-10">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce-slow">🐴</div>
              <p className="text-tet-gold text-lg font-medium mb-2">
                Đang mở quẻ...
              </p>
              <div className="loading-dots text-tet-gold/60 text-2xl">
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </div>
              <p className="text-tet-cream/40 text-xs mt-4">
                AI đang viết lời chúc riêng cho bạn ✨
              </p>
            </div>
          </div>
        )}

        {screen === 'result' && result && (
          <ResultScreen
            key="result"
            result={result}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
