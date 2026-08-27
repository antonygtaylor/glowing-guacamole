/**
 * Text-to-Speech (TTS) Engine
 * Relies on native Web Speech Synthesis API (`window.speechSynthesis`)
 * for instant, clean, offline-capable phrase speech pronunciation.
 */

/**
 * Speaks text using Web Speech Synthesis API.
 */
function speakText(text, langCode, onEndCallback = null) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis API not supported in this browser.');
      resolve(false);
      return;
    }

    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9; // Slightly slower pace for language learners
    utterance.pitch = 1.0;

    // Try to pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const matchedVoice = voices.find(v => v.lang === langCode || v.lang.startsWith(langCode.slice(0, 2)));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onend = () => {
      if (onEndCallback) onEndCallback();
      resolve(true);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      if (onEndCallback) onEndCallback();
      resolve(false);
    };

    window.speechSynthesis.speak(utterance);
  });
}
