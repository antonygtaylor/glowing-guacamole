/**
 * API and Phrase Catalog Data Module
 * Provides structured topics and translations for offline travel phrasebook.
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
        "ja-JP": { target: "すみません", phonetic: "Sumimasen" }
      }
    },
    {
      id: "greetings_6",
      english: "Do you speak English?",
      translations: {
        "es-ES": { target: "¿Habla inglés?", phonetic: "Ah-blah een-gles?" },
        "fr-FR": { target: "Parlez-vous anglais ?", phonetic: "Par-lay voo ahn-gleh?" },
        "de-DE": { target: "Sprechen Sie Englisch?", phonetic: "Shprek-hen zee eng-lish?" },
        "it-IT": { target: "Parla inglese?", phonetic: "Par-lah een-glay-zay?" },
        "ja-JP": { target: "英語を話せますか？", phonetic: "Eigo o hanasemasu ka?" }
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
        "ja-JP": { target: "2人用のテーブルをお願いします", phonetic: "Futari-yō no tēburu o onegaishimasu" }
      }
    },
    {
      id: "food_2",
      english: "Could I see the menu?",
      translations: {
        "es-ES": { target: "¿Puedo ver el menú?", phonetic: "Pweh-doh bair el meh-noo?" },
        "fr-FR": { target: "Puis-je avoir le menu ?", phonetic: "Pwee zhah-vwahr leh meh-new?" },
        "de-DE": { target: "Könnte ich die Speisekarte haben?", phonetic: "Koen-teh ikh dee shpy-zeh-kar-teh hah-ben?" },
        "it-IT": { target: "Posso avere il menu?", phonetic: "Pohs-soh ah-vay-ray eel meh-noo?" },
        "ja-JP": { target: "メニューを見せてもらえますか？", phonetic: "Menyū o misete moraemasu ka?" }
      }
    },
    {
      id: "food_3",
      english: "I would like to order...",
      translations: {
        "es-ES": { target: "Me gustaría pedir...", phonetic: "Meh goos-tah-ree-ah peh-deer..." },
        "fr-FR": { target: "Je voudrais commander...", phonetic: "Zhuh voo-dreh koh-mahn-day..." },
        "de-DE": { target: "Ich möchte bestellen...", phonetic: "Ikh moekh-teh beh-shtel-len..." },
        "it-IT": { target: "Vorrei ordinare...", phonetic: "Vor-ray or-dee-nah-ray..." },
        "ja-JP": { target: "〜を注文したいです", phonetic: "...o chūmon shitai desu" }
      }
    },
    {
      id: "food_4",
      english: "Water, please",
      translations: {
        "es-ES": { target: "Agua, por favor", phonetic: "Ah-gwah, por fah-bor" },
        "fr-FR": { target: "De l'eau, s'il vous plaît", phonetic: "Deh loh, seel voo pleh" },
        "de-DE": { target: "Wasser, bitte", phonetic: "Vahs-ser, bit-teh" },
        "it-IT": { target: "Acqua, per favore", phonetic: "Ahk-wah, pair fah-voh-ray" },
        "ja-JP": { target: "お水をください", phonetic: "Omizu o kudasai" }
      }
    },
    {
      id: "food_5",
      english: "The check/bill, please",
      translations: {
        "es-ES": { target: "La cuenta, por favor", phonetic: "Lah kwen-tah, por fah-bor" },
        "fr-FR": { target: "L'addition, s'il vous plaît", phonetic: "Lah-dees-syohn, seel voo pleh" },
        "de-DE": { target: "Die Rechnung, bitte", phonetic: "Dee rekh-noong, bit-teh" },
        "it-IT": { target: "Il conto, per favore", phonetic: "Eel kohn-toh, pair fah-voh-ray" },
        "ja-JP": { target: "お会計をお願いします", phonetic: "O-kaikei o onegaishimasu" }
      }
    },
    {
      id: "food_6",
      english: "Is vegetarian / gluten-free available?",
      translations: {
        "es-ES": { target: "¿Tienen opciones vegetarianas / sin gluten?", phonetic: "Tyeh-nen op-syoh-nes beh-heh-tah-ryah-nas / seen gloo-ten?" },
        "fr-FR": { target: "Avez-vous des plats végétariens / sans gluten ?", phonetic: "Ah-vay voo day plah veh-zheh-tah-ryahn / sahn gloo-tehn?" },
        "de-DE": { target: "Haben Sie vegetarische / glutenfreie Gerichte?", phonetic: "Hah-ben zee veh-geh-tah-ri-sheh / gloo-ten-fry-eh geh-rikh-teh?" },
        "it-IT": { target: "Avete opzioni vegetariane / senza glutine?", phonetic: "Ah-vay-tay op-tsyoh-nee veh-jeh-tah-ryah-nay / sehn-tsah gloo-tee-nay?" },
        "ja-JP": { target: "ベジタリアン / グルテンフリーの料理はありますか？", phonetic: "Bejitarian / gurutenfurī no ryōri wa arimasu ka?" }
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
        "ja-JP": { target: "予約があります", phonetic: "Yoyaku ga arimasu" }
      }
    },
    {
      id: "hotel_2",
      english: "What time is check-in / check-out?",
      translations: {
        "es-ES": { target: "¿A qué hora es el check-in / check-out?", phonetic: "Ah keh oh-rah es el check-in / check-out?" },
        "fr-FR": { target: "À quelle heure est le check-in / check-out ?", phonetic: "Ah kehl uhr eh leh check-in / check-out?" },
        "de-DE": { target: "Wann ist Check-in / Check-out?", phonetic: "Vahn eest Check-in / Check-out?" },
        "it-IT": { target: "A che ora è il check-in / check-out?", phonetic: "Ah kay oh-rah ay eel check-in / check-out?" },
        "ja-JP": { target: "チェックイン / チェックアウトは何時ですか？", phonetic: "Chekkuin / chekkuauto wa nan-ji desu ka?" }
      }
    },
    {
      id: "hotel_3",
      english: "What is the Wi-Fi password?",
      translations: {
        "es-ES": { target: "¿Cuál es la contraseña del Wi-Fi?", phonetic: "Kwal es lah kon-trah-seh-nyah del Wi-Fi?" },
        "fr-FR": { target: "Quel est le mot de passe Wi-Fi ?", phonetic: "Kehl eh leh moh deh pahs Wi-Fi?" },
        "de-DE": { target: "Wie lautet das WLAN-Passwort?", phonetic: "Vee low-tet dahs V-LAN pass-vort?" },
        "it-IT": { target: "Qual è la password del Wi-Fi?", phonetic: "Kwahl ay lah pass-word del Wi-Fi?" },
        "ja-JP": { target: "Wi-Fiのパスワードは何ですか？", phonetic: "Waifai no pasuwādo wa nan desu ka?" }
      }
    },
    {
      id: "hotel_4",
      english: "Could you store my luggage?",
      translations: {
        "es-ES": { target: "¿Pueden guardar mi equipaje?", phonetic: "Pweh-den gwar-dar mee eh-kee-pah-heh?" },
        "fr-FR": { target: "Pouvez-vous garder mes bagages ?", phonetic: "Poo-vay voo gar-day may bah-gahzh?" },
        "de-DE": { target: "Können Sie mein Gepäck aufbewahren?", phonetic: "Koen-nen zee mine geh-peck owf-beh-vah-ren?" },
        "it-IT": { target: "Potete custodire i miei bagagli?", phonetic: "Poh-tay-tay koos-toh-dee-ray ee myay bah-gah-lyee?" },
        "ja-JP": { target: "荷物を預かってもらえますか？", phonetic: "Nimotsu o azukatte moraemasu ka?" }
      }
    }
  ],

  "At the Airport": [
    {
      id: "airport_1",
      english: "Where is boarding gate...",
      translations: {
        "es-ES": { target: "¿Dónde está la puerta de embarque...?", phonetic: "Dohn-deh ehs-tah lah pwer-tah deh em-bar-keh...?" },
        "fr-FR": { target: "Où est la porte d'embarquement... ?", phonetic: "Oo eh lah port dahm-bark-mahn...?" },
        "de-DE": { target: "Wo ist das Gate...?", phonetic: "Voh eest dahs Gate...?" },
        "it-IT": { target: "Dov'è il gate d'imbarco...?", phonetic: "Doh-vay eel gate deem-bar-koh...?" },
        "ja-JP": { target: "搭乗ゲート...はどこですか？", phonetic: "Tōjō gēto ... wa doko desu ka?" }
      }
    },
    {
      id: "airport_2",
      english: "Here is my passport and boarding pass",
      translations: {
        "es-ES": { target: "Aquí está mi pasaporte y tarjeta de embarque", phonetic: "Ah-kee ehs-tah mee pah-sah-por-teh ee tar-heh-tah deh em-bar-keh" },
        "fr-FR": { target: "Voici mon passeport et ma carte d'embarquement", phonetic: "Vwah-see mohn pahs-por ay mah kart dahm-bark-mahn" },
        "de-DE": { target: "Hier ist mein Reisepass und meine Bordkarte", phonetic: "Heer eest mine ry-zeh-pass oond my-neh bort-kar-teh" },
        "it-IT": { target: "Ecco il mio passaporto e la carta d'imbarco", phonetic: "Ehk-koh eel mee-oh pass-ah-por-toh ay lah kar-tah deem-bar-koh" },
        "ja-JP": { target: "パスポートと搭乗券です", phonetic: "Pasupōto to tōjōken desu" }
      }
    },
    {
      id: "airport_3",
      english: "Where is baggage claim?",
      translations: {
        "es-ES": { target: "¿Dónde está el reclamo de equipaje?", phonetic: "Dohn-deh ehs-tah el reh-klah-moh deh eh-kee-pah-heh?" },
        "fr-FR": { target: "Où est la livraison des bagages ?", phonetic: "Oo eh lah lee-vray-zohn day bah-gahzh?" },
        "de-DE": { target: "Wo ist die Gepäckausgabe?", phonetic: "Voh eest dee geh-peck-ows-gah-beh?" },
        "it-IT": { target: "Dov'è il ritiro bagagli?", phonetic: "Doh-vay eel ree-tee-roh bah-gah-lyee?" },
        "ja-JP": { target: "手荷物受取所はどこですか？", phonetic: "Tenimotsu uketorijo wa doko desu ka?" }
      }
    }
  ],

  "Transportation": [
    {
      id: "transport_1",
      english: "Where is the train / bus station?",
      translations: {
        "es-ES": { target: "¿Dónde está la estación de tren / autobús?", phonetic: "Dohn-deh ehs-tah lah ehs-tah-syohn deh tren / ow-toh-boos?" },
        "fr-FR": { target: "Où est la gare / l'arrêt de bus ?", phonetic: "Oo eh lah gar / lah-reh deh boos?" },
        "de-DE": { target: "Wo ist der Bahnhof / die Bushaltestelle?", phonetic: "Voh eest dair bahn-hof / dee boos-hahl-teh-shtel-leh?" },
        "it-IT": { target: "Dov'è la stazione dei treni / dell'autobus?", phonetic: "Doh-vay lah stah-tsyoh-nay day tray-nee / del-low-toh-boos?" },
        "ja-JP": { target: "駅 / バス停はどこですか？", phonetic: "Eki / basutei wa doko desu ka?" }
      }
    },
    {
      id: "transport_2",
      english: "How much is a ticket to...?",
      translations: {
        "es-ES": { target: "¿Cuánto cuesta un boleto a...?", phonetic: "Kwan-toh kwes-tah oon boh-leh-toh ah...?" },
        "fr-FR": { target: "Combien coûte un billet pour... ?", phonetic: "Kohm-byen koot uhn bee-yeh poor...?" },
        "de-DE": { target: "Wie viel kostet eine Fahrkarte nach...?", phonetic: "Vee feel kos-tet eye-neh fahr-kar-teh nahkh...?" },
        "it-IT": { target: "Quanto costa un biglietto per...?", phonetic: "Kwan-toh kohs-tah oon beel-yeht-toh pair...?" },
        "ja-JP": { target: "...までの切符はおくらですか？", phonetic: "...made no kippu wa ikura desu ka?" }
      }
    },
    {
      id: "transport_3",
      english: "Please take me to this address",
      translations: {
        "es-ES": { target: "Por favor, lléveme a esta dirección", phonetic: "Por fah-bor, yeh-beh-meh ah es-tah dee-rek-syohn" },
        "fr-FR": { target: "Emmenez-moi à cette adresse, s'il vous plaît", phonetic: "Ohm-neh-nay mwah ah seht ah-drehs, seel voo pleh" },
        "de-DE": { target: "Bitte bringen Sie mich zu dieser Adresse", phonetic: "Bit-teh bring-en zee meekh tsoo dee-zer ah-drehs-seh" },
        "it-IT": { target: "Mi porti a questo indirizzo, per favore", phonetic: "Mee por-tee ah kways-toh een-dee-reet-soh, pair fah-voh-ray" },
        "ja-JP": { target: "この住所までお願いします", phonetic: "Kono jūsho made onegaishimasu" }
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
        "ja-JP": { target: "助けてください！", phonetic: "Tasukete kudasai!" }
      }
    },
    {
      id: "emergency_2",
      english: "Call an ambulance / police!",
      translations: {
        "es-ES": { target: "¡Llama a una ambulancia / la policía!", phonetic: "Yah-mah ah oo-nah am-boo-lan-syah / lah poh-lee-see-ah!" },
        "fr-FR": { target: "Appelez une ambulance / la police !", phonetic: "Ah-play ewn am-boo-lahns / lah poh-lees!" },
        "de-DE": { target: "Rufen Sie einen Krankenwagen / die Polizei!", phonetic: "Roo-fen zee eye-nen krahn-ken-vah-gen / dee poh-lee-tsy!" },
        "it-IT": { target: "Chiamate un'ambulanza / la polizia!", phonetic: "Kyah-mah-tay oon-am-boo-lahn-tsah / lah poh-leet-see-ah!" },
        "ja-JP": { target: "救急車 / 警察を呼んでください！", phonetic: "Kyūkyūsha / keisatsu o yonde kudasai!" }
      }
    },
    {
      id: "emergency_3",
      english: "I am lost",
      translations: {
        "es-ES": { target: "Estoy perdido/a", phonetic: "Es-toy per-dee-doh/dah" },
        "fr-FR": { target: "Je suis perdu(e)", phonetic: "Zhuh swee pehr-dew" },
        "de-DE": { target: "Ich habe mich verlaufen", phonetic: "Ikh hah-beh meekh fer-low-fen" },
        "it-IT": { target: "Mi sono perso/a", phonetic: "Mee soh-noh pair-soh/sah" },
        "ja-JP": { target: "道に迷いました", phonetic: "Michi ni mayoimashita" }
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
        const trans = item.translations[langCode] || { target: item.english, phonetic: '' };
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
    const trans = item.translations[langCode] || { target: item.english, phonetic: '' };
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
