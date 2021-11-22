const request = require("request");

class SentenceHandler {
  scrapeRandPage(wordType) {
    request(
      "http://tools.wmflabs.org/anagrimes/hasard.php?langue=fr",
        function (error, response, body) {
          console.log("body = ", body);
        // const regex = /span/;
        // // const regex = /<span>(Verbe)|(Nom commun)<\/span>/;
        //   const found = body.match(regex);
        // console.log(found);
      }
    );
  }

  getVerb() {
    this.scrapeRandPage("verb");
  }

  getCommonWord() {
    return this.scrapeRandPage("common");
  }

  getSentence() {
    let verb = this.getVerb();
    // let commonWord = getCommonWord();
  }
}

module.exports = SentenceHandler;
