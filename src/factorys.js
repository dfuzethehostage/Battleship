class Ship {
  constructor(length, coordinates = null, direction = null) {
    this.length = length;
    this.direction = direction;
    this.coordinates = [];
    if (this.direction == "horizontal") {
      for (let i = 0; i < this.length; i++) {
        this.coordinates.push([coordinates[0], coordinates[1] + i]);
      }
    }
    if (this.direction == "vertical") {
      for (let i = 0; i < this.length; i++) {
        this.coordinates.push([coordinates[0] + i, coordinates[1]]);
      }
    }
  }
  sunk = false;
  numberOfHits = 0;

  hit() {
    this.numberOfHits++;
  }
  isSunk() {
    if (this.numberOfHits === this.length) {
      this.sunk = true;
    }
  }

  changeDirection() {
    if (this.direction == "vertical") {
      this.direction = "horizontal";
    }
    if (this.direction == "horizontal") {
      this.direction = "vertical";
    }
  }
}

class GameBoard {
  ships = [];
  takenFields = [];
  hitFields = [];
  missedFields = [];
  allShipsSunk = false;

  placeShip(ship) {
    ship.coordinates.forEach((coordinate) => {
      this.takenFields.push(coordinate);
    });
    this.ships.push(ship);
  }

  validPlacement(ship) {
    if (ship == null) {
      return false;
    }
    let shipCanBePlaced = true;
    ship.coordinates.forEach((coordinate) => {
      if (coordinate[0] > 9 || coordinate[1] > 9) {
        shipCanBePlaced = false;
      }
      this.takenFields.forEach((takenField) => {
        if (coordinate[0] == takenField[0] && coordinate[1] == takenField[1]) {
          shipCanBePlaced = false;
        }
      });
    });
    return shipCanBePlaced;
  }

  validAttack(attack) {
    if (
      this.hitFields.some(
        (field) => field[0] == attack[0] && attack[1] == field[1]
      ) ||
      this.missedFields.some(
        (field) => field[0] == attack[0] && attack[1] == field[1]
      )
    ) {
      return false;
    }
    return true;
  }

  receiveAttack(attack) {
    let hit = false;
    this.ships.forEach((ship) => {
      ship.coordinates.forEach((coordinate) => {
        if (
          coordinate[0] == attack[0] &&
          coordinate[1] == attack[1] &&
          !this.hitFields.includes(coordinate)
        ) {
          ship.hit();
          this.hitFields.push(coordinate);
          hit = true;
        }
      });
    });
    if (hit === false && this.validAttack(attack)) {
      this.missedFields.push(attack);
    }
    this.ships.forEach((ship) => ship.isSunk());
    if (
      this.ships.every((ship) => {
        return ship.sunk == true;
      })
    ) {
      this.allShipsSunk = true;
    }
  }
}

class Player {
  placingPhase = true;
  gameBoard = new GameBoard();

  placeShip(ship) {
    if (!this.gameBoard.ships.includes(ship) && this.placingPhase == true) {
      this.gameBoard.placeShip(ship);
    }
  }
  attackGameBoard(gameBoard, coordinate) {
    if (gameBoard.validAttack(coordinate)) {
      gameBoard.receiveAttack(coordinate);
    }
  }
}

export { Ship, GameBoard, Player };
