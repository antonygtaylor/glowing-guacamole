/**
 * Application Main Controller (js/app.js)
 * Coordinates UI, IndexedDB persistence, PWA state, flag language picker, and Web Speech Synthesis TTS.
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

  // Load saved language setting from localStorage or show flag landing screen
  const savedLang = localStorage.getItem('travelphrase_lang');
  if (savedLang && LANGUAGE_FLAGS && LANGUAGE_FLAGS[savedLang]) {
    state.currentLang = savedLang;
  } else {
    openLangPickerModal(true); // First-time user onboarding screen
  }

  updateHeaderLangButton();
  renderTopicChips();
  await refreshSavedPhrases();
  renderExploreList();
});

function initDOMElements() {
  elements.openLangModalBtn = document.getElementById('open-lang-modal-btn');
  elements.currentLangFlag = document.getElementById('current-lang-flag');
  elements.currentLangName = document.getElementById('current-lang-name');

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
  elements.cardFlagFront = document.getElementById('card-flag-front');
  elements.cardFlagBack = document.getElementById('card-flag-back');
  elements.cardEnglish = document.getElementById('card-english');
  elements.cardTarget = document.getElementById('card-target');
  elements.cardPhonetic = document.getElementById('card-phonetic');
  elements.cardAudioBtn = document.getElementById('card-audio-btn');
  elements.prevCardBtn = document.getElementById('prev-card-btn');
  elements.nextCardBtn = document.getElementById('next-card-btn');
  elements.flipCardBtn = document.getElementById('flip-card-btn');
  elements.cardProgress = document.getElementById('card-progress');
  elements.practiceEmptyState = document.getElementById('practice-empty-state');

  // Flag Language Selector Modal
  elements.langPickerModal = document.getElementById('lang-picker-modal');
  elements.langModalOverlay = document.getElementById('lang-modal-overlay');
  elements.closeLangModalBtn = document.getElementById('close-lang-modal-btn');
  elements.flagGrid = document.getElementById('flag-grid');

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

/* Event Listeners with Null Guards */
function setupEventListeners() {
  // Flag Language Picker Modal Controls
  elements.openLangModalBtn?.addEventListener('click', () => openLangPickerModal(false));
  elements.closeLangModalBtn?.addEventListener('click', closeLangPickerModal);
  elements.langModalOverlay?.addEventListener('click', closeLangPickerModal);

  // Dark Mode Toggle
  elements.themeToggle?.addEventListener('click', toggleTheme);

  // Tab Navigation
  elements.navItems?.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Explore Search
  elements.exploreSearch?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    elements.clearSearch?.classList.toggle('hidden', state.searchQuery === '');
    renderExploreList();
  });

  elements.clearSearch?.addEventListener('click', () => {
    if (elements.exploreSearch) elements.exploreSearch.value = '';
    state.searchQuery = '';
    elements.clearSearch?.classList.add('hidden');
    renderExploreList();
  });

  // Bulk Download Topic Button
  elements.downloadTopicBtn?.addEventListener('click', downloadCurrentTopicPhrases);

  // Saved Search & Filter
  elements.savedSearch?.addEventListener('input', (e) => {
    state.savedSearchQuery = e.target.value.trim().toLowerCase();
    renderSavedList();
  });

  elements.savedTopicFilter?.addEventListener('change', (e) => {
    state.savedTopicFilter = e.target.value;
    renderSavedList();
  });

  elements.goExploreBtn?.addEventListener('click', () => switchTab('tab-explore'));

  // Custom Phrase Modal Controls
  elements.addCustomPhraseBtn?.addEventListener('click', openCustomModal);
  elements.closeModalBtn?.addEventListener('click', closeCustomModal);
  elements.modalOverlay?.addEventListener('click', closeCustomModal);
  elements.cancelCustomBtn?.addEventListener('click', closeCustomModal);
  elements.customPhraseForm?.addEventListener('submit', handleCustomPhraseSubmit);

  // Auto-Translation listener on English input via MarianMT (Quantized ONNX WASM) AI module
  const customEnglishEl = document.getElementById('custom-english');
  let translateDebounce;
  customEnglishEl?.addEventListener('input', (e) => {
    clearTimeout(translateDebounce);
    const val = e.target.value;
    translateDebounce = setTimeout(async () => {
      if (!val) return;
      let autoTrans = '';
      if (typeof translatePhraseMarianMTWasm === 'function') {
        autoTrans = await translatePhraseMarianMTWasm(val, state.currentLang);
      } else if (typeof translatePhraseWasm === 'function') {
        autoTrans = await translatePhraseWasm(val, state.currentLang);
      } else if (typeof translatePhrase === 'function') {
        autoTrans = translatePhrase(val, state.currentLang);
      }
      const targetInput = document.getElementById('custom-target');
      if (autoTrans && targetInput && !targetInput.value) {
        targetInput.value = autoTrans;
      }
    }, 300);
  });

  // Practice Mode Controls
  elements.practiceTopicSelect?.addEventListener('change', (e) => {
    setupPracticeMode(e.target.value);
  });

  elements.flashcard?.addEventListener('click', flipFlashcard);
  elements.flipCardBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    flipFlashcard();
  });

  elements.flashcard?.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      flipFlashcard();
    }
  });

  elements.cardAudioBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const phrase = state.practicePhrases[state.practiceIndex];
    if (phrase) playPhraseAudio(phrase);
  });

  elements.prevCardBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.practicePhrases.length === 0) return;
    state.practiceIndex = (state.practiceIndex - 1 + state.practicePhrases.length) % state.practicePhrases.length;
    state.isFlipped = false;
    renderFlashcard();
  });

  elements.nextCardBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.practicePhrases.length === 0) return;
    state.practiceIndex = (state.practiceIndex + 1) % state.practicePhrases.length;
    state.isFlipped = false;
    renderFlashcard();
  });
}

function updateHeaderLangButton() {
  const flags = typeof LANGUAGE_FLAGS !== 'undefined' ? LANGUAGE_FLAGS : {};
  const langMeta = flags[state.currentLang] || flags['es-ES'] || { svg: '', name: 'Spanish' };
  if (elements.currentLangFlag) elements.currentLangFlag.innerHTML = langMeta.svg || '';
  if (elements.currentLangName) elements.currentLangName.textContent = langMeta.name;
}

/* Flag Picker Landing Modal */
function openLangPickerModal(isFirstLaunch = false) {
  renderFlagGrid();
  if (isFirstLaunch) {
    elements.closeLangModalBtn?.classList.add('hidden');
  } else {
    elements.closeLangModalBtn?.classList.remove('hidden');
  }
  elements.langPickerModal?.removeAttribute('aria-hidden');
}

function closeLangPickerModal() {
  elements.langPickerModal?.setAttribute('aria-hidden', 'true');
}

function renderFlagGrid() {
  if (!elements.flagGrid) return;
  elements.flagGrid.innerHTML = '';
  const flags = typeof LANGUAGE_FLAGS !== 'undefined' ? LANGUAGE_FLAGS : {};

  Object.keys(flags).forEach(code => {
    const item = flags[code];
    const isSelected = code === state.currentLang;

    const card = document.createElement('button');
    card.className = `flag-card ${isSelected ? 'selected' : ''}`;
    card.setAttribute('type', 'button');
    card.setAttribute('aria-label', `Select ${item.name}`);

    card.innerHTML = `
      <span class="flag-card__emoji">${item.svg || ''}</span>
      <span class="flag-card__name">${item.name}</span>
      <span class="flag-card__native">${item.native}</span>
    `;

    card.addEventListener('click', () => {
      selectDestinationLanguage(code);
    });

    elements.flagGrid.appendChild(card);
  });
}

function selectDestinationLanguage(code) {
  state.currentLang = code;
  localStorage.setItem('travelphrase_lang', code);
  updateHeaderLangButton();
  closeLangPickerModal();

  refreshSavedPhrases().then(() => {
    renderExploreList();
    renderSavedList();
    setupPracticeMode();
  });
}

function switchTab(tabId) {
  elements.navItems?.forEach(item => {
    const isTarget = item.getAttribute('data-tab') === tabId;
    item.classList.toggle('active', isTarget);
    item.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  elements.tabPanels?.forEach(panel => {
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
    if (elements.themeIcon) elements.themeIcon.textContent = 'dark_mode';
  } else {
    document.body.setAttribute('data-theme', 'dark');
    if (elements.themeIcon) elements.themeIcon.textContent = 'light_mode';
  }
}

/* Online / Offline status */
function setupOnlineOfflineStatus() {
  function updateStatus() {
    if (!elements.connectionStatus) return;
    const online = navigator.onLine;
    elements.connectionStatus.className = `status-chip ${online ? 'online' : 'offline'}`;
    const textEl = elements.connectionStatus.querySelector('.status-chip__text');
    if (textEl) textEl.textContent = online ? 'Online' : 'Offline';
  }
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

/* Service Worker Registration */
function registerServiceWorker() {
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
    if (elements.savedCountBadge) elements.savedCountBadge.textContent = state.savedPhrases.length;
    updateSavedTopicFilterOptions();
  } catch (e) {
    console.error('Error fetching saved phrases:', e);
  }
}

function updateSavedTopicFilterOptions() {
  const topics = new Set(state.savedPhrases.map(p => p.topic));
  if (elements.savedTopicFilter) elements.savedTopicFilter.innerHTML = '<option value="all">All Pinned Topics</option>';
  if (elements.practiceTopicSelect) elements.practiceTopicSelect.innerHTML = '<option value="all">All Pinned Phrases</option>';

  topics.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    elements.savedTopicFilter?.appendChild(opt.cloneNode(true));
    elements.practiceTopicSelect?.appendChild(opt);
  });
}

/* EXPLORE TAB LOGIC */
function renderTopicChips() {
  if (!elements.topicChipsContainer) return;
  const topics = typeof getTopicList === 'function' ? getTopicList() : ['All'];
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
  if (elements.currentTopicTitle) elements.currentTopicTitle.textContent = state.currentTopic === 'All' ? 'All Topics' : state.currentTopic;

  let phrases = typeof getPhrasesByTopic === 'function' ? getPhrasesByTopic(state.currentTopic, state.currentLang) : [];

  if (state.searchQuery) {
    phrases = phrases.filter(p =>
      p.english.toLowerCase().includes(state.searchQuery) ||
      p.target.toLowerCase().includes(state.searchQuery)
    );
  }

  if (elements.topicPhraseCount) elements.topicPhraseCount.textContent = `${phrases.length} phrase${phrases.length === 1 ? '' : 's'} available`;
  if (!elements.explorePhraseList) return;
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
  const phrases = typeof getPhrasesByTopic === 'function' ? getPhrasesByTopic(state.currentTopic, state.currentLang) : [];
  if (elements.downloadTopicBtn) {
    elements.downloadTopicBtn.disabled = true;
    elements.downloadTopicBtn.innerHTML = '<span class="material-symbols-outlined spin">sync</span> Pinning...';
  }

  let count = 0;
  for (const p of phrases) {
    await savePhrase(p, state.currentLang);
    count++;
  }

  await refreshSavedPhrases();
  renderExploreList();

  if (elements.downloadTopicBtn) {
    elements.downloadTopicBtn.disabled = false;
    elements.downloadTopicBtn.innerHTML = '<span class="material-symbols-outlined">push_pin</span> Pin Topic for Offline';
  }
  showToast(`Pinned ${count} phrases for offline use!`);
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

  if (!elements.savedPhraseList) return;
  elements.savedPhraseList.innerHTML = '';

  if (phrases.length === 0) {
    elements.savedPhraseList.classList.add('hidden');
    elements.savedEmptyState?.classList.remove('hidden');
    return;
  }

  elements.savedEmptyState?.classList.add('hidden');
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

  const flags = typeof LANGUAGE_FLAGS !== 'undefined' ? LANGUAGE_FLAGS : {};
  const langMeta = flags[phrase.lang || state.currentLang] || flags['es-ES'] || { flag: '🇪🇸', name: 'Spanish' };

  card.innerHTML = `
    <div class="phrase-card__header">
      <span class="phrase-card__category">${phrase.topic}</span>
      <span class="lang-badge">${langMeta.svg || ''} ${langMeta.name}</span>
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

      <button class="button button--outlined save-toggle-btn" aria-label="${isSaved ? 'Unpin phrase' : 'Pin phrase'}">
        <span class="material-symbols-outlined" aria-hidden="true">${isSaved ? 'keep_off' : 'push_pin'}</span>
        <span>${isSaved ? 'Pinned' : 'Pin'}</span>
      </button>
    </div>
  `;

  // Audio Event
  const playBtn = card.querySelector('.play-audio-btn');
  playBtn?.addEventListener('click', () => playPhraseAudio(phrase));

  // Save/Remove Event
  const saveBtn = card.querySelector('.save-toggle-btn');
  saveBtn?.addEventListener('click', async () => {
    if (isSaved) {
      await removePhrase(phrase.id, state.currentLang);
      showToast('Unpinned from phrasebook');
    } else {
      await savePhrase(phrase, state.currentLang);
      showToast('Pinned to phrasebook!');
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
  const targetLang = phrase.lang || state.currentLang;
  if (typeof speakText === 'function') {
    speakText(phrase.target, targetLang);
  }
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
    elements.flashcardWrapper?.classList.add('hidden');
    elements.practiceEmptyState?.classList.remove('hidden');
  } else {
    elements.practiceEmptyState?.classList.add('hidden');
    elements.flashcardWrapper?.classList.remove('hidden');
    renderFlashcard();
  }
}

function renderFlashcard() {
  const phrase = state.practicePhrases[state.practiceIndex];
  if (!phrase) return;

  const flags = typeof LANGUAGE_FLAGS !== 'undefined' ? LANGUAGE_FLAGS : {};
  const langMeta = flags[phrase.lang || state.currentLang] || flags['es-ES'] || { flag: '🇪🇸', name: 'Spanish' };

  if (elements.cardTopic) elements.cardTopic.textContent = phrase.topic;
  if (elements.cardTopicBack) elements.cardTopicBack.textContent = phrase.topic;
  if (elements.cardFlagFront) elements.cardFlagFront.innerHTML = langMeta.svg || '';
  if (elements.cardFlagBack) elements.cardFlagBack.innerHTML = langMeta.svg || '';
  if (elements.cardEnglish) elements.cardEnglish.textContent = phrase.english;
  if (elements.cardTarget) elements.cardTarget.textContent = phrase.target;
  if (elements.cardPhonetic) elements.cardPhonetic.textContent = phrase.phonetic || '';

  if (elements.cardProgress) elements.cardProgress.textContent = `Card ${state.practiceIndex + 1} of ${state.practicePhrases.length}`;
  elements.flashcard?.classList.toggle('flipped', state.isFlipped);
}

function flipFlashcard() {
  state.isFlipped = !state.isFlipped;
  elements.flashcard?.classList.toggle('flipped', state.isFlipped);
}

/* CUSTOM PHRASE MODAL LOGIC */
function openCustomModal() {
  elements.customPhraseModal?.removeAttribute('aria-hidden');
  const customEngEl = document.getElementById('custom-english');
  if (customEngEl) customEngEl.focus();
}

function closeCustomModal() {
  elements.customPhraseModal?.setAttribute('aria-hidden', 'true');
  elements.customPhraseForm?.reset();
}

async function handleCustomPhraseSubmit(e) {
  e.preventDefault();
  const topicEl = document.getElementById('custom-topic');
  const engEl = document.getElementById('custom-english');
  const targetEl = document.getElementById('custom-target');
  const phoneticEl = document.getElementById('custom-phonetic');

  const topic = topicEl ? topicEl.value : 'Custom';
  const english = engEl ? engEl.value.trim() : '';
  const target = targetEl ? targetEl.value.trim() : '';
  const phonetic = phoneticEl ? phoneticEl.value.trim() : '';

  if (!english || !target) return;

  const phrase = await saveCustomPhrase({ topic, english, target, phonetic }, state.currentLang);

  closeCustomModal();
  showToast('Custom phrase added to your phrasebook!');

  await refreshSavedPhrases();
  renderSavedList();
}

/* Toast Notifications */
let toastTimeout;
function showToast(message) {
  if (!elements.toast) return;
  elements.toast.textContent = message;
  elements.toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.toast?.classList.remove('show');
  }, 3000);
}
