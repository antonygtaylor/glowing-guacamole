/**
 * Text-to-Speech (TTS) and Offline Audio Generation Module
 * Downloads real MP3 audio recordings from free public TTS API endpoint
 * and caches them as binary Blobs in IndexedDB for full offline device playback.
 */

let globalAudioCtx = null;

function getAudioContext() {
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
}

// Unlock audio context on user interaction (necessary for mobile browsers / iOS Safari)
document.addEventListener('click', () => { getAudioContext(); }, { once: false });
document.addEventListener('touchstart', () => { getAudioContext(); }, { once: false });

/**
 * Speaks text using Web Speech Synthesis API.
 * Uses browser built-in offline speech synthesis voices.
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
    utterance.rate = 0.9; // Slightly slower for clarity
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

/**
 * Downloads actual spoken MP3 audio recording from free public endpoint
 * and stores it as a binary Blob in IndexedDB for complete offline playback.
 */
async function generateAndCacheAudioBlob(id, text, langCode) {
  try {
    // First check if already cached in IndexedDB
    const existingBlob = await getAudioBlob(id, langCode);
    if (existingBlob && existingBlob.size > 0) {
      return existingBlob;
    }

    // Download audio recording from free public endpoint
    const audioBlob = await fetchRealAudioBlob(text, langCode);
    if (audioBlob) {
      await storeAudioBlob(id, langCode, audioBlob);
      return audioBlob;
    }
  } catch (err) {
    console.warn('Audio Blob caching error:', err);
  }
  return null;
}

/**
 * Fetches real audio MP3 Blob for a given phrase and language code from free endpoint.
 */
async function fetchRealAudioBlob(text, langCode) {
  const shortLang = langCode.split('-')[0] || 'es';
  const encodedText = encodeURIComponent(text);

  // Free public audio endpoints (Translate TTS & Speech endpoint)
  const endpoints = [
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${shortLang}&client=tw-ob`,
    `https://dict.youdao.com/dictvoice?audio=${encodedText}&le=${shortLang}`
  ];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (response.ok) {
        const blob = await response.blob();
        if (blob && blob.size > 500) {
          return blob;
        }
      }
    } catch (e) {
      console.warn('Fetch audio failed from endpoint:', url, e);
    }
  }

  return null;
}

/**
 * Plays cached audio Blob using Web Audio API or HTMLAudioElement
 */
function playAudioBlob(blob) {
  return new Promise((resolve, reject) => {
    try {
      const ctx = getAudioContext();
      if (ctx) {
        const reader = new FileReader();
        reader.onload = function() {
          const arrayBuffer = reader.result;
          ctx.decodeAudioData(arrayBuffer, (audioBuffer) => {
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.onended = () => resolve(true);
            source.start(0);
          }, (err) => {
            console.warn('AudioContext decode failed, trying HTMLAudio fallback:', err);
            fallbackPlayHTMLAudio(blob, resolve, reject);
          });
        };
        reader.onerror = () => fallbackPlayHTMLAudio(blob, resolve, reject);
        reader.readAsArrayBuffer(blob);
      } else {
        fallbackPlayHTMLAudio(blob, resolve, reject);
      }
    } catch (e) {
      fallbackPlayHTMLAudio(blob, resolve, reject);
    }
  });
}

function fallbackPlayHTMLAudio(blob, resolve, reject) {
  try {
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
      resolve(true);
    };
    audio.onerror = (e) => {
      URL.revokeObjectURL(audioUrl);
      reject(e);
    };
    audio.play().catch(reject);
  } catch (e) {
    reject(e);
  }
}
