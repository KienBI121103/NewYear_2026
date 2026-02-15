'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function SoundToggle() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create a simple pentatonic melody using Web Audio API (no external files needed)
  const startMusic = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = ctx;

      // Pentatonic scale notes (Vietnamese style)
      const notes = [
        261.63, 293.66, 329.63, 392.00, 440.00, // C4 D4 E4 G4 A4
        523.25, 587.33, 659.25, 783.99, 880.00, // C5 D5 E5 G5 A5
      ];

      const melodyPattern = [0, 2, 4, 3, 2, 4, 5, 4, 3, 2, 0, 2, 3, 4, 2, 0];
      let noteIndex = 0;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.08; // Very subtle
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      const playNote = () => {
        if (!audioContextRef.current) return;

        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = notes[melodyPattern[noteIndex % melodyPattern.length]];

        noteGain.gain.setValueAtTime(0, ctx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.9);

        noteIndex++;
      };

      playNote();
      intervalRef.current = setInterval(playNote, 900);
      setIsMusicPlaying(true);
    } catch {
      console.log('Web Audio API not available');
    }
  }, []);

  const stopMusic = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsMusicPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  if (!isLoaded) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      onClick={toggleMusic}
      className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full glass-card-gold flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
      title={isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc nền'}
      aria-label={isMusicPlaying ? 'Tắt nhạc' : 'Bật nhạc nền'}
    >
      <motion.span
        className="text-xl"
        animate={isMusicPlaying ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </motion.span>
    </motion.button>
  );
}
