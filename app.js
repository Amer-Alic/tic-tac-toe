(function () {
  let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let playerTurn = 1;
  let gameMode = "playerVsAi";

  const gridCells = document.querySelectorAll("[data-cell]");
  gridCells.forEach((gridCell, index) => {
    gridCell.addEventListener("click", () => {
      addMark(index);
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
      if (gameMode === "playerVsAi") setTimeout(aiPlay, 200);
      // check if player two should play
    } else if (playerTurn % 2 === 0 && gameMode === "playerVsPlayer") {
      // change gameBoard
      gameBoard[row][col] = 1;
      playerTurn++;
      updateCell(index);
    }
    announceWinner(checkWinner());
  }

  function aiPlay() {
    let bestScore = -Infinity;
    let bestMove;
    let index;

    if (playerTurn === 10) return;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[i][j] === 0) {
          gameBoard[i][j] = 1;
          let score = minimax(gameBoard, false);
          gameBoard[i][j] = 0;
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
            // determine which index of cell is gameBoard[i][j] equal to
            index = i * 3 + j;
          }
        }
      }
    }
    gameBoard[bestMove.i][bestMove.j] = 1;
    playerTurn++;
    updateCell(index);
    announceWinner(checkWinner());
  }

  const scores = {
    X: -1,
    O: 1,
    tie: 0,
  };

  function minimax(gameBoard, isMax) {
    let result = checkWinner();
    if (result !== undefined) {
      return scores[result];
    }

    if (isMax) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameBoard[i][j] === 0) {
            gameBoard[i][j] = 1;
            let score = minimax(gameBoard, false);
            gameBoard[i][j] = 0;
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameBoard[i][j] === 0) {
            gameBoard[i][j] = -1;
            let score = minimax(gameBoard, true);
            gameBoard[i][j] = 0;
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
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
    if (value === "O") {
      overlayH2.innerText = "JEDI WON";
      overlay.style.transform = "scale(1)";
    } else if (value === "X") {
      overlayH2.innerText = "DARTH MAUL WOONNNN";
      overlay.style.transform = "scale(1)";
    } else if (value === "tie") {
      overlayH2.innerText = "ITS A DRAWW!";
      overlay.style.transform = "scale(1)";
    } else {
      return;
    }
    disableGrid();
    setTimeout(reset, 500);
  }

  function checkWinner() {
    // check rows and columns
    for (let i = 0; i < 3; i++) {
      let rowSum = gameBoard[i][0] + gameBoard[i][1] + gameBoard[i][2];
      let colSum = gameBoard[0][i] + gameBoard[1][i] + gameBoard[2][i];
      if (rowSum === -3 || colSum === -3) {
        // announceWinner(-1);
        return "X";
      } else if (rowSum === 3 || colSum === 3) {
        // announceWinner(1);
        return "O";
      }
    }

    // check diagonals
    let diagonalOneSum = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2];
    let diagonalTwoSum = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0];

    if (diagonalOneSum === -3 || diagonalTwoSum === -3) {
      // announceWinner(-1);
      return "X";
    } else if (diagonalOneSum === 3 || diagonalTwoSum === 3) {
      // announceWinner(1);
      return "O";
    }

    // check for tie
    if (gameBoard[0].indexOf(0) === -1 && gameBoard[1].indexOf(0) === -1 && gameBoard[2].indexOf(0) === -1) {
      // announceWinner(null);
      return "tie";
    }
  }

  const resetButton = document.querySelector("[data-reset]");
  const playerButton = document.querySelector("[data-player]");
  const aiButton = document.querySelector("[data-ai]");
  const overlay = document.querySelector("[data-overlay]");
  const overlayH2 = document.querySelector("[data-overlay-h2]");
  resetButton.addEventListener("click", reset);
  playerButton.addEventListener("click", () => {
    if (gameMode === "playerVsPlayer") return;
    gameMode = "playerVsPlayer";
    reset();
  });
  aiButton.addEventListener("click", () => {
    if (gameMode === "playerVsAi") return;
    gameMode = "playerVsAi";
    reset();
  });
  overlay.addEventListener("click", () => {
    overlay.style.transform = "scale(0)";
  });
})();
