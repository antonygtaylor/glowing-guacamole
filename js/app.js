/**
 * Application Main Controller (js/app.js)
 * Coordinates UI, IndexedDB persistence, PWA state, and TTS audio playback.
 */

// Application State
const state = {
  currentLang: 'es-ES',
  currentTopic: 'All',
  searchQuery: '',
  savedSearchQuery: '',
  savedTopicFilter: 'all',
  savedPhrases: [],
  practicePhrases: [],
  practiceIndex: 0,
  isFlipped: false
};

// DOM Elements
const elements = {};

document.addEventListener('DOMContentLoaded', async () => {
  initDOMElements();
  await initDatabase();
  setupEventListeners();
  setupOnlineOfflineStatus();
  registerServiceWorker();

  // Render Initial View
  renderTopicChips();
  await refreshSavedPhrases();
  renderExploreList();
});

function initDOMElements() {
  elements.languageSelect = document.getElementById('language-select');
  elements.connectionStatus = document.getElementById('connection-status');
  elements.themeToggle = document.getElementById('theme-toggle');
  elements.themeIcon = document.getElementById('theme-icon');

  // Nav Items
  elements.navItems = document.querySelectorAll('.nav-item');
  elements.tabPanels = document.querySelectorAll('.tab-panel');
  elements.savedCountBadge = document.getElementById('saved-count-badge');

  // Explore Tab
  elements.exploreSearch = document.getElementById('explore-search');
  elements.clearSearch = document.getElementById('clear-search');
  elements.topicChipsContainer = document.getElementById('topic-chips');
  elements.currentTopicTitle = document.getElementById('current-topic-title');
  elements.topicPhraseCount = document.getElementById('topic-phrase-count');
  elements.downloadTopicBtn = document.getElementById('download-topic-btn');
  elements.explorePhraseList = document.getElementById('explore-phrase-list');

  // Saved Tab
  elements.savedSearch = document.getElementById('saved-search');
  elements.savedTopicFilter = document.getElementById('saved-topic-filter');
  elements.savedPhraseList = document.getElementById('saved-phrase-list');
  elements.savedEmptyState = document.getElementById('saved-empty-state');
  elements.addCustomPhraseBtn = document.getElementById('add-custom-phrase-btn');
  elements.goExploreBtn = document.getElementById('go-explore-btn');

  // Practice Tab
  elements.practiceTopicSelect = document.getElementById('practice-topic-select');
  elements.flashcardWrapper = document.getElementById('flashcard-wrapper');
  elements.flashcard = document.getElementById('flashcard');
  elements.cardTopic = document.getElementById('card-topic');
  elements.cardTopicBack = document.getElementById('card-topic-back');
  elements.cardEnglish = document.getElementById('card-english');
  elements.cardTarget = document.getElementById('card-target');
  elements.cardPhonetic = document.getElementById('card-phonetic');
  elements.cardAudioBtn = document.getElementById('card-audio-btn');
  elements.prevCardBtn = document.getElementById('prev-card-btn');
  elements.nextCardBtn = document.getElementById('next-card-btn');
  elements.flipCardBtn = document.getElementById('flip-card-btn');
  elements.cardProgress = document.getElementById('card-progress');
  elements.practiceEmptyState = document.getElementById('practice-empty-state');

  // Custom Phrase Modal
  elements.customPhraseModal = document.getElementById('custom-phrase-modal');
  elements.modalOverlay = document.getElementById('modal-overlay');
  elements.closeModalBtn = document.getElementById('close-modal-btn');
  elements.cancelCustomBtn = document.getElementById('cancel-custom-btn');
  elements.customPhraseForm = document.getElementById('custom-phrase-form');

  // Toast
  elements.toast = document.getElementById('toast');
}

async function initDatabase() {
  try {
    await initDB();
  } catch (err) {
    console.error('Failed to initialize IndexedDB:', err);
    showToast('Failed to initialize database persistence');
  }
}

/* Event Listeners */
function setupEventListeners() {
  // Language Change
  elements.languageSelect.addEventListener('change', (e) => {
    state.currentLang = e.target.value;
    refreshSavedPhrases().then(() => {
      renderExploreList();
      renderSavedList();
      setupPracticeMode();
    });
  });

  // Dark Mode Toggle
  elements.themeToggle.addEventListener('click', toggleTheme);

  // Tab Navigation
  elements.navItems.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Explore Search
  elements.exploreSearch.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    elements.clearSearch.classList.toggle('hidden', state.searchQuery === '');
    renderExploreList();
  });

  elements.clearSearch.addEventListener('click', () => {
    elements.exploreSearch.value = '';
    state.searchQuery = '';
    elements.clearSearch.classList.add('hidden');
    renderExploreList();
  });

  // Bulk Download Topic Button
  elements.downloadTopicBtn.addEventListener('click', downloadCurrentTopicPhrases);

  // Saved Search & Filter
  elements.savedSearch.addEventListener('input', (e) => {
    state.savedSearchQuery = e.target.value.trim().toLowerCase();
    renderSavedList();
  });

  elements.savedTopicFilter.addEventListener('change', (e) => {
    state.savedTopicFilter = e.target.value;
    renderSavedList();
  });

  elements.goExploreBtn.addEventListener('click', () => switchTab('tab-explore'));

  // Custom Phrase Modal Controls
  elements.addCustomPhraseBtn.addEventListener('click', openCustomModal);
  elements.closeModalBtn.addEventListener('click', closeCustomModal);
  elements.modalOverlay.addEventListener('click', closeCustomModal);
  elements.cancelCustomBtn.addEventListener('click', closeCustomModal);
  elements.customPhraseForm.addEventListener('submit', handleCustomPhraseSubmit);

  // Practice Mode Controls
  elements.practiceTopicSelect.addEventListener('change', (e) => {
    setupPracticeMode(e.target.value);
  });

  elements.flashcard.addEventListener('click', flipFlashcard);
  elements.flipCardBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    flipFlashcard();
  });

  elements.flashcard.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      flipFlashcard();
    }
  });

  elements.cardAudioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const phrase = state.practicePhrases[state.practiceIndex];
    if (phrase) playPhraseAudio(phrase);
  });

  elements.prevCardBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.practicePhrases.length === 0) return;
    state.practiceIndex = (state.practiceIndex - 1 + state.practicePhrases.length) % state.practicePhrases.length;
    state.isFlipped = false;
    renderFlashcard();
  });

  elements.nextCardBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.practicePhrases.length === 0) return;
    state.practiceIndex = (state.practiceIndex + 1) % state.practicePhrases.length;
    state.isFlipped = false;
    renderFlashcard();
  });
}

function switchTab(tabId) {
  elements.navItems.forEach(item => {
    const isTarget = item.getAttribute('data-tab') === tabId;
    item.classList.toggle('active', isTarget);
    item.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  elements.tabPanels.forEach(panel => {
    const isTarget = panel.id === tabId;
    panel.classList.toggle('active', isTarget);
    panel.hidden = !isTarget;
  });

  if (tabId === 'tab-saved') {
    renderSavedList();
  } else if (tabId === 'tab-practice') {
    setupPracticeMode();
  }
}

function toggleTheme() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.body.removeAttribute('data-theme');
    elements.themeIcon.textContent = 'dark_mode';
  } else {
    document.body.setAttribute('data-theme', 'dark');
    elements.themeIcon.textContent = 'light_mode';
  }
}

/* Online / Offline status */
function setupOnlineOfflineStatus() {
  function updateStatus() {
    const online = navigator.onLine;
    elements.connectionStatus.className = `status-chip ${online ? 'online' : 'offline'}`;
    elements.connectionStatus.querySelector('.status-chip__text').textContent = online ? 'Online' : 'Offline';
  }
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

/* Service Worker Registration */
function registerServiceWorker() {
  // Check if running under HTTP/HTTPS protocol before registering ServiceWorker
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('ServiceWorker registration failed: ', err);
      });
    });
  } else if (window.location.protocol === 'file:') {
    console.info('Running via file:// protocol. PWA Service Workers require an HTTP/HTTPS web server.');
  }
}

/* Saved Data Fetching & Sync */
async function refreshSavedPhrases() {
  try {
    state.savedPhrases = await getAllSavedPhrases(state.currentLang);
    elements.savedCountBadge.textContent = state.savedPhrases.length;
    updateSavedTopicFilterOptions();
  } catch (e) {
    console.error('Error fetching saved phrases:', e);
  }
}

function updateSavedTopicFilterOptions() {
  const topics = new Set(state.savedPhrases.map(p => p.topic));
  elements.savedTopicFilter.innerHTML = '<option value="all">All Saved Topics</option>';
  elements.practiceTopicSelect.innerHTML = '<option value="all">All Saved Phrases</option>';

  topics.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    elements.savedTopicFilter.appendChild(opt.cloneNode(true));
    elements.practiceTopicSelect.appendChild(opt);
  });
}

/* EXPLORE TAB LOGIC */
function renderTopicChips() {
  const topics = getTopicList();
  elements.topicChipsContainer.innerHTML = '';

  topics.forEach(topic => {
    const chip = document.createElement('button');
    chip.className = `chip ${topic === state.currentTopic ? 'selected' : ''}`;
    chip.setAttribute('role', 'radio');
    chip.setAttribute('aria-checked', topic === state.currentTopic ? 'true' : 'false');
    chip.textContent = topic;

    chip.addEventListener('click', () => {
      state.currentTopic = topic;
      renderTopicChips();
      renderExploreList();
    });

    elements.topicChipsContainer.appendChild(chip);
  });
}

async function renderExploreList() {
  elements.currentTopicTitle.textContent = state.currentTopic === 'All' ? 'All Topics' : state.currentTopic;

  let phrases = getPhrasesByTopic(state.currentTopic, state.currentLang);

  if (state.searchQuery) {
    phrases = phrases.filter(p =>
      p.english.toLowerCase().includes(state.searchQuery) ||
      p.target.toLowerCase().includes(state.searchQuery)
    );
  }

  elements.topicPhraseCount.textContent = `${phrases.length} phrase${phrases.length === 1 ? '' : 's'} available`;
  elements.explorePhraseList.innerHTML = '';

  if (phrases.length === 0) {
    elements.explorePhraseList.innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-outlined empty-icon">search_off</span>
        <h3>No matching phrases</h3>
        <p>Try searching for a different keyword or choose another topic.</p>
      </div>
    `;
    return;
  }

  for (const phrase of phrases) {
    const isSaved = await isPhraseSaved(phrase.id, state.currentLang);
    const card = createPhraseCard(phrase, isSaved, false);
    elements.explorePhraseList.appendChild(card);
  }
}

/* Bulk Download Topic */
async function downloadCurrentTopicPhrases() {
  const phrases = getPhrasesByTopic(state.currentTopic, state.currentLang);
  elements.downloadTopicBtn.disabled = true;
  elements.downloadTopicBtn.innerHTML = '<span class="material-symbols-outlined spin">sync</span> Saving...';

  let count = 0;
  for (const p of phrases) {
    await savePhrase(p, state.currentLang);
    await generateAndCacheAudioBlob(p.id, p.target, state.currentLang);
    count++;
  }

  await refreshSavedPhrases();
  renderExploreList();

  elements.downloadTopicBtn.disabled = false;
  elements.downloadTopicBtn.innerHTML = '<span class="material-symbols-outlined">download</span> Download Topic for Offline';
  showToast(`Downloaded ${count} phrases & audio for offline use!`);
}

/* SAVED TAB LOGIC */
async function renderSavedList() {
  await refreshSavedPhrases();
  let phrases = [...state.savedPhrases];

  if (state.savedTopicFilter !== 'all') {
    phrases = phrases.filter(p => p.topic === state.savedTopicFilter);
  }

  if (state.savedSearchQuery) {
    phrases = phrases.filter(p =>
      p.english.toLowerCase().includes(state.savedSearchQuery) ||
      p.target.toLowerCase().includes(state.savedSearchQuery)
    );
  }

  elements.savedPhraseList.innerHTML = '';

  if (phrases.length === 0) {
    elements.savedPhraseList.classList.add('hidden');
    elements.savedEmptyState.classList.remove('hidden');
    return;
  }

  elements.savedEmptyState.classList.add('hidden');
  elements.savedPhraseList.classList.remove('hidden');

  phrases.forEach(phrase => {
    const card = createPhraseCard(phrase, true, true);
    elements.savedPhraseList.appendChild(card);
  });
}

/* Phrase Card Component Generator */
function createPhraseCard(phrase, isSaved, isSavedTab = false) {
  const card = document.createElement('div');
  card.className = 'phrase-card';

  card.innerHTML = `
    <div class="phrase-card__header">
      <span class="phrase-card__category">${phrase.topic}</span>
      ${phrase.isCustom ? '<span class="status-chip online" style="font-size: 0.7rem; padding: 2px 6px;">Custom</span>' : ''}
    </div>
    <div class="phrase-card__body">
      <p class="phrase-card__english">${phrase.english}</p>
      <p class="phrase-card__target">${phrase.target}</p>
      ${phrase.phonetic ? `<p class="phrase-card__phonetic">${phrase.phonetic}</p>` : ''}
    </div>
    <div class="phrase-card__actions">
      <button class="button button--icon-text play-audio-btn" aria-label="Listen to pronunciation for ${phrase.english}">
        <span class="material-symbols-outlined" aria-hidden="true">volume_up</span>
        <span>Listen</span>
      </button>

      <button class="button button--outlined save-toggle-btn" aria-label="${isSaved ? 'Remove from saved' : 'Save & Download'}">
        <span class="material-symbols-outlined" aria-hidden="true">${isSaved ? 'bookmark_remove' : 'bookmark_add'}</span>
        <span>${isSaved ? 'Saved' : 'Save'}</span>
      </button>
    </div>
  `;

  // Audio Event
  const playBtn = card.querySelector('.play-audio-btn');
  playBtn.addEventListener('click', () => playPhraseAudio(phrase));

  // Save/Remove Event
  const saveBtn = card.querySelector('.save-toggle-btn');
  saveBtn.addEventListener('click', async () => {
    if (isSaved) {
      await removePhrase(phrase.id, state.currentLang);
      showToast('Removed from phrasebook');
    } else {
      await savePhrase(phrase, state.currentLang);
      await generateAndCacheAudioBlob(phrase.id, phrase.target, state.currentLang);
      showToast('Saved to phrasebook with offline audio!');
    }

    await refreshSavedPhrases();
    if (isSavedTab) {
      renderSavedList();
    } else {
      renderExploreList();
    }
  });

  return card;
}

/* Audio Playback Handling */
async function playPhraseAudio(phrase) {
  try {
    // Try offline audio Blob first
    const cachedBlob = await getAudioBlob(phrase.id, state.currentLang);
    if (cachedBlob) {
      await playAudioBlob(cachedBlob);
      return;
    }
  } catch (e) {
    console.warn('Could not play offline blob:', e);
  }

  // Fallback to Web Speech Synthesis API
  speakText(phrase.target, state.currentLang);
}

/* PRACTICE TAB LOGIC */
function setupPracticeMode(topicFilter = 'all') {
  if (topicFilter === 'all') {
    state.practicePhrases = [...state.savedPhrases];
  } else {
    state.practicePhrases = state.savedPhrases.filter(p => p.topic === topicFilter);
  }

  state.practiceIndex = 0;
  state.isFlipped = false;

  if (state.practicePhrases.length === 0) {
    elements.flashcardWrapper.classList.add('hidden');
    elements.practiceEmptyState.classList.remove('hidden');
  } else {
    elements.practiceEmptyState.classList.add('hidden');
    elements.flashcardWrapper.classList.remove('hidden');
    renderFlashcard();
  }
}

function renderFlashcard() {
  const phrase = state.practicePhrases[state.practiceIndex];
  if (!phrase) return;

  elements.cardTopic.textContent = phrase.topic;
  elements.cardTopicBack.textContent = phrase.topic;
  elements.cardEnglish.textContent = phrase.english;
  elements.cardTarget.textContent = phrase.target;
  elements.cardPhonetic.textContent = phrase.phonetic || '';

  elements.cardProgress.textContent = `Card ${state.practiceIndex + 1} of ${state.practicePhrases.length}`;
  elements.flashcard.classList.toggle('flipped', state.isFlipped);
}

function flipFlashcard() {
  state.isFlipped = !state.isFlipped;
  elements.flashcard.classList.toggle('flipped', state.isFlipped);
}

/* CUSTOM PHRASE MODAL LOGIC */
function openCustomModal() {
  elements.customPhraseModal.removeAttribute('aria-hidden');
  document.getElementById('custom-english').focus();
}

function closeCustomModal() {
  elements.customPhraseModal.setAttribute('aria-hidden', 'true');
  elements.customPhraseForm.reset();
}

async function handleCustomPhraseSubmit(e) {
  e.preventDefault();
  const topic = document.getElementById('custom-topic').value;
  const english = document.getElementById('custom-english').value.trim();
  const target = document.getElementById('custom-target').value.trim();
  const phonetic = document.getElementById('custom-phonetic').value.trim();

  if (!english || !target) return;

  const phrase = await saveCustomPhrase({ topic, english, target, phonetic }, state.currentLang);
  await generateAndCacheAudioBlob(phrase.id, phrase.target, state.currentLang);

  closeCustomModal();
  showToast('Custom phrase added to your phrasebook!');

  await refreshSavedPhrases();
  renderSavedList();
}

/* Toast Notifications */
let toastTimeout;
function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}
