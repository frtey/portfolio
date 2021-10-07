// 'use strict';

const SudokuSolver = require('../js/sudoku-solver.js');

const Translator = require('../js/translator.js');

const ConvertHandler = require('../js/convertHandler.js');


module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const solver = new SudokuSolver()
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        res.json({ error: "Required field(s) missing" })
      } else {
        let check = solver.check(req.body.puzzle, req.body.coordinate, req.body.value) 
        res.json(check)
      }      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) { res.json({ error: "Required field missing" }) }
      else {
        const solver = new SudokuSolver()
        const solvedString = solver.solve(req.body.puzzle)

        if (solvedString != "Expected puzzle to be 81 characters long" && solvedString != "Invalid characters in puzzle" && solvedString != "Required field missing" && solvedString != "Puzzle cannot be solved") {
          res.json({ solution: solvedString })
        } else {
          res.json({ error: solvedString })
        }
      }
      
    });    
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
		if (req.body.text === "") {
			res.json({ error: "No text to translate" })
		} else if (!req.body.text || !req.body.locale) {
			res.json({ error: "Required field(s) missing" })
		} else {
			let translatedText = translator.getTranslation(req.body.text, req.body.locale)
			if (translatedText.error) {
			res.json(translatedText)
			} else {
			res.json({ text: req.body.text, translation: translatedText })
			}        
		}      
    });

  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .post((req, res) => {
      let input = req.body.text;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      if (initUnit === "invalid unit" && initNum === "invalid number") {
        res.json({ error: "invalid number and unit" })
      } else if (initUnit === "invalid unit") {
        res.json({ error: "invalid unit" })
      } else if (initNum === "invalid number") {
        res.json({ error: "invalid number" })
      }
      else {
        res.json({ initNum: parseFloat(initNum), initUnit, returnNum: parseFloat(returnNum), returnUnit, string: toString });
      }


    });
};