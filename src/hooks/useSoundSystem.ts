'use client';

import { useCallback, useRef } from 'react';

/**
 * Enhanced SFX system using Web Audio API.
 * Sounds: Traditional Vietnamese drum (trống hội), bamboo clacking, firecrackers + fanfare, wooden fish.
 */

export type SoundType = 'drum' | 'bambooClack' | 'firecracker' | 'woodenFish';

export function useSoundSystem() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Trống hội (festival drum) - deep resonant drum hit
  const playDrum = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Main drum body - low resonant tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);

      // Drum membrane attack - short transient
      const attack = ctx.createOscillator();
      const attackGain = ctx.createGain();
      attack.connect(attackGain);
      attackGain.connect(ctx.destination);
      attack.type = 'triangle';
      attack.frequency.setValueAtTime(300, now);
      attack.frequency.exponentialRampToValueAtTime(80, now + 0.05);
      attackGain.gain.setValueAtTime(0.3, now);
      attackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      attack.start(now);
      attack.stop(now + 0.08);

      // Noise burst for "skin" texture
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const env = Math.exp(-i / (bufferSize * 0.15));
        data[i] = (Math.random() * 2 - 1) * env * 0.15;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 1500;
      noise.connect(noiseFilter);
      noiseFilter.connect(ctx.destination);
      noise.start(now);
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  // Bamboo clacking - wood sticks hitting (lách cách thẻ tre)
  const playBambooClack = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // 4 rapid wood clicks with slightly different tones
      for (let i = 0; i < 4; i++) {
        const baseFreq = 1200 + (i % 2) * 400 + Math.random() * 200;
        const delay = i * 0.08;

        // Sharp woody click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'square';
        osc.frequency.setValueAtTime(baseFreq, now + delay);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, now + delay + 0.02);

        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 3;

        gain.gain.setValueAtTime(0.12, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);
        osc.start(now + delay);
        osc.stop(now + delay + 0.05);

        // Resonant body ring
        const ring = ctx.createOscillator();
        const ringGain = ctx.createGain();
        ring.connect(ringGain);
        ringGain.connect(ctx.destination);
        ring.type = 'sine';
        ring.frequency.setValueAtTime(800 + i * 100, now + delay);
        ringGain.gain.setValueAtTime(0.04, now + delay);
        ringGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
        ring.start(now + delay);
        ring.stop(now + delay + 0.08);
      }
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  // Firecracker burst + short fanfare (pháo nổ + nhạc chúc mừng)
  const playFirecracker = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // === FIRECRACKER POP ===
      // Initial loud burst
      const burst = ctx.createOscillator();
      const burstGain = ctx.createGain();
      burst.connect(burstGain);
      burstGain.connect(ctx.destination);
      burst.type = 'sawtooth';
      burst.frequency.setValueAtTime(500, now);
      burst.frequency.exponentialRampToValueAtTime(30, now + 0.12);
      burstGain.gain.setValueAtTime(0.2, now);
      burstGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      burst.start(now);
      burst.stop(now + 0.15);

      // Crackle noise
      const crackleSize = Math.floor(ctx.sampleRate * 0.5);
      const crackleBuffer = ctx.createBuffer(1, crackleSize, ctx.sampleRate);
      const crackleData = crackleBuffer.getChannelData(0);
      for (let i = 0; i < crackleSize; i++) {
        const t = i / ctx.sampleRate;
        const env = Math.exp(-t * 6);
        // Random pops
        const pop = Math.random() < 0.05 ? (Math.random() * 2 - 1) * 0.5 : 0;
        crackleData[i] = ((Math.random() * 2 - 1) * 0.3 + pop) * env * 0.1;
      }
      const crackle = ctx.createBufferSource();
      crackle.buffer = crackleBuffer;
      crackle.connect(ctx.destination);
      crackle.start(now + 0.05);

      // Secondary pops (like strings of firecrackers)
      [0.15, 0.25, 0.35, 0.45, 0.55].forEach((delay) => {
        const pop = ctx.createOscillator();
        const popGain = ctx.createGain();
        pop.connect(popGain);
        popGain.connect(ctx.destination);
        pop.type = 'square';
        pop.frequency.setValueAtTime(250 + Math.random() * 300, now + delay);
        pop.frequency.exponentialRampToValueAtTime(30, now + delay + 0.06);
        popGain.gain.setValueAtTime(0.08 + Math.random() * 0.04, now + delay);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
        pop.start(now + delay);
        pop.stop(now + delay + 0.08);
      });

      // === SHORT FANFARE (chúc mừng) ===
      // Pentatonic celebration melody after the pops
      const fanfareNotes = [
        { freq: 523.25, time: 0.6, dur: 0.15 },  // C5
        { freq: 659.25, time: 0.72, dur: 0.15 },  // E5
        { freq: 783.99, time: 0.84, dur: 0.15 },  // G5
        { freq: 1046.50, time: 0.96, dur: 0.4 },  // C6 (hold)
      ];

      fanfareNotes.forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);
        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(0.08, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);
        osc.start(now + time);
        osc.stop(now + time + dur);

        // Harmonic overtone
        const harm = ctx.createOscillator();
        const harmGain = ctx.createGain();
        harm.connect(harmGain);
        harmGain.connect(ctx.destination);
        harm.type = 'sine';
        harm.frequency.setValueAtTime(freq * 2, now + time);
        harmGain.gain.setValueAtTime(0, now + time);
        harmGain.gain.linearRampToValueAtTime(0.03, now + time + 0.02);
        harmGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur * 0.7);
        harm.start(now + time);
        harm.stop(now + time + dur);
      });
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  // Wooden fish tap (mõ) - resonant knock for submit
  const playWoodenFish = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Main resonant tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);

      // Wood knock transient
      const knock = ctx.createOscillator();
      const knockGain = ctx.createGain();
      knock.connect(knockGain);
      knockGain.connect(ctx.destination);
      knock.type = 'triangle';
      knock.frequency.setValueAtTime(1200, now);
      knock.frequency.exponentialRampToValueAtTime(400, now + 0.02);
      knockGain.gain.setValueAtTime(0.15, now);
      knockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      knock.start(now);
      knock.stop(now + 0.04);

      // Overtone ring
      const ring = ctx.createOscillator();
      const ringGain = ctx.createGain();
      ring.connect(ringGain);
      ringGain.connect(ctx.destination);
      ring.type = 'sine';
      ring.frequency.setValueAtTime(1040, now);
      ringGain.gain.setValueAtTime(0.04, now);
      ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      ring.start(now);
      ring.stop(now + 0.3);
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  const play = useCallback((sound: SoundType) => {
    switch (sound) {
      case 'drum': playDrum(); break;
      case 'bambooClack': playBambooClack(); break;
      case 'firecracker': playFirecracker(); break;
      case 'woodenFish': playWoodenFish(); break;
    }
  }, [playDrum, playBambooClack, playFirecracker, playWoodenFish]);

  return { play };
}
