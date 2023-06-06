import { Ship, GameBoard, Player } from "./factorys.js";

// ship

test("ship is hit", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.numberOfHits).toBe(1);
});

test("ship is sunk", () => {
  const ship = new Ship(3);
  expect(ship.sunk).toBe(false);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.sunk).toBe(false);
  ship.isSunk();
  expect(ship.sunk).toBe(true);
});

test("ship coordinates", () => {
  const ship = new Ship(3, [0, 0], "vertical");
  expect(ship.direction).toBe("vertical");
  expect(ship.coordinates).toEqual([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
});

// gameBoard

test("place ship", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip(new Ship(4, [1, 0], "horizontal"));
  expect(gameBoard.ships.length).toBe(1);
  gameBoard.placeShip(new Ship(4, [1, 0], "horizontal"));
  expect(gameBoard.ships.length).toBe(2);
});

test("attack can hit", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip(new Ship(4, [1, 0], "horizontal"));
  gameBoard.receiveAttack([1, 0]);
  expect(gameBoard.ships[0].numberOfHits).toBe(1);
  gameBoard.receiveAttack([1, 0]);
  expect(gameBoard.ships[0].numberOfHits).toBe(1);
  expect(gameBoard.hitFields).toEqual([[1, 0]]);
});

test("attack can miss", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip(new Ship(4, [1, 0], "horizontal"));
  gameBoard.receiveAttack([4, 0]);
  expect(gameBoard.hitFields).toEqual([]);
  expect(gameBoard.missedFields).toEqual([[4, 0]]);
});

test("all ships sunk", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip(new Ship(4, [1, 0], "horizontal"));
  gameBoard.receiveAttack([1, 0]);
  expect(gameBoard.sunkCount).toBe(0);
  gameBoard.receiveAttack([1, 1]);
  expect(gameBoard.sunkCount).toBe(0);
  gameBoard.receiveAttack([1, 2]);
  expect(gameBoard.sunkCount).toBe(0);
  gameBoard.receiveAttack([1, 3]);
  expect(gameBoard.sunkCount).toBe(1);
  expect(gameBoard.allShipsSunk).toBe(true);
});

test("attack is valid", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShip(new Ship(4, [1, 0], "horizontal"));
  expect(gameBoard.validAttack([1, 0])).toBe(true);
  gameBoard.receiveAttack([1, 0]);
  expect(gameBoard.validAttack([1, 0])).toBe(false);
});

// Player

test("player placed ship", () => {
  let player = new Player(true);
  let ship = new Ship(4, [1, 0], "horizontal");
  player.placeShip(ship);
  expect(player.gameBoard.ships).toEqual([ship]);
});

test("player can attack", () => {
  let player = new Player(true);
  let ship = new Ship(4, [1, 0], "horizontal");
  player.placeShip(ship);

  let player2 = new Player(true);
  let ship2 = new Ship(4, [1, 0], "horizontal");
  player2.placeShip(ship2);

  player.attackGameBoard(player2.gameBoard, [1, 0]);

  expect(player2.gameBoard.ships[0].numberOfHits).toBe(1);
  player.attackGameBoard(player2.gameBoard, [1, 0]);
  expect(player2.gameBoard.ships[0].numberOfHits).toBe(1);
});
