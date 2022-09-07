//horizontal
// 0 1 2, 3 4 5, 6 7 8

//vertical
// 0,3,6

// 1,5,7

// 2,5,8

// diagonal
// 0,4,8

//2,4,6

// (function () {
const squares = document.querySelectorAll(".square");

const gameboard = {
  board: [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ],
  score: {
    player: 0,
    machine: 0
  },
  render: function () {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == "x") {
        squares[i].innerHTML = `<h1 class="mark ex">+</h1>`;
      } else if (this.board[i] == "o") {
        squares[i].innerHTML = `<i class="mark fa-solid fa-circle-dot"></i>`;
      } else {
        squares[i].innerHTML = "";
      }
    }
  },
  turn: function () {
    squares.forEach((square) => {
      square.addEventListener("click", () => {
        let marked = Boolean;

        if (gameboard.board[square.getAttribute("data-index")] == undefined) {
          gameboard.board[square.getAttribute("data-index")] = playerMark;
          marked = true;
        }

        if (marked == true) {
          let computerChoice = () => {
            let empty = [];
            for (let i = 0; i < gameboard.board.length; i++) {
              if (gameboard.board[i] === undefined) {
                empty.push(i);
              }
            }
            gameboard.board[
              empty[Math.floor(Math.random() * empty.length)]
            ] = computerMark;
          };

          computerChoice();
          gameboard.check(0, 1, 2);
          gameboard.check(3, 4, 5);
          gameboard.check(6, 7, 8);

          gameboard.check(0, 3, 6);
          gameboard.check(1, 4, 7);
          gameboard.check(2, 5, 8);

          gameboard.check(0, 4, 8);
          gameboard.check(2, 4, 6);
        }

        gameboard.render();
      });
    });
  },
  check: function (a, b, c) {
    let aa = gameboard.board[a];
    let bb = gameboard.board[b];
    let cc = gameboard.board[c];

    if (
      gameboard.board[a] != undefined &&
      gameboard.board[b] != undefined &&
      gameboard.board[c] != undefined
    ) {
      if (
        gameboard.board[a] === gameboard.board[b] &&
        gameboard.board[b] === gameboard.board[c]
      ) {
        for (let i = 0; i < 9; i++) {
          gameboard.board[i] = undefined;
        }
        gameboard.render();

        if (aa === playerMark && bb === playerMark && cc === playerMark) {
          console.log("you won");
        } else if (
          aa === computerMark &&
          bb === computerMark &&
          cc === computerMark
        ) {
          console.log("you lose");
        }
      }
    }

    // 0 1 2, 3 4 5, 6 7 8
    //vertical
    // 0,3,6
    // 1,5,7
    // 2,5,8
    // diagonal
    // 0,4,8
    //2,4,6
  }
};

// let gameplay = {
//   uwu: function () {
//     gameboard.turn();
//   }
// };
gameboard.turn();

let playerMark = "x";
let computerMark = "o";
// })();

// let me = playerFactory("brandon");

//up to 9 turns?

//After my turn computer checks the available spaces and makes a move
