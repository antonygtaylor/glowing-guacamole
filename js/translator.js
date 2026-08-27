/**
 * Standalone Client-Side Translation Engine (js/translator.js)
 * Lightweight rule-based translator that operates offline in any browser
 * without relying on experimental WebAI/Chrome flags or remote API calls.
 */

const DICTIONARY_MATRIX = {
  // Common Words Matrix (English -> Target)
  "hello": { "es-ES": "Hola", "fr-FR": "Bonjour", "de-DE": "Hallo", "it-IT": "Ciao", "pt-PT": "Olá", "nl-NL": "Hallo", "pl-PL": "Cześć", "ru-RU": "Привет", "el-GR": "Γειά σου", "sv-SE": "Hej", "da-DK": "Hej", "fi-FI": "Hei", "no-NO": "Hei", "cs-CZ": "Ahoj", "uk-UA": "Привіт", "hu-HU": "Szia", "tr-TR": "Merhaba", "ja-JP": "こんにちは" },
  "good day": { "es-ES": "Buenos días", "fr-FR": "Bonne journée", "de-DE": "Guten Tag", "it-IT": "Buongiorno", "pt-PT": "Bom dia", "nl-NL": "Goedendag", "pl-PL": "Dzień dobry", "ru-RU": "Добрый день", "el-GR": "Καλημέρα", "sv-SE": "God dag", "da-DK": "Goddag", "fi-FI": "Hyvää päivää", "no-NO": "God dag", "cs-CZ": "Dobrý den", "uk-UA": "Доброго дня", "hu-HU": "Jó napot", "tr-TR": "İyi günler", "ja-JP": "良い一日を" },
  "please": { "es-ES": "por favor", "fr-FR": "s'il vous plaît", "de-DE": "bitte", "it-IT": "per favore", "pt-PT": "por favor", "nl-NL": "alstublieft", "pl-PL": "proszę", "ru-RU": "пожалуйста", "el-GR": "παρακαλώ", "sv-SE": "snälla", "da-DK": "vær så venlig", "fi-FI": "ole hyvä", "no-NO": "vær så snill", "cs-CZ": "prosím", "uk-UA": "будь ласка", "hu-HU": "kérem", "tr-TR": "lütfen", "ja-JP": "お願いします" },
  "thank you": { "es-ES": "gracias", "fr-FR": "merci", "de-DE": "danke", "it-IT": "grazie", "pt-PT": "obrigado", "nl-NL": "dank u", "pl-PL": "dziękuję", "ru-RU": "спасибо", "el-GR": "ευχαριστώ", "sv-SE": "tack", "da-DK": "tak", "fi-FI": "kiitos", "no-NO": "takk", "cs-CZ": "děkuji", "uk-UA": "дякую", "hu-HU": "köszönöm", "tr-TR": "teşekkürler", "ja-JP": "ありがとう" },
  "yes": { "es-ES": "sí", "fr-FR": "oui", "de-DE": "ja", "it-IT": "sì", "pt-PT": "sim", "nl-NL": "ja", "pl-PL": "tak", "ru-RU": "да", "el-GR": "ναι", "sv-SE": "ja", "da-DK": "ja", "fi-FI": "kyllä", "no-NO": "ja", "cs-CZ": "ano", "uk-UA": "так", "hu-HU": "igen", "tr-TR": "evet", "ja-JP": "はい" },
  "no": { "es-ES": "no", "fr-FR": "non", "de-DE": "nein", "it-IT": "no", "pt-PT": "não", "nl-NL": "nee", "pl-PL": "nie", "ru-RU": "нет", "el-GR": "όχι", "sv-SE": "nej", "da-DK": "nej", "fi-FI": "ei", "no-NO": "nei", "cs-CZ": "ne", "uk-UA": "ні", "hu-HU": "nem", "tr-TR": "hayır", "ja-JP": "いいえ" },
  "where is": { "es-ES": "¿Dónde está", "fr-FR": "Où est", "de-DE": "Wo ist", "it-IT": "Dov'è", "pt-PT": "Onde fica", "nl-NL": "Waar is", "pl-PL": "Gdzie jest", "ru-RU": "Где находится", "el-GR": "Πού είναι", "sv-SE": "Var är", "da-DK": "Hvor er", "fi-FI": "Missä on", "no-NO": "Hvor er", "cs-CZ": "Kde je", "uk-UA": "Де знаходиться", "hu-HU": "Hol van", "tr-TR": "Nerede", "ja-JP": "どこですか" },
  "the water": { "es-ES": "el agua", "fr-FR": "l'eau", "de-DE": "das Wasser", "it-IT": "l'acqua", "pt-PT": "a água", "nl-NL": "het water", "pl-PL": "woda", "ru-RU": "вода", "el-GR": "το νερό", "sv-SE": "vattnet", "da-DK": "vandet", "fi-FI": "vesi", "no-NO": "vannet", "cs-CZ": "voda", "uk-UA": "вода", "hu-HU": "a víz", "tr-TR": "su", "ja-JP": "お水" },
  "the hotel": { "es-ES": "el hotel", "fr-FR": "l'hôtel", "de-DE": "das Hotel", "it-IT": "l'hotel", "pt-PT": "o hotel", "nl-NL": "het hotel", "pl-PL": "hotel", "ru-RU": "отель", "el-GR": "το ξενοδοχείο", "sv-SE": "hotellet", "da-DK": "hotellet", "fi-FI": "hotelli", "no-NO": "hotellet", "cs-CZ": "hotel", "uk-UA": "готель", "hu-HU": "a szálloda", "tr-TR": "otel", "ja-JP": "ホテル" },
  "check": { "es-ES": "la cuenta", "fr-FR": "l'addition", "de-DE": "die Rechnung", "it-IT": "il conto", "pt-PT": "a conta", "nl-NL": "de rekening", "pl-PL": "rachunek", "ru-RU": "счет", "el-GR": "το λογαριασμό", "sv-SE": "notan", "da-DK": "regningen", "fi-FI": "lasku", "no-NO": "regningen", "cs-CZ": "účet", "uk-UA": "рахунок", "hu-HU": "a számlát", "tr-TR": "hesap", "ja-JP": "お会計" },
  "help": { "es-ES": "ayuda", "fr-FR": "aidez-moi", "de-DE": "Hilfe", "it-IT": "aiuto", "pt-PT": "socorro", "nl-NL": "help", "pl-PL": "pomocy", "ru-RU": "помогите", "el-GR": "βοήθεια", "sv-SE": "hjälp", "da-DK": "hjælp", "fi-FI": "apua", "no-NO": "hjelp", "cs-CZ": "pomoc", "uk-UA": "допомога", "hu-HU": "segítség", "tr-TR": "yardım", "ja-JP": "助けて" }
};

/**
 * Client-Side Auto Translator
 * Translates English phrases into target language using local n-gram matching and dictionary substitution.
 */
function translatePhrase(englishText, targetLangCode) {
  if (!englishText || !englishText.trim()) return "";

  const text = englishText.trim().toLowerCase();

  // 1. Search full phrase exact dictionary match
  if (DICTIONARY_MATRIX[text] && DICTIONARY_MATRIX[text][targetLangCode]) {
    return DICTIONARY_MATRIX[text][targetLangCode];
  }

  // 2. Search phrase catalog catalog match
  if (typeof PHRASE_CATALOG !== 'undefined') {
    for (const topic of Object.keys(PHRASE_CATALOG)) {
      for (const item of PHRASE_CATALOG[topic]) {
        if (item.english.toLowerCase() === text) {
          const trans = item.translations[targetLangCode];
          if (trans && trans.target) return trans.target;
        }
      }
    }
  }

  // 3. Word-by-word / n-gram substitution engine
  let translatedWords = [];
  const words = text.split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i].replace(/[^\w]/g, "");
    if (DICTIONARY_MATRIX[word] && DICTIONARY_MATRIX[word][targetLangCode]) {
      translatedWords.push(DICTIONARY_MATRIX[word][targetLangCode]);
    } else {
      translatedWords.push(words[i]); // Keep untranslated word fallback
    }
  }

  // Capitalize first letter
  let result = translatedWords.join(" ");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
