'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ShakingScreenProps {
  onComplete: () => void;
  userName: string;
}

export default function ShakingScreen({ onComplete, userName }: ShakingScreenProps) {
  const [phase, setPhase] = useState<'intro' | 'shaking' | 'stick-out' | 'reveal'>('intro');
  const [shakeCount, setShakeCount] = useState(0);
  const [isUserShaking, setIsUserShaking] = useState(false);

  // Fire confetti when stick comes out
  const fireConfetti = useCallback(() => {
    // Red and gold Tết confetti burst
    const defaults = {
      spread: 360,
      ticks: 80,
      gravity: 0.8,
      decay: 0.92,
      startVelocity: 25,
      colors: ['#FFD700', '#D32F2F', '#FF6B6B', '#FFA000', '#B71C1C', '#FFE082'],
    };

    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 1.2,
      shapes: ['circle', 'square'],
      origin: { x: 0.5, y: 0.5 },
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 35,
        scalar: 0.9,
        shapes: ['circle'],
        origin: { x: 0.4, y: 0.45 },
      });
    }, 200);

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 35,
        scalar: 0.9,
        shapes: ['square'],
        origin: { x: 0.6, y: 0.45 },
      });
    }, 400);
  }, []);

  // Auto-progress through phases
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setPhase('shaking'), 1500));
    timers.push(setTimeout(() => {
      setPhase('stick-out');
    }, 5500));
    timers.push(setTimeout(() => {
      setPhase('reveal');
      fireConfetti();
    }, 7500));
    timers.push(setTimeout(() => {
      onComplete();
    }, 9000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete, fireConfetti]);

  // Shake interaction
  const handleShake = useCallback(() => {
    if (phase === 'shaking') {
      setIsUserShaking(true);
      setShakeCount(prev => prev + 1);
      setTimeout(() => setIsUserShaking(false), 200);
    }
  }, [phase]);

  // Device motion for mobile shake detection
  useEffect(() => {
    let lastAcceleration = 0;
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (acc) {
        const total = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);
        if (total - lastAcceleration > 15) {
          handleShake();
        }
        lastAcceleration = total;
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [handleShake]);

  // Stick falling particles
  const stickParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 60,
    y: Math.random() * -30 - 10,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.3,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10"
      onClick={handleShake}
    >
      {/* Header text */}
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-8"
          >
            <p className="text-tet-gold text-lg font-medium">
              🙏 {userName} đang thành tâm gieo quẻ...
            </p>
          </motion.div>
        )}

        {phase === 'shaking' && (
          <motion.div
            key="shaking"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mb-8"
          >
            <p className="text-tet-gold text-lg font-medium mb-2">
              🎋 Lắc ống quẻ nào!
            </p>
            <p className="text-tet-cream/50 text-sm">
              Nhấn vào màn hình hoặc lắc điện thoại
            </p>
            {shakeCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mt-2"
              >
                <span className="text-tet-gold/70 text-xs">
                  Đã lắc {shakeCount} lần ✨
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === 'stick-out' && (
          <motion.div
            key="stick-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-8"
          >
            <p className="text-tet-gold text-lg font-medium">
              ✨ Một quẻ đang rơi ra...
            </p>
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <p className="text-tet-gold text-xl font-bold">
              🎊 Đã có quẻ rồi!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bamboo Tube Container */}
      <div className="relative flex items-end justify-center" style={{ height: '340px', width: '200px' }}>
        {/* Fortune sticks inside tube */}
        <AnimatePresence>
          {(phase === 'shaking' || phase === 'intro') && (
            <>
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={`stick-${i}`}
                  className="fortune-stick absolute"
                  style={{
                    width: '8px',
                    height: '180px',
                    left: `${55 + (i - 3) * 14}px`,
                    bottom: '90px',
                    transformOrigin: 'bottom center',
                  }}
                  animate={
                    phase === 'shaking'
                      ? {
                          rotate: [
                            (i - 3) * 3,
                            (i - 3) * 3 + 8,
                            (i - 3) * 3 - 8,
                            (i - 3) * 3,
                          ],
                          y: isUserShaking ? [-5, 5, -3, 0] : [0, -2, 0],
                        }
                      : { rotate: (i - 3) * 3 }
                  }
                  transition={{
                    duration: phase === 'shaking' ? 0.4 : 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  {/* Stick tip */}
                  <div className="w-full h-4 rounded-t-full bg-gradient-to-b from-red-600 to-red-800" />
                  {/* Stick body */}
                  <div className="w-full flex-1 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400" style={{ height: 'calc(100% - 16px)' }} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* The chosen stick falling out */}
        <AnimatePresence>
          {(phase === 'stick-out' || phase === 'reveal') && (
            <motion.div
              key="chosen-stick"
              className="absolute"
              style={{ left: '80px', bottom: '90px', zIndex: 10 }}
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: phase === 'reveal' ? 200 : 80,
                rotate: phase === 'reveal' ? 45 : 25,
                x: phase === 'reveal' ? 60 : 30,
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div className="fortune-stick" style={{ width: '10px', height: '180px' }}>
                <div className="w-full h-5 rounded-t-full bg-gradient-to-b from-red-500 to-red-700" />
                <div className="w-full bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400" style={{ height: 'calc(100% - 20px)' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Golden sparkles when stick falls */}
        <AnimatePresence>
          {phase === 'stick-out' && stickParticles.map((p) => (
            <motion.div
              key={`particle-${p.id}`}
              className="absolute w-2 h-2 rounded-full bg-tet-gold"
              style={{ left: '96px', bottom: '200px', zIndex: 20 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: p.x,
                y: p.y,
                rotate: p.rotation,
              }}
              transition={{
                duration: 0.8,
                delay: p.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Bamboo Tube */}
        <motion.div
          className="bamboo-tube relative"
          style={{
            width: '120px',
            height: '200px',
          }}
          animate={
            phase === 'shaking'
              ? {
                  rotate: [-3, 3, -2, 2, 0],
                  x: isUserShaking ? [-4, 4, -2, 2, 0] : [0],
                }
              : { rotate: 0 }
          }
          transition={{
            duration: 0.5,
            repeat: phase === 'shaking' ? Infinity : 0,
            repeatType: 'reverse',
          }}
        >
          {/* Tube opening rim */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[130px] h-5 rounded-[50%] bg-gradient-to-b from-amber-800 to-amber-900 border-2 border-amber-700" />

          {/* Tube body decoration - bamboo rings */}
          <div className="absolute top-[40px] left-0 w-full h-[2px] bg-amber-900/40" />
          <div className="absolute top-[80px] left-0 w-full h-[2px] bg-amber-900/40" />
          <div className="absolute top-[120px] left-0 w-full h-[2px] bg-amber-900/40" />
          <div className="absolute top-[160px] left-0 w-full h-[2px] bg-amber-900/40" />

          {/* Chinese character decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-300/30 text-4xl font-serif select-none">
            籤
          </div>

          {/* Tube bottom */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[110px] h-4 rounded-b-xl bg-gradient-to-b from-amber-900 to-amber-950" />
        </motion.div>
      </div>

      {/* Light rays during reveal */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  width: '2px',
                  height: '300px',
                  background: 'linear-gradient(to top, rgba(255,215,0,0.4), transparent)',
                  transform: `rotate(${i * 30}deg)`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 0.6, 0] }}
                transition={{ duration: 1.5, delay: i * 0.05 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
