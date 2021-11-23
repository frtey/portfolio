const dico = require("./dictionnaire.js");

class SentenceHandler {
  getVerb() {
    let verbesDico = dico.Grimoire.verbes.intransitifs;
    verbesDico = [
      ...verbesDico,
      ...dico.Grimoire.verbes.transitifs,
      ...dico.Grimoire.verbes.modaux.simples,
      ...dico.Grimoire.verbes.modaux.suivisDeDE,
      ...dico.Grimoire.verbes.modaux.suivisDeA,
      ...dico.Grimoire.verbes.modaux.suivisDeA,
      ...dico.Grimoire.verbes.avecPreposition.codCoi,
      ...dico.Grimoire.verbes.avecPreposition.a,
      ...dico.Grimoire.verbes.avecPreposition.de,
      ...dico.Grimoire.verbes.avecPreposition.sur,
      ...dico.Grimoire.verbes.avecPreposition.avec2obj,
      ...dico.Grimoire.verbes.avecPreposition.et2obj,
      ...dico.Grimoire.verbes.avecPreposition.lieu,
    ];

    let verbe = verbesDico[Math.floor(Math.random() * verbesDico.length)];

    const regex = /[a-zâôéèê]+/;

    verbe = verbe.match(regex)[0];

    return verbe;
  }

  getCommonWord() {
    let wordDico = dico.Generateur.GN.nomsCommuns;

    wordDico = [
      ...wordDico,
      ...dico.Generateur.CO.nomsCommuns,
      ...dico.Generateur.CO.adjectifsPost,
    ];

    let word = wordDico[Math.floor(Math.random() * wordDico.length)];

    const regex = /[a-zâôéèê]+/;

    let genre = word.match(/[HF]/)[0];

    word = word.match(regex)[0];
    return {word, genre};
  }

  getSentence() {
    const VOYELLES = ["a", "e", "i", "o", "u", "y", "é", "è", "ê", "â", "ô", "h"];

    let verbePrefixe = "Se ";
    let verbe = this.getVerb();

    if (VOYELLES.includes(verbe[0])) {
      verbePrefixe = "S'";
    }

    let commonWordPrefixe = "le ";
    let commonWord = this.getCommonWord();

    if (VOYELLES.includes(commonWord.word[0])) {
      commonWordPrefixe = "l'";
    } else if (commonWord.genre == "F") {
      commonWordPrefixe = "la ";
    }

    let phrase = verbePrefixe + verbe + " " + commonWordPrefixe + commonWord.word + ".";
    
    return phrase;
  }
}

module.exports = SentenceHandler;
