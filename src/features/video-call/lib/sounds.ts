// Ringtone and call sound management

class CallSounds {
  private ringtone: HTMLAudioElement | null = null;
  private outgoingTone: HTMLAudioElement | null = null;
  private endCallSound: HTMLAudioElement | null = null;
  private connectSound: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeSounds();
    }
  }

  private initializeSounds() {
    // Create audio elements with Web Audio API oscillator as fallback
    // In production, you'd use actual audio files

    // For now, we'll create simple tones using Web Audio API
    this.ringtone = this.createToneElement();
    this.outgoingTone = this.createToneElement();
  }

  private createToneElement(): HTMLAudioElement {
    // Placeholder - in production use actual ringtone files
    const audio = new Audio();
    audio.loop = true;
    return audio;
  }

  /**
   * Play ringtone for incoming calls
   */
  playRingtone(): void {
    this.stopAll();
    this.playOscillatorTone(440, 0.3, true); // A4 note, looping
  }

  /**
   * Play outgoing call tone (ringing)
   */
  playOutgoingTone(): void {
    this.stopAll();
    this.playOscillatorTone(480, 0.2, true); // Slightly higher, looping
  }

  /**
   * Play sound when call connects
   */
  playConnectSound(): void {
    this.stopAll();
    this.playOscillatorTone(880, 0.15, false, 200); // Short beep
  }

  /**
   * Play sound when call ends
   */
  playEndCallSound(): void {
    this.stopAll();
    this.playOscillatorTone(220, 0.2, false, 500); // Low tone
  }

  /**
   * Stop all sounds
   */
  stopAll(): void {
    if (this.activeOscillator) {
      this.activeOscillator.stop();
      this.activeOscillator = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private audioContext: AudioContext | null = null;
  private activeOscillator: OscillatorNode | null = null;

  private playOscillatorTone(
    frequency: number,
    volume: number,
    loop: boolean,
    duration?: number
  ): void {
    try {
      this.audioContext = new AudioContext();
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      gainNode.gain.value = volume;

      oscillator.start();
      this.activeOscillator = oscillator;

      if (!loop && duration) {
        setTimeout(() => {
          this.stopAll();
        }, duration);
      }

      if (loop) {
        // Create pulsing effect for ringtone
        this.createPulsingEffect(gainNode, volume);
      }
    } catch (error) {
      console.warn("Could not play audio:", error);
    }
  }

  private createPulsingEffect(gainNode: GainNode, maxVolume: number): void {
    let isOn = true;
    const pulse = setInterval(() => {
      if (!this.audioContext) {
        clearInterval(pulse);
        return;
      }
      gainNode.gain.value = isOn ? maxVolume : 0;
      isOn = !isOn;
    }, 500);
  }
}

// Singleton instance
export const callSounds = new CallSounds();
