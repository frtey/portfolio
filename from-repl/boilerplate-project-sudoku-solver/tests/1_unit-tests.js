const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  test("Logic handles a valid puzzle string of 81 characters", () => {
    assert.equal(solver.validate("1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."), "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.")
  })

  test("Logic handles a puzzle string with invalid characters ", () => {
    assert.equal(solver.validate("1.5..2.84..63.12.7.2..5../..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."), "Invalid characters in puzzle")
  })

  test("Logic handles a puzzle string that is not 81 characters in length", () => {
    assert.equal(solver.validate("8.2.3674.3.7.2..9.47...8..1..16....926914.37."), "Expected puzzle to be 81 characters long")
  })

  let puzzleArray = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..".split("")
      
  let puzzleDblEntryArray = []
  let totalIndex = 0

  for (let i = 0; i < 9; i++) {
    puzzleDblEntryArray.push([])
    for (let j = 0; j < 9; j++) {
      puzzleDblEntryArray[i].push(puzzleArray[totalIndex])
      totalIndex++
    }
  }

  test("Logic handles a valid row placement", () => {
    assert.equal(solver.checkRowPlacement(puzzleDblEntryArray, 0, "2"), true)
  })

  test("Logic handles an invalid row placement", () => {
    assert.equal(solver.checkRowPlacement(puzzleDblEntryArray, 0, "9"), false)    
  })

  test("Logic handles a valid column placement", () => {
    assert.equal(solver.checkColumnPlacement(puzzleDblEntryArray, 0, "2"), true)
  })

  test("Logic handles a invalid column placement", () => {
    assert.equal(solver.checkColumnPlacement(puzzleDblEntryArray, 0, "1"), false)
  })

  test("Logic handles a valid region (3x3 grid) placement", () => {
    assert.equal(solver.checkRegionPlacement(puzzleDblEntryArray, 0, 0, "1"), true)
  })

  test("Logic handles a invalid region (3x3 grid) placement", () => {
    assert.equal(solver.checkRegionPlacement(puzzleDblEntryArray, 0, 0, "8"), false)
  })

  test("Valid puzzle strings pass the solver", () => {
    assert.equal(solver.solve("1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."), 
    "135762984946381257728459613694517832812936745357824196473298561581673429269145378")
  })

  test("Invalid puzzle strings fail the solver", () => {
    assert.equal(solver.solve("1.5..2.84..63.12.7.2..5../..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."), 
    "Invalid characters in puzzle")
  })

  test("Solver returns the expected solution for an incomplete puzzle", () => {
    assert.equal(solver.solve("1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."), 
    "135762984946381257728459613694517832812936745357824196473298561581673429269145378")    
  })
});
