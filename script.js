//horizontal
// 0 1 2, 3 4 5, 6 7 8

//vertical
// 0,3,6

// 1,5,7

// 2,5,8

// diagonal
// 0,4,8

//2,4,6

(function () {
  const squares = document.querySelectorAll(".square");

  const gameboard = {
    board: [
      "x",
      "undefined",
      "o",
      undefined,
      "x",
      undefined,
      undefined,
      "x",
      "o",
    ],
    score: {
      player: 0,
      machine: 0,
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
  };

  let gameplay = {
    uwu: function () {
      gameboard.render();
    },
  };

  actualMark = "x";
  let test = () => {
    squares.forEach((square) => {
      square.addEventListener("click", () => {
        if (actualMark == "x") {
          gameboard.board[square.getAttribute("data-index")] = "x";
          actualMark = "o";
        } else {
          gameboard.board[square.getAttribute("data-index")] = "o";
          actualMark = "x";
        }
        gameboard.render();
        console.log(gameboard.board);
      });
    });
  };

  test();
})();

// let me = playerFactory("brandon");

//up to 9 turns?
