/**
 * Python Code Builder - Zero-Latency Audio Synthesizer
 * Built using the HTML5 Web Audio API.
 * Optimized for mobile touch phones, tablets, and laptops.
 * Zero external audio files required.
 */

class SoundEffects {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.masterGain = null;
    this.isWarmedUp = false;

    this.bindAutoUnlock();
  }

  // Pre-initialize and warm up Web Audio hardware
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Binds listeners to all user gestures so the audio context is unlocked
  // and kept warm immediately without waiting for the first sound trigger.
  bindAutoUnlock() {
    const warmup = () => {
      this.init();
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        if (!this.isWarmedUp) {
          try {
            // Play a 1-sample inaudible buffer to wake up mobile & laptop audio hardware
            const buf = this.ctx.createBuffer(1, 1, 22050);
            const src = this.ctx.createBufferSource();
            src.buffer = buf;
            src.connect(this.ctx.destination);
            src.start(0);
            this.isWarmedUp = true;
          } catch (_) {}
        }
      }
    };

    ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, warmup, { passive: true });
    });
  }

  toggleSound(forceState) {
    if (typeof forceState === 'boolean') {
      this.enabled = forceState;
    } else {
      this.enabled = !this.enabled;
    }
    return this.enabled;
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Instant, bright, two-stage celebratory chime (zero delay on mobile and laptop)
  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const dest = this.masterGain || this.ctx.destination;

      // Note 1: Immediate punchy harmony at t = now (G5 + C6)
      const chord1 = [783.99, 1046.50];
      chord1.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(now);
        osc.stop(now + 0.22);
      });

      // Note 2: Bright ascending sparkle at t = now + 0.07s (E6 + G6)
      const chord2 = [1318.51, 1567.98];
      chord2.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.07);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.setValueAtTime(0.22, now + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(now + 0.07);
        osc.stop(now + 0.35);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Instant, punchy two-tone error alert audible on small phone speakers and laptop speakers
  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const dest = this.masterGain || this.ctx.destination;

      // Tone 1: Immediate error tone at t = now (340 Hz)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(340, now);

      gain1.gain.setValueAtTime(0.20, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.10);

      osc1.connect(gain1);
      gain1.connect(dest);

      osc1.start(now);
      osc1.stop(now + 0.10);

      // Tone 2: Descending "uh-oh" tone at t = now + 0.11s (230 Hz)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(230, now + 0.11);

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.22, now + 0.11);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      osc2.connect(gain2);
      gain2.connect(dest);

      osc2.start(now + 0.11);
      osc2.stop(now + 0.26);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const dest = this.masterGain || this.ctx.destination;
      const fanfare = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.50, d: 0.38 } // C6
      ];

      let t = now;
      fanfare.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, t);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(t);
        osc.stop(t + note.d);
        t += note.d * 0.85;
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

window.soundFx = new SoundEffects();
