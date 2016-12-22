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
    return solution.rows();
  } else if (n === 1) {
    solution.rows()[0][0] = 1;
    return solution.rows();
  } else if (n === 2 || n === 3) {
    return solution.rows();
  } else /*if (n % 2 === 0)*/ {
    // n == even


    var recurse = function () {
      solution = new Board({n: n});
      counter = 0;
      solution.rows()[currentRow][currentCol]++;
      counter++;

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {

          if (i === currentRow && j === currentCol) {
            continue;
            // counter++;
          }
          solution.rows()[i][j]++;
          if (solution.hasAnyQueensConflicts()) {
            solution.rows()[i][j]--;
          } else {
            counter++;
          }
        }
      }
      if (counter === n ) {
        return solution.rows();
      }

      if (counter < n) {
        currentCol++;
        if (currentCol === n) {
          currentCol = 0;
          currentRow++;
        }
        recurse();
      }
      
    };

    // call recursive function
    recurse();
  } 
  // will only work on odd and not divivisble by 3 
  // will speed up the program for those tests
  /*else if (n % 2 === 1) {
    console.log(n);
    // n = odd
    // start at [0,1] for odd n's
    // movement will be row + 1, col + 2
    var startRow = 0;
    var startCol = 1;
    var countRow = 1;
    var countCol = 2;
    //set the first queen
    solution.rows()[startRow][startCol] = 1;
    console.log('place first queen: ' + solution.rows());
    // loop through to set the position of the rest of the queens
    for (var i = 1; i < n; i++) {
      //set the new positions of the queens
      startRow = startRow + countRow;
      startCol = startCol + countCol;
      if (!solution._isInBounds(startRow, startCol)) {
        startCol = 0;
      }
      solution.rows()[startRow][startCol] = 1;
    }
    console.log(solution.rows());
  }*/


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solution = new Board({n: n});
  var counter = 0;
  var startingRow = 0;
  var startingCol = 0;
  var currentRow = 0;
  var currentCol = 0;
  var solutionCounter = 0;

  if (n === 0) {
    return 1;
  } else if (n === 1) {
    return 1;
    return solution.rows();
  } else if (n === 2 || n === 3) {
    return 0;
  } else /*if (n % 2 === 0)*/ {
    // n == even


    var recurse = function () {
      // console.log(n);
      solution = new Board({n: n});
      counter = 0;
      currentRow = startingRow;
      currentCol = startingCol;
      console.log('current R: ' + currentRow);
      console.log('current C: ' + currentCol);
      solution.rows()[currentRow][currentCol]++;
      counter++;

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {

          if (i === currentRow && j === currentCol) {
            continue;
            // counter++;
          }
          solution.rows()[i][j]++;
          if (solution.hasAnyQueensConflicts()) {
            solution.rows()[i][j]--;
          } else {
            counter++;
          }
        }
      }

      console.log(solution.rows());
      if (counter === n) {
        solutionCounter++;
        console.log('solution counter: ' + solutionCounter);



        // if solution is found, add to counter, 
        // reset state of the board, have new starting position, continue
      }

      if (currentCol < n && currentRow < n - 1 || counter < n) {
        // currentCol = 0;
        // currentRow = 0;
        startingCol++;
        if (startingCol === n) {
          startingCol = 0;
          startingRow++;
        }
        recurse();
      } /*else if (counter < n) {
        startingCol++;
        if (currentCol === n) {
          startingCol = 0;
          startingRow++;
        }
        recurse();
      }*/
      
    };





    // call recursive function
    recurse();
  } 
  console.log('Number of solutions for ' + n + ' queens:', solutionCounter);
  return solutionCounter;
};
