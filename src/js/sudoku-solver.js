class SudokuSolver {

  validate(puzzleString) {
    let regex = /[0-9.]{81}/g;
    
    if (regex.test(puzzleString) && puzzleString.length === 81) {
      return puzzleString
    } else if (!regex.test(puzzleString) && puzzleString.length === 0) {
      return "Required field missing"
    } else if (puzzleString.length != 81) {
      return "Expected puzzle to be 81 characters long"
    } else {
      return "Invalid characters in puzzle"
    }
  }

  checkRowPlacement(puzzleArray, row, value) {
    for (let j = 0; j < 9; j++)
      if (puzzleArray[row][j] === value)
          return false;

    return true;
  }

  checkColumnPlacement(puzzleArray, column, value) {  
    for (let i=0; i < 9; i++)
      if (puzzleArray[i][column] === value)
          return false;
    return true;
  }

  checkRegionPlacement(puzzleArray, row, column, value) {
    let i = row - (row % 3);
    let j = column - (column % 3);

    for (row = i; row < i + 3; row++)
      for (column = j; column < j + 3; column++)
        if (puzzleArray[row][column] === value)
          return false;

    return true;
  }

  isOK(puzzleArray, position) {
    if (position === 81) {
      return true
    }

    let i = Math.floor(position / 9);
    let j = position % 9

    if (puzzleArray[i][j] != ".") {
        return this.isOK(puzzleArray, position + 1);
    }

    for (let k = 1; k <= 9; k++) {
      if (this.checkRowPlacement(puzzleArray, i, k.toString()) && this.checkColumnPlacement(puzzleArray, j, k.toString()) && this.checkRegionPlacement(puzzleArray, i, j, k.toString())) {
        puzzleArray[i][j] = k.toString()

        if (this.isOK(puzzleArray, position + 1)) {
          return puzzleArray
          //return true
        }
      }
    }

    puzzleArray[i][j] = "."
    return false
  }

  canBeResolved(puzzleArray) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzleArray[i][j] != ".") {
          let value = puzzleArray[i][j];
          puzzleArray[i][j] = "."

          if (
            !this.checkRowPlacement(puzzleArray, i, value) || !this.checkColumnPlacement(puzzleArray, j, value) ||!this.checkRegionPlacement(puzzleArray, i, j, value)
          ) {
            return "Puzzle cannot be solved"
          }
          
          puzzleArray[i][j] = value
        }
      }
    }
    return true
  }

  solve(puzzleString) {
    const validation = this.validate(puzzleString)
    if (validation != "Expected puzzle to be 81 characters long" && validation != "Invalid characters in puzzle" && validation != "Required field missing") {
      let puzzleArray = puzzleString.split("")
      
      let puzzleDblEntryArray = []
      let totalIndex = 0

      for (let i = 0; i < 9; i++) {
        puzzleDblEntryArray.push([])
        for (let j = 0; j < 9; j++) {
          puzzleDblEntryArray[i].push(puzzleArray[totalIndex])
          totalIndex++
        }
      }

      const canBeResolved = this.canBeResolved(puzzleDblEntryArray)
      if (canBeResolved === "Puzzle cannot be solved") {
        return canBeResolved
      } else {
        let finalArray = this.isOK(puzzleDblEntryArray, 0)
        let finalString = finalArray.join(",").split(",").join("")
        return finalString
      }      
    } else {
      return validation
    }    
  }

  validateCoord(coordinate) {
    const regex = /[a-iA-I][1-9]/

    if (regex.test(coordinate) && coordinate.length === 2) {
      coordinate = coordinate.toUpperCase()
      return coordinate
    } else {
      return "Invalid coordinate"
    }
  }

  validateValue(value) {
    const regex = /^[1-9]$/

    if (regex.test(value)) {
      return value
    } else {
      return "Invalid value"
    }
  }

  check(puzzleString, coordinate, value) {
    const validation = this.validate(puzzleString)

    if (validation != "Expected puzzle to be 81 characters long" && validation != "Invalid characters in puzzle" && validation != "Required field missing") {
      coordinate = this.validateCoord(coordinate)

      if (coordinate != "Invalid coordinate") {
        value = this.validateValue(value)

        if (value != "Invalid value") {          
          let conflict = []
          let valid = true
          let puzzleArray = puzzleString.split("")
        
          let puzzleDblEntryArray = []
          let totalIndex = 0

          for (let i = 0; i < 9; i++) {
            puzzleDblEntryArray.push([])
            for (let j = 0; j < 9; j++) {
              puzzleDblEntryArray[i].push(puzzleArray[totalIndex])
              totalIndex++
            }
          }

          if (puzzleDblEntryArray[coordinate.charCodeAt(0) - 65][coordinate[1] - 1] != ".") {
            puzzleDblEntryArray[coordinate.charCodeAt(0) - 65][coordinate[1] - 1] = "."
          }

          if (!this.checkRowPlacement(puzzleDblEntryArray, coordinate.charCodeAt(0) - 65, value)) { 
            conflict.push("row"); 
            valid = false 
          }
          if (!this.checkColumnPlacement(puzzleDblEntryArray, coordinate[1] - 1, value)) { 
            conflict.push("column"); 
            valid = false 
          }
          if (!this.checkRegionPlacement(puzzleDblEntryArray, coordinate.charCodeAt(0) - 65, coordinate[1] - 1, value)) { 
            conflict.push("region"); 
            valid = false 
          }

          if (valid) {
            return { valid }
          } else {
            return { valid, conflict }
          }
        } else {
          return { error: value }
        }        

      } else {
        return { error: coordinate }
      }
     } else {
       return { error: validation }
     }

  }
}

module.exports = SudokuSolver;

