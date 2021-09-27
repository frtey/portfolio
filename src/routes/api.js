'use strict';

const SudokuSolver = require('../js/sudoku-solver.js');

module.exports = function (app) {
  
  // let solver = new SudokuSolver();

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
};
