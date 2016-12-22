/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  // console.log(solution.rows());
  for (var i = 0; i < n; i++) {
    solution.rows()[i][i]++;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // n factorial
  var solutionCount = 1; //fixme
  for (var i = 1; i < n + 1; i++) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var counter = 0;
  var currentRow = 0;
  var currentCol = 0;
  if (n === 0) {
    return [];
  }
  var recurse = function () {
    solution = new Board({n: n});
    
    counter = 0;
    //set the starting queen
    solution.rows()[currentRow][currentRow]++;

    // place all queens
    for (var i = 0; i < solution.rows().length; i++) {
      for (var j = 0; i < solution.rows().length; j++) {
        solution.rows()[i][j]++;
        if (solution.hasAnyRowConflicts() || solution.hasAnyColConflicts() || solution.hasAnyMajorDiagonalConflicts() || solution.hasAnyMinorDiagonalConflicts()) {
          solution.rows()[i][j]--;
        } else {
          counter++;
        }
      }
    }
    // check if n queens have been placed
    if (counter < n) {
      // solution = new Board({n: n});
      // counter = 0;
      currentCol++;
      if (currentCol === n - 1) {
        currentRow++;
        currentCol = 0;
      }
      return recurse();
    } else if (counter === n ) {
      return solution.rows();
    }
  };

  //solution = recurse(currentRow, currentCol);

  recurse();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
