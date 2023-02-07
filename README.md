# TIC-TAC-TOE GAME WITH UNBEATABLE AI
## WHAT DID I LEARN:
- Better understanding of modules and constructor functions
- Improved understanding about how javascript works 
- **Learnd how to think recursively and implemented that within minimax algorithm for AI**
### In future I would like to add:
- Precision for AI
- Better animations
### I am really proud of this part:
` function minimax(gameBoard, isMax) {
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
  } `
  
  ---
  **Here is [live preview]()**
