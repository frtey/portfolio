function ConvertHandler() {
  
  this.getNum = function(input) {
    let regex = /[0-9./]+/;    
    let match = input.match(regex);

    if (/\//.test(match)) {
      let numberOfSlashes = match[0].match(/\//g).length
      return numberOfSlashes > 1 ? "invalid number" : eval(match[0])
    } else {
      return match ? match[0] : 1
    }
  };
  
  this.getUnit = function(input) {
    let validUnits = ["mi", "km", "gal", "L", "lbs", "kg"];
    let regex = /[a-zA-Z]+/;
    let match = input.match(regex)

    match = match ? match[0] : "invalid unit"    
    match = match === "L" || match === "l" ? match.toUpperCase() : match.toLowerCase();
    return validUnits.includes(match) ? match : "invalid unit"
  };
  
  this.getReturnUnit = function(initUnit) {
    let unitArray = ["mi", "km", "gal", "L", "lbs", "kg"];
    let index = unitArray.indexOf(initUnit);

    return index % 2 === 0 ? unitArray[index + 1] : unitArray[index - 1];
  };

  this.spellOutUnit = function(unit) {
    let spelledOut = {
      km: "kilometres",
      mi: "miles",
      L: "litres",
      gal: "gallons",
      kg: "kilogrammes",
      lbs: "pounds"
    }
    
    return spelledOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    switch (initUnit) {
      case "km":
        return Math.floor(initNum * 0.621373 * 100000) / 100000
      case "mi":
        return Math.floor(initNum * 1.60934 * 100000) / 100000
      case "L":
        return Math.floor(initNum * 0.264172 * 100000) / 100000
      case "gal":
        return Math.floor(initNum * 3.78541 * 100000) / 100000
      case "kg":
        return Math.floor(initNum * 2.2046245 * 100000) / 100000
      case "lbs":
        return Math.floor(initNum * 0.453592 * 100000) / 100000
      case "default":
        return "Error: unknown unit"
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + " " + this.spellOutUnit(initUnit) + " = " + returnNum + " " + this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
