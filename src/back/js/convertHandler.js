function ConvertHandler() {
  this.getNum = function (input) {
    let regex = /[0-9./]+/;
    let match = input.match(regex);

    if (/\//.test(match)) {
      let numberOfSlashes = match[0].match(/\//g).length;
      return numberOfSlashes > 1 || match[0][0] === "/"
        ? "invalid number"
        : eval(match[0]);
    } else {
      return match ? match[0] : 1;
    }
  };

  this.getUnit = function (input) {
    let validUnits = ["mi", "km", "gal", "L", "lbs", "kg", "inch", "cm"];
    let regex = /[a-zA-Z]+/;
    let unit = input.match(regex);

    unit = unit ? unit[0] : "invalid unit";
    unit =
      unit === "L" || unit === "l"
        ? unit.toUpperCase()
        : unit.toLowerCase();
    return validUnits.includes(unit) ? unit : "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    let unitArray = ["mi", "km", "gal", "L", "lbs", "kg", "inch", "cm"];
    let index = unitArray.indexOf(initUnit);

    return index % 2 === 0 ? unitArray[index + 1] : unitArray[index - 1];
  };

  this.spellOutUnit = function (unit) {
    let spelledOut = {
      km: "kilometres",
      mi: "miles",
      L: "litres",
      gal: "gallons",
      kg: "kilogrammes",
      lbs: "pounds",
      inch: "inches",
      cm: "centimètres"
    };

    return spelledOut[unit];
  };

  this.convert = function (initNum, initUnit) {
    switch (initUnit) {
      case "km":
        return Math.floor(initNum * 0.621371 * 100000) / 100000;
      case "mi":
        return Math.floor(initNum * 1.60934 * 100000) / 100000;
      case "L":
        return Math.floor(initNum * 0.264172 * 100000) / 100000;
      case "gal":
        return Math.floor(initNum * 3.78541 * 100000) / 100000;
      case "kg":
        return Math.floor(initNum * 2.20462 * 100000) / 100000;
      case "lbs":
        return Math.floor(initNum * 0.453592 * 100000) / 100000;
      case "cm":
        return Math.floor(initNum * 0.393701 * 100000) / 100000;
      case "inch":
        return Math.floor(initNum * 2.54 * 100000) / 100000;
      case "default":
        return "Error: unknown unit";
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return (
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " = " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit)
    );
  };
}

module.exports = ConvertHandler;
