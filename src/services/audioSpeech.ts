import { SupportedLanguage } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(
  text: string,
  lang: SupportedLanguage,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  stopSpeaking();

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;

    // Map to BCP 47 language codes
    const langCodes: Record<SupportedLanguage, string> = {
      en: 'en-IN',
      te: 'te-IN',
      hi: 'hi-IN',
    };

    utterance.lang = langCodes[lang] || 'en-US';
    utterance.rate = 0.95; // Slightly slower for clear farmer comprehension
    utterance.pitch = 1.0;

    // Pick best matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const targetCode = langCodes[lang];
    const matchingVoice = voices.find(
      (v) => v.lang.toLowerCase() === targetCode.toLowerCase() || v.lang.startsWith(lang)
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Speech synthesis error:', err);
    return false;
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}
