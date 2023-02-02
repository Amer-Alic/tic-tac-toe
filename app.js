(function () {
  let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let playerTurn = 1;
  let gameMode = "playerVplayer";

  const gridCells = document.querySelectorAll("[data-cell]");
  gridCells.forEach((gridCell, index) => {
    gridCell.addEventListener("click", () => {
      addMark(index);
      checkWinner();
    });
  });

  function addMark(index) {
    let col = index % 3;
    let row = (index - col) / 3;
    // check if square is already filled
    if (gameBoard[row][col] === -1 || gameBoard[row][col] === 1) return;
    // check if player one should play
    if (playerTurn % 2 !== 0) {
      // change gameBoard
      gameBoard[row][col] = -1;
      playerTurn++;
      updateCell(index);
      // check if player two should play
    } else if (playerTurn % 2 === 0 && gameMode === "playerVplayer") {
      // change gameBoard
      gameBoard[row][col] = 1;
      playerTurn++;
      updateCell(index);
    }
  }

  // updates grid display
  function updateCell(index) {
    if (playerTurn % 2 !== 0) {
      gridCells[index].classList.add("O");
    }
    if (playerTurn % 2 === 0) {
      gridCells[index].classList.add("X");
    }
  }

  function disableGrid() {
    gridCells.forEach((gridCell) => {
      gridCell.style.pointerEvents = "none";
    });
  }

  function enableGrid() {
    gridCells.forEach((gridCell) => {
      gridCell.style.pointerEvents = "auto";
    });
  }

  function clearGrid() {
    gridCells.forEach((gridCell) => {
      gridCell.className = "";
    });
  }

  function reset() {
    gameBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    clearGrid();
    enableGrid();
    playerTurn = 1;
  }

  function announceWinner(value) {
    if (value === 1) {
      alert("BLUE WON");
    } else if (value === -1) {
      alert("RED WON");
    } else {
      alert("DRAW");
    }
    disableGrid();
    reset();
  }

  function checkWinner() {
    const WINNING_VALUES = [1, -1];
    for (let value of WINNING_VALUES) {
      // check rows
      for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === value && gameBoard[i][1] === value && gameBoard[i][2] === value) {
          announceWinner(value);
        }
      }

      // check columns
      for (let j = 0; j < 3; j++) {
        if (gameBoard[0][j] === value && gameBoard[1][j] === value && gameBoard[2][j] === value) {
          announceWinner(value);
        }
      }

      // check 2 diagonals
      if (gameBoard[0][0] === value && gameBoard[1][1] === value && gameBoard[2][2] === value) {
        announceWinner(value);
      }

      if (gameBoard[0][2] === value && gameBoard[1][1] === value && gameBoard[2][0] === value) {
        announceWinner(value);
      }

      // check for a draw
      if (playerTurn === 10) {
        announceWinner(null);
      }
    }
  }

  const resetButton = document.querySelector("[data-reset]");
  resetButton.addEventListener("click", reset);
})();
