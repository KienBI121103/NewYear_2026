'use client';

import { useCallback, useRef } from 'react';

/**
 * Sound system for Tết fortune app using Web Audio API for SFX synthesis.
 * Provides wind chime (start), bamboo clacking (shake), firecracker (result) sounds.
 * Uses Howler.js-compatible approach with AudioContext for zero-dependency audio.
 */

// Generate WAV data URI from audio buffer
function generateWavDataUri(audioCtx: AudioContext, duration: number, generator: (t: number, sampleRate: number) => number): string {
  const sampleRate = audioCtx.sampleRate;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // WAV header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.max(-1, Math.min(1, generator(t, sampleRate)));
    view.setInt16(44 + i * 2, sample * 0x7FFF, true);
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return 'data:audio/wav;base64,' + btoa(binary);
}

export type SoundType = 'windChime' | 'bambooClack' | 'firecracker' | 'woodenFish';

export function useSoundSystem() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundCacheRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  // Wind chime - metallic bell-like tones
  const playWindChime = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const frequencies = [2093, 2637, 3136, 2349, 1760]; // C7, E7, G7, D7, A6
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.035, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 1.0);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.0);
      });
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  // Bamboo clacking - short percussive clicks (like bamboo sticks hitting)
  const playBambooClack = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      // Multiple rapid clicks
      for (let i = 0; i < 3; i++) {
        const bufferSize = 800;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        // Sharp attack, quick decay - woody sound
        for (let j = 0; j < bufferSize; j++) {
          const t = j / ctx.sampleRate;
          const env = Math.exp(-t * 80); // Very fast decay
          const tone = Math.sin(2 * Math.PI * (800 + i * 200) * t); // Mid frequency
          const noise = (Math.random() * 2 - 1) * 0.3;
          data[j] = (tone * 0.7 + noise) * env * 0.15;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(now + i * 0.12);
      }
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  // Firecracker - explosive pop with sizzle
  const playFirecracker = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Pop sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);

      // Crackle/sizzle
      setTimeout(() => {
        const bufferSize = 8000;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const t = i / ctx.sampleRate;
          const env = Math.exp(-t * 8);
          data[i] = (Math.random() * 2 - 1) * env * 0.08;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.connect(ctx.destination);
        noise.start();
      }, 100);

      // Secondary pops
      [0.2, 0.35, 0.5].forEach((delay) => {
        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = 'square';
          osc2.frequency.setValueAtTime(200 + Math.random() * 200, ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.08);
          gain2.gain.setValueAtTime(0.06, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          osc2.start(ctx.currentTime);
          osc2.stop(ctx.currentTime + 0.1);
        }, delay * 1000);
      });
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  // Wooden fish tap - resonant knock (for Start button)
  const playWoodenFish = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      // Resonant woody tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.3);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);

      // Overtone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now);
      gain2.gain.setValueAtTime(0.03, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc2.start(now);
      osc2.stop(now + 0.2);
    } catch { /* Audio not supported */ }
  }, [getAudioContext]);

  const play = useCallback((sound: SoundType) => {
    switch (sound) {
      case 'windChime': playWindChime(); break;
      case 'bambooClack': playBambooClack(); break;
      case 'firecracker': playFirecracker(); break;
      case 'woodenFish': playWoodenFish(); break;
    }
  }, [playWindChime, playBambooClack, playFirecracker, playWoodenFish]);

  return { play };
}
