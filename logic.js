let board;
let scrore = 0;
let rows = 4;
let columns = 4;

function setGame() {
  board = [
    [0, 0, 0, 0],
    [4, 4, 2, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");

      tile.id = r.toString() + "-" + c.toString();

      let num = board[r][c];

      //   console.log(board);
      upDateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
}

function upDateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";

  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num.toString();

    if (num < 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

window.onload = function () {
  setGame();
};

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
    } else if (e.code == "ArrowRight" || e.code == "KeyD") {
      slideRight();
    } else if (e.code == "ArrowUp" || e.code == "KeyW") {
      slideUp();
    } else if (e.code == "ArrowDown" || e.code == "KeyS") {
      slideDown();
    }
  }
}

document.addEventListener("keydown", handleSlide);

function slideLeft() {
  console.log("you slide to left");

  for (let r = 0; r < rows; r++) {
    let row = board[r];

    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());

      let num = board[r][c];
      upDateTile(num);
    }
  }
}
function slideRight() {
  console.log("you slide to right");
}
function slideUp() {
  console.log("you slide upward");
}
function slideDown() {
  console.log("you slide downward");
}

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }

    row = filterZero(row);

    while (row.length < columns) {
      row.push(0);
    }
  }
  return row;
}
