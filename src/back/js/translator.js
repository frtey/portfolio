const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  formatText(text) {
    let textArray = text.split("")
	if (textArray[textArray.length - 1] === "." || textArray[textArray.length - 1] === "!" || textArray[textArray.length - 1] === "?") {
    	textArray[textArray.length - 1] = " "
	} else {
		textArray.push(" ")
	}
    textArray.unshift(" ")
    return textArray.join("")    
  }

  reformatText(text, originalText) {
    let formattedArray = text.split("")
    formattedArray.pop()
    formattedArray.shift()
    if (originalText[originalText.length - 1] === "?") {
      formattedArray.push("?")
    } else if (originalText[originalText.length - 1] === "!") {
      formattedArray.push("!")
    } else {
      formattedArray.push(".")
    }

    return formattedArray.join("")
  }

  getTranslation(text, locale) {
    let formattedText = this.formatText(text)
    let wordsToTranslate = []
    
    if (locale === "british-to-american") {
      //BRITISH ONLY
      Object.keys(britishOnly).forEach(word => {
        let regex = new RegExp(" " + word + " ", "gi")
        if (regex.test(formattedText)) {
          let originalWord = formattedText.match(regex)
          wordsToTranslate.push({ original: originalWord[0], translation: britishOnly[word] })
        }
      })

      //BRITISH -> AMERICAN TITLES
      Object.keys(americanToBritishTitles).forEach(word => {
        let regex = new RegExp(" " + americanToBritishTitles[word] + " ", "gi")
        if (regex.test(formattedText)) {
          let originalWord = formattedText.match(regex)
          wordsToTranslate.push({ original: originalWord[0], translation: word })
        }
      })

      //BRITISH -> AMERICAN SPELLING
      Object.keys(americanToBritishSpelling).forEach(word => {
        let regex = new RegExp(" " + americanToBritishSpelling[word] + " ", "gi")
        if (regex.test(formattedText)) {
          let originalWord = formattedText.match(regex)
          wordsToTranslate.push({ original: originalWord[0], translation: word })
        }
      })

      const timeRegex = / [0-9]+\.[0-9]+ /g
      let hourString = formattedText.match(timeRegex)
      if (hourString) {
        hourString = hourString[0].split("")
        hourString.pop()
        hourString.shift()
        hourString = hourString.join("")
        wordsToTranslate.push({ original: " " + hourString + " ", translation: hourString.replace(".", ":") })
      }

      wordsToTranslate.forEach(word => {
        formattedText = formattedText.replace(word.original, ' <span class="highlight">' + word.translation + '</span> ')
      })
      
      let finalText = this.reformatText(formattedText, text)
      if (finalText === text) {
        return "Everything looks good to me!"
      } else {
        return finalText
      }
    } else if (locale === "american-to-british") {
      //AMERICAN ONLY
      Object.keys(americanOnly).forEach(word => {
        let regex = new RegExp(" " + word + " ", "gi")
        if (regex.test(formattedText)) {
          let originalWord = formattedText.match(regex)
          wordsToTranslate.push({ original: originalWord[0], translation: americanOnly[word] })
        }
      })

      //AMERICAN -> BRITISH TITLES
      Object.keys(americanToBritishTitles).forEach(word => {
        let regex = new RegExp(" " + word + " ", "gi")
        if (regex.test(formattedText)) {
          let originalWord = formattedText.match(regex)
          wordsToTranslate.push({ original: originalWord[0], translation: americanToBritishTitles[word] })
        }
      })

      //AMERICAN -> BRITISH SPELLING
      Object.keys(americanToBritishSpelling).forEach(word => {
        let regex = new RegExp(" " + word + " ", "gi")
        if (regex.test(formattedText)) {
          let originalWord = formattedText.match(regex)
          wordsToTranslate.push({ original: originalWord[0], translation: americanToBritishSpelling[word] })
        }
      })

      const timeRegex = / [0-9]+\:[0-9]+ /g
      let hourString = formattedText.match(timeRegex)
      if (hourString) {
        hourString = hourString[0].split("")
        hourString.pop()
        hourString.shift()
        hourString = hourString.join("")
        wordsToTranslate.push({ original: " " + hourString + " ", translation: hourString.replace(":", ".") })
      }

      wordsToTranslate.forEach(word => {
        formattedText = formattedText.replace(word.original, ' <span class="highlight">' + word.translation + '</span> ')
      })
      
      let finalText = this.reformatText(formattedText, text)
      if (finalText === text) {
        return "Everything looks good to me!"
      } else {
        return finalText
      }
    } else {
      return { error: "Invalid value for locale field" }
    }
  }
}

module.exports = Translator;

