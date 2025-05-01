/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/clear/index.js":
/*!*************************************!*\
  !*** ./node_modules/clear/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var assert = __webpack_require__(/*! assert */ \"assert\");\n\nmodule.exports = function clear(opts) {\n    if (typeof (opts) === 'boolean') {\n        opts = {\n            fullClear: opts\n        };\n    }\n\n    opts = opts || {};\n    assert(typeof (opts) === 'object', 'opts must be an object');\n\n    opts.fullClear = opts.hasOwnProperty('fullClear') ?\n        opts.fullClear : true;\n\n    assert(typeof (opts.fullClear) === 'boolean',\n        'opts.fullClear must be a boolean');\n\n    if (opts.fullClear === true) {\n        process.stdout.write('\\x1b[2J');\n    }\n\n    process.stdout.write('\\x1b[0f');\n};\n\n\n//# sourceURL=webpack:///./node_modules/clear/index.js?");

/***/ }),

/***/ "./src/commands/club-selection.ts":
/*!****************************************!*\
  !*** ./src/commands/club-selection.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = clubSelection;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\nfunction clubSelection(player, club) {\n    const match = match_1.default.getInstance();\n    if (!club) {\n        return 'Please select a club';\n    }\n    // const checkPlayerTeeOffPosition = match.data.find((player: Player) => player.type === 'teeOffPosition')\n    const getCurrentPositionOrTeeOffPosition = match.data.find((player) => player.type === 'hitBall' || player.type === 'teeOffPosition');\n    if (!getCurrentPositionOrTeeOffPosition) {\n        return 'You need to select a tee off position first';\n    }\n    match.data.push({ playerId: player.id, playerName: player.name, type: 'clubSelection', club });\n}\n\n\n//# sourceURL=webpack:///./src/commands/club-selection.ts?");

/***/ }),

/***/ "./src/commands/hit-ball.ts":
/*!**********************************!*\
  !*** ./src/commands/hit-ball.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.diceRoller = void 0;\nexports[\"default\"] = hitBall;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\nconst clubs_1 = __webpack_require__(/*! ../types/clubs */ \"./src/types/clubs.ts\");\n// Move rollDice to a separate module for easier mocking\nexports.diceRoller = {\n    rollDice: () => {\n        return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;\n    }\n};\nfunction getClubModifiers(selectedClub, powerRoll, accuracyRoll) {\n    const clubAttributes = clubs_1.clubs.find(club => club.name === selectedClub.club.name);\n    const power = clubAttributes.fairwayPower[powerRoll - 1];\n    const accuracy = clubAttributes.fairwayAccuracy[accuracyRoll - 1];\n    return { power, accuracy };\n}\nconst accuracyTextMap = (accuracy) => (accuracy === 1 ? 'left' :\n    accuracy === 2 ? 'straight' :\n        accuracy === 3 ? 'right' :\n            'unknown');\nfunction hitBall(player) {\n    const matchData = match_1.default.getInstance().data;\n    const selectedClub = matchData.findLast(item => item.type === 'clubSelection');\n    if (!selectedClub)\n        return 'Please select a club';\n    if (selectedClub.playerId !== player.id)\n        return 'It is not your turn';\n    const currentPosition = matchData.findLast(item => item.type === 'hitBall' && item.playerId === player.id) ||\n        matchData.findLast(item => item.type === 'teeOffPosition' && item.playerId === player.id);\n    // Use the diceRoller object instead of directly calling rollDice\n    const powerRoll = exports.diceRoller.rollDice();\n    const accuracyRoll = exports.diceRoller.rollDice();\n    const { power, accuracy } = getClubModifiers(selectedClub, powerRoll, accuracyRoll);\n    const distance = selectedClub.club.distance + power;\n    let newAccuracy = currentPosition.position[1];\n    if (accuracy === 1)\n        newAccuracy -= 1;\n    else if (accuracy === 3)\n        newAccuracy += 1;\n    const newPosition = [currentPosition.position[0] - distance, newAccuracy];\n    matchData.push({ playerId: player.id, playerName: player.name, type: 'hitBall', position: newPosition });\n    return `Player ${player.name} started at ${currentPosition.position} and hit the ball ${distance}0 yards ${accuracyTextMap(accuracy)} to position ${newPosition}`;\n}\n\n\n//# sourceURL=webpack:///./src/commands/hit-ball.ts?");

/***/ }),

/***/ "./src/commands/player-selection.ts":
/*!******************************************!*\
  !*** ./src/commands/player-selection.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = playerSelection;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\nconst match = match_1.default.getInstance();\nfunction playerSelection(playerOne, playerTwo) {\n    const players = [\n        { name: playerOne },\n        { name: playerTwo }\n    ];\n    if (!players[0].name || !players[1].name) {\n        return 'Error selecting players';\n    }\n    const teeOffOrder = players.sort(() => Math.random() - 0.5);\n    match.data.push({\n        id: 1,\n        type: 'player',\n        name: teeOffOrder[0].name,\n    }, {\n        id: 2,\n        type: 'player',\n        name: teeOffOrder[1].name,\n    });\n    return 'Game on!!!!';\n}\n\n\n//# sourceURL=webpack:///./src/commands/player-selection.ts?");

/***/ }),

/***/ "./src/commands/tee-off-position.ts":
/*!******************************************!*\
  !*** ./src/commands/tee-off-position.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = teeOffPosition;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\nfunction teeOffPosition(player, position) {\n    const match = match_1.default.getInstance();\n    if (!player) {\n        return 'Please select a player';\n    }\n    if (player.id == 2 && !match.data[2]) {\n        return 'Please wait for the first player to tee off';\n    }\n    const teeOffPosition = match.teeoffPosition[(position - 1)];\n    match.data.push({ playerId: player.id, playerName: player.name, type: 'teeOffPosition', position: teeOffPosition });\n    return `Player ${player.name} to tee off from position ${position}`;\n}\n\n\n//# sourceURL=webpack:///./src/commands/tee-off-position.ts?");

/***/ }),

/***/ "./src/data-store/holes.ts":
/*!*********************************!*\
  !*** ./src/data-store/holes.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.firstHole = void 0;\nexports.firstHole = {\n    map: [\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"green\", \"green\", \"green\", \"fairway\"],\n        [\"fairway\", \"green\", \"hole\", \"green\", \"fairway\"],\n        [\"fairway\", \"green\", \"green\", \"green\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"water\", \"fairway\", \"outOfBounds\", \"fairway\"], // Row 7 (Bottom - Water)\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"teeoffLeft\", \"teeoffCenter\", \"teeoffRight\", \"fairway\"], // Row 11 (Bottom - Teeoff)\n    ],\n    teeoffPositions: [[11, 2], [11, 3], [11, 4]],\n};\n\n\n//# sourceURL=webpack:///./src/data-store/holes.ts?");

/***/ }),

/***/ "./src/data-store/match.ts":
/*!*********************************!*\
  !*** ./src/data-store/match.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst holes_1 = __webpack_require__(/*! ./holes */ \"./src/data-store/holes.ts\");\nclass Hole {\n    data = [];\n    map = holes_1.firstHole.map;\n    teeoffPosition = holes_1.firstHole.teeoffPositions;\n    static instance;\n    static getInstance() {\n        if (!Hole.instance) {\n            Hole.instance = new Hole();\n        }\n        return Hole.instance;\n    }\n}\nexports[\"default\"] = Hole;\n\n\n//# sourceURL=webpack:///./src/data-store/match.ts?");

/***/ }),

/***/ "./src/fontend/display-hole-map.ts":
/*!*****************************************!*\
  !*** ./src/fontend/display-hole-map.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = displayHoleMap;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\n// Replace static import with dynamic import\n// import chalk from 'chalk';\nconst firstHole = match_1.default.getInstance();\nasync function displayHoleMap() {\n    // Use dynamic import for chalk\n    const chalk = (await __webpack_require__.e(/*! import() */ \"vendors-node_modules_chalk_source_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! chalk */ \"./node_modules/chalk/source/index.js\"))).default;\n    console.log('Hole Map:');\n    for (let i = 0; i < firstHole.map.length; i++) {\n        const row = firstHole.map[i];\n        let rowStr = '';\n        for (let j = 0; j < row.length; j++) {\n            const cell = row[j];\n            switch (cell) {\n                case 'fairway':\n                    rowStr += chalk.bgGreen('   '); // green background\n                    break;\n                case 'green':\n                    rowStr += chalk.bgGreenBright('   ');\n                    break;\n                case 'hole':\n                    rowStr += chalk.bgGreenBright('(H)');\n                    break;\n                case 'water':\n                    rowStr += chalk.bgBlue('   ');\n                    break;\n                case 'sand':\n                    rowStr += chalk.bgYellow('   ');\n                    break;\n                case 'outOfBounds':\n                    rowStr += chalk.bgRedBright('   ');\n                    break;\n                case 'teeoffLeft':\n                    rowStr += chalk.bgWhite(' 1 ');\n                    break;\n                case 'teeoffCenter':\n                    rowStr += chalk.bgWhite(' 2 ');\n                    break;\n                case 'teeoffRight':\n                    rowStr += chalk.bgWhite(' 3 ');\n                    break;\n                default:\n                    rowStr += '   '; // empty space\n            }\n        }\n        console.log(rowStr);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/fontend/display-hole-map.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst display_hole_map_1 = __importDefault(__webpack_require__(/*! ./fontend/display-hole-map */ \"./src/fontend/display-hole-map.ts\"));\nconst player_selection_1 = __importDefault(__webpack_require__(/*! ./commands/player-selection */ \"./src/commands/player-selection.ts\"));\nconst club_selection_1 = __importDefault(__webpack_require__(/*! ./commands/club-selection */ \"./src/commands/club-selection.ts\"));\nconst tee_off_position_1 = __importDefault(__webpack_require__(/*! ./commands/tee-off-position */ \"./src/commands/tee-off-position.ts\"));\nconst hit_ball_1 = __importDefault(__webpack_require__(/*! ./commands/hit-ball */ \"./src/commands/hit-ball.ts\"));\nconst match_1 = __importDefault(__webpack_require__(/*! ./data-store/match */ \"./src/data-store/match.ts\"));\nconst clubs_1 = __webpack_require__(/*! ./types/clubs */ \"./src/types/clubs.ts\");\nconst clear_1 = __importDefault(__webpack_require__(/*! clear */ \"./node_modules/clear/index.js\"));\n// Use dynamic import for chalk to avoid ESM/CommonJS issues\nlet chalk;\n(async () => {\n    chalk = (await __webpack_require__.e(/*! import() */ \"vendors-node_modules_chalk_source_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! chalk */ \"./node_modules/chalk/source/index.js\"))).default;\n    init();\n})();\nconst match = match_1.default.getInstance();\nlet actionQueue = [];\nconst readline = __webpack_require__(/*! readline/promises */ \"readline/promises\");\nlet rl = readline.createInterface(process.stdin, process.stdout);\nasync function init() {\n    (0, clear_1.default)();\n    console.log(chalk.green(\"********************************************\"));\n    console.log(chalk.green(\"********** Welcome to Golf World! **********\"));\n    console.log(chalk.green(\"********************************************\", '\\n'));\n    console.log(chalk.bgGrey('********** Hole 1 **********', '\\n'));\n    await (0, display_hole_map_1.default)();\n    let playerOne = '';\n    let playerTwo = '';\n    console.log('\\n');\n    runGame();\n}\nasync function askTeePosition() {\n    let answer;\n    while (true) {\n        answer = await rl.question('Where would you like to tee off from? (1, 2, or 3): ');\n        if (['1', '2', '3'].includes(answer)) {\n            return parseInt(answer);\n        }\n        else {\n            console.log('Invalid choice. Please enter 1, 2, or 3.');\n        }\n    }\n    rl.close();\n}\nasync function askClubSelection() {\n    let answer;\n    while (true) {\n        answer = await rl.question('What club would you like to use? (\"Driver\", \"Long iron\", \"Iron\", \"Wedge\", \"Sand\", \"Putter\"): ');\n        if ([\"Driver\", \"Long iron\", \"Iron\", \"Wedge\", \"Sand\", \"Putter\"].includes(answer)) {\n            console.log(`You selected: ${answer}`);\n            const selectedClub = clubs_1.clubs.find(club => club.name === answer);\n            return selectedClub;\n        }\n        else {\n            console.log('Invalid choice. Please enter \"Driver\", \"Long iron\", \"Iron\", \"Wedge\", \"Sand\", \"Putter\".');\n        }\n    }\n    rl.close();\n}\nasync function askHitBall(player) {\n    let answer = await rl.question('Would you like to hit the ball? (yes/no): ');\n    if ([\"yes\", \"no\"].includes(answer)) {\n        console.log(`THWACK!`);\n        const hit = (0, hit_ball_1.default)(player);\n        console.log(hit);\n        return;\n    }\n    else {\n        console.log('Invalid choice. Please enter \"yes\" or \"no\".');\n    }\n    rl.close();\n}\nasync function runGame() {\n    console.log(chalk.bgGrey('********** Add players **********', '\\n'));\n    const firstName = await rl.question('What is the name of the first player? ');\n    const secondName = await rl.question('And what is name of the second player? ');\n    const response = (0, player_selection_1.default)(firstName, secondName);\n    console.log(chalk.bgGrey('\\n'));\n    console.log(chalk.green(\"⛳️ \", response));\n    console.log(chalk.bgGrey('\\n'));\n    const playerOne = match.data.find(player => player.id === 1);\n    const playerTwo = match.data.find(player => player.id === 2);\n    console.log(\"You are teeing off first \" + playerOne.name);\n    console.log(chalk.bgGrey('\\n'));\n    console.log(\"Select your position on the tee\");\n    console.log(chalk.bgGrey('\\n'));\n    const chosenPosition = await askTeePosition();\n    const responsePlayerOneTeeOff = (0, tee_off_position_1.default)(playerOne, chosenPosition);\n    console.log(responsePlayerOneTeeOff);\n    console.log(chalk.bgGrey('\\n'));\n    const clubResponse = await askClubSelection();\n    (0, club_selection_1.default)(playerOne, clubResponse);\n    await askHitBall(playerOne);\n    console.log('Press enter to continue to the next player');\n    console.log(chalk.bgGrey('\\n'));\n}\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/types/clubs.ts":
/*!****************************!*\
  !*** ./src/types/clubs.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.clubs = void 0;\nexports.clubs = [\n    {\n        name: \"Wedge\",\n        distance: 3,\n        rough: true,\n        sand: false,\n        fairwayPower: [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 1, 1],\n        fairwayAccuracy: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]\n    },\n    {\n        name: \"Iron\",\n        distance: 4,\n        rough: true,\n        sand: false,\n        fairwayPower: [-4, -4, -3, -2, -1, 0, 0, 0, 1, 1, 1, 1],\n        fairwayAccuracy: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3]\n    },\n    {\n        name: \"Long Iron\",\n        distance: 5,\n        rough: false,\n        sand: false,\n        fairwayPower: [-5, -4, -3, -2, -1, 0, 0, 0, 1, 1, 1, 2],\n        fairwayAccuracy: [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3]\n    },\n    {\n        name: \"Driver\",\n        distance: 6,\n        rough: false,\n        sand: false,\n        fairwayPower: [-5, -5, -4, -3, -2, -1, 0, 0, 1, 2, 2, 2],\n        fairwayAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]\n    },\n    // {\n    //     name: \"Sand\", \n    //     distance: 2, \n    //     rough: false, \n    //     sand: true, \n    //     sandPower: [-2, -2, -1, -1, 0, 0, 0, 0, 1, 1, 1, 2],\n    //     sandAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]\n    // },\n    // {\n    //     name: \"Putter\", \n    //     distance: 3, \n    //     rough: false, \n    //     sand: false,\n    //     putterPower: [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 1, 1],\n    //     putterAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3] \n    // }\n];\n\n\n//# sourceURL=webpack:///./src/types/clubs.ts?");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:os");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:tty":
/*!***************************!*\
  !*** external "node:tty" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:tty");

/***/ }),

/***/ "readline/promises":
/*!************************************!*\
  !*** external "readline/promises" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("readline/promises");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
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
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;