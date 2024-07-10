import { Ship, GameBoard, Player } from "./factorys.js";

let gameBoard = document.querySelector("#game-board");
let enemyGameBoard = document.querySelector("#enemy-game-board");
let directionCheckbox = document.querySelector("#direction");
let boatsPlayer = document.querySelector("#boats-player");
let boatsComputer = document.querySelector("#boats-computer");
let winner = document.querySelector("#winner");
let restartGame = document.querySelector("#restart-game");

let lengthOfBoats = [1, 2, 3, 4, 5];
let gameBoardFields = [];
let enemyGameBoardFields = [];

for (let i = lengthOfBoats.length - 1; i >= 0; i--) {
  let boat = document.createElement("div");
  boat.className = "boat";
  for (let j = 0; j < lengthOfBoats[i]; j++) {
    let boatUnit = document.createElement("div");
    boatUnit.className = "boatUnit";
    boat.appendChild(boatUnit);
  }
  boat.appendChild(document.createElement("div"));
  boatsPlayer.appendChild(boat);
}

for (let i = 0; i < 10; i++) {
  gameBoardFields.push([]);
  for (let j = 0; j < 10; j++) {
    let field = document.createElement("div");
    field.className = "field";
    gameBoard.appendChild(field);
    gameBoardFields[i].push(field);
  }
}
for (let i = 0; i < 10; i++) {
  enemyGameBoardFields.push([]);
  for (let j = 0; j < 10; j++) {
    let field = document.createElement("div");
    field.className = "field";
    enemyGameBoard.appendChild(field);
    enemyGameBoardFields[i].push(field);
  }
}

let gameIsOver = false;
const player = new Player();
const computer = new Player();
let onTurn = player;
console.log(player);
computerPlaces();
// game info

function drawBoatsOnSite(playerOrComputer, boatContainer) {
  boatContainer.innerHTML = "";
  playerOrComputer.gameBoard.ships.forEach((ship) => {
    let boat = document.createElement("div");
    boat.className = "boat";
    ship.coordinates.forEach((coord) => {
      let boatUnit = document.createElement("div");
      boatUnit.className = "boatUnit";
      playerOrComputer.gameBoard.hitFields.forEach((field) => {
        if (field[0] == coord[0] && field[1] == coord[1]) {
          boatUnit.style.backgroundColor = "green";
        }
      });
      boat.appendChild(boatUnit);
    });
    let sunkOrNot = document.createElement("p");
    sunkOrNot.className = "sunk-or-not";
    sunkOrNot.innerText = "alive";
    if (ship.sunk) {
      sunkOrNot.innerText = "sunk";
    }
    boat.appendChild(sunkOrNot);
    boatContainer.appendChild(boat);
  });
}

// test state of game

function testIfSomeoneWon() {
  if (player.gameBoard.allShipsSunk) {
    winner.innerText = "You Lost!";
    gameIsOver = true;
    drawBoats(computer, enemyGameBoardFields);
  }
  if (computer.gameBoard.allShipsSunk) {
    winner.innerText = "You have won!";
    gameIsOver = true;
  }
}

function testWhosTurnItIs(attackedPlayer, attackingPlayer) {
  if (attackedPlayer.gameBoard.recentlyGotHit == true) {
    onTurn = attackingPlayer;
  } else onTurn = attackedPlayer;
}

//computer

function computerPlaces() {
  for (let i = lengthOfBoats.length - 1; i >= 0; i--) {
    let coordinatesX;
    let coordinatesY;
    let True = true;
    let newShip;
    let direction;
    let directionArray;
    while (True) {
      coordinatesX = Math.floor(Math.random() * (10 - 0) + 0);
      coordinatesY = Math.floor(Math.random() * (10 - 0) + 0);
      directionArray = ["horizontal", "vertical"];
      direction =
        directionArray[Math.floor(Math.random() * directionArray.length)];
      newShip = new Ship(
        lengthOfBoats[i],
        [coordinatesY, coordinatesX],
        direction
      );
      if (computer.gameBoard.validPlacement(newShip)) {
        True = false;
      }
    }
    computer.placeShip(newShip);
  }
}

// other functions

function getCoordinate(clickedField, gameBoardFields) {
  let position;
  gameBoardFields.forEach((row, index1) => {
    row.forEach((field, index2) => {
      if (field === (clickedField.target || clickedField)) {
        position = [index1, index2];
      }
    });
  });

  return position;
}

//Placing

function addBoat(clickedField, playerOrComputer, gameBoardFields) {
  let length = lengthOfBoats[lengthOfBoats.length - 1];
  let position = getCoordinate(clickedField, gameBoardFields);
  let direction;
  if (directionCheckbox.checked) {
    direction = "vertical";
  } else direction = "horizontal";
  const newShip = new Ship(length, position, direction);
  if (playerOrComputer.gameBoard.validPlacement(newShip)) {
    playerOrComputer.placeShip(newShip);
    lengthOfBoats.pop();
  }
  if (lengthOfBoats.length == 0) {
    playerOrComputer.placingPhase = false;
  }
}

function drawBoats(playerOrComputer, gameBoardFields) {
  playerOrComputer.gameBoard.ships.forEach((ship) => {
    ship.coordinates.forEach((coord) => {
      gameBoardFields[coord[0]][coord[1]].style.backgroundColor = "red";
    });
  });
}

//Attacking

function updateAttack(attackedPlayer, gameBoardFields) {
  attackedPlayer.gameBoard.missedFields.forEach((missed) => {
    gameBoardFields[missed[0]][missed[1]].style.backgroundColor = "black";
  });
  attackedPlayer.gameBoard.hitFields.forEach((hit) => {
    gameBoardFields[hit[0]][hit[1]].style.backgroundColor = "green";
  });
}

function attackField(
  clickedField,
  attackingPlayer,
  attackedPlayer,
  gameBoardFields
) {
  let attackedPoint = getCoordinate(clickedField, gameBoardFields);
  attackingPlayer.attackGameBoard(attackedPlayer.gameBoard, attackedPoint);
}

function playerAttacks(clickedField) {
  attackField(clickedField, player, computer, enemyGameBoardFields);
}

function computerAttacks() {
  let coordinatesX;
  let coordinatesY;
  let True = true;
  while (True) {
    coordinatesX = Math.floor(Math.random() * (10 - 0) + 0);
    coordinatesY = Math.floor(Math.random() * (10 - 0) + 0);
    if (player.gameBoard.validAttack([coordinatesY, coordinatesX])) {
      True = false;
    }
  }
  attackField(
    gameBoardFields[coordinatesY][coordinatesX],
    computer,
    player,
    gameBoardFields
  );
}

// game loop

//placing phase

gameBoard.addEventListener("click", (clickedField) => {
  if (clickedField.target !== gameBoard) {
    if (player.placingPhase && !gameIsOver) {
      addBoat(clickedField, player, gameBoardFields);
      drawBoats(player, gameBoardFields);
      if (!player.placingPhase) {
        drawBoatsOnSite(player, boatsPlayer);
        drawBoatsOnSite(computer, boatsComputer);
      }
    }
  }
});

//attack phase
enemyGameBoard.addEventListener("click", (clickedField) => {
  console.log(player.gameBoard.recentlyGotHit);
  console.log(computer.gameBoard.recentlyGotHit);
  console.log(clickedField.target.style.backgroundColor);
  let targetColor = clickedField.target.style.backgroundColor;
  let isClicked =
    targetColor === "green" || targetColor === "black" ? true : false;
  if (clickedField.target !== enemyGameBoard && !isClicked) {
    if (!player.placingPhase && !gameIsOver) {
      playerAttacks(clickedField);
      updateAttack(computer, enemyGameBoardFields);

      drawBoatsOnSite(computer, boatsComputer);
      testIfSomeoneWon();
      testWhosTurnItIs(computer, player);

      while (onTurn == computer) {
        computerAttacks();
        updateAttack(player, gameBoardFields);
        drawBoatsOnSite(player, boatsPlayer);
        testIfSomeoneWon();
        testWhosTurnItIs(player, computer);
      }
    }
  }
});

restartGame.addEventListener("click", () => {
  location.reload();
});

let availableShips = [];
