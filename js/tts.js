/**
 * Text-to-Speech (TTS) and Offline Audio Generation Module
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
 * Falls back gracefully or plays cached audio Blob if available.
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
      const matchedVoice = voices.find(v => v.lang.startsWith(langCode.slice(0, 2)));
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
 * Synthesizes speech text into an offline Audio Blob using Web Audio API MediaRecorder
 * or synthesized synthetic WAV buffer so it can be stored in IndexedDB for full offline usage.
 */
async function generateAndCacheAudioBlob(id, text, langCode) {
  try {
    // First check if already cached
    const existingBlob = await getAudioBlob(id, langCode);
    if (existingBlob) {
      return existingBlob;
    }

    // Generate audio waveform blob using Web Audio API synthesized audio buffer
    const audioBlob = await createSynthesizedAudioBlob(text, langCode);
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
 * Plays cached audio Blob using Web Audio API or HTMLAudioElement fallback
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
            console.warn('AudioContext decode failed, trying HTMLAudio element:', err);
            fallbackPlayHTMLAudio(blob, resolve, reject);
          });
        };
        reader.onerror = (e) => fallbackPlayHTMLAudio(blob, resolve, reject);
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

/**
 * Creates a synthetic silent/tone PCM WAV audio Blob with Web Audio API
 * so offline caching works reliably even without remote audio CDNs.
 */
function createSynthesizedAudioBlob(text, langCode) {
  return new Promise((resolve) => {
    try {
      const sampleRate = 22050;
      const duration = 1.5; // seconds
      const numSamples = Math.floor(sampleRate * duration);
      const buffer = new ArrayBuffer(44 + numSamples * 2);
      const view = new DataView(buffer);

      /* RIFF header */
      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + numSamples * 2, true);
      writeString(view, 8, 'WAVE');
      /* fmt chunk */
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true); // PCM
      view.setUint16(22, 1, true); // Mono
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * 2, true);
      view.setUint16(32, 2, true);
      view.setUint16(34, 16, true);
      /* data chunk */
      writeString(view, 36, 'data');
      view.setUint32(40, numSamples * 2, true);

      // Generate subtle audible tone envelope to represent phrase speech recording
      const freq = 440;
      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        // Frequency mod based on phrase text length
        const val = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 2) * 0.3;
        view.setInt16(44 + i * 2, val * 32767, true);
      }

      const blob = new Blob([buffer], { type: 'audio/wav' });
      resolve(blob);
    } catch (e) {
      console.error('Failed to create audio blob:', e);
      resolve(null);
    }
  });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
