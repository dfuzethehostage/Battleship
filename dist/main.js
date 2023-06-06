/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factorys.js":
/*!*************************!*\
  !*** ./src/factorys.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameBoard: () => (/* binding */ GameBoard),\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n  constructor(length, coordinates = null, direction = null) {\r\n    this.length = length;\r\n    this.direction = direction;\r\n    this.coordinates = [];\r\n    if (this.direction == \"horizontal\") {\r\n      for (let i = 0; i < this.length; i++) {\r\n        this.coordinates.push([coordinates[0], coordinates[1] + i]);\r\n      }\r\n    }\r\n    if (this.direction == \"vertical\") {\r\n      for (let i = 0; i < this.length; i++) {\r\n        this.coordinates.push([coordinates[0] + i, coordinates[1]]);\r\n      }\r\n    }\r\n  }\r\n  sunk = false;\r\n  numberOfHits = 0;\r\n\r\n  hit() {\r\n    this.numberOfHits++;\r\n  }\r\n  isSunk() {\r\n    if (this.numberOfHits === this.length) {\r\n      this.sunk = true;\r\n    }\r\n  }\r\n\r\n  changeDirection() {\r\n    if (this.direction == \"vertical\") {\r\n      this.direction = \"horizontal\";\r\n    }\r\n    if (this.direction == \"horizontal\") {\r\n      this.direction = \"vertical\";\r\n    }\r\n  }\r\n}\r\n\r\nclass GameBoard {\r\n  ships = [];\r\n  takenFields = [];\r\n  hitFields = [];\r\n  missedFields = [];\r\n  allShipsSunk = false;\r\n\r\n  placeShip(ship) {\r\n    ship.coordinates.forEach((coordinate) => {\r\n      this.takenFields.push(coordinate);\r\n    });\r\n    this.ships.push(ship);\r\n  }\r\n\r\n  validPlacement(ship) {\r\n    if (ship == null) {\r\n      return false;\r\n    }\r\n    let shipCanBePlaced = true;\r\n    ship.coordinates.forEach((coordinate) => {\r\n      if (coordinate[0] > 9 || coordinate[1] > 9) {\r\n        shipCanBePlaced = false;\r\n      }\r\n      this.takenFields.forEach((takenField) => {\r\n        if (coordinate[0] == takenField[0] && coordinate[1] == takenField[1]) {\r\n          shipCanBePlaced = false;\r\n        }\r\n      });\r\n    });\r\n    return shipCanBePlaced;\r\n  }\r\n\r\n  validAttack(attack) {\r\n    if (\r\n      this.hitFields.some(\r\n        (field) => field[0] == attack[0] && attack[1] == field[1]\r\n      ) ||\r\n      this.missedFields.some(\r\n        (field) => field[0] == attack[0] && attack[1] == field[1]\r\n      )\r\n    ) {\r\n      return false;\r\n    }\r\n    return true;\r\n  }\r\n\r\n  receiveAttack(attack) {\r\n    let hit = false;\r\n    this.ships.forEach((ship) => {\r\n      ship.coordinates.forEach((coordinate) => {\r\n        if (\r\n          coordinate[0] == attack[0] &&\r\n          coordinate[1] == attack[1] &&\r\n          !this.hitFields.includes(coordinate)\r\n        ) {\r\n          ship.hit();\r\n          this.hitFields.push(coordinate);\r\n          hit = true;\r\n        }\r\n      });\r\n    });\r\n    if (hit === false && this.validAttack(attack)) {\r\n      this.missedFields.push(attack);\r\n    }\r\n    this.ships.forEach((ship) => ship.isSunk());\r\n    if (\r\n      this.ships.every((ship) => {\r\n        return ship.sunk == true;\r\n      })\r\n    ) {\r\n      this.allShipsSunk = true;\r\n    }\r\n  }\r\n}\r\n\r\nclass Player {\r\n  placingPhase = true;\r\n  gameBoard = new GameBoard();\r\n\r\n  placeShip(ship) {\r\n    if (!this.gameBoard.ships.includes(ship) && this.placingPhase == true) {\r\n      this.gameBoard.placeShip(ship);\r\n    }\r\n  }\r\n  attackGameBoard(gameBoard, coordinate) {\r\n    if (gameBoard.validAttack(coordinate)) {\r\n      gameBoard.receiveAttack(coordinate);\r\n    }\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/factorys.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factorys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factorys.js */ \"./src/factorys.js\");\n\r\n\r\nlet gameBoard = document.querySelector(\"#game-board\");\r\nlet enemyGameBoard = document.querySelector(\"#enemy-game-board\");\r\nlet directionCheckbox = document.querySelector(\"#direction\");\r\nlet boatsPlayer = document.querySelector(\"#boats-player\");\r\nlet boatsComputer = document.querySelector(\"#boats-computer\");\r\nlet winner = document.querySelector(\"#winner\");\r\nlet restartGame = document.querySelector(\"#restart-game\");\r\n\r\nlet lengthOfBoats = [1, 2, 3, 4, 5];\r\nlet gameBoardFields = [];\r\nlet enemyGameBoardFields = [];\r\n\r\nfor (let i = lengthOfBoats.length - 1; i >= 0; i--) {\r\n  let boat = document.createElement(\"div\");\r\n  boat.className = \"boat\";\r\n  for (let j = 0; j < lengthOfBoats[i]; j++) {\r\n    let boatUnit = document.createElement(\"div\");\r\n    boatUnit.className = \"boatUnit\";\r\n    boat.appendChild(boatUnit);\r\n  }\r\n  boat.appendChild(document.createElement(\"div\"));\r\n  boatsPlayer.appendChild(boat);\r\n}\r\n\r\nfor (let i = 0; i < 10; i++) {\r\n  gameBoardFields.push([]);\r\n  for (let j = 0; j < 10; j++) {\r\n    let field = document.createElement(\"div\");\r\n    field.className = \"field\";\r\n    gameBoard.appendChild(field);\r\n    gameBoardFields[i].push(field);\r\n  }\r\n}\r\nfor (let i = 0; i < 10; i++) {\r\n  enemyGameBoardFields.push([]);\r\n  for (let j = 0; j < 10; j++) {\r\n    let field = document.createElement(\"div\");\r\n    field.className = \"field\";\r\n    enemyGameBoard.appendChild(field);\r\n    enemyGameBoardFields[i].push(field);\r\n  }\r\n}\r\n\r\nlet gameIsOver = false;\r\nconst player = new _factorys_js__WEBPACK_IMPORTED_MODULE_0__.Player();\r\nconst computer = new _factorys_js__WEBPACK_IMPORTED_MODULE_0__.Player();\r\ncomputerPlaces();\r\n// game info\r\n\r\nfunction drawBoatsOnSite(playerOrComputer, boatContainer) {\r\n  boatContainer.innerHTML = \"\";\r\n  playerOrComputer.gameBoard.ships.forEach((ship) => {\r\n    let boat = document.createElement(\"div\");\r\n    boat.className = \"boat\";\r\n    ship.coordinates.forEach((coord) => {\r\n      let boatUnit = document.createElement(\"div\");\r\n      boatUnit.className = \"boatUnit\";\r\n      playerOrComputer.gameBoard.hitFields.forEach((field) => {\r\n        if (field[0] == coord[0] && field[1] == coord[1]) {\r\n          boatUnit.style.backgroundColor = \"green\";\r\n        }\r\n      });\r\n      boat.appendChild(boatUnit);\r\n    });\r\n    let sunkOrNot = document.createElement(\"p\");\r\n    sunkOrNot.className = \"sunk-or-not\";\r\n    sunkOrNot.innerText = \"alive\";\r\n    if (ship.sunk) {\r\n      sunkOrNot.innerText = \"sunk\";\r\n    }\r\n    boat.appendChild(sunkOrNot);\r\n    boatContainer.appendChild(boat);\r\n  });\r\n}\r\n\r\nfunction testIfSomeoneWon() {\r\n  if (player.gameBoard.allShipsSunk) {\r\n    winner.innerText = \"You Lost!\";\r\n    gameIsOver = true;\r\n    drawBoats(computer, enemyGameBoardFields);\r\n  }\r\n  if (computer.gameBoard.allShipsSunk) {\r\n    winner.innerText = \"You have won!\";\r\n    gameIsOver = true;\r\n  }\r\n}\r\n\r\n//computer\r\n\r\nfunction computerPlaces() {\r\n  for (let i = lengthOfBoats.length - 1; i >= 0; i--) {\r\n    let coordinatesX;\r\n    let coordinatesY;\r\n    let True = true;\r\n    let newShip;\r\n    let direction;\r\n    let directionArray;\r\n    while (True) {\r\n      coordinatesX = Math.floor(Math.random() * (10 - 0) + 0);\r\n      coordinatesY = Math.floor(Math.random() * (10 - 0) + 0);\r\n      directionArray = [\"horizontal\", \"vertical\"];\r\n      direction =\r\n        directionArray[Math.floor(Math.random() * directionArray.length)];\r\n      newShip = new _factorys_js__WEBPACK_IMPORTED_MODULE_0__.Ship(\r\n        lengthOfBoats[i],\r\n        [coordinatesY, coordinatesX],\r\n        direction\r\n      );\r\n      if (computer.gameBoard.validPlacement(newShip)) {\r\n        True = false;\r\n      }\r\n    }\r\n    computer.placeShip(newShip);\r\n  }\r\n}\r\n\r\nfunction computerAttacks() {\r\n  let coordinatesX;\r\n  let coordinatesY;\r\n  let True = true;\r\n  while (True) {\r\n    coordinatesX = Math.floor(Math.random() * (10 - 0) + 0);\r\n    coordinatesY = Math.floor(Math.random() * (10 - 0) + 0);\r\n    if (player.gameBoard.validAttack([coordinatesY, coordinatesX])) {\r\n      True = false;\r\n    }\r\n  }\r\n  attackField(\r\n    gameBoardFields[coordinatesY][coordinatesX],\r\n    computer,\r\n    player,\r\n    gameBoardFields\r\n  );\r\n}\r\n\r\n// other functions\r\n\r\nfunction getCoordinate(clickedField, gameBoardFields) {\r\n  let position;\r\n  gameBoardFields.forEach((row, index1) => {\r\n    row.forEach((field, index2) => {\r\n      if (field === (clickedField.target || clickedField)) {\r\n        position = [index1, index2];\r\n      }\r\n    });\r\n  });\r\n\r\n  return position;\r\n}\r\n\r\n//Placing\r\n\r\nfunction addBoat(clickedField, playerOrComputer, gameBoardFields) {\r\n  let length = lengthOfBoats[lengthOfBoats.length - 1];\r\n  let position = getCoordinate(clickedField, gameBoardFields);\r\n  let direction;\r\n  if (directionCheckbox.checked) {\r\n    direction = \"vertical\";\r\n  } else direction = \"horizontal\";\r\n  const newShip = new _factorys_js__WEBPACK_IMPORTED_MODULE_0__.Ship(length, position, direction);\r\n  if (playerOrComputer.gameBoard.validPlacement(newShip)) {\r\n    playerOrComputer.placeShip(newShip);\r\n    lengthOfBoats.pop();\r\n  }\r\n  if (lengthOfBoats.length == 0) {\r\n    playerOrComputer.placingPhase = false;\r\n  }\r\n}\r\n\r\nfunction drawBoats(playerOrComputer, gameBoardFields) {\r\n  playerOrComputer.gameBoard.ships.forEach((ship) => {\r\n    ship.coordinates.forEach((coord) => {\r\n      gameBoardFields[coord[0]][coord[1]].style.backgroundColor = \"blue\";\r\n    });\r\n  });\r\n}\r\n\r\n//Attacking\r\n\r\nfunction updateAttack(attackedPlayer, gameBoardFields) {\r\n  attackedPlayer.gameBoard.missedFields.forEach((missed) => {\r\n    gameBoardFields[missed[0]][missed[1]].style.backgroundColor = \"black\";\r\n  });\r\n  attackedPlayer.gameBoard.hitFields.forEach((hit) => {\r\n    gameBoardFields[hit[0]][hit[1]].style.backgroundColor = \"green\";\r\n  });\r\n}\r\n\r\nfunction attackField(\r\n  clickedField,\r\n  attackingPlayer,\r\n  attackedPlayer,\r\n  gameBoardFields\r\n) {\r\n  let attackedPoint = getCoordinate(clickedField, gameBoardFields);\r\n  if (\r\n    attackingPlayer == player &&\r\n    attackedPlayer.gameBoard.validAttack(attackedPoint)\r\n  ) {\r\n    computerAttacks();\r\n  }\r\n  attackingPlayer.attackGameBoard(attackedPlayer.gameBoard, attackedPoint);\r\n}\r\n\r\n// game loop\r\n\r\ngameBoard.addEventListener(\"click\", (clickedField) => {\r\n  if (clickedField.target !== gameBoard) {\r\n    if (player.placingPhase && !gameIsOver) {\r\n      addBoat(clickedField, player, gameBoardFields);\r\n      drawBoats(player, gameBoardFields);\r\n      if (!player.placingPhase) {\r\n        drawBoatsOnSite(player, boatsPlayer);\r\n        drawBoatsOnSite(computer, boatsComputer);\r\n      }\r\n    }\r\n  }\r\n});\r\n\r\nenemyGameBoard.addEventListener(\"click\", (clickedField) => {\r\n  if (clickedField.target !== enemyGameBoard) {\r\n    if (!player.placingPhase && !gameIsOver) {\r\n      attackField(clickedField, player, computer, enemyGameBoardFields);\r\n      updateAttack(computer, enemyGameBoardFields);\r\n      updateAttack(player, gameBoardFields);\r\n      drawBoatsOnSite(player, boatsPlayer);\r\n      drawBoatsOnSite(computer, boatsComputer);\r\n      testIfSomeoneWon();\r\n    }\r\n  }\r\n});\r\n\r\nrestartGame.addEventListener(\"click\", () => {\r\n  location.reload();\r\n});\r\n\r\nlet availableShips = [];\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;