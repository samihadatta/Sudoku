// SUDOKU LAB JAVASCRIPT FILE
//---GLOBAL VARIABLES---
// miscellaneous
var boardDimension = 9; // number of cells in one side of board (not necessary in this case but used to allow some methods to adapt to other board sizes)
var mode = "classic"; // defines mode of game play, which is either classic or liveCheck. default: classic.
var aColor = "#bce3fc"; // background color of cells in group A (for styling purposes)
var bColor = "#e0cdb8"; // background color of cells in group B (for styling purposes)
var numFilledInNumbers = 30; // number of filled-in numbers provided in each randomly generated sudoku board
// timer variables
var stopwatch; // used to set interval for timer
var timerStringDefault="0:00"; // default display for timer
var timer = { // timer object
  startTime:0, // system time of timer when timer starts running
  on:false, // boolean to determine whether or not the timer is on
  running:true, // boolean to determine whether or not the timer is running (different from on in the sense that if a timer is paused, it will be on but not running)
  totalTime:0,  // total time taken to solve puzzle
  pauseStart:0  // number of seconds of stopwatch/timer at which the timer was paused; used in pausing/resuming timer
};
// game info/statistics variables (generally)
var numHints = 0; // number of hints asked for in the current puzzle (by cell)
var numChecks = 0; // number of times the current puzzle was checked
var hintButtonHasBeenClicked = false; // whether or not a hint has been asked for in this run of the program
var liveCheckingUsed = false; // whether or not live checking has been used in this current sudoku game
// puzzle information variables!
var puzzleSolved = false; // whether or not the puzzle has been solved (use to stop buttons with the potential to impact the board from doing so when the puzzle is already solved)
var currentPuzzle; // stores the current randomly-generated puzzle
var currentPuzzleSolution; // stores the solution to the current randomly-generated puzzle
var currentBoard; // stores the current board (a la the getCurrentBoard method), including input values, when necessary (for example, during game play pauses)

//---SETUP---

function setup() {
  // sets up the sudoku board for the first time by calling functions to generate a
  //  new puzzle and set the mode to classic.

	// boardNum = 0; // set intial puzzle number
	newPuzzle(); // render the puzzle

	/* FOR TESTING PURPOSES */
	// var el = document.getElementById("00"); // get top right box
	// var child = el.children[0]; // get child of the div, which will either be SPAN or INPUT
	// var value = "0";
	// if(child.tagName === 'INPUT') {
	// 	value = child.value;
	// 	if (("" + value).length == 0) { // empty values on the board are treated
	// 									// as empty strings. check for that case
	// 		value = 0;
	// 	} else { // if there isn't an empty string, there is input from the user.
	// 			 // parse this input value as an int
	// 		value = parseInt(value);
	// 	}
	// } else if(child.tagName == 'SPAN') {
	// 	value = parseInt(child.textContent);
	// }
	setModeToClassic();
}

//---MR. BLECKEL'S PUZZLE STUFF---

var boardNum;// global variable
var puzzle1 = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
var puzzle2 = [
  [1, 6, 0, 0, 0, 3, 0, 0, 0],
  [2, 0, 0, 7, 0, 6, 0, 1, 4],
  [0, 4, 5, 0, 8, 1, 0, 0, 7],
  [5, 0, 8, 4, 0, 0, 0, 0, 0],
  [0, 0, 4, 3, 0, 8, 9, 0, 0],
  [0, 0, 0, 0, 0, 7, 2, 0, 8],
  [8, 0, 0, 6, 3, 0, 1, 9, 0],
  [6, 3, 0, 1, 0, 5, 0, 0, 2],
  [0, 0, 0, 8, 0, 0, 0, 3, 6]
];
var puzzle3 = [
  [8, 1, 0, 0, 2, 9, 0, 0, 0],
  [4, 0, 6, 0, 7, 3, 0, 5, 1],
  [0, 7, 0, 0, 0, 0, 8, 0, 2],
  [0, 0, 4, 5, 0, 0, 0, 0, 6],
  [7, 6, 0, 0, 0, 0, 0, 1, 3],
  [1, 0, 0, 0, 0, 6, 2, 0, 0],
  [2, 0, 7, 0, 0, 0, 0, 8, 0],
  [6, 9, 0, 2, 8, 0, 3, 0, 5],
  [0, 0, 0, 9, 6, 0, 0, 2, 4]
];
var puzzle4 = [
  [0, 0, 3, 0, 0, 8, 0, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 0, 3, 5, 0, 9, 0, 0],
  [8, 0, 5, 0, 0, 6, 0, 0, 0],
  [1, 0, 0, 7, 3, 2, 0, 0, 8],
  [0, 0, 0, 8, 0, 0, 3, 0, 1],
  [0, 0, 8, 0, 1, 4, 0, 7, 0],
  [0, 0, 0, 0, 0, 0, 0, 5, 0],
  [0, 0, 0, 9, 0, 0, 2, 0, 0]
];
var puzzle5 = [
  [0, 8, 3, 7, 0, 0, 0, 9, 0],
  [0, 0, 7, 0, 5, 0, 6, 4, 0],
  [0, 0, 0, 9, 0, 0, 0, 0, 3],
  [0, 0, 0, 1, 0, 0, 0, 0, 7],
  [0, 6, 9, 2, 0, 4, 3, 8, 0],
  [7, 0, 0, 0, 0, 9, 0, 0, 0],
  [9, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 5, 6, 0, 2, 0, 4, 0, 0],
  [0, 1, 0, 0, 0, 7, 5, 3, 0]
];
boards = [puzzle1, puzzle2, puzzle3, puzzle4, puzzle5];

//---RENDER BOARD AND A HELPER FUNCTION---

function renderBoard(board, inputIds = [], inputValues = []) {
	// function to render the input board with all non-zero values as span elements
  //  and the input values at the input ids (which correspond in index in their
  //  respective arrays) as editable input values.

	for(var i = 0; i < 9; i++) { // go through each row
		for(var j = 0; j < 9; j++) { // go through each column
			var id = "" + i + j; // cast to string
			var el = document.getElementById(id); // get div element
			var val = board[i][j]; // find value at row, column on the board
			var child;
			var elClass;

      if (inputIds.includes(id)) {
        child = document.createElement("input");
				child.setAttribute('maxlength', 1); // fixes the length of the input to 1 character
				child.addEventListener("input", input);
				elClass = "editValue";
        var idx = inputIds.indexOf(id);
        var value = inputValues[idx];
        child.setAttribute("value", value) //= value;
        child.contentEditable="true";
      }
			else if(val === 0) { // values on the board with 0 will be inputs for the user
				child = document.createElement("input");
				child.setAttribute('maxlength', 1); // fixes the length of the input to 1 character
				child.addEventListener("input", input);
				elClass = "editValue";
			}
      else { // other values are fixed using span tag. these are not editable
				child = document.createElement("span");
				child.textContent = val;
				elClass = "staticValue";
			}

			el.innerHTML = ""; // reset any previous html in this div
			el.setAttribute("class", elClass); // set the class for CSS purposes
			el.appendChild(child); // add new child into the div
		}
	}
}

function input() {
  // listener function for sudoku board cells. calls function to show incorrect cells
  //  if the live checking mode is selected.
	if (mode === "liveCheck") {
		showIncorrectCells(getCurrentBoard());
	}
}


//---PUZZLE CONTROL METHODS---
function newPuzzle() {
	// calls necessary functions to generate a new puzzle and sets global variables of
  //  currentPuzzle and currentPuzzleSolution accordingly. sets game-specific global
  //  variables to initial/factory settings and resets colors and timer.

  // ---Mr. Bleckel's code---
  // renderBoard(boards[boardNum%boards.length]);
  // currentPuzzle = boards[boardNum%boards.length];
  // boardNum++;
  //---end of Mr. Bleckel's code---

  puzzleSolved = false;
  numHints = 0;
  numChecks = 0;
  liveCheckingUsed = false;

  currentPuzzle = getNewPuzzle();
  stopTimer();
  renderBoard(getBlankBoard());
	currentPuzzleSolution = getDuplicatePuzzle(currentPuzzle);
	solve(currentPuzzleSolution,0,0);
  currentBoard = getDuplicatePuzzle(currentPuzzle);
  setModeToClassic();
  resetColorsToClassic();
  resetTimer();
}

function checkPuzzle() {
  // if the puzzle is being played, checks the puzzle to see if it's correct. if so,
  //  an alert provides game info/statistics and tells the user that the puzzle was
  //  solved correctly. otherwise, displays an alert saying so, highlights the
  //  incorrect spots, and provides information on the number of incorrect spots and
  //  the number of unfilled cells.

  if (timer.on == true && puzzleSolved == false) {

    pauseTimer();

  	if (puzzlesAreEqual(currentPuzzleSolution, currentBoard)) {
      stopTimer();
      var msg = "You solved the puzzle! \nNumber of hints: " + numHints;
      if (liveCheckingUsed == true) {
        msg += "\nLive checking was used.";
      }
      msg += "\nTime: " + timer.totalTime;
  		alert(msg);
      puzzleSolved = true;
  	} else {
  		var numIncorrect = showIncorrectCells(currentBoard);
      var numUnfilled = getNumberOfUnfilledSpots(currentBoard);
  		var msg = "You didn't solve the puzzle. :(\nYour incorrect cells are highlighted in red."
      if (numIncorrect > 0) {
        msg += "Your " + numIncorrect + " incorrect cells are highlighted in red."
      }
      if (numUnfilled > 0) {
  			msg += "\nLook out for your " + numUnfilled + " unfilled cells!";
  		}
  		alert(msg);
  	}
    resumeTimer();
  }

}

function solvePuzzle() {
	// renders the current puzzle solution (stored in global variable currentPuzzleSolution)
  //  and stops game play if the game is currently being played.
  if (timer.on == true) {
    renderBoard(currentPuzzleSolution);
    stopTimer();
    puzzleSolved = true;
  }
}


//---HELPER METHODS FOR CHECKPUZZLE AND LIVE CHECKING---

function getNumberOfUnfilledSpots(board) {
  // returns the number of unfilled spots (spots with 0 in them) in the input board
  var num = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        num ++;
      }
    }
  }
  return num;
}

function showIncorrectCells(board) {
  // displays the incorrect cells on the current board in red and all others in their
  //  classic/original color. returns the number of incorrect cells
	var incorrectIds = getIncorrectFilledSpots(board);
	for (var i = 0; i < currentPuzzle.length; i++) {
		for (var j = 0; j < currentPuzzle[i].length; j++) {
			var id = "" + i + j;
			var box = document.getElementById(id);
			if (incorrectIds.includes(id)) {
				box.style.background = "#d14e47";
			}
			else {
				box.style.background = getCellColor(id);
			}
		}
	}
	return incorrectIds.length;
}

function getIncorrectFilledSpots(board) {
  // returns a list of the ids of the spots that are filled in incorrectly
	var incorrectIds = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if (board[i][j] != currentPuzzleSolution[i][j] && board[i][j] != 0) {
				var id = "" + i + j;
				incorrectIds.push(id);
			}
		}
	}
	return incorrectIds;
}

//---GENERAL PUZZLE HELPER FUNCTIONS---
function getCurrentBoard() {
  // returns an array of arrays representing the board currently on display, including
  //  both input and span values.
	var board = getBlankBoard();
	for(var i = 0; i < 9; i++) { // go through each row
		for(var j = 0; j < 9; j++) { // go through each column
			var id = "" + i + j; // cast to string
			var el = document.getElementById(id); // get div element
			var child = el.children[0]; // get child of the div, which will either be SPAN or INPUT
			var value;
			if(child.tagName === 'INPUT') {
				value = child.value;
				if (("" + value).length == 0) { // empty values on the board are treated
												// as empty strings. check for that case
					value = 0;
				} else { // if there isn't an empty string, there is input from the user.
						 // parse this input value as an int
					value = parseInt(value);
				}
			} else if(child.tagName == 'SPAN') {
				value = parseInt(child.textContent);
			}
			board[i][j] = value;
		}
	}
	return board;
}

function getBlankBoard() {
  // returns a blank Sudoku board (array of arrays) filled with zeros of size
  //  boardDimension by boardDimension
	var board = [];
	for (var i = 0; i < boardDimension; i++)
	{
		var row = [];
		for (var j = 0; j < boardDimension; j++) {
			row.push(0);
		}
		board.push(row);
	}
	return board;
}

function puzzlesAreEqual(puzzle1, puzzle2) {
  // checks if the two input puzzles are equal by checking for equality for each
  // pair of corresponding values
	for (var i = 0; i < puzzle1.length; i++) {
		for (var j = 0; j < puzzle1[i].length; j++) {
			if (puzzle1[i][j] != puzzle2[i][j]) {
				return false;
			}
		}
	}
	return true;
}

function getDuplicatePuzzle(puzzle) {
  // returns a copy of the input puzzle
	var copy = getBlankBoard();
	for (var i = 0; i < puzzle.length; i++) {
		for (var j = 0; j < puzzle.length; j++) {
			copy[i][j] = puzzle[i][j];
		}
	}
	return copy;
}

//---FUNCTIONS INSTITUTING DIFFERENT GAME PLAY MODES AND HELPER FUNCTIONS---
function setModeToClassic() {
  // sets game play mode to classic. colors mode buttons accordingly and resets
  //  colors to their original ones.
	mode = "classic";
	document.getElementById("classicModeButton").style.background="#f9f77f";
	document.getElementById("liveCheckModeButton").style.background="#ffffff";

	resetColorsToClassic();
}

function resetColorsToClassic() {
  // sets colors of the board to the original ones
	var board = getCurrentBoard();
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			var id = "" + i + j;
			var box = document.getElementById(id);
			box.style.background = getCellColor(id);
		}
	}
}

function setModeToLiveCheck() {
  // sets mode to livecheck. colors mode buttons accordingly and shows the current
  //  incorrect cells. sets live checking boolean (used in checkPuzzle for game info)
  //  to true.
	mode = "liveCheck";
	document.getElementById("liveCheckModeButton").style.background="#f9f77f";
	document.getElementById("classicModeButton").style.background="#ffffff";
  if (puzzlesAreEqual(getCurrentBoard(), getBlankBoard()) == false) {
    showIncorrectCells(getCurrentBoard());
  }
  liveCheckingUsed = true;
}

function getCellGroup(id) {
	// receives a cell's id and returns whether it's in group A or group B (for coloring purposes)
	var row = parseInt(id[0]);
	var col = parseInt(id[1]);

	if ((checkUpLeft(row) && checkUpLeft(col)) || (checkUpLeft(row) && checkDownRight(col)) || (checkMiddle(row) && checkMiddle(col)) || (checkDownRight(row) && checkUpLeft(col)) || (checkDownRight(row) && checkDownRight(col))) {
		return "A";
	}
	else {
		return "B";
	}
}

function getCellColor(id) {
  // receives a cell's id and returns its color based on its group.
	var cellGroup = getCellGroup(id);
	if (cellGroup == "A") {
		return aColor;
	}
	else { // cellGroup == "B"
		return bColor;
	}
}

//---RESET BOARD METHOD---
function resetBoard() {
  // called when the "Reset board" button is clicked. resets the game board to the
  //  original puzzle, removing all input values
  if (timer.on == true) {
    renderBoard(currentPuzzle);
    resetColorsToClassic();
  }
}

//---HELPER FUNCTIONS FOR THE TIMER---
function hideBoard() {
  // hides the board and saves the current board in global variable currentBoard
  currentBoard = getCurrentBoard();
  renderBoard(getBlankBoard());
  resetColorsToClassic();
}

function showBoard() {
  // obtains information on the input spots which are filled and displays the
  //  board that was hidden. must be called in conjunction with hideBoard
  var editedSpotInfo = getInputInfo();
  var inputIds = editedSpotInfo[0];
  var inputVals = editedSpotInfo[1];
  renderBoard(currentPuzzle, inputIds, inputVals);
}

function startGame() {
  // called by "Start game" button. starts a game either in conjunction with a previous
  //  newPuzzle() call or induces a newPuzzle call and then starts the game. "starting a
  //  game" involves showing the board and starting the timer.
  if (puzzleSolved == false && timer.on == false) {
    showBoard();
    startTimer();
  }
  else {
    newPuzzle();
    showBoard();
    startTimer();
  }
}

// ---FUNCTIONS WRITTEN TO DIRECTLY MANAGE THE TIMER---
function startTimer() {
  // starts the timer by setting an interval that will update every second, setting
  //  the start time of the timer object, setting the timer status to on, and setting
  //  the timer to running. also displays the timer as its default string.
  timer.on = true;
  timer.running = true;
  timer.startTime = new Date().getTime();
  stopwatch = setInterval(updateTimer, 1000);
  document.getElementById("timerDisplay").innerHTML = timerStringDefault;
}

function updateTimer() {
  // updates the timer to display its current timer time (after obtaining this value)
  //  if the timer is running
  if (timer.running == true) {
    var timeElapsed = getCurrentTimerTime();
    var timeString = getTimeAsString(timeElapsed);
    document.getElementById("timerDisplay").innerHTML = timeString;
  }
}

function getTimeAsString(timeElapsed) {
  // returns a string representation of the input time elapsed. format: min:secs.
  var minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
  // converts a one-digit seconds value to a two-digit string
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var string = minutes + ":" + seconds;
  return string;
}

function pauseTimer() {
  // pauses the timer by setting the running value to false, hides the board, and
  //  stores the time at which the pause was initiated
  if (timer.running == true) {
    timer.running = false;
    hideBoard();
    timer.pauseStart = getCurrentTimerTime();
  }
}

function resumeTimer() {
  // resumes the timer by setting the running value to true, shows the board as it
  //  was before the pause, and adjusts the timer's startTime attribute so that the
  //  length of the pause is ignored in the timing
  if (timer.running == false && timer.on == true) {
    timer.running = true;
    var pauseLength = getCurrentTimerTime() - timer.pauseStart;
    timer.startTime += pauseLength;
    showBoard();
  }
}

function stopTimer() {
  // stops the timer by clearing the interval, setting timer attributes so that
  //  the object reflects that the timer is off and running, calculating the total
  //  time of game play, and setting the timer display to that total time.
  clearInterval(stopwatch);
  timer.on = false;
  timer.running = false;
  var totalTime = getCurrentTimerTime();
  totalTime = getTimeAsString(totalTime);
  timer.totalTime = totalTime;
  document.getElementById("timerDisplay").innerHTML = totalTime;
}

function resetTimer() {
  // resets the timer object so that all attributes have their initial/factory
  //  settings
  timer.startTime = 0;
  timer.on = false;
  timer.running = false;
  document.getElementById("timerDisplay").innerHTML = timerStringDefault;
}

function getCurrentTimerTime() {
  // returns the current timer time (i.e. the amount of time since the timer
  //  started running (with this time value stored in timer.startTime))
  var currentTime = new Date().getTime();
  var relativeTime = currentTime-timer.startTime;
  return relativeTime;
}

// ---FUNCTIONS WRITTEN FOR "GET HINT" BUTTON---
function getHintRequestIds() {
  // returns an array of the ids of all occurrences of "h" – which correspond to
  //  locations of requested hints — in currentBoard

  // stores ids of locations where hints were requested
  var hintIds = [];
  // checks all of currentBoard
  for (var i = 0; i < currentBoard.length; i++) {
    for (var j = 0; j < currentBoard.length; j++) {
      var id = "" + i + j; // cast to string
			var el = document.getElementById(id); // get div element
			var child = el.children[0]; // get child of the div, which will either be SPAN or INPUT
			var value = "0";
      // checks if the spot is an INPUT spot (as opposed to a SPAN one)
			if(child.tagName === 'INPUT') {
				value = child.value;
        // if the value is "h" (i.e. a hint has been requested for the spot), adds
        //  the id to the array of hint ids
        if (value === "h") {
          hintIds.push(id);
        }
      }
    }
  }
  // returns array of hint ids
  return hintIds;
}

function getInputInfo() {
  // returns the ids of spots that had input values in currentBoard, along with
  //  their values

  // arrays to store the collected information
  var editValIds = [];
  var inputVals = [];

  // checks every spot in board
  for (var i = 0; i < currentBoard.length; i++) {
    for (var j = 0; j < currentBoard[i].length; j++) {
      var id = "" + i + j;
      var currVal = currentBoard[i][j];
      // if a currentBoard value isn't zero when the currentPuzzle value for the
      //  same spot is and the currentBoard value isn't "h" or not a number, records
      //  the spot's id and the value of the spot
      if (currVal != 0 && currentPuzzle[i][j] == 0 && currVal != "h" && Number.isNaN(currVal) == false) {
        editValIds.push(id);
        inputVals.push(currVal);
      }
    }
  }
  // returns an array of the edited value spot ids and the input values, where the
  //  index of an id in the id array is the same as the index of the corresponding
  //  value in the value array
  return [editValIds,inputVals];
}


function getHint() {
  // called by "getHint" button; provides an alert if it's the first hint since
  //  the beginning of this program's run. else, adds correct values for all spots
  //  with the letter "h" in them to the set puzzle

  // check to make sure this method only works if the timer is running/the puzzle
  //  is in play.
  if (timer.on == true && timer.running == true ) {
    // provides instructions if this is the first time the button has been clicked
    //  in the run
    if (hintButtonHasBeenClicked == false) {
      alert("Enter 'h' into the spot(s) for which you'd like to get a hint of the correct value!")
      hintButtonHasBeenClicked = true;
    }
    else {
      // saves the current board
      currentBoard = getCurrentBoard();

      // stores the locations of hint requests
      var hintIds = getHintRequestIds();

      if (hintIds.length > 0) {
        // stores the information of edited spots
        var editedSpotInfo = getInputInfo();
        var inputIds = editedSpotInfo[0];
        var inputVals = editedSpotInfo[1];

        // increments the number of hints used in the puzzle
        numHints += hintIds.length;

        // for each hint location, sets that spot in the current puzzle to its
        //  correct fixed value
        for (var i = 0; i < hintIds.length; i++)
        {
          var hintId = hintIds[i];
          var row = parseInt(hintId[0]);
          var col = parseInt(hintId[1]);
          var correctValue = currentPuzzleSolution[row][col];
          currentPuzzle[row][col] = correctValue;
          // reset color of that cell back to classic
          var box = document.getElementById(hintId);
          box.style.background = getCellColor(hintId);
        }

        // renders the board complete with input values
        renderBoard(currentPuzzle, inputIds, inputVals);
      }
    }
  }
}


// ---RANDOM BOARD GENERATION METHODS---
function getNewPuzzle() {
  // Returns a random puzzle with one solution
	var works = false;
	var board;
  // loops until a board with a unique solution is found
	while (works == false) {
		board = getTrialBoard();
    // in the event that random numbers in a trial board don't allow a valid board
    //  to be generated, getTrialBoard returns false and this function will call
    //  the function and generate more random boards until one with the given number
    //  of valid filled-in values is generated.
		while (board == false) {
			board = getTrialBoard();
		}
    // if board has a unique solution, works = false and the board will be returned;
    //  else, continues generating more boards.
		works = checkIfRandomPuzzleWorks(board);
	}
	return board;
}

function checkIfRandomPuzzleWorks(board) {
  // Checks if the input board has more than 1 solution using the solve and
  //  solve2 methods. Returns true if the board has a unique solution and false
  //  if there is more than one solution.

  // gets solution and whether board can be solved using solve method
	var boardSolution = getDuplicatePuzzle(board);
	var firstSolExists = solve(boardSolution,0,0)
  // gets solution and whether board can be solved using solve2 method
	var boardSol2 = getDuplicatePuzzle(board);
	var secondSolExists = solve2(boardSol2,0,0);

  // boolean describing when solutions are equal (true => they are, false => they
  //  aren't)
	var puzzlesEqual = puzzlesAreEqual(boardSolution, boardSol2);

  // if the first and second solutions both exist and are equal, there's one unique
  //  solution to the puzzle => returns true; else, returns false.
  if (firstSolExists && secondSolExists && puzzlesEqual) {
    return true;
  }
  else {
    return false;
  }
}

function getTrialBoard() {
  // Returns the first step of a randomized Sudoku board (30 random numbers
  //  validly placed at random locations on a board).

  // arrays to keep track of randomly chosen filled positions
	var filledInPositionIds = [];

  // board
  var board = getBlankBoard();

  // generates global variable numFilledInNumbers random spot fillers at randomly
  //  generated locations
	for (var i = 0; i < numFilledInNumbers; i++) {
    // chooses random row/column
		var newRow = Math.floor(Math.random()*boardDimension);
		var newCol = Math.floor(Math.random()*boardDimension);
		var pos = "" + newRow + newCol;
    // ensures the position is not already filled in
		while (filledInPositionIds.includes(pos)) {
			newRow = Math.floor(Math.random()*(boardDimension));
			newCol = Math.floor(Math.random()*(boardDimension));
			pos = "" + newRow + newCol;
		}
    // attempts to fill the randomly generated spot with a random digit. if the
    //  10 random digits don't work, returns false, since the puzzle thus far
    //  may not have a solution. while an algorithm to backtrack could be written,
    //  this method in conjunction with the getNewPuzzle method seemed to work
    //  more efficiently.
		var numTries = 0;
    // generates filler digit
		var value = Math.floor(Math.random()*(boardDimension+1));
    // attempts to fill digit with a different randomly chosen digit
		while (isValid(board, newRow, newCol, value) == false) {
			if (numTries > 10) {
				return false;
			}
			value = Math.floor(Math.random()*(boardDimension+1));
			numTries ++;
		}
    // adds position to function's array of filled positions
		filledInPositionIds.push(pos);
    // sets spot in board to this value
		board[newRow][newCol] = value;
	}
	return board;
}

// --- SOLVE BOARD METHODS ---
function isValid(puzzle, row, column, number) {
    // Boolean function that determines if the given number can be placed in the
    //  given position (puzzle[row][column])

    // Check if number works in that column
    for (var r = 0; r < puzzle.length; r++) {
      if (puzzle[r][column] == number && r != row) {
          return false;
      }
    }

    // Check if number works in that row
    for (var c = 0; c < puzzle[row].length; c++) {
      if (puzzle[row][c] == number && c != column) {
        return false;
      }
    }

    // Figure out which sub grid [row, column] is in and check to see if number
    //  works in the sub grid
    // Sub grids have 3 categories for row (up, middle, right) and 3 categories
    //  for column (left, middle, right) to have 9 grids in to total up left sub
    //  grid
    // Up left subgrid
    if (checkUpLeft(row) && checkUpLeft(column)) {
      // Up left
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r][c] == number && row != r && column != c) {
            return false;
          }
        }
      }
      return true;
    }

    // Up middle subgrid
    if (checkUpLeft(row) && checkMiddle(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r][c+3] == number && row != r && column != c+3) {
            return false;
          }
        }
      }
      return true;
    }

    // Up right subgrid
    if (checkUpLeft(row) && checkDownRight(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r][c+6] == number && row != r && column != c+6) {
            return false;
          }
        }
      }
      return true;
    }

    // Middle left subgrid
    if (checkMiddle(row) && checkUpLeft(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r+3][c] == number && row != r+3 && column != c) {
            return false;
          }
        }
      }
      return true;
    }

    // Center subgrid
    if (checkMiddle(row) && checkMiddle(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r+3][c+3] == number && row != r+3 && column != c+3) {
            return false;
          }
        }
      }
      return true;
    }

    // Middle right subgrid
    if (checkMiddle(row) && checkDownRight(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r+3][c+6] == number && row != r+3 && column != c+6) {
            return false;
          }
        }
      }
      return true;
    }

    // Down left subgrid
    if (checkDownRight(row) && checkUpLeft(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r+6][c] == number && row != r+6 && column != c) {
            return false;
          }
        }
      }
      return true;
    }

    // Down middle subgrid
    if (checkDownRight(row) && checkMiddle(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r+6][c+3] == number && row != r+6 && column != c+3) {
            return false;
          }
        }
      }
      return true;
    }

    // Down right subgrid
    if (checkDownRight(row) && checkDownRight(column)) {
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (puzzle[r+6][c+6] == number && row != r+6 && column != c+6) {
            return false;
          }
        }
      }
      return true;
    }
}

// Methods to check which sub-square the checked spot is in.
function checkUpLeft(index) {
  // returns True if the index is in the upper (row) or the left (column) third
  //  of the puzzle and false otherwise
  if (index < 3 && index >= 0) {
    return true;
  }
  else {
    return false;
  }
}

function checkMiddle(index) {
  // returns True if the index is in the middle third (for both row and column)
  //  of the puzzle and false otherwise
  if (index > 2 && index < 6) {
    return true;
  }
  else {
    return false;
  }
}

function checkDownRight(index) {
  // returns True if the index is in the lower (row) or the right (column) third
  //  of the puzzle and false otherwise
  if (index > 5 && index < 9) {
    return true;
  }
  else {
    return false;
  }
}

// Solve method
function solve(puzzle, row, column) {
  // Function that should be recursively called to solve the sudoku puzzle.
  // This function should return a boolean that says whether the puzzle can be
  // solved using the current configuration
  // This solve function traverses the puzzle from top left to bottom right,
  //  each row from left to right. The function attempts numbers in the order of
  //  1-9.

  // Check if a spot is already filled in
  if (puzzle[row][column] != 0) {
    if (column == 8 && row == 8) {
      // if reached end of puzzle, returns true
      return true;
    }
    else if (column == 8) {
      // if column = 8, go back to row + 1 and 0 (wraps around to next row at end of a row)
			return solve(puzzle, row+1, 0);
    }
    else {
      // checks next spot if not at end of row/puzzle
      return solve(puzzle,row,column+1);
    }
  }
  else { // start with first instance of zero; keep going til you hit a zero
    var solved = null;
    // if value works, sets row, column = value and then recursively goes through remainder of puzzle
    // if value causes problems later on, will check if the puzzle works for other values (1-9)
    for (var i = 1; i < 10; i++) {
      // in the event that the number is valid at the input row and column:
      if (isValid(puzzle, row, column, i)) {
        puzzle[row][column] = i;
        // if at bottom right corner, returns true
        if (column == 8 && row == 8) {
          return true;
        }
        // if at end of row, moves to next one
        else if (column == 8)  {
          solved = solve(puzzle,row+1,0);
        }
        // else moves to the next column
        else {
          solved = solve(puzzle,row,column+1);
        }
      }
		}

      // returns True with puzzle solved if the puzzle can be solved and False with puzzle unsolved otherwise
      // if puzzle doesn't work, sets the spot where it's caught (as not working) equal to zero and returns false to go
      //    back up a level
      if (solved != true) {
        puzzle[row][column] = 0;
        return false;
      }
      else {
        return true;
      }

  }
}


function solve2(puzzle, row, column) {
  // Function that should be recursively called to solve the sudoku puzzle.
  // This function should return a boolean that says whether the puzzle can be
  // solved using the current configuration
  // This solve method was created explicitly for the process of generating unique
  //  random puzzles. While the first solve method checks numbers going from 1-9,
  //  this one checks values from 9-1, which means it will generate a different
  //  solution from the first algorithm if there is an alternative solution.

  // Check if a spot is already filled in
  if (puzzle[row][column] != 0) {
    if (column == 8 && row == 8) {
      // if reached end of puzzle, returns true
      return true;
    }
    else if (column == 8) {
      // if column = 8, go back to row + 1 and 0 (wraps around to next row at end of a row)
			return solve2(puzzle, row+1, 0);
    }
    else {
      // checks next spot if not at end of row/puzzle
      return solve2(puzzle,row,column+1);
    }
  }
  else { // start with first instance of zero; keep going til you hit a zero
    var solved = null;
    // if value works, sets row, column = value and then recursively goes through remainder of puzzle
    // if value causes problems later on, will check if the puzzle works for other values (1-9)
    for (var i = 9; i > 0; i--) {
      // in the event that the number is valid at the input row and column:
      if (isValid(puzzle, row, column, i)) {
        puzzle[row][column] = i;
        // if at bottom right corner, returns true
        if (column == 8 && row == 8) {
          return true;
        }
        // if at end of row, moves to next one
        else if (column == 8)  {
          solved = solve2(puzzle,row+1,0);
        }
        // else moves to the next column
        else {
          solved = solve2(puzzle,row,column+1);
        }
      }
		}

      // returns True with puzzle solved if the puzzle can be solved and False with puzzle unsolved otherwise
      // if puzzle doesn't work, sets the spot where it's caught (as not working) equal to zero and returns false to go
      //    back up a level
      if (solved != true) {
        puzzle[row][column] = 0;
        return false;
      }
      else {
        return true;
      }

  }
}
