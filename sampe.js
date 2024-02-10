// console.log("Hello FCB!");

// Declare all the variables need for our website
let board;
let score = 0;
let rows = 4;
let columns = 4;

// Create function to set the gameboard
function setGame() {
  board = [
    // Initialize the 4x4 game board with all tiles set to 0
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");

      // Set a unique id for each tile based on its coordinates
      tile.id = r.toString() + "-" + c.toString();

      let num = board[r][c];

      updateTile(tile, num);

      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

// Invoke SetGame
// setGame();

function updateTile(tile, num) {
  // clear the tile
  tile.innerText = "";

  // add or clear classList to avoid multiple classes
  tile.classList.value = "";

  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num.toString();

    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

// Event that triggers when the webpage finishes loading.
window.onload = function () {
  setGame();
};

// Function that will handle the user's keyboard when they press certain arrow keys
function handleSlide(e) {
  // it monitors the key being clicked on the keyboard
  console.log(e.code);

  if (
    [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "KeyW",
      "KeyS",
      "KeyA",
      "KeyD",
    ].includes(e.code)
  ) {
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
      slideLeft();
      setTwo();
    } else if (e.code == "ArrowRight" || e.code == "KeyD") {
      slideRight();
      setTwo();
    } else if (e.code == "ArrowUp" || e.code == "KeyW") {
      slideUp();
      setTwo();
    } else if (e.code == "ArrowDown" || e.code == "KeyS") {
      slideDown();
      setTwo();
    }
  }
  checkWin();

  document.getElementById("score").innerText = score; //update score;
  if (hasLost()) {
    // Timeout
    setTimeout(() => {
      alert("Game Over! You have lost the game. Game will restart.");
      restartGame();
      alert("Click any arrow key to restart!");
    }, 100);
  }
}

// when any key is pressed, the handle Slide function is invoke.
document.addEventListener("keydown", handleSlide);

function slideLeft() {
  // console.log("You slide to the left!");
  // This loop will iterate through each row
  for (let r = 0; r < rows; r++) {
    let row = board[r]; //[0,2,2,0] -> [4,0,0,0]

    row = slide(row);

    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  console.log("You slide to the right!");

  for (let r = 0; r < rows; r++) {
    let row = board[r]; //[0,2,2,0] -> [4,0,0,0]

    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// function slideUp() {

//   for (let c = 0; c < columns; c++) {
//     // In two dimensional array, ther first number represents row, and second is column

//     let row = [board[0][c], board[1][c], board[2][c], board[3][c]];

//     row = slide(row);

//     for (let r = 0; r < rows; r++) {
//       // sets the value of the board array back to the values of the modified row, essentially updating the column in the game board.
//       board[r][c] = row[r];

//       let tile = document.getElementById(r.toString() + "-" + c.toString());
//       let num = board[r][c];
//       updateTile(tile, num);
//     }
//   }
// }
function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];

    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
function slideDown() {
  //   console.log("You slide downward!");

  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];

      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// This function will remove all the zeros first before sliding
function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);

  // Iterate through the row to check for adjacent equal numbers
  for (let i = 0; i < row.length - 1; i++) {
    // add another if statement that will add two adjacent number
    // [2,2,2] => [4, 0, 2]; [4,2]
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;

      score += row[i];
    }
  }
  row = filterZero(row); //[4,2] => [4,2,0,0]

  while (row.length < columns) {
    row.push(0);
  }

  return row;
}

function hasEmptyTile() {
  // Iterate through the board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }

  return false;
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      found = true;
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
    }
  }
}

let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

function checkWin() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //check if current tile == 2048 and higher
      if (board[r][c] == 2048 && is2048Exist == false) {
        alert("You win! You got a 2048 tile!");
        is2048Exist = true;
      } else if (board[r][c] == 4096 && is4096Exist == false) {
        alert("You are unstoppable at 4096! You are awesome!");
        is4096Exist = true;
      } else if (board[r][c] == 8192 && is8192Exist == false) {
        alert("Victory! You have reached 8192! You are incredibly awesome!");
        is8192Exist = true;
      }
    }
  }
}

function hasLost() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //we checked whether there is an empty tile or none
      if (board[r][c] == 0) {
        return false;
      }

      const currentTile = board[r][c];
      // If there adjacent cells/tile for possible merging
      if (
        (r > 0 && board[r - 1][c] === currentTile) ||
        (r < rows - 1 && board[r + 1][c] === currentTile) ||
        (c > 0 && board[r][c - 1] === currentTile) ||
        (c < columns - 1 && board[r][c + 1] === currentTile)
      ) {
        return false;
      }
    }
  }
  //No pssible moves left or empty tile, user has lost.
  return true;
}
function restartGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  score = 0;
  setTwo();
}
