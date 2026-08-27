/**
 * Standalone Client-Side Translation & Phonetic Engine (js/translator.js)
 * High-performance offline dictionary, greedy n-gram matching translator,
 * and automatic phonetic pronunciation guide generator supporting 18 languages.
 */

const DICTIONARY_MATRIX = {
  // --- Greetings & Conversational ---
  "hello": { "es-ES": "Hola", "fr-FR": "Bonjour", "de-DE": "Hallo", "it-IT": "Ciao", "pt-PT": "Olá", "nl-NL": "Hallo", "pl-PL": "Cześć", "ru-RU": "Привет", "el-GR": "Γειά σου", "sv-SE": "Hej", "da-DK": "Hej", "fi-FI": "Hei", "no-NO": "Hei", "cs-CZ": "Ahoj", "uk-UA": "Привіт", "hu-HU": "Szia", "tr-TR": "Merhaba", "ja-JP": "こんにちは" },
  "hi": { "es-ES": "Hola", "fr-FR": "Salut", "de-DE": "Hallo", "it-IT": "Ciao", "pt-PT": "Oi", "nl-NL": "Hoi", "pl-PL": "Cześć", "ru-RU": "Привет", "el-GR": "Γειά", "sv-SE": "Hej", "da-DK": "Hej", "fi-FI": "Moi", "no-NO": "Hei", "cs-CZ": "Ahoj", "uk-UA": "Привіт", "hu-HU": "Szia", "tr-TR": "Selam", "ja-JP": "やあ" },
  "good morning": { "es-ES": "Buenos días", "fr-FR": "Bonjour", "de-DE": "Guten Morgen", "it-IT": "Buongiorno", "pt-PT": "Bom dia", "nl-NL": "Goedemorgen", "pl-PL": "Dzień dobry", "ru-RU": "Доброе утро", "el-GR": "Καλημέρα", "sv-SE": "God morgon", "da-DK": "Godmorgen", "fi-FI": "Hyvää huomenta", "no-NO": "God morgen", "cs-CZ": "Dobré ráno", "uk-UA": "Доброго ранку", "hu-HU": "Jó reggelt", "tr-TR": "Günaydın", "ja-JP": "おはようございます" },
  "good evening": { "es-ES": "Buenas noches", "fr-FR": "Bonsoir", "de-DE": "Guten Abend", "it-IT": "Buonasera", "pt-PT": "Boa noite", "nl-NL": "Goedenavond", "pl-PL": "Dobry wieczór", "ru-RU": "Добрый вечер", "el-GR": "Καλησπέρα", "sv-SE": "God kväll", "da-DK": "Godaften", "fi-FI": "Hyvää iltaa", "no-NO": "God kveld", "cs-CZ": "Dobrý večer", "uk-UA": "Добрый вечер", "hu-HU": "Jó estét", "tr-TR": "İyi akşamlar", "ja-JP": "こんばんは" },
  "goodbye": { "es-ES": "Adiós", "fr-FR": "Au revoir", "de-DE": "Auf Wiedersehen", "it-IT": "Arrivederci", "pt-PT": "Adeus", "nl-NL": "Tot ziens", "pl-PL": "Do widzenia", "ru-RU": "До свидания", "el-GR": "Antío", "sv-SE": "Hej då", "da-DK": "Farvel", "fi-FI": "Näkemiin", "no-NO": "Ha det", "cs-CZ": "Na shledanou", "uk-UA": "До побачення", "hu-HU": "Viszontlátásra", "tr-TR": "Hoşça kal", "ja-JP": "さようなら" },
  "bye": { "es-ES": "Chao", "fr-FR": "Salut", "de-DE": "Tschüss", "it-IT": "Ciao", "pt-PT": "Tchau", "nl-NL": "Doei", "pl-PL": "Pa", "ru-RU": "Пока", "el-GR": "Γειά", "sv-SE": "Hej då", "da-DK": "Hej hej", "fi-FI": "Moi moi", "no-NO": "Ha det", "cs-CZ": "Ahoj", "uk-UA": "Бувай", "hu-HU": "Szia", "tr-TR": "Görüşürüz", "ja-JP": "じゃあね" },
  "please": { "es-ES": "por favor", "fr-FR": "s'il vous plaît", "de-DE": "bitte", "it-IT": "per favore", "pt-PT": "por favor", "nl-NL": "alstublieft", "pl-PL": "proszę", "ru-RU": "пожалуйста", "el-GR": "παρακαλώ", "sv-SE": "snälla", "da-DK": "vær så venlig", "fi-FI": "ole hyvä", "no-NO": "vær så snill", "cs-CZ": "prosím", "uk-UA": "будь ласка", "hu-HU": "kérem", "tr-TR": "lütfen", "ja-JP": "お願いします" },
  "thank you": { "es-ES": "gracias", "fr-FR": "merci", "de-DE": "danke", "it-IT": "grazie", "pt-PT": "obrigado", "nl-NL": "dank u", "pl-PL": "dziękuję", "ru-RU": "спасибо", "el-GR": "ευχαριστώ", "sv-SE": "tack", "da-DK": "tak", "fi-FI": "kiitos", "no-NO": "takk", "cs-CZ": "děkuji", "uk-UA": "дякую", "hu-HU": "köszönöm", "tr-TR": "teşekkürler", "ja-JP": "ありがとう" },
  "thanks": { "es-ES": "gracias", "fr-FR": "merci", "de-DE": "danke", "it-IT": "grazie", "pt-PT": "obrigado", "nl-NL": "dank", "pl-PL": "dzięki", "ru-RU": "спасибо", "el-GR": "ευχαριστώ", "sv-SE": "tack", "da-DK": "tak", "fi-FI": "kiitos", "no-NO": "tack", "cs-CZ": "díky", "uk-UA": "дякую", "hu-HU": "köszi", "tr-TR": "teşekkürler", "ja-JP": "ありがとう" },
  "yes": { "es-ES": "sí", "fr-FR": "oui", "de-DE": "ja", "it-IT": "sì", "pt-PT": "sim", "nl-NL": "ja", "pl-PL": "tak", "ru-RU": "да", "el-GR": "ναι", "sv-SE": "ja", "da-DK": "ja", "fi-FI": "kyllä", "no-NO": "ja", "cs-CZ": "ano", "uk-UA": "так", "hu-HU": "igen", "tr-TR": "evet", "ja-JP": "はい" },
  "no": { "es-ES": "no", "fr-FR": "non", "de-DE": "nein", "it-IT": "no", "pt-PT": "não", "nl-NL": "nee", "pl-PL": "nie", "ru-RU": "нет", "el-GR": "όχι", "sv-SE": "nej", "da-DK": "nej", "fi-FI": "ei", "no-NO": "nei", "cs-CZ": "ne", "uk-UA": "ні", "hu-HU": "nem", "tr-TR": "hayır", "ja-JP": "いいえ" },
  "excuse me": { "es-ES": "disculpe", "fr-FR": "excusez-moi", "de-DE": "entschuldigung", "it-IT": "mi scusi", "pt-PT": "com licença", "nl-NL": "pardon", "pl-PL": "przepraszam", "ru-RU": "извините", "el-GR": "συγνώμη", "sv-SE": "ursäkta", "da-DK": "undskyld", "fi-FI": "anteeksi", "no-NO": "unnskyld", "cs-CZ": "promiňte", "uk-UA": "вибачте", "hu-HU": "elnézést", "tr-TR": "affedersiniz", "ja-JP": "すみません" },
  "sorry": { "es-ES": "lo siento", "fr-FR": "pardon", "de-DE": "es tut mir leid", "it-IT": "mi dispiace", "pt-PT": "desculpe", "nl-NL": "sorry", "pl-PL": "przepraszam", "ru-RU": "простите", "el-GR": "συγγνώμη", "sv-SE": "förlåt", "da-DK": "undskyld", "fi-FI": "olen pahoillani", "no-NO": "beklager", "cs-CZ": "omlouvám se", "uk-UA": "пробачте", "hu-HU": "bocsánat", "tr-TR": "özür dilerim", "ja-JP": "ごめんなさい" },

  // --- Common Questions & Phrases ---
  "where is the hotel": { "es-ES": "¿Dónde está el hotel?", "fr-FR": "Où est l'hôtel ?", "de-DE": "Wo ist das Hotel?", "it-IT": "Dov'è l'hotel?", "pt-PT": "Onde fica o hotel?", "nl-NL": "Waar is het hotel?", "pl-PL": "Gdzie jest hotel?", "ru-RU": "Где находится отель?", "el-GR": "Πού είναι το ξενοδοχείο;", "sv-SE": "Var är hotellet?", "da-DK": "Hvor er hotellet?", "fi-FI": "Missä on hotelli?", "no-NO": "Hvor er hotellet?", "cs-CZ": "Kde je hotel?", "uk-UA": "Де знаходиться готель?", "hu-HU": "Hol van a szálloda?", "tr-TR": "Otel nerede?", "ja-JP": "ホテルはどこですか？" },
  "where is the bathroom": { "es-ES": "¿Dónde está el baño?", "fr-FR": "Où sont les toilettes ?", "de-DE": "Wo ist die Toilette?", "it-IT": "Dov'è il bagno?", "pt-PT": "Onde fica o banheiro?", "nl-NL": "Waar is het toilet?", "pl-PL": "Gdzie jest toaleta?", "ru-RU": "Где находится туалет?", "el-GR": "Πού είναι η τουαλέτα;", "sv-SE": "Var är toaletten?", "da-DK": "Hvor er toilettet?", "fi-FI": "Missä on vessa?", "no-NO": "Hvor er toalettet?", "cs-CZ": "Kde je toaleta?", "uk-UA": "Де знаходиться туалет?", "hu-HU": "Hol van a mosdó?", "tr-TR": "Tuvalet nerede?", "ja-JP": "お手洗いはどこですか？" },
  "where is the airport": { "es-ES": "¿Dónde está el aeropuerto?", "fr-FR": "Où est l'aéroport ?", "de-DE": "Wo ist der Flughafen?", "it-IT": "Dov'è l'aeroporto?", "pt-PT": "Onde fica o aeroporto?", "nl-NL": "Waar is de luchthaven?", "pl-PL": "Gdzie jest lotnisko?", "ru-RU": "Где находится аэропорт?", "el-GR": "Πού είναι το αεροδρόμιο;", "sv-SE": "Var är flygplatsen?", "da-DK": "Hvor er lufthavnen?", "fi-FI": "Missä on lentokenttä?", "no-NO": "Hvor er flyplassen?", "cs-CZ": "Kde je letiště?", "uk-UA": "Де знаходиться аеропорт?", "hu-HU": "Hol van a repülőtér?", "tr-TR": "Havalimanı nerede?", "ja-JP": "空港はどこですか？" },
  "where is": { "es-ES": "¿Dónde está", "fr-FR": "Où est", "de-DE": "Wo ist", "it-IT": "Dov'è", "pt-PT": "Onde fica", "nl-NL": "Waar is", "pl-PL": "Gdzie jest", "ru-RU": "Где находится", "el-GR": "Πού είναι", "sv-SE": "Var är", "da-DK": "Hvor er", "fi-FI": "Missä on", "no-NO": "Hvor er", "cs-CZ": "Kde je", "uk-UA": "Де знаходиться", "hu-HU": "Hol van", "tr-TR": "Nerede", "ja-JP": "どこですか" },
  "how much is": { "es-ES": "¿Cuánto cuesta", "fr-FR": "Combien coûte", "de-DE": "Wie viel kostet", "it-IT": "Quanto costa", "pt-PT": "Quanto custa", "nl-NL": "Hoeveel kost", "pl-PL": "Ile kosztuje", "ru-RU": "Сколько стоит", "el-GR": "Πόσο κοστίζει", "sv-SE": "Hur mycket kostar", "da-DK": "Hvad koster", "fi-FI": "Paljonko maksaa", "no-NO": "Hvor mye koster", "cs-CZ": "Kolik stojí", "uk-UA": "Скільки коштує", "hu-HU": "Mennyibe kerül", "tr-TR": "Ne kadar", "ja-JP": "いくらですか" },
  "how much does it cost": { "es-ES": "¿Cuánto cuesta?", "fr-FR": "Combien ça coûte ?", "de-DE": "Wie viel kostet das?", "it-IT": "Quanto costa?", "pt-PT": "Quanto custa?", "nl-NL": "Hoeveel kost het?", "pl-PL": "Ile to kosztuje?", "ru-RU": "Сколько это стоит?", "el-GR": "Πόσο κοστίζει;", "sv-SE": "Hur mycket kostar det?", "da-DK": "Hvad koster det?", "fi-FI": "Paljonko se maksaa?", "no-NO": "Hvor mye koster det?", "cs-CZ": "Kolik to stojí?", "uk-UA": "Скільки це коштує?", "hu-HU": "Mennyibe kerül ez?", "tr-TR": "Bu ne kadar?", "ja-JP": "これはいくらですか？" },
  "i need": { "es-ES": "Necesito", "fr-FR": "J'ai besoin de", "de-DE": "Ich brauche", "it-IT": "Ho bisogno di", "pt-PT": "Eu preciso de", "nl-NL": "Ik heb nodig", "pl-PL": "Potrzebuję", "ru-RU": "Мне нужно", "el-GR": "Xρειάζομαι", "sv-SE": "Jag behöver", "da-DK": "Jeg har brug for", "fi-FI": "Tarvitsen", "no-NO": "Jeg trenger", "cs-CZ": "Potřebuji", "uk-UA": "Мені потрібно", "hu-HU": "Szükségem van", "tr-TR": "İhtiyacım var", "ja-JP": "が必要です" },
  "i want": { "es-ES": "Quiero", "fr-FR": "Je veux", "de-DE": "Ich möchte", "it-IT": "Voglio", "pt-PT": "Eu quero", "nl-NL": "Ik wil", "pl-PL": "Chcę", "ru-RU": "Я хочу", "el-GR": "Θέλω", "sv-SE": "Jag vill ha", "da-DK": "Jeg vil gerne have", "fi-FI": "Haluan", "no-NO": "Jeg vil ha", "cs-CZ": "Chci", "uk-UA": "Я хочу", "hu-HU": "Szeretnék", "tr-TR": "Istiyorum", "ja-JP": "が欲しいです" },
  "i would like": { "es-ES": "Me gustaría", "fr-FR": "Je voudrais", "de-DE": "Ich hätte gerne", "it-IT": "Vorrei", "pt-PT": "Gostaria de", "nl-NL": "Ik zou graag", "pl-PL": "Chciałbym", "ru-RU": "Я хотел бы", "el-GR": "Θα ήθελα", "sv-SE": "Jag skulle vilja ha", "da-DK": "Jeg vil gerne bede om", "fi-FI": "Haluaisin", "no-NO": "Jeg vil gjerne ha", "cs-CZ": "Rád bych", "uk-UA": "Я хотів би", "hu-HU": "Szeretnék", "tr-TR": "İsterim", "ja-JP": "をお願いします" },
  "can i have": { "es-ES": "¿Puedo tener", "fr-FR": "Puis-je avoir", "de-DE": "Kann ich bekommen", "it-IT": "Posso avere", "pt-PT": "Posso ter", "nl-NL": "Mag ik", "pl-PL": "Czy mogę dostać", "ru-RU": "Можно мне", "el-GR": "Μπορώ να έχω", "sv-SE": "Kan jag få", "da-DK": "Må jeg få", "fi-FI": "Saanko", "no-NO": "Kan jeg få", "cs-CZ": "Mohl bych dostat", "uk-UA": "Можна мені", "hu-HU": "Kaphatok", "tr-TR": "Alabilir miyim", "ja-JP": "をもらえますか" },
  "do you have": { "es-ES": "¿Tiene", "fr-FR": "Avez-vous", "de-DE": "Haben Sie", "it-IT": "Ha", "pt-PT": "Você tem", "nl-NL": "Heeft u", "pl-PL": "Czy masz", "ru-RU": "У вас есть", "el-GR": "Έχετε", "sv-SE": "Har du", "da-DK": "Har du", "fi-FI": "Onko sinulla", "no-NO": "Har du", "cs-CZ": "Máte", "uk-UA": "У вас є", "hu-HU": "Van Önnek", "tr-TR": "Var mı", "ja-JP": "はありますか" },
  "help me": { "es-ES": "Ayúdeme", "fr-FR": "Aidez-moi", "de-DE": "Helfen Sie mir", "it-IT": "Mi aiuti", "pt-PT": "Ajude-me", "nl-NL": "Help mij", "pl-PL": "Pomóż mi", "ru-RU": "Помогите мне", "el-GR": "Βοηθήστε με", "sv-SE": "Hjälp mig", "da-DK": "Hjælp mig", "fi-FI": "Auta minua", "no-NO": "Hjelp meg", "cs-CZ": "Pomozte mi", "uk-UA": "Допоможіть мені", "hu-HU": "Segítsen", "tr-TR": "Bana yardım edin", "ja-JP": "助けてください" },

  // --- Pronouns, Articles & Prepositions ---
  "i": { "es-ES": "yo", "fr-FR": "je", "de-DE": "ich", "it-IT": "io", "pt-PT": "eu", "nl-NL": "ik", "pl-PL": "ja", "ru-RU": "я", "el-GR": "εγώ", "sv-SE": "jag", "da-DK": "jeg", "fi-FI": "minä", "no-NO": "jeg", "cs-CZ": "já", "uk-UA": "я", "hu-HU": "én", "tr-TR": "ben", "ja-JP": "私" },
  "you": { "es-ES": "usted", "fr-FR": "vous", "de-DE": "Sie", "it-IT": "lei", "pt-PT": "você", "nl-NL": "u", "pl-PL": "pan/pani", "ru-RU": "вы", "el-GR": "εσείς", "sv-SE": "du", "da-DK": "du", "fi-FI": "sinä", "no-NO": "du", "cs-CZ": "vy", "uk-UA": "ви", "hu-HU": "ön", "tr-TR": "siz", "ja-JP": "あなた" },
  "my": { "es-ES": "mi", "fr-FR": "mon", "de-DE": "mein", "it-IT": "il mio", "pt-PT": "meu", "nl-NL": "mijn", "pl-PL": "mój", "ru-RU": "мой", "el-GR": "μου", "sv-SE": "min", "da-DK": "min", "fi-FI": "minun", "no-NO": "min", "cs-CZ": "můj", "uk-UA": "мій", "hu-HU": "az én", "tr-TR": "benim", "ja-JP": "私の" },
  "your": { "es-ES": "su", "fr-FR": "votre", "de-DE": "Ihr", "it-IT": "il suo", "pt-PT": "seu", "nl-NL": "uw", "pl-PL": "twój", "ru-RU": "ваш", "el-GR": "σας", "sv-SE": "din", "da-DK": "din", "fi-FI": "sinun", "no-NO": "din", "cs-CZ": "vás", "uk-UA": "ваш", "hu-HU": "az ön", "tr-TR": "senin", "ja-JP": "あなたの" },
  "the": { "es-ES": "el", "fr-FR": "le", "de-DE": "das", "it-IT": "il", "pt-PT": "o", "nl-NL": "de", "pl-PL": "", "ru-RU": "", "el-GR": "το", "sv-SE": "", "da-DK": "", "fi-FI": "", "no-NO": "", "cs-CZ": "", "uk-UA": "", "hu-HU": "a", "tr-TR": "", "ja-JP": "" },
  "a": { "es-ES": "un", "fr-FR": "un", "de-DE": "ein", "it-IT": "un", "pt-PT": "um", "nl-NL": "een", "pl-PL": "", "ru-RU": "", "el-GR": "ένα", "sv-SE": "en", "da-DK": "en", "fi-FI": "", "no-NO": "en", "cs-CZ": "", "uk-UA": "", "hu-HU": "egy", "tr-TR": "bir", "ja-JP": "一つの" },
  "an": { "es-ES": "un", "fr-FR": "un", "de-DE": "ein", "it-IT": "un", "pt-PT": "um", "nl-NL": "een", "pl-PL": "", "ru-RU": "", "el-GR": "ένα", "sv-SE": "en", "da-DK": "en", "fi-FI": "", "no-NO": "en", "cs-CZ": "", "uk-UA": "", "hu-HU": "egy", "tr-TR": "bir", "ja-JP": "一つの" },
  "this": { "es-ES": "esto", "fr-FR": "ceci", "de-DE": "dies", "it-IT": "questo", "pt-PT": "isto", "nl-NL": "dit", "pl-PL": "to", "ru-RU": "это", "el-GR": "αυτό", "sv-SE": "det här", "da-DK": "dette", "fi-FI": "tämä", "no-NO": "dette", "cs-CZ": "tohle", "uk-UA": "це", "hu-HU": "ez", "tr-TR": "bu", "ja-JP": "これ" },
  "that": { "es-ES": "eso", "fr-FR": "cela", "de-DE": "das", "it-IT": "quello", "pt-PT": "isso", "nl-NL": "dat", "pl-PL": "tamto", "ru-RU": "то", "el-GR": "εκείνο", "sv-SE": "det där", "da-DK": "det", "fi-FI": "tuo", "no-NO": "det", "cs-CZ": "tamto", "uk-UA": "те", "hu-HU": "az", "tr-TR": "şu", "ja-JP": "それ" },
  "with": { "es-ES": "con", "fr-FR": "avec", "de-DE": "mit", "it-IT": "con", "pt-PT": "com", "nl-NL": "met", "pl-PL": "z", "ru-RU": "с", "el-GR": "με", "sv-SE": "med", "da-DK": "med", "fi-FI": "kanssa", "no-NO": "med", "cs-CZ": "s", "uk-UA": "з", "hu-HU": "-val/-vel", "tr-TR": "ile", "ja-JP": "と" },
  "without": { "es-ES": "sin", "fr-FR": "sans", "de-DE": "ohne", "it-IT": "senza", "pt-PT": "sem", "nl-NL": "zonder", "pl-PL": "bez", "ru-RU": "без", "el-GR": "χωρίς", "sv-SE": "utan", "da-DK": "uden", "fi-FI": "ilman", "no-NO": "uten", "cs-CZ": "bez", "uk-UA": "без", "hu-HU": "nélkül", "tr-TR": "sensiz", "ja-JP": "なしで" },

  // --- Nouns & Places ---
  "water": { "es-ES": "agua", "fr-FR": "eau", "de-DE": "Wasser", "it-IT": "acqua", "pt-PT": "água", "nl-NL": "water", "pl-PL": "woda", "ru-RU": "вода", "el-GR": "νερό", "sv-SE": "vatten", "da-DK": "vand", "fi-FI": "vesi", "no-NO": "vann", "cs-CZ": "voda", "uk-UA": "вода", "hu-HU": "víz", "tr-TR": "su", "ja-JP": "お水" },
  "coffee": { "es-ES": "café", "fr-FR": "café", "de-DE": "Kaffee", "it-IT": "caffè", "pt-PT": "café", "nl-NL": "koffie", "pl-PL": "kawa", "ru-RU": "кофе", "el-GR": "καφέ", "sv-SE": "kaffe", "da-DK": "kaffe", "fi-FI": "kahvi", "no-NO": "kaffe", "cs-CZ": "káva", "uk-UA": "кава", "hu-HU": "kávé", "tr-TR": "kahve", "ja-JP": "コーヒー" },
  "tea": { "es-ES": "té", "fr-FR": "thé", "de-DE": "Tee", "it-IT": "tè", "pt-PT": "chá", "nl-NL": "thee", "pl-PL": "herbata", "ru-RU": "чай", "el-GR": "τσάι", "sv-SE": "te", "da-DK": "te", "fi-FI": "tee", "no-NO": "te", "cs-CZ": "čaj", "uk-UA": "чай", "hu-HU": "tea", "tr-TR": "çay", "ja-JP": "お茶" },
  "beer": { "es-ES": "cerveza", "fr-FR": "bière", "de-DE": "Bier", "it-IT": "birra", "pt-PT": "cerveja", "nl-NL": "bier", "pl-PL": "piwo", "ru-RU": "пиво", "el-GR": "μπύρα", "sv-SE": "öl", "da-DK": "øl", "fi-FI": "olut", "no-NO": "øl", "cs-CZ": "pivo", "uk-UA": "пиво", "hu-HU": "sör", "tr-TR": "bira", "ja-JP": "ビール" },
  "wine": { "es-ES": "vino", "fr-FR": "vin", "de-DE": "Wein", "it-IT": "vino", "pt-PT": "vinho", "nl-NL": "wijn", "pl-PL": "wino", "ru-RU": "вино", "el-GR": "κρασί", "sv-SE": "vin", "da-DK": "vin", "fi-FI": "viini", "no-NO": "vin", "cs-CZ": "víno", "uk-UA": "вино", "hu-HU": "bor", "tr-TR": "şarap", "ja-JP": "ワイン" },
  "bread": { "es-ES": "pan", "fr-FR": "pain", "de-DE": "Brot", "it-IT": "pane", "pt-PT": "pão", "nl-NL": "brood", "pl-PL": "chleb", "ru-RU": "хлеб", "el-GR": "ψωμί", "sv-SE": "bröd", "da-DK": "brød", "fi-FI": "leipä", "no-NO": "brød", "cs-CZ": "chléb", "uk-UA": "хліб", "hu-HU": "kenyér", "tr-TR": "ekmek", "ja-JP": "パン" },
  "food": { "es-ES": "comida", "fr-FR": "nourriture", "de-DE": "Essen", "it-IT": "cibo", "pt-PT": "comida", "nl-NL": "eten", "pl-PL": "jedzenie", "ru-RU": "еда", "el-GR": "φαγητό", "sv-SE": "mat", "da-DK": "mad", "fi-FI": "ruoka", "no-NO": "mat", "cs-CZ": "jídlo", "uk-UA": "їжа", "hu-HU": "étel", "tr-TR": "yemek", "ja-JP": "食べ物" },
  "menu": { "es-ES": "menú", "fr-FR": "menu", "de-DE": "Speisekarte", "it-IT": "menu", "pt-PT": "menu", "nl-NL": "menu", "pl-PL": "menu", "ru-RU": "меню", "el-GR": "μενού", "sv-SE": "meny", "da-DK": "menukort", "fi-FI": "ruokalista", "no-NO": "meny", "cs-CZ": "jídelní lístek", "uk-UA": "меню", "hu-HU": "étlap", "tr-TR": "menü", "ja-JP": "メニュー" },
  "check": { "es-ES": "cuenta", "fr-FR": "addition", "de-DE": "Rechnung", "it-IT": "conto", "pt-PT": "conta", "nl-NL": "rekening", "pl-PL": "rachunek", "ru-RU": "счет", "el-GR": "λογαριασμό", "sv-SE": "nota", "da-DK": "regning", "fi-FI": "lasku", "no-NO": "regning", "cs-CZ": "účet", "uk-UA": "рахунок", "hu-HU": "számla", "tr-TR": "hesap", "ja-JP": "お会計" },
  "bill": { "es-ES": "cuenta", "fr-FR": "addition", "de-DE": "Rechnung", "it-IT": "conto", "pt-PT": "conta", "nl-NL": "rekening", "pl-PL": "rachunek", "ru-RU": "счет", "el-GR": "λογαριασμό", "sv-SE": "nota", "da-DK": "regning", "fi-FI": "lasku", "no-NO": "regning", "cs-CZ": "účet", "uk-UA": "рахунок", "hu-HU": "számla", "tr-TR": "hesap", "ja-JP": "お会計" },
  "hotel": { "es-ES": "hotel", "fr-FR": "hôtel", "de-DE": "Hotel", "it-IT": "hotel", "pt-PT": "hotel", "nl-NL": "hotel", "pl-PL": "hotel", "ru-RU": "отель", "el-GR": "ξενοδοχείο", "sv-SE": "hotell", "da-DK": "hotel", "fi-FI": "hotelli", "no-NO": "hotell", "cs-CZ": "hotel", "uk-UA": "готель", "hu-HU": "szálloda", "tr-TR": "otel", "ja-JP": "ホテル" },
  "room": { "es-ES": "habitación", "fr-FR": "chambre", "de-DE": "Zimmer", "it-IT": "camera", "pt-PT": "quarto", "nl-NL": "kamer", "pl-PL": "pokój", "ru-RU": "номер", "el-GR": "δωμάτιο", "sv-SE": "rum", "da-DK": "værelse", "fi-FI": "huone", "no-NO": "rom", "cs-CZ": "pokoj", "uk-UA": "кімната", "hu-HU": "szoba", "tr-TR": "oda", "ja-JP": "部屋" },
  "key": { "es-ES": "llave", "fr-FR": "clé", "de-DE": "Schlüssel", "it-IT": "chiave", "pt-PT": "chave", "nl-NL": "sleutel", "pl-PL": "klucz", "ru-RU": "ключ", "el-GR": "κλειδί", "sv-SE": "nyckel", "da-DK": "nøgle", "fi-FI": "avain", "no-NO": "nøkkel", "cs-CZ": "klíč", "uk-UA": "ключ", "hu-HU": "kulcs", "tr-TR": "anahtar", "ja-JP": "鍵" },
  "bathroom": { "es-ES": "baño", "fr-FR": "toilettes", "de-DE": "Toilette", "it-IT": "bagno", "pt-PT": "banheiro", "nl-NL": "toilet", "pl-PL": "toaleta", "ru-RU": "туалет", "el-GR": "τουαλέτα", "sv-SE": "toalett", "da-DK": "toilet", "fi-FI": "vessa", "no-NO": "toalett", "cs-CZ": "toaleta", "uk-UA": "туалет", "hu-HU": "mosdó", "tr-TR": "tuvalet", "ja-JP": "お手洗い" },
  "restroom": { "es-ES": "baño", "fr-FR": "toilettes", "de-DE": "Toilette", "it-IT": "bagno", "pt-PT": "banheiro", "nl-NL": "toilet", "pl-PL": "toaleta", "ru-RU": "туалет", "el-GR": "τουαλέτα", "sv-SE": "toalett", "da-DK": "toilet", "fi-FI": "vessa", "no-NO": "toalett", "cs-CZ": "toaleta", "uk-UA": "туалет", "hu-HU": "mosdó", "tr-TR": "tuvalet", "ja-JP": "お手洗い" },
  "airport": { "es-ES": "aeropuerto", "fr-FR": "aéroport", "de-DE": "Flughafen", "it-IT": "aeroporto", "pt-PT": "aeroporto", "nl-NL": "luchthaven", "pl-PL": "lotnisko", "ru-RU": "аэропорт", "el-GR": "αεροδρόμιο", "sv-SE": "flygplats", "da-DK": "lufthavn", "fi-FI": "lentokenttä", "no-NO": "flyplass", "cs-CZ": "letiště", "uk-UA": "аеропорт", "hu-HU": "repülőtér", "tr-TR": "havalimanı", "ja-JP": "空港" },
  "station": { "es-ES": "estación", "fr-FR": "gare", "de-DE": "Bahnhof", "it-IT": "stazione", "pt-PT": "estação", "nl-NL": "station", "pl-PL": "stacja", "ru-RU": "станция", "el-GR": "σταθμός", "sv-SE": "station", "da-DK": "station", "fi-FI": "asema", "no-NO": "stasjon", "cs-CZ": "nádraží", "uk-UA": "станція", "hu-HU": "állomás", "tr-TR": "istasyon", "ja-JP": "駅" },
  "taxi": { "es-ES": "taxi", "fr-FR": "taxi", "de-DE": "Taxi", "it-IT": "taxi", "pt-PT": "táxi", "nl-NL": "taxi", "pl-PL": "taksówka", "ru-RU": "такси", "el-GR": "ταξί", "sv-SE": "taxi", "da-DK": "taxa", "fi-FI": "taksi", "no-NO": "drosje", "cs-CZ": "taxík", "uk-UA": "таксі", "hu-HU": "taxi", "tr-TR": "taksi", "ja-JP": "タクシー" },
  "bus": { "es-ES": "autobús", "fr-FR": "bus", "de-DE": "Bus", "it-IT": "autobus", "pt-PT": "ônibus", "nl-NL": "bus", "pl-PL": "autobus", "ru-RU": "автобус", "el-GR": "λεωφορείο", "sv-SE": "buss", "da-DK": "bus", "fi-FI": "bussi", "no-NO": "buss", "cs-CZ": "autobus", "uk-UA": "автобус", "hu-HU": "busz", "tr-TR": "otobüs", "ja-JP": "バス" },
  "train": { "es-ES": "tren", "fr-FR": "train", "de-DE": "Zug", "it-IT": "treno", "pt-PT": "trem", "nl-NL": "trein", "pl-PL": "pociąg", "ru-RU": "поезд", "el-GR": "τρένο", "sv-SE": "tåg", "da-DK": "tog", "fi-FI": "juna", "no-NO": "tog", "cs-CZ": "vlak", "uk-UA": "поїзд", "hu-HU": "vonat", "tr-TR": "tren", "ja-JP": "電車" },
  "hospital": { "es-ES": "hospital", "fr-FR": "hôpital", "de-DE": "Krankenhaus", "it-IT": "ospedale", "pt-PT": "hospital", "nl-NL": "ziekenhuis", "pl-PL": "szpital", "ru-RU": "больница", "el-GR": "νοσοκομείο", "sv-SE": "sjukhus", "da-DK": "hospital", "fi-FI": "sairaala", "no-NO": "sykehus", "cs-CZ": "nemocnice", "uk-UA": "лікарня", "hu-HU": "kórház", "tr-TR": "hastane", "ja-JP": "病院" },
  "doctor": { "es-ES": "médico", "fr-FR": "médecin", "de-DE": "Arzt", "it-IT": "medico", "pt-PT": "médico", "nl-NL": "dokter", "pl-PL": "lekarz", "ru-RU": "врач", "el-GR": "γιατρός", "sv-SE": "läkare", "da-DK": "læge", "fi-FI": "lääkäri", "no-NO": "lege", "cs-CZ": "lékař", "uk-UA": "лікар", "hu-HU": "orvos", "tr-TR": "doktor", "ja-JP": "医者" },
  "police": { "es-ES": "policía", "fr-FR": "police", "de-DE": "Polizei", "it-IT": "polizia", "pt-PT": "polícia", "nl-NL": "politie", "pl-PL": "policja", "ru-RU": "полиция", "el-GR": "αστυνομία", "sv-SE": "polis", "da-DK": "politi", "fi-FI": "poliisi", "no-NO": "politi", "cs-CZ": "policie", "uk-UA": "поліція", "hu-HU": "rendőrség", "tr-TR": "polis", "ja-JP": "警察" }
};

/**
 * Client-Side Auto Translator
 * Translates English phrases into target language using local n-gram matching and dictionary substitution.
 */
function translatePhrase(englishText, targetLangCode) {
  if (!englishText || !englishText.trim()) return "";

  const cleanText = englishText.trim().toLowerCase();

  // 1. Search full phrase exact dictionary match
  if (DICTIONARY_MATRIX[cleanText] && DICTIONARY_MATRIX[cleanText][targetLangCode]) {
    return DICTIONARY_MATRIX[cleanText][targetLangCode];
  }

  // 2. Search phrase catalog match
  if (typeof PHRASE_CATALOG !== 'undefined') {
    for (const topic of Object.keys(PHRASE_CATALOG)) {
      for (const item of PHRASE_CATALOG[topic]) {
        if (item.english.toLowerCase() === cleanText) {
          const trans = item.translations[targetLangCode];
          if (trans && trans.target) return trans.target;
        }
      }
    }
  }

  // 3. Greedy N-Gram Matching Algorithm
  const wordTokens = cleanText.split(/\s+/);
  let translatedParts = [];
  let i = 0;

  while (i < wordTokens.length) {
    let matched = false;

    // Try multi-word n-grams from max length 4 down to 1
    for (let len = Math.min(4, wordTokens.length - i); len >= 1; len--) {
      const phraseCandidate = wordTokens.slice(i, i + len).join(" ").replace(/[^\w\s]/g, "");
      if (DICTIONARY_MATRIX[phraseCandidate] && DICTIONARY_MATRIX[phraseCandidate][targetLangCode]) {
        translatedParts.push(DICTIONARY_MATRIX[phraseCandidate][targetLangCode]);
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Fallback single word match or keep original token
      const wordClean = wordTokens[i].replace(/[^\w]/g, "");
      if (DICTIONARY_MATRIX[wordClean] && DICTIONARY_MATRIX[wordClean][targetLangCode]) {
        translatedParts.push(DICTIONARY_MATRIX[wordClean][targetLangCode]);
      } else {
        translatedParts.push(wordTokens[i]);
      }
      i++;
    }
  }

  let raw = translatedParts.filter(Boolean).join(" ");
  // Remove duplicate adjacent articles (e.g. "el el", "le le")
  raw = raw.replace(/\b(el|la|los|las|un|una|le|la|les|un|une|der|die|das|dem|den|ein|eine)\s+\1\b/gi, '$1');
  raw = raw.replace(/\s+/g, ' ').trim();

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/**
 * Phonetic Guide Auto-Generator
 * Converts target language text into readable phonetic pronunciation guide.
 */
function generatePhoneticGuide(targetText, langCode) {
  if (!targetText || !targetText.trim()) return "";

  const text = targetText.trim();

  // 1. Check catalog exact match for verified phonetic guide
  if (typeof PHRASE_CATALOG !== 'undefined') {
    for (const topic of Object.keys(PHRASE_CATALOG)) {
      for (const item of PHRASE_CATALOG[topic]) {
        const trans = item.translations[langCode];
        if (trans && trans.target && trans.target.toLowerCase() === text.toLowerCase()) {
          if (trans.phonetic) return trans.phonetic;
        }
      }
    }
  }

  // 2. Rule-based phonetic transliteration by language family
  const langPrefix = langCode.slice(0, 2);

  if (langPrefix === 'es') { // Spanish rule-based syllabification
    return text.toLowerCase()
      .replace(/que/g, 'keh').replace(/qui/g, 'kee')
      .replace(/ge/g, 'heh').replace(/gi/g, 'hee')
      .replace(/güe/g, 'gweh').replace(/güi/g, 'gwee')
      .replace(/ce/g, 'seh').replace(/ci/g, 'see')
      .replace(/z/g, 'th').replace(/ñ/g, 'ny')
      .replace(/ll/g, 'y').replace(/rr/g, 'r-r')
      .replace(/h/g, '').replace(/j/g, 'h')
      .replace(/ch/g, 'ch').replace(/v/g, 'b')
      .replace(/\?/g, '').replace(/¿/g, '');
  }

  if (langPrefix === 'fr') { // French
    return text.toLowerCase()
      .replace(/eau/g, 'oh').replace(/eau/g, 'oh')
      .replace(/oi/g, 'wah').replace(/ou/g, 'oo')
      .replace(/ch/g, 'sh').replace(/qu/g, 'k')
      .replace(/ç/g, 's').replace(/ai/g, 'eh')
      .replace(/ez\b/g, 'ay').replace(/er\b/g, 'ay');
  }

  if (langPrefix === 'de') { // German
    return text.toLowerCase()
      .replace(/sch/g, 'sh').replace(/sp/g, 'shp')
      .replace(/st/g, 'sht').replace(/ei/g, 'eye')
      .replace(/ie/g, 'ee').replace(/eu/g, 'oy')
      .replace(/ä/g, 'eh').replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue').replace(/β/g, 'ss')
      .replace(/z/g, 'ts').replace(/v/g, 'f')
      .replace(/w/g, 'v');
  }

  if (langPrefix === 'it') { // Italian
    return text.toLowerCase()
      .replace(/che/g, 'keh').replace(/chi/g, 'kee')
      .replace(/ce/g, 'ch-eh').replace(/ci/g, 'chee')
      .replace(/gne/g, 'nyeh').replace(/gni/g, 'nyee')
      .replace(/gli/g, 'lyee').replace(/z/g, 'ts');
  }

  if (langPrefix === 'ru' || langPrefix === 'uk') { // Cyrillic transliteration
    const cyrillicMap = {
      'а':'a','б':'b','в':'v','г':'g','д':'d','е':'ye','ё':'yo','ж':'zh',
      'з':'z','и':'ee','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
      'п':'p','р':'r','с':'s','т':'t','у':'oo','ф':'f','х':'kh','ц':'ts',
      'ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yoo','я':'ya'
    };
    return text.toLowerCase().split('').map(c => cyrillicMap[c] || c).join('');
  }

  if (langPrefix === 'ja') { // Japanese Romaji fallback
    return text; // Japanese phrases in catalog carry romaji phonetics
  }

  // Fallback:Hyphenated word representation
  return text.toLowerCase().split(/\s+/).join('-');
}
