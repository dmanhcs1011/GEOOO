export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: ((state: SpeechState) => void)[] = [];
  private state: SpeechState = {
    isPlaying: false,
    isPaused: false,
    currentText: '',
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (state: SpeechState) => void) {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  public speak(text: string, lang: 'vi' | 'en' = 'vi', rate: number = 0.95) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick matching voice if available
    const voices = this.synth.getVoices();
    const targetLangCode = lang === 'vi' ? 'vi' : 'en';
    const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetLangCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.state = { isPlaying: true, isPaused: false, currentText: text };
      this.notify();
    };

    utterance.onend = () => {
      this.state = { isPlaying: false, isPaused: false, currentText: '' };
      this.notify();
    };

    utterance.onerror = () => {
      this.state = { isPlaying: false, isPaused: false, currentText: '' };
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state = { isPlaying: false, isPaused: false, currentText: '' };
      this.notify();
    }
  }

  public getState() {
    return this.state;
  }
}

export const speechService = new SpeechService();
