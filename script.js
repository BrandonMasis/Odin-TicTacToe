(function () {
  const squares = document.querySelectorAll(".square");
  const startBtn = document.querySelector(".start");
  const reStartBtn = document.querySelector(".reStart");
  const playerScore = document.querySelector(".playerScore");
  const machineScore = document.querySelector(".machineScore");
  const gameScore = document.querySelector(".gameScore");
  let isMarked = undefined;
  let isWaiting = false;

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
      undefined,
    ],
    score: {
      player: 0,
      machine: 0,
    },
    render: function () {
      for (let i = 0; i < gameboard.board.length; i++) {
        if (gameboard.board[i] == "x") {
          // squares[i].innerHTML = `<h2 class="ex">+</h2>`;
          squares[i].innerHTML = `<h2 class>🥩</h2>`;
        } else if (gameboard.board[i] == "o") {
          squares[i].innerHTML = `<h2 class>🐮</h2>`;
          // squares[i].innerHTML = `<i class="mark fa-solid fa-circle-dot"></i>`;
        } else {
          squares[i].innerHTML = "";
        }
      }
    },
    clear: function () {
      for (let i = 0; i < 9; i++) {
        gameboard.board[i] = undefined;
      }
    },
    turn: function () {
      if (gameboard.board[this.getAttribute("data-index")] == undefined) {
        gameboard.board[this.getAttribute("data-index")] = playerMark;
        isMarked = true;
      }

      let computerChoice = () => {
        let empty = [];
        for (let i = 0; i < gameboard.board.length; i++) {
          if (gameboard.board[i] === undefined) {
            empty.push(i);
          }
        }
        gameboard.board[empty[Math.floor(Math.random() * empty.length)]] =
          computerMark;
      };

      if (isMarked == true && isWaiting == false) {
        if (gameboard.board.includes(undefined) == false) {
          console.log("it's a tie");
          gameboard.clear();
        }

        gameboard.check(
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        );

        gameboard.render();

        setTimeout(() => {
          computerChoice();
          if (!isWaiting) {
            gameboard.check(
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6]
            );
            gameboard.render();
          }
        }, 200);

        playerScore.querySelector("span").textContent = gameboard.score.player;
        machineScore.querySelector("span").textContent =
          gameboard.score.machine;

        isMarked = false;
      }
    },
    start: function () {
      gameboard.render();
      squares.forEach((square) => {
        square.addEventListener("click", gameboard.turn);
      });
    },
    check: function (...arrs) {
      arrs.forEach((arr) => {
        let aa = gameboard.board[arr[0]];
        let bb = gameboard.board[arr[1]];
        let cc = gameboard.board[arr[2]];

        if (
          gameboard.board[arr[0]] != undefined &&
          gameboard.board[arr[0]] === gameboard.board[arr[1]] &&
          gameboard.board[arr[1]] === gameboard.board[arr[2]]
        ) {
          isWaiting = true;

          setTimeout(() => {
            gameboard.clear();
            gameboard.render();
            isWaiting = false;
            playerScore.style.color = "white";
            machineScore.style.color = "white";
          }, 3000);
          if (aa === playerMark && bb === playerMark && cc === playerMark) {
            console.log("you won");
            gameboard.score.player += 1;
            playerScore.style.color = "#6eff70";
          } else if (
            aa === computerMark &&
            bb === computerMark &&
            cc === computerMark
          ) {
            console.log("you lose");
            gameboard.score.machine += 1;

            machineScore.style.color = "#6eff70";
          }
        }
      });
    },
  };

  startBtn.addEventListener("click", () => {
    gameboard.start();
    startBtn.style.display = "none";
    reStartBtn.style.display = "block";
    gameScore.style.display = "flex";
  });

  reStartBtn.addEventListener("click", () => {
    gameboard.clear();
    gameboard.render();

    gameboard.score.machine = 0;
    gameboard.score.player = 0;
    playerScore.querySelector("span").textContent = gameboard.score.player;
    machineScore.querySelector("span").textContent = gameboard.score.machine;
  });

  let playerMark = "x",
    computerMark = "o";
})();
