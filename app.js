(function () {
  let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let playerTurn = 1;
  let gameOver = true;
  let gameMode = "playerVsAi";

  const gridCells = document.querySelectorAll("[data-cell]");
  gridCells.forEach((gridCell, index) => {
    gridCell.addEventListener("click", () => {
      addMark(index);
      setTimeout(checkWinner, 200);
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
  }

  function aiPlay() {
    if (playerTurn === 10) return;
    let randomIndex = Math.floor(Math.random() * 9);
    let randomCol = randomIndex % 3;
    let randomRow = (randomIndex - randomCol) / 3;
    while (gameBoard[randomRow][randomCol] !== 0) {
      randomIndex = Math.floor(Math.random() * 9);
      randomCol = randomIndex % 3;
      randomRow = (randomIndex - randomCol) / 3;
    }
    gameBoard[randomRow][randomCol] = 1;
    playerTurn++;
    updateCell(randomIndex);
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
      overlayH2.innerText = "JEDI WON";
      overlay.style.transform = "scale(1)";
    } else if (value === -1) {
      overlayH2.innerText = "DARTH MAUL WOONNNN";
      overlay.style.transform = "scale(1)";
    } else {
      overlayH2.innerText = "ITS A DRAWW!";
      overlay.style.transform = "scale(1)";
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
        announceWinner(-1);
        return;
      } else if (rowSum === 3 || colSum === 3) {
        announceWinner(1);
        return;
      }
    }

    // check diagonals
    let diagonalOneSum = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2];
    let diagonalTwoSum = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0];

    if (diagonalOneSum === -3 || diagonalTwoSum === -3) {
      announceWinner(-1);
      return;
    } else if (diagonalOneSum === 3 || diagonalTwoSum === 3) {
      announceWinner(1);
      return;
    }

    // check for tie
    if (gameBoard[0].indexOf(0) === -1 && gameBoard[1].indexOf(0) === -1 && gameBoard[2].indexOf(0) === -1) {
      announceWinner(null);
      return;
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
