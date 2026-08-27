/**
 * API and Phrase Catalog Data Module
 * Provides structured topics and translations for offline travel phrasebook.
 * Includes all major European languages + Japanese.
 */

const PHRASE_CATALOG = {
  "Greetings & Basics": [
    {
      id: "greetings_1",
      english: "Hello / Good day",
      translations: {
        "es-ES": { target: "Hola / Buenos días", phonetic: "Oh-lah / Bway-nos dee-as" },
        "fr-FR": { target: "Bonjour", phonetic: "Bohn-zhoor" },
        "de-DE": { target: "Guten Tag", phonetic: "Goo-ten tahk" },
        "it-IT": { target: "Buongiorno", phonetic: "Bwon-zhor-no" },
        "pt-PT": { target: "Olá / Bom dia", phonetic: "Oh-lah / Bohm dee-ah" },
        "nl-NL": { target: "Hallo / Goedendag", phonetic: "Hah-loh / Khoo-yuhn-dahkh" },
        "pl-PL": { target: "Dzień dobry", phonetic: "Jeyn dob-ry" },
        "ru-RU": { target: "Здравствуйте", phonetic: "Zdrav-stvoy-te" },
        "el-GR": { target: "Γειά σας", phonetic: "Yah sas" },
        "sv-SE": { target: "Hej / God dag", phonetic: "Hey / Goh dahg" },
        "da-DK": { target: "Hej / Goddag", phonetic: "Hay / Goh-dah" },
        "fi-FI": { target: "Hei / Hyvää päivää", phonetic: "Hay / Hoo-vaa py-vaa" },
        "no-NO": { target: "Hei / God dag", phonetic: "Hay / Go dahg" },
        "cs-CZ": { target: "Dobrý den", phonetic: "Dob-ree den" },
        "uk-UA": { target: "Доброго дня", phonetic: "Dob-ro-ho dni-a" },
        "hu-HU": { target: "Jó napot", phonetic: "Yoh nah-pot" },
        "tr-TR": { target: "Merhaba / İyi günler", phonetic: "Mer-ha-ba / Ee-yee goon-ler" },
        "ja-JP": { target: "こんにちは", phonetic: "Konnichiwa" }
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
        "sv-SE": { target: "Snälla / Tack", phonetic: "Snel-lah / Tahk" },
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
        "pt-PT": { target: "Muito obrigado/a", phonetic: "Moy-toh oh-bree-gah-doh" },
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
      id: "greetings_4",
      english: "Yes / No",
      translations: {
        "es-ES": { target: "Sí / No", phonetic: "See / Noh" },
        "fr-FR": { target: "Oui / Non", phonetic: "Wee / Noh" },
        "de-DE": { target: "Ja / Nein", phonetic: "Yah / Nine" },
        "it-IT": { target: "Sì / No", phonetic: "See / Noh" },
        "pt-PT": { target: "Sim / Não", phonetic: "Seem / Now" },
        "nl-NL": { target: "Ja / Nee", phonetic: "Yah / Nay" },
        "pl-PL": { target: "Tak / Nie", phonetic: "Tahk / Nyeh" },
        "ru-RU": { target: "Да / Нет", phonetic: "Da / Nyet" },
        "el-GR": { target: "Ναι / Όχι", phonetic: "Neh / O-chee" },
        "sv-SE": { target: "Ja / Nej", phonetic: "Yah / Nay" },
        "da-DK": { target: "Ja / Nej", phonetic: "Yah / Nay" },
        "fi-FI": { target: "Kyllä / Ei", phonetic: "Kool-la / Ay" },
        "no-NO": { target: "Ja / Nei", phonetic: "Yah / Nay" },
        "cs-CZ": { target: "Ano / Ne", phonetic: "Ah-no / Ne" },
        "uk-UA": { target: "Так / Ні", phonetic: "Tak / Ni" },
        "hu-HU": { target: "Igen / Nem", phonetic: "Ee-gen / Nem" },
        "tr-TR": { target: "Evet / Hayır", phonetic: "E-vet / Ha-yur" },
        "ja-JP": { target: "はい / いいえ", phonetic: "Hai / Iie" }
      }
    },
    {
      id: "greetings_5",
      english: "Excuse me / Sorry",
      translations: {
        "es-ES": { target: "Disculpe / Lo siento", phonetic: "Dees-kool-peh / Loh syen-toh" },
        "fr-FR": { target: "Pardon / Excusez-moi", phonetic: "Par-dohn / Ehk-skew-zay mwah" },
        "de-DE": { target: "Entschuldigung", phonetic: "Ent-shool-dee-goong" },
        "it-IT": { target: "Mi scusi / Mi dispiace", phonetic: "Mee skoo-zee / Mee dees-pyah-chay" },
        "pt-PT": { target: "Com licença / Desculpe", phonetic: "Kohm lee-sen-sah / Des-kool-peh" },
        "nl-NL": { target: "Pardon / Sory", phonetic: "Pahr-dohn / Soh-ree" },
        "pl-PL": { target: "Przepraszam", phonetic: "Psheh-prah-sham" },
        "ru-RU": { target: "Извините", phonetic: "Iz-vee-nee-te" },
        "el-GR": { target: "Συγνώμη", phonetic: "Syg-no-mee" },
        "sv-SE": { target: "Ursäkta / Förlåt", phonetic: "Oor-shek-tah / Foer-loht" },
        "da-DK": { target: "Undskyld", phonetic: "Oon-skool" },
        "fi-FI": { target: "Anteeksi", phonetic: "Ahn-teek-see" },
        "no-NO": { target: "Unnskyld", phonetic: "Oon-sheel" },
        "cs-CZ": { target: "Promiňte", phonetic: "Pro-min-te" },
        "uk-UA": { target: "Вибачте", phonetic: "Vy-bach-te" },
        "hu-HU": { target: "Elnézést", phonetic: "El-nay-zaysht" },
        "tr-TR": { target: "Affedersiniz / Özür dilerim", phonetic: "Af-fe-der-si-niz / Oe-zoor dee-le-reem" },
        "ja-JP": { target: "すみません", phonetic: "Sumimasen" }
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
      id: "food_2",
      english: "The check/bill, please",
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
        "pt-PT": { target: "Socorro / Ajuda!", phonetic: "Soh-koh-rroh / Ah-zhoo-dah!" },
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
        "tr-TR": { target: "Imdat / Yardım edin!", phonetic: "Eem-dat / Yar-dum e-deen!" },
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
