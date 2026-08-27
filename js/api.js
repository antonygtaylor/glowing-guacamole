/**
 * API and Phrase Catalog Data Module
 * Provides structured topics, translations, and flag metadata for offline travel phrasebook.
 * Slashes ('/') have been split into individual, distinct phrases.
 */

const LANGUAGE_FLAGS = {
  "es-ES": { name: "Spanish", native: "Español", flag: "🇪🇸" },
  "fr-FR": { name: "French", native: "Français", flag: "🇫🇷" },
  "de-DE": { name: "German", native: "Deutsch", flag: "🇩🇪" },
  "it-IT": { name: "Italian", native: "Italiano", flag: "🇮🇹" },
  "pt-PT": { name: "Portuguese", native: "Português", flag: "🇵🇹" },
  "nl-NL": { name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  "pl-PL": { name: "Polish", native: "Polski", flag: "🇵🇱" },
  "ru-RU": { name: "Russian", native: "Русский", flag: "🇷🇺" },
  "el-GR": { name: "Greek", native: "Ελληνικά", flag: "🇬🇷" },
  "sv-SE": { name: "Swedish", native: "Svenska", flag: "🇸🇪" },
  "da-DK": { name: "Danish", native: "Dansk", flag: "🇩🇰" },
  "fi-FI": { name: "Finnish", native: "Suomi", flag: "🇫🇮" },
  "no-NO": { name: "Norwegian", native: "Norsk", flag: "🇳🇴" },
  "cs-CZ": { name: "Czech", native: "Čeština", flag: "🇨🇿" },
  "uk-UA": { name: "Ukrainian", native: "Українська", flag: "🇺🇦" },
  "hu-HU": { name: "Hungarian", native: "Magyar", flag: "🇭🇺" },
  "tr-TR": { name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  "ja-JP": { name: "Japanese", native: "日本語", flag: "🇯🇵" }
};

const PHRASE_CATALOG = {
  "Greetings & Basics": [
    {
      id: "greetings_1a",
      english: "Hello",
      translations: {
        "es-ES": { target: "Hola", phonetic: "Oh-lah" },
        "fr-FR": { target: "Bonjour", phonetic: "Bohn-zhoor" },
        "de-DE": { target: "Hallo", phonetic: "Hah-loh" },
        "it-IT": { target: "Ciao", phonetic: "Chow" },
        "pt-PT": { target: "Olá", phonetic: "Oh-lah" },
        "nl-NL": { target: "Hallo", phonetic: "Hah-loh" },
        "pl-PL": { target: "Cześć", phonetic: "Chesch" },
        "ru-RU": { target: "Привет", phonetic: "Pree-vyet" },
        "el-GR": { target: "Γειά σου", phonetic: "Yah soo" },
        "sv-SE": { target: "Hej", phonetic: "Hey" },
        "da-DK": { target: "Hej", phonetic: "Hay" },
        "fi-FI": { target: "Hei", phonetic: "Hay" },
        "no-NO": { target: "Hei", phonetic: "Hay" },
        "cs-CZ": { target: "Ahoj", phonetic: "Ah-hoy" },
        "uk-UA": { target: "Привіт", phonetic: "Pry-vit" },
        "hu-HU": { target: "Szia", phonetic: "See-ah" },
        "tr-TR": { target: "Merhaba", phonetic: "Mer-ha-ba" },
        "ja-JP": { target: "こんにちは", phonetic: "Konnichiwa" }
      }
    },
    {
      id: "greetings_1b",
      english: "Good day",
      translations: {
        "es-ES": { target: "Buenos días", phonetic: "Bway-nos dee-as" },
        "fr-FR": { target: "Bonne journée", phonetic: "Bohn zhoor-nay" },
        "de-DE": { target: "Guten Tag", phonetic: "Goo-ten tahk" },
        "it-IT": { target: "Buongiorno", phonetic: "Bwon-zhor-no" },
        "pt-PT": { target: "Bom dia", phonetic: "Bohm dee-ah" },
        "nl-NL": { target: "Goedendag", phonetic: "Khoo-yuhn-dahkh" },
        "pl-PL": { target: "Dzień dobry", phonetic: "Jeyn dob-ry" },
        "ru-RU": { target: "Добрый день", phonetic: "Dob-ry den" },
        "el-GR": { target: "Καλημέρα", phonetic: "Ka-lee-meh-ra" },
        "sv-SE": { target: "God dag", phonetic: "Goh dahg" },
        "da-DK": { target: "Goddag", phonetic: "Goh-dah" },
        "fi-FI": { target: "Hyvää päivää", phonetic: "Hoo-vaa py-vaa" },
        "no-NO": { target: "God dag", phonetic: "Go dahg" },
        "cs-CZ": { target: "Dobrý den", phonetic: "Dob-ree den" },
        "uk-UA": { target: "Доброго дня", phonetic: "Dob-ro-ho dni-a" },
        "hu-HU": { target: "Jó napot", phonetic: "Yoh nah-pot" },
        "tr-TR": { target: "İyi günler", phonetic: "Ee-yee goon-ler" },
        "ja-JP": { target: "良い一日を", phonetic: "Yoi ichinichi o" }
      }
    },
    {
      id: "greetings_2",
      english: "Please",
      translations: {
        "es-ES": { target: "Por favor", phonetic: "Por fah-bor" },
        "fr-FR": { target: "S'il vous plaît", phonetic: "Seel voo pleh" },
        "de-DE": { target: "Bitte", phonetic: "Bit-teh" },
        "it-IT": { target: "Per favore", phonetic: "Pair fah-voh-ray" },
        "pt-PT": { target: "Por favor", phonetic: "Poor fah-vohr" },
        "nl-NL": { target: "Alstublieft", phonetic: "Ahl-stoo-bleeft" },
        "pl-PL": { target: "Proszę", phonetic: "Pro-sheh" },
        "ru-RU": { target: "Пожалуйста", phonetic: "Pa-zhal-uy-sta" },
        "el-GR": { target: "Παρακαλώ", phonetic: "Par-a-ka-lo" },
        "sv-SE": { target: "Snälla", phonetic: "Snel-lah" },
        "da-DK": { target: "Vær så venlig", phonetic: "Vair soh ven-lee" },
        "fi-FI": { target: "Ole hyvä", phonetic: "Oh-leh hoo-vah" },
        "no-NO": { target: "Vær så snill", phonetic: "Vair soh sneel" },
        "cs-CZ": { target: "Prosím", phonetic: "Pro-seem" },
        "uk-UA": { target: "Будь ласка", phonetic: "Bud las-ka" },
        "hu-HU": { target: "Kérem", phonetic: "Kay-rem" },
        "tr-TR": { target: "Lütfen", phonetic: "Loot-fen" },
        "ja-JP": { target: "お願いします", phonetic: "Onegaishimasu" }
      }
    },
    {
      id: "greetings_3",
      english: "Thank you very much",
      translations: {
        "es-ES": { target: "Muchas gracias", phonetic: "Moo-chas grah-syas" },
        "fr-FR": { target: "Merci beaucoup", phonetic: "Mair-see boh-koo" },
        "de-DE": { target: "Vielen Dank", phonetic: "Fee-len dahnk" },
        "it-IT": { target: "Grazie mille", phonetic: "Grah-tsee-ay meel-lay" },
        "pt-PT": { target: "Muito obrigado", phonetic: "Moy-toh oh-bree-gah-doh" },
        "nl-NL": { target: "Dank u wel", phonetic: "Dahnk oo wel" },
        "pl-PL": { target: "Dziękuję bardzo", phonetic: "Jen-koo-yeh bar-dzo" },
        "ru-RU": { target: "Большое спасибо", phonetic: "Bol-shoye spa-see-ba" },
        "el-GR": { target: "Ευχαριστώ πολύ", phonetic: "Ef-cha-ris-to po-ly" },
        "sv-SE": { target: "Tack så mycket", phonetic: "Tahk soh mee-keh" },
        "da-DK": { target: "Mange tak", phonetic: "Mahn-geh tahk" },
        "fi-FI": { target: "Paljon kiitoksia", phonetic: "Pahl-yohn kee-tohk-see-ah" },
        "no-NO": { target: "Tusen takk", phonetic: "Too-sen tahk" },
        "cs-CZ": { target: "Děkuji moc", phonetic: "Dyeh-koo-yee mots" },
        "uk-UA": { target: "Дякую велике", phonetic: "Dia-ku-yu ve-ly-ke" },
        "hu-HU": { target: "Köszönöm szépen", phonetic: "Koe-soe-noem say-pen" },
        "tr-TR": { target: "Çok teşekkür ederim", phonetic: "Chok te-shek-kur e-de-reem" },
        "ja-JP": { target: "どうもありがとうございます", phonetic: "Dōmo arigatō gozaimasu" }
      }
    },
    {
      id: "greetings_4a",
      english: "Yes",
      translations: {
        "es-ES": { target: "Sí", phonetic: "See" },
        "fr-FR": { target: "Oui", phonetic: "Wee" },
        "de-DE": { target: "Ja", phonetic: "Yah" },
        "it-IT": { target: "Sì", phonetic: "See" },
        "pt-PT": { target: "Sim", phonetic: "Seem" },
        "nl-NL": { target: "Ja", phonetic: "Yah" },
        "pl-PL": { target: "Tak", phonetic: "Tahk" },
        "ru-RU": { target: "Да", phonetic: "Da" },
        "el-GR": { target: "Ναι", phonetic: "Neh" },
        "sv-SE": { target: "Ja", phonetic: "Yah" },
        "da-DK": { target: "Ja", phonetic: "Yah" },
        "fi-FI": { target: "Kyllä", phonetic: "Kool-la" },
        "no-NO": { target: "Ja", phonetic: "Yah" },
        "cs-CZ": { target: "Ano", phonetic: "Ah-no" },
        "uk-UA": { target: "Так", phonetic: "Tak" },
        "hu-HU": { target: "Igen", phonetic: "Ee-gen" },
        "tr-TR": { target: "Evet", phonetic: "E-vet" },
        "ja-JP": { target: "はい", phonetic: "Hai" }
      }
    },
    {
      id: "greetings_4b",
      english: "No",
      translations: {
        "es-ES": { target: "No", phonetic: "Noh" },
        "fr-FR": { target: "Non", phonetic: "Noh" },
        "de-DE": { target: "Nein", phonetic: "Nine" },
        "it-IT": { target: "No", phonetic: "Noh" },
        "pt-PT": { target: "Não", phonetic: "Now" },
        "nl-NL": { target: "Nee", phonetic: "Nay" },
        "pl-PL": { target: "Nie", phonetic: "Nyeh" },
        "ru-RU": { target: "Нет", phonetic: "Nyet" },
        "el-GR": { target: "Όχι", phonetic: "O-chee" },
        "sv-SE": { target: "Nej", phonetic: "Nay" },
        "da-DK": { target: "Nej", phonetic: "Nay" },
        "fi-FI": { target: "Ei", phonetic: "Ay" },
        "no-NO": { target: "Nei", phonetic: "Nay" },
        "cs-CZ": { target: "Ne", phonetic: "Ne" },
        "uk-UA": { target: "Ні", phonetic: "Ni" },
        "hu-HU": { target: "Nem", phonetic: "Nem" },
        "tr-TR": { target: "Hayır", phonetic: "Ha-yur" },
        "ja-JP": { target: "いいえ", phonetic: "Iie" }
      }
    },
    {
      id: "greetings_5a",
      english: "Excuse me",
      translations: {
        "es-ES": { target: "Disculpe", phonetic: "Dees-kool-peh" },
        "fr-FR": { target: "Excusez-moi", phonetic: "Ehk-skew-zay mwah" },
        "de-DE": { target: "Entschuldigung", phonetic: "Ent-shool-dee-goong" },
        "it-IT": { target: "Mi scusi", phonetic: "Mee skoo-zee" },
        "pt-PT": { target: "Com licença", phonetic: "Kohm lee-sen-sah" },
        "nl-NL": { target: "Pardon", phonetic: "Pahr-dohn" },
        "pl-PL": { target: "Przepraszam", phonetic: "Psheh-prah-sham" },
        "ru-RU": { target: "Извините", phonetic: "Iz-vee-nee-te" },
        "el-GR": { target: "Συγνώμη", phonetic: "Syg-no-mee" },
        "sv-SE": { target: "Ursäkta", phonetic: "Oor-shek-tah" },
        "da-DK": { target: "Undskyld", phonetic: "Oon-skool" },
        "fi-FI": { target: "Anteeksi", phonetic: "Ahn-teek-see" },
        "no-NO": { target: "Unnskyld", phonetic: "Oon-sheel" },
        "cs-CZ": { target: "Promiňte", phonetic: "Pro-min-te" },
        "uk-UA": { target: "Вибачте", phonetic: "Vy-bach-te" },
        "hu-HU": { target: "Elnézést", phonetic: "El-nay-zaysht" },
        "tr-TR": { target: "Affedersiniz", phonetic: "Af-fe-der-si-niz" },
        "ja-JP": { target: "すみません", phonetic: "Sumimasen" }
      }
    },
    {
      id: "greetings_5b",
      english: "Sorry",
      translations: {
        "es-ES": { target: "Lo siento", phonetic: "Loh syen-toh" },
        "fr-FR": { target: "Pardon", phonetic: "Par-dohn" },
        "de-DE": { target: "Es tut mir leid", phonetic: "Es toot meer lite" },
        "it-IT": { target: "Mi dispiace", phonetic: "Mee dees-pyah-chay" },
        "pt-PT": { target: "Desculpe", phonetic: "Des-kool-peh" },
        "nl-NL": { target: "Sorry", phonetic: "Soh-ree" },
        "pl-PL": { target: "Przepraszam", phonetic: "Psheh-prah-sham" },
        "ru-RU": { target: "Простите", phonetic: "Pro-stee-te" },
        "el-GR": { target: "Lypámai", phonetic: "Lee-pah-meh" },
        "sv-SE": { target: "Förlåt", phonetic: "Foer-loht" },
        "da-DK": { target: "Undskyld", phonetic: "Oon-skool" },
        "fi-FI": { target: "Olen pahoillani", phonetic: "Oh-len pah-hoyl-lah-nee" },
        "no-NO": { target: "Beklager", phonetic: "Beh-klah-ger" },
        "cs-CZ": { target: "Omlouvám se", phonetic: "Om-loo-vahm se" },
        "uk-UA": { target: "Пробачте", phonetic: "Pro-bach-te" },
        "hu-HU": { target: "Bocsánat", phonetic: "Boh-chah-not" },
        "tr-TR": { target: "Özür dilerim", phonetic: "Oe-zoor dee-le-reem" },
        "ja-JP": { target: "ごめんなさい", phonetic: "Gomen nasai" }
      }
    }
  ],

  "Ordering Food": [
    {
      id: "food_1",
      english: "A table for two, please",
      translations: {
        "es-ES": { target: "Una mesa para dos, por favor", phonetic: "Oo-nah meh-sah pah-rah dos, por fah-bor" },
        "fr-FR": { target: "Une table pour deux, s'il vous plaît", phonetic: "Ewn tahbl poor duh, seel voo pleh" },
        "de-DE": { target: "Einen Tisch für zwei, bitte", phonetic: "Eye-nen tish fuer tsvy, bit-teh" },
        "it-IT": { target: "Un tavolo per due, per favore", phonetic: "Oon tah-voh-loh pair doo-ay, pair fah-voh-ray" },
        "pt-PT": { target: "Uma mesa para dois, por favor", phonetic: "Oo-mah meh-zah pah-rah doysh, poor fah-vohr" },
        "nl-NL": { target: "Een tafel voor twee, alstublieft", phonetic: "Ayn tah-fel voor tway, ahl-stoo-bleeft" },
        "pl-PL": { target: "Stolik dla dwóch osób, proszę", phonetic: "Sto-leek dlah dvooch o-soob, pro-sheh" },
        "ru-RU": { target: "Столик на двоих, пожалуйста", phonetic: "Sto-leek na dvo-eekh, pa-zhal-uy-sta" },
        "el-GR": { target: "Ένα τραπέζι για δύο, παρακαλώ", phonetic: "Eh-na tra-peh-zee gya dee-o, par-a-ka-lo" },
        "sv-SE": { target: "Ett bord för två, tack", phonetic: "Eht boord foe-r tvoh, tahk" },
        "da-DK": { target: "Et bord til to, tak", phonetic: "Eht bohr teel toh, tahk" },
        "fi-FI": { target: "Pöytä kahdelle, kiitos", phonetic: "Poy-ta kah-del-le, kee-tos" },
        "no-NO": { target: "Et bord for to, takk", phonetic: "Eht bohr for toh, tahk" },
        "cs-CZ": { target: "Stůl pro dva, prosím", phonetic: "Stool pro dvah, pro-seem" },
        "uk-UA": { target: "Столик на двох, будь ласка", phonetic: "Sto-lyk na dvokh, bud las-ka" },
        "hu-HU": { target: "Egy asztalt két főre, kérem", phonetic: "Edj osh-tolt kayt foe-reh, kay-rem" },
        "tr-TR": { target: "İki kişilik bir masa lütfen", phonetic: "Ee-kee kee-shee-leek beer ma-sa loot-fen" },
        "ja-JP": { target: "2人用のテーブルをお願いします", phonetic: "Futari-yō no tēburu o onegaishimasu" }
      }
    },
    {
      id: "food_2a",
      english: "The check, please",
      translations: {
        "es-ES": { target: "La cuenta, por favor", phonetic: "Lah kwen-tah, por fah-bor" },
        "fr-FR": { target: "L'addition, s'il vous plaît", phonetic: "Lah-dees-syohn, seel voo pleh" },
        "de-DE": { target: "Die Rechnung, bitte", phonetic: "Dee rekh-noong, bit-teh" },
        "it-IT": { target: "Il conto, per favore", phonetic: "Eel kohn-toh, pair fah-voh-ray" },
        "pt-PT": { target: "A conta, por favor", phonetic: "Ah kohn-tah, poor fah-vohr" },
        "nl-NL": { target: "De rekening, alstublieft", phonetic: "Duh ray-keh-neeng, ahl-stoo-bleeft" },
        "pl-PL": { target: "Rachunek, proszę", phonetic: "Ra-choo-nek, pro-sheh" },
        "ru-RU": { target: "Счет, пожалуйста", phonetic: "Schyot, pa-zhal-uy-sta" },
        "el-GR": { target: "Το λογαριασμό, παρακαλώ", phonetic: "To lo-gar-yas-mo, par-a-ka-lo" },
        "sv-SE": { target: "Notan, tack", phonetic: "Noo-tahn, tahk" },
        "da-DK": { target: "Regningen, tak", phonetic: "Rye-neeng-en, tahk" },
        "fi-FI": { target: "Lasku, kiitos", phonetic: "Lahs-koo, kee-tos" },
        "no-NO": { target: "Regningen, takk", phonetic: "Rye-neeng-en, tahk" },
        "cs-CZ": { target: "Účet, prosím", phonetic: "Oo-chet, pro-seem" },
        "uk-UA": { target: "Рахунок, будь ласка", phonetic: "Ra-kho-nok, bud las-ka" },
        "hu-HU": { target: "A számlát, kérem", phonetic: "Ah sahm-laht, kay-rem" },
        "tr-TR": { target: "Hesap lütfen", phonetic: "He-sap loot-fen" },
        "ja-JP": { target: "お会計をお願いします", phonetic: "O-kaikei o onegaishimasu" }
      }
    }
  ],

  "Arriving at Hotel": [
    {
      id: "hotel_1",
      english: "I have a reservation",
      translations: {
        "es-ES": { target: "Tengo una reserva", phonetic: "Ten-goh oo-nah reh-ser-bah" },
        "fr-FR": { target: "J'ai une réservation", phonetic: "Zheh ewn reh-zehr-vah-syohn" },
        "de-DE": { target: "Ich habe eine Reservierung", phonetic: "Ikh hah-beh eye-neh reh-zer-vee-roong" },
        "it-IT": { target: "Ho una prenotazione", phonetic: "Oh oo-nah pray-noh-tah-tsyoh-nay" },
        "pt-PT": { target: "Tenho uma reserva", phonetic: "Ten-yoh oo-mah reh-zehr-vah" },
        "nl-NL": { target: "Ik heb een reservering", phonetic: "Ik heb ayn reh-zer-vay-reeng" },
        "pl-PL": { target: "Mam rezerwację", phonetic: "Mahm re-zer-vah-tsyeh" },
        "ru-RU": { target: "У меня забронировано", phonetic: "Oo me-nya za-bro-nee-ro-va-no" },
        "el-GR": { target: "Έχω μια κράτηση", phonetic: "Eh-cho mya kra-tee-see" },
        "sv-SE": { target: "Jag har en bokning", phonetic: "Yah har ehn book-neeng" },
        "da-DK": { target: "Jeg har en reservation", phonetic: "Yye har ehn reh-sehr-vah-syohn" },
        "fi-FI": { target: "Minulla on varaus", phonetic: "Mee-nool-lah on vah-rah-oos" },
        "no-NO": { target: "Jeg har en reservasjon", phonetic: "Yai har ehn reh-sehr-vah-shohn" },
        "cs-CZ": { target: "Mám rezervaci", phonetic: "Mahm re-zer-vah-tsi" },
        "uk-UA": { target: "У мене є бронь", phonetic: "Oo me-ne ye bron" },
        "hu-HU": { target: "Foglalásom van", phonetic: "Fog-lah-lah-shom von" },
        "tr-TR": { target: "Rezervasyonum var", phonetic: "Re-zer-vas-yo-num var" },
        "ja-JP": { target: "予約があります", phonetic: "Yoyaku ga arimasu" }
      }
    }
  ],

  "Emergency & Help": [
    {
      id: "emergency_1",
      english: "Help me!",
      translations: {
        "es-ES": { target: "¡Ayuda!", phonetic: "Ah-yoo-dah!" },
        "fr-FR": { target: "Aidez-moi !", phonetic: "Eh-day mwah!" },
        "de-DE": { target: "Helfen Sie mir!", phonetic: "Hel-fen zee meer!" },
        "it-IT": { target: "Aiuto!", phonetic: "Ah-yoo-toh!" },
        "pt-PT": { target: "Socorro!", phonetic: "Soh-koh-rroh!" },
        "nl-NL": { target: "Help mij!", phonetic: "Help my!" },
        "pl-PL": { target: "Pomocy!", phonetic: "Po-mo-tsy!" },
        "ru-RU": { target: "Помогите!", phonetic: "Po-mo-gee-te!" },
        "el-GR": { target: "Βοήθεια!", phonetic: "Vo-ee-thya!" },
        "sv-SE": { target: "Hjälp mig!", phonetic: "Yelp mey!" },
        "da-DK": { target: "Hjælp mig!", phonetic: "Yelp my!" },
        "fi-FI": { target: "Auttakaa!", phonetic: "Owt-tah-kah!" },
        "no-NO": { target: "Hjelp meg!", phonetic: "Yelp mai!" },
        "cs-CZ": { target: "Pomozte mi!", phonetic: "Po-mots-te mee!" },
        "uk-UA": { target: "Допоможіть!", phonetic: "Do-po-mo-zhit!" },
        "hu-HU": { target: "Segítség!", phonetic: "Sheh-geet-sayg!" },
        "tr-TR": { target: "İmdat!", phonetic: "Eem-dat!" },
        "ja-JP": { target: "助けてください！", phonetic: "Tasukete kudasai!" }
      }
    }
  ]
};

/**
 * Retrieves phrases for a specific topic and target language
 */
function getPhrasesByTopic(topicName, langCode) {
  if (topicName === 'All') {
    let all = [];
    Object.keys(PHRASE_CATALOG).forEach(topic => {
      const phrases = PHRASE_CATALOG[topic].map(item => {
        const trans = item.translations[langCode] || item.translations['es-ES'] || { target: item.english, phonetic: '' };
        return {
          id: item.id,
          topic: topic,
          english: item.english,
          target: trans.target,
          phonetic: trans.phonetic,
          lang: langCode
        };
      });
      all = all.concat(phrases);
    });
    return all;
  }

  const topicItems = PHRASE_CATALOG[topicName] || [];
  return topicItems.map(item => {
    const trans = item.translations[langCode] || item.translations['es-ES'] || { target: item.english, phonetic: '' };
    return {
      id: item.id,
      topic: topicName,
      english: item.english,
      target: trans.target,
      phonetic: trans.phonetic,
      lang: langCode
    };
  });
}

/**
 * Retrieves all available topic names
 */
function getTopicList() {
  return ['All', ...Object.keys(PHRASE_CATALOG)];
}
