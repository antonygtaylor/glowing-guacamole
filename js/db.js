/**
 * IndexedDB persistence module for TravelPhrase PWA
 */

const DB_NAME = 'TravelPhraseDB';
const DB_VERSION = 1;

let dbInstance = null;

/**
 * Initializes the IndexedDB database.
 * Creates 'phrases' object store with indexes for 'id', 'topic', 'lang', and 'isCustom'.
 * Creates 'audio' object store for offline audio Blobs keyed by phrase ID + lang.
 */
function initDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store for saved phrases
      if (!db.objectStoreNames.contains('phrases')) {
        const phraseStore = db.createObjectStore('phrases', { keyPath: 'storageKey' });
        phraseStore.createIndex('id', 'id', { unique: false });
        phraseStore.createIndex('topic', 'topic', { unique: false });
        phraseStore.createIndex('lang', 'lang', { unique: false });
        phraseStore.createIndex('isCustom', 'isCustom', { unique: false });
      }

      // Store for cached audio Blobs
      if (!db.objectStoreNames.contains('audio')) {
        db.createObjectStore('audio', { keyPath: 'audioKey' });
      }
    };
  });
}

/**
 * Helper to execute a transaction on IndexedDB
 */
async function getStore(storeName, mode = 'readonly') {
  const db = await initDB();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

/**
 * Gets all saved phrases for a specific language or all languages
 */
async function getAllSavedPhrases(langCode = null) {
  const store = await getStore('phrases', 'readonly');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      let results = request.result || [];
      if (langCode) {
        results = results.filter(p => p.lang === langCode || p.isCustom);
      }
      resolve(results);
    };
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Checks if a phrase is saved in IndexedDB
 */
async function isPhraseSaved(id, langCode) {
  const key = `${id}_${langCode}`;
  const store = await getStore('phrases', 'readonly');
  return new Promise((resolve) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(!!request.result);
    request.onerror = () => resolve(false);
  });
}

/**
 * Saves a phrase to IndexedDB
 */
async function savePhrase(phrase, langCode) {
  const storageKey = phrase.storageKey || `${phrase.id}_${langCode}`;
  const record = {
    ...phrase,
    lang: langCode || phrase.lang,
    storageKey: storageKey,
    savedAt: Date.now()
  };

  const store = await getStore('phrases', 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Removes a phrase and its audio from IndexedDB
 */
async function removePhrase(id, langCode) {
  const storageKey = `${id}_${langCode}`;
  const db = await initDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(['phrases', 'audio'], 'readwrite');
    const phraseStore = tx.objectStore('phrases');
    const audioStore = tx.objectStore('audio');

    phraseStore.delete(storageKey);
    audioStore.delete(storageKey);

    tx.oncomplete = () => resolve(true);
    tx.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Stores an audio Blob for offline playback
 */
async function storeAudioBlob(id, langCode, audioBlob) {
  const audioKey = `${id}_${langCode}`;
  const store = await getStore('audio', 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.put({ audioKey, blob: audioBlob, createdAt: Date.now() });
    request.onsuccess = () => resolve(true);
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retrieves an offline audio Blob
 */
async function getAudioBlob(id, langCode) {
  const audioKey = `${id}_${langCode}`;
  const store = await getStore('audio', 'readonly');
  return new Promise((resolve) => {
    const request = store.get(audioKey);
    request.onsuccess = () => {
      resolve(request.result ? request.result.blob : null);
    };
    request.onerror = () => resolve(null);
  });
}

/**
 * Saves a user-created custom phrase
 */
async function saveCustomPhrase(customPhraseData, langCode) {
  const id = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  const phrase = {
    id,
    topic: customPhraseData.topic || 'Custom',
    english: customPhraseData.english,
    target: customPhraseData.target,
    phonetic: customPhraseData.phonetic || '',
    lang: langCode,
    isCustom: true,
    storageKey: `${id}_${langCode}`,
    savedAt: Date.now()
  };

  await savePhrase(phrase, langCode);
  return phrase;
}
