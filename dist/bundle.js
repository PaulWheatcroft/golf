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
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.diceRoller = void 0;\nexports[\"default\"] = hitBall;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\nconst clubs_1 = __webpack_require__(/*! ../types/clubs */ \"./src/types/clubs.ts\");\nconst turn_manager_1 = __webpack_require__(/*! ../utilities/turn-manager */ \"./src/utilities/turn-manager.ts\");\n// Move rollDice to a separate module for easier mocking\nexports.diceRoller = {\n    rollDice: () => {\n        return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;\n    }\n};\nfunction getClubModifiers(selectedClub, powerRoll, accuracyRoll) {\n    const clubAttributes = clubs_1.clubs.find(club => club.name === selectedClub.club.name);\n    const power = clubAttributes.fairwayPower[powerRoll - 1];\n    const accuracy = clubAttributes.fairwayAccuracy[accuracyRoll - 1];\n    return { power, accuracy };\n}\nconst accuracyTextMap = (accuracy) => (accuracy === 1 ? 'left' :\n    accuracy === 2 ? 'straight' :\n        accuracy === 3 ? 'right' :\n            'unknown');\nfunction hitBall(player, options = { checkTurn: true }) {\n    const match = match_1.default.getInstance();\n    const matchData = match.data;\n    const selectedClub = matchData.findLast(item => item.type === 'clubSelection');\n    if (!selectedClub)\n        return 'Please select a club';\n    if (selectedClub.playerId !== player.id)\n        return 'It is not your turn';\n    // Optional turn validation (can be disabled for testing)\n    if (options.checkTurn && !(0, turn_manager_1.isPlayerTurn)(player.id, matchData, match.map)) {\n        return `It's not your turn. Wait for the other player to take their shot.`;\n    }\n    const currentPosition = matchData.findLast(item => item.type === 'hitBall' && item.playerId === player.id) ||\n        matchData.findLast(item => item.type === 'teeOffPosition' && item.playerId === player.id);\n    // Use the diceRoller object instead of directly calling rollDice\n    const powerRoll = exports.diceRoller.rollDice();\n    const accuracyRoll = exports.diceRoller.rollDice();\n    const { power, accuracy } = getClubModifiers(selectedClub, powerRoll, accuracyRoll);\n    const distance = selectedClub.club.distance + power;\n    let newAccuracy = currentPosition.position[1];\n    if (accuracy === 1)\n        newAccuracy -= 1;\n    else if (accuracy === 3)\n        newAccuracy += 1;\n    const newPosition = [currentPosition.position[0] - distance, newAccuracy];\n    matchData.push({ playerId: player.id, playerName: player.name, type: 'hitBall', position: newPosition });\n    return `Player ${player.name} started at ${currentPosition.position} and hit the ball ${distance}0 yards ${accuracyTextMap(accuracy)} to position ${newPosition}`;\n}\n\n\n//# sourceURL=webpack:///./src/commands/hit-ball.ts?");

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
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = teeOffPosition;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\nfunction teeOffPosition(player, position) {\n    const match = match_1.default.getInstance();\n    if (!player) {\n        return 'Please select a player';\n    }\n    if (player.id === 2) {\n        const player1TeeOff = match.data.find(item => item.type === 'teeOffPosition' && item.playerId === 1);\n        if (!player1TeeOff) {\n            return 'Please wait for the first player to tee off';\n        }\n    }\n    const teeOffPosition = match.teeoffPosition[(position - 1)];\n    match.data.push({ playerId: player.id, playerName: player.name, type: 'teeOffPosition', position: teeOffPosition });\n    return `Player ${player.name} to tee off from position ${position}`;\n}\n\n\n//# sourceURL=webpack:///./src/commands/tee-off-position.ts?");

/***/ }),

/***/ "./src/data-store/holes.ts":
/*!*********************************!*\
  !*** ./src/data-store/holes.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.firstHole = void 0;\nexports.firstHole = {\n    map: [\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"green\", \"green\", \"green\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"green\", \"green\", \"green\", \"green\", \"green\", \"fairway\"],\n        [\"fairway\", \"green\", \"green\", \"hole\", \"green\", \"green\", \"fairway\"],\n        [\"fairway\", \"green\", \"green\", \"green\", \"green\", \"green\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"green\", \"green\", \"green\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"teeoffLeft\", \"teeoffCenter\", \"teeoffRight\", \"fairway\", \"fairway\", \"fairway\"],\n    ],\n    teeoffPositions: [[16, 1], [16, 2], [16, 3]],\n    greenMap: {\n        map: [\n            [\"flat\", \"upLeft\", \"upLeft\", \"up\", \"up\", \"up\", \"upRight\", \"upRight\", \"flat\", \"flat\"],\n            [\"flat\", \"upLeft\", \"up\", \"up\", \"up\", \"up\", \"up\", \"upRight\", \"flat\", \"flat\"],\n            [\"flat\", \"left\", \"flat\", \"flat\", \"up\", \"up\", \"flat\", \"right\", \"flat\", \"flat\"],\n            [\"left\", \"left\", \"flat\", \"flat\", \"flat\", \"flat\", \"flat\", \"right\", \"right\", \"flat\"],\n            [\"left\", \"flat\", \"flat\", \"flat\", \"hole\", \"flat\", \"flat\", \"flat\", \"right\", \"flat\"],\n            [\"left\", \"left\", \"flat\", \"flat\", \"flat\", \"flat\", \"flat\", \"right\", \"right\", \"flat\"],\n            [\"flat\", \"left\", \"flat\", \"flat\", \"down\", \"down\", \"flat\", \"right\", \"flat\", \"flat\"],\n            [\"flat\", \"downLeft\", \"down\", \"down\", \"down\", \"down\", \"down\", \"downRight\", \"flat\", \"flat\"],\n            [\"flat\", \"downLeft\", \"downLeft\", \"down\", \"down\", \"down\", \"downRight\", \"downRight\", \"flat\", \"flat\"],\n            [\"flat\", \"flat\", \"flat\", \"flat\", \"flat\", \"flat\", \"flat\", \"flat\", \"flat\", \"flat\"]\n        ],\n        mainMapGreenCoords: {\n            topLeft: [1, 2],\n            bottomRight: [5, 5],\n            holePosition: [3, 3]\n        },\n        holePosition: [4, 4]\n    }\n};\n\n\n//# sourceURL=webpack:///./src/data-store/holes.ts?");

/***/ }),

/***/ "./src/data-store/match.ts":
/*!*********************************!*\
  !*** ./src/data-store/match.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createMatch = createMatch;\nconst holes_1 = __webpack_require__(/*! ./holes */ \"./src/data-store/holes.ts\");\nclass Hole {\n    data = [];\n    map = holes_1.firstHole.map;\n    teeoffPosition = holes_1.firstHole.teeoffPositions;\n    greenMap = holes_1.firstHole.greenMap;\n    static instance;\n    constructor() {\n        const { firstHole } = __webpack_require__(/*! ./holes */ \"./src/data-store/holes.ts\");\n        this.map = firstHole.map;\n        this.teeoffPosition = firstHole.teeoffPositions;\n        this.greenMap = firstHole.greenMap;\n    }\n    static getInstance() {\n        if (!Hole.instance) {\n            Hole.instance = new Hole();\n        }\n        return Hole.instance;\n    }\n}\nexports[\"default\"] = Hole;\nfunction createMatch() {\n    return {\n        player1Position: [0, 0],\n        player2Position: [0, 0],\n        player1Strokes: 0,\n        player2Strokes: 0,\n        currentPlayerIndex: 0,\n        currentHole: {\n            par: 4,\n            distance: 400,\n            greenMap: {\n                map: [\n                    ['flat', 'up-right', 'up', 'up-left', 'flat'],\n                    ['right', 'up-right', 'up', 'up-left', 'left'],\n                    ['right', 'right', 'flat', 'left', 'left'],\n                    ['down-right', 'down-right', 'down', 'down-left', 'down-left'],\n                    ['down-right', 'down', 'down', 'down', 'down-left']\n                ],\n                holePosition: [2, 2]\n            }\n        },\n        isComplete: false\n    };\n}\n\n\n//# sourceURL=webpack:///./src/data-store/match.ts?");

/***/ }),

/***/ "./src/fontend/display-hole-map.ts":
/*!*****************************************!*\
  !*** ./src/fontend/display-hole-map.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports[\"default\"] = displayHoleMap;\nconst match_1 = __importDefault(__webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\"));\nconst firstHole = match_1.default.getInstance();\nasync function displayHoleMap() {\n    // Use dynamic import for chalk\n    const chalk = (await __webpack_require__.e(/*! import() */ \"vendors-node_modules_chalk_source_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! chalk */ \"./node_modules/chalk/source/index.js\"))).default;\n    // Get fresh data each time\n    const data = firstHole.data;\n    // Get the latest position for each player\n    const player1Position = data.findLast(item => (item.type === 'hitBall' || item.type === 'teeOffPosition') &&\n        item.playerId === 1);\n    const player2Position = data.findLast(item => (item.type === 'hitBall' || item.type === 'teeOffPosition') &&\n        item.playerId === 2);\n    // Circle icons for players\n    const player1Icon = ' ● ';\n    const player2Icon = ' ○ ';\n    const bothPlayersIcon = ' ◉ ';\n    console.log('Hole Map:');\n    for (let row = 0; row < firstHole.map.length; row++) {\n        const rowData = firstHole.map[row];\n        let rowStr = '';\n        for (let col = 0; col < rowData.length; col++) {\n            const cell = rowData[col];\n            // Check if current position matches a player's position (using [row, col] format)\n            const isPlayer1Here = player1Position &&\n                player1Position.position &&\n                player1Position.position[0] === row &&\n                player1Position.position[1] === col;\n            const isPlayer2Here = player2Position &&\n                player2Position.position &&\n                player2Position.position[0] === row &&\n                player2Position.position[1] === col;\n            // Players with matching terrain background\n            if (isPlayer1Here && isPlayer2Here) {\n                const bgColor = getBackgroundColor(cell, chalk);\n                rowStr += bgColor(chalk.white(bothPlayersIcon));\n            }\n            else if (isPlayer1Here) {\n                const bgColor = getBackgroundColor(cell, chalk);\n                rowStr += bgColor(chalk.white(player1Icon));\n            }\n            else if (isPlayer2Here) {\n                const bgColor = getBackgroundColor(cell, chalk);\n                rowStr += bgColor(chalk.black(player2Icon));\n            }\n            else {\n                // No player here, display terrain\n                switch (cell) {\n                    case 'fairway':\n                        rowStr += chalk.bgGreen('   ');\n                        break;\n                    case 'green':\n                        rowStr += chalk.bgCyan('   ');\n                        break;\n                    case 'hole':\n                        rowStr += chalk.bgCyan('(H)');\n                        break;\n                    case 'teeoffLeft':\n                        rowStr += chalk.white.bgGreen(' 🀙 ');\n                        break;\n                    case 'teeoffCenter':\n                        rowStr += chalk.bgGreen(' 🀚 ');\n                        break;\n                    case 'teeoffRight':\n                        rowStr += chalk.bgGreen(' 🀛 ');\n                        break;\n                    default:\n                        rowStr += '   ';\n                }\n            }\n        }\n        console.log(rowStr);\n    }\n    // Add legend\n    console.log('\\nLegend:');\n    console.log(chalk.white(' ●  - Player 1'));\n    console.log(chalk.black(' ○  - Player 2'));\n    console.log(chalk.white(' ◉  - Both players'));\n    console.log(chalk.bgCyan('   ') + ' - Green');\n    console.log(chalk.bgGreen('   ') + ' - Fairway');\n    console.log(chalk.bgCyan('(H)') + ' - Hole');\n    console.log(chalk.bgGreen(' 🀙  🀚  🀛 ') + ' - Tee-off positions');\n    // For debugging\n    console.log(\"\\nPlayer Positions:\");\n    if (player1Position)\n        console.log(`Player 1: ${player1Position.playerName} at position ${JSON.stringify(player1Position.position)}`);\n    if (player2Position)\n        console.log(`Player 2: ${player2Position?.playerName} at position ${JSON.stringify(player2Position?.position)}`);\n    return;\n}\n// Helper function to get background color for a terrain type\nfunction getBackgroundColor(cell, chalk) {\n    switch (cell) {\n        case 'fairway': return chalk.bgGreen;\n        case 'green': return chalk.bgCyan;\n        case 'teeoffLeft':\n        case 'teeoffCenter':\n        case 'teeoffRight': return chalk.bgWhite;\n        default: return chalk.bgGreen; // Default to fairway\n    }\n}\n\n\n//# sourceURL=webpack:///./src/fontend/display-hole-map.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst display_hole_map_1 = __importDefault(__webpack_require__(/*! ./fontend/display-hole-map */ \"./src/fontend/display-hole-map.ts\"));\nconst player_selection_1 = __importDefault(__webpack_require__(/*! ./commands/player-selection */ \"./src/commands/player-selection.ts\"));\nconst club_selection_1 = __importDefault(__webpack_require__(/*! ./commands/club-selection */ \"./src/commands/club-selection.ts\"));\nconst tee_off_position_1 = __importDefault(__webpack_require__(/*! ./commands/tee-off-position */ \"./src/commands/tee-off-position.ts\"));\nconst hit_ball_1 = __importDefault(__webpack_require__(/*! ./commands/hit-ball */ \"./src/commands/hit-ball.ts\"));\nconst match_1 = __importDefault(__webpack_require__(/*! ./data-store/match */ \"./src/data-store/match.ts\"));\nconst holes_1 = __webpack_require__(/*! ./data-store/holes */ \"./src/data-store/holes.ts\");\nconst clubs_1 = __webpack_require__(/*! ./types/clubs */ \"./src/types/clubs.ts\");\nconst turn_manager_1 = __webpack_require__(/*! ./utilities/turn-manager */ \"./src/utilities/turn-manager.ts\");\nconst clear_1 = __importDefault(__webpack_require__(/*! clear */ \"./node_modules/clear/index.js\"));\n// Use dynamic import for chalk to avoid ESM/CommonJS issues\nlet chalk;\n(async () => {\n    chalk = (await __webpack_require__.e(/*! import() */ \"vendors-node_modules_chalk_source_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! chalk */ \"./node_modules/chalk/source/index.js\"))).default;\n    init();\n})();\nconst match = match_1.default.getInstance();\nlet actionQueue = [];\nconst readline = __webpack_require__(/*! readline/promises */ \"readline/promises\");\nconst { stdin, stdout } = __webpack_require__(/*! process */ \"process\");\nlet rl = readline.createInterface(process.stdin, process.stdout);\n// Set up raw mode for stdin to capture arrow keys\nstdin.setRawMode(true);\nstdin.resume();\nstdin.setEncoding('utf8');\nasync function init() {\n    (0, clear_1.default)();\n    console.log(chalk.green(\"********************************************\"));\n    console.log(chalk.green(\"********** Welcome to Golf World! **********\"));\n    console.log(chalk.green(\"********************************************\", '\\n'));\n    console.log(chalk.bgGrey('********** Hole 1 **********', '\\n'));\n    await (0, display_hole_map_1.default)();\n    let playerOne = '';\n    let playerTwo = '';\n    console.log('\\n');\n    runGame();\n}\nasync function pressSpaceBarToContinue(action) {\n    return new Promise((resolve) => {\n        rl.question(`Press spacebar to ${action} `, (answer) => {\n            if (answer === ' ') {\n                resolve(action);\n            }\n            else {\n                console.log('Invalid input. Please press the spacebar.');\n                pressSpaceBarToContinue(action).then(resolve);\n            }\n        });\n    });\n}\nasync function askTeePosition() {\n    // Ensure raw mode is disabled for proper readline input\n    stdin.setRawMode(false);\n    let answer;\n    while (true) {\n        answer = await rl.question('Where would you like to tee off from? (1, 2, or 3): ');\n        if (['1', '2', '3'].includes(answer)) {\n            // Re-enable raw mode for next club selection\n            stdin.setRawMode(true);\n            return parseInt(answer);\n        }\n        else {\n            console.log('Invalid choice. Please enter 1, 2, or 3.');\n        }\n    }\n}\nasync function askClubSelection(player) {\n    // Fixed: Match actual club names from clubs.ts and remove unavailable clubs\n    const availableClubs = [\"Driver\", \"Long Iron\", \"Iron\", \"Wedge\"];\n    let selectedIndex = 0;\n    // Get current position and distance from hole\n    const currentPosition = match.data.findLast(item => (item.type === 'hitBall' || item.type === 'teeOffPosition') &&\n        item.playerId === player.id);\n    const gameStatus = (0, turn_manager_1.getGameStatus)(match.data, holes_1.firstHole.map);\n    const playerStat = gameStatus.playerStats.find(p => p.player.id === player.id);\n    const distanceFromHole = Math.round(playerStat?.distance || 0);\n    // Function to display the club selection menu with enhanced information\n    const displayMenu = () => {\n        (0, clear_1.default)();\n        console.log(chalk.bgBlue.white(`\\n🏌️ ${player.name.toUpperCase()}'S CLUB SELECTION 🏌️`));\n        console.log(chalk.yellow(`\\n📍 Current Position: Row ${currentPosition.position[0]}, Column ${currentPosition.position[1]}`));\n        console.log(chalk.yellow(`🎯 Distance to Hole: ${distanceFromHole} yards\\n`));\n        console.log(chalk.white('Select your club using ↑↓ arrows and press SPACE to confirm:\\n'));\n        availableClubs.forEach((club, index) => {\n            const clubInfo = clubs_1.clubs.find(c => c.name === club);\n            if (index === selectedIndex) {\n                console.log(chalk.bgGreen(` > ${club.padEnd(12)} | Range: ${clubInfo.distance}0 yards < `));\n            }\n            else {\n                console.log(chalk.gray(`   ${club.padEnd(12)} | Range: ${clubInfo.distance}0 yards   `));\n            }\n        });\n    };\n    return new Promise((resolve, reject) => {\n        displayMenu();\n        const handleKeyPress = (data) => {\n            if (data === '\\u001b[A') { // Up arrow\n                selectedIndex = Math.max(0, selectedIndex - 1);\n                displayMenu();\n            }\n            else if (data === '\\u001b[B') { // Down arrow\n                selectedIndex = Math.min(availableClubs.length - 1, selectedIndex + 1);\n                displayMenu();\n            }\n            else if (data === ' ') { // Spacebar\n                stdin.removeListener('data', handleKeyPress);\n                stdin.setRawMode(false);\n                const selectedClub = clubs_1.clubs.find(club => club.name === availableClubs[selectedIndex]);\n                if (!selectedClub) {\n                    reject(new Error(`Selected club \"${availableClubs[selectedIndex]}\" not found in clubs data`));\n                    return;\n                }\n                console.log(chalk.green(`\\n🎯 ${player.name} selected: ${availableClubs[selectedIndex]} (Range: ${selectedClub.distance}0 yards)`));\n                // Don't automatically reset raw mode - let the calling function manage it\n                resolve(selectedClub);\n            }\n            else if (data === '\\u0003') { // Ctrl+C\n                stdin.setRawMode(false);\n                stdin.pause();\n                process.exit();\n            }\n        };\n        stdin.on('data', handleKeyPress);\n    });\n}\nasync function askHitBall(player) {\n    // Ensure readline mode for reliable input\n    stdin.setRawMode(false);\n    console.log(chalk.bgBlue.white(`\\n⛳ ${player.name.toUpperCase()}'S SHOT ⛳`));\n    console.log(chalk.yellow('Press ENTER when ready to swing!'));\n    await rl.question('');\n    console.log(`\\n💥 THWACK! ${player.name} takes their shot!`);\n    const hit = (0, hit_ball_1.default)(player);\n    console.log(hit);\n    // Re-enable raw mode for club selection\n    stdin.setRawMode(true);\n}\nasync function runGame() {\n    try {\n        // Game setup\n        console.log(chalk.bgGrey('********** Add players **********', '\\n'));\n        // Ensure raw mode is disabled for name input\n        stdin.setRawMode(false);\n        const firstName = await rl.question('What is the name of the first player? ');\n        const secondName = await rl.question('And what is name of the second player? ');\n        // Re-enable raw mode for subsequent interactions\n        stdin.setRawMode(true);\n        const response = (0, player_selection_1.default)(firstName, secondName);\n        console.log(chalk.bgGrey('\\n'));\n        console.log(chalk.green(\"⛳️ \", response));\n        console.log(chalk.bgGrey('\\n'));\n        const playerOne = match.data.find(player => player.id === 1);\n        const playerTwo = match.data.find(player => player.id === 2);\n        console.log(\"You are teeing off first \" + playerOne.name);\n        //   Player one tee off\n        console.log(chalk.bgGrey('\\n'));\n        console.log(\"Select your position on the tee\");\n        console.log(chalk.bgGrey('\\n'));\n        const chosenPositionPlayerOne = await askTeePosition();\n        const responsePlayerOneTeeOff = (0, tee_off_position_1.default)(playerOne, chosenPositionPlayerOne);\n        console.log(responsePlayerOneTeeOff);\n        console.log(chalk.bgGrey('\\n'));\n        const clubResponse = await askClubSelection(playerOne);\n        (0, club_selection_1.default)(playerOne, clubResponse);\n        await askHitBall(playerOne);\n        await (0, display_hole_map_1.default)();\n        //   Player two tee off\n        console.log(chalk.bgGrey('\\n'));\n        console.log(\"Select your position on the tee player two\");\n        console.log(chalk.bgGrey('\\n'));\n        const chosenPositionPlayerTwo = await askTeePosition();\n        const responsePlayerTwoTeeOff = (0, tee_off_position_1.default)(playerTwo, chosenPositionPlayerTwo);\n        console.log(responsePlayerTwoTeeOff);\n        console.log(chalk.bgGrey('\\n'));\n        const clubResponsePlayerTwo = await askClubSelection(playerTwo);\n        (0, club_selection_1.default)(playerTwo, clubResponsePlayerTwo);\n        await askHitBall(playerTwo);\n        await (0, display_hole_map_1.default)();\n        // ========== CONTINUOUS SHOT MANAGEMENT ==========\n        console.log(chalk.bgYellow('\\n********** Starting Regular Play **********\\n'));\n        // Main game loop - continue until both players reach green\n        while (true) {\n            const gameStatus = (0, turn_manager_1.getGameStatus)(match.data, holes_1.firstHole.map);\n            console.log(chalk.bgBlue('\\n============= GAME STATUS ============='));\n            // Enhanced status message with clear visual indicators\n            gameStatus.playerStats.forEach(stat => {\n                const statusIcon = stat.isOnGreen ? '🟢' : '🔴';\n                const turnIcon = gameStatus.nextPlayer?.id === stat.player.id ? '👉 ' : '   ';\n                console.log(`${turnIcon}${statusIcon} ${stat.player.name.padEnd(15)} | ${stat.strokeCount} strokes | ${stat.distance || 0} yards from hole`);\n            });\n            console.log(chalk.bgBlue('======================================\\n'));\n            // Check if both players are on green (ready for putting)\n            if ((0, turn_manager_1.isPlayerOnGreen)(playerOne.id, match.data, holes_1.firstHole.map) && (0, turn_manager_1.isPlayerOnGreen)(playerTwo.id, match.data, holes_1.firstHole.map)) {\n                console.log(chalk.bgGreen('\\n🏌️‍♀️⛳ Both players have reached the green! Time for putting! 🏌️‍♂️⛳\\n'));\n                break;\n            }\n            // Determine whose turn it is based on distance from hole\n            const nextPlayer = (0, turn_manager_1.getNextPlayer)(match.data, holes_1.firstHole.map);\n            if (!nextPlayer) {\n                console.log(chalk.red('Error: Unable to determine next player. Ending game.'));\n                break;\n            }\n            // Enhanced turn announcement\n            console.log(chalk.bgGreen.white(`\\n⭐ ==========================================`));\n            console.log(chalk.bgGreen.white(`      ${nextPlayer.name.toUpperCase()}'S TURN TO PLAY`));\n            console.log(chalk.bgGreen.white(`⭐ ==========================================\\n`));\n            const playerStat = gameStatus.playerStats.find(p => p.player.id === nextPlayer.id);\n            console.log(chalk.yellow(`🎯 Current position: ${Math.round(playerStat?.distance || 0)} yards from the hole`));\n            // Clear indication before club selection\n            console.log(chalk.bgYellow.black(`\\n🏌️ ${nextPlayer.name.toUpperCase()}, select your club! 🏌️\\n`));\n            // Player's shot sequence\n            const clubChoiceForShot = await askClubSelection(nextPlayer);\n            (0, club_selection_1.default)(nextPlayer, clubChoiceForShot);\n            await askHitBall(nextPlayer);\n            await (0, display_hole_map_1.default)();\n            // Clear transition to next turn\n            console.log(chalk.bgMagenta('\\n⏭️  Press ENTER to continue to next player...'));\n            stdin.setRawMode(false);\n            await rl.question('');\n            stdin.setRawMode(true);\n            // Clear screen for next turn\n            (0, clear_1.default)();\n        }\n        console.log(chalk.bgMagenta('\\n🎉 Game complete! Great round of golf! 🎉\\n'));\n    }\n    catch (error) {\n        console.error('Game error:', error);\n        console.log('Restarting game...');\n        // Reset game state and restart\n        match.data = [];\n        runGame();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/types/clubs.ts":
/*!****************************!*\
  !*** ./src/types/clubs.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.clubs = void 0;\nexports.clubs = [\n    {\n        name: \"Wedge\",\n        distance: 3,\n        rough: true,\n        sand: false,\n        fairwayPower: [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 1, 1],\n        fairwayAccuracy: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]\n    },\n    {\n        name: \"Iron\",\n        distance: 4,\n        rough: true,\n        sand: false,\n        fairwayPower: [-4, -4, -3, -2, -1, 0, 0, 0, 1, 1, 1, 1],\n        fairwayAccuracy: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3]\n    },\n    {\n        name: \"Long Iron\",\n        distance: 5,\n        rough: false,\n        sand: false,\n        fairwayPower: [-5, -4, -3, -2, -1, 0, 0, 0, 1, 1, 1, 2],\n        fairwayAccuracy: [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3]\n    },\n    {\n        name: \"Driver\",\n        distance: 6,\n        rough: false,\n        sand: false,\n        fairwayPower: [-5, -5, -4, -3, -2, -1, 0, 0, 1, 2, 2, 2],\n        fairwayAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]\n    },\n    // {\n    //     name: \"Sand\", \n    //     distance: 2, \n    //     rough: false, \n    //     sand: true, \n    //     sandPower: [-2, -2, -1, -1, 0, 0, 0, 0, 1, 1, 1, 2],\n    //     sandAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]\n    // },\n    // {\n    //     name: \"Putter\", \n    //     distance: 3, \n    //     rough: false, \n    //     sand: false,\n    //     putterPower: [-3, -3, -2, -1, 0, 0, 0, 0, 1, 1, 1, 1],\n    //     putterAccuracy: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3] \n    // }\n];\n\n\n//# sourceURL=webpack:///./src/types/clubs.ts?");

/***/ }),

/***/ "./src/utilities/index.ts":
/*!********************************!*\
  !*** ./src/utilities/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isArrayInArrayOfArrays = isArrayInArrayOfArrays;\nexports.findHolePosition = findHolePosition;\nexports.calculateEuclideanDistance = calculateEuclideanDistance;\nexports.calculateDistanceFromHole = calculateDistanceFromHole;\nexports.getPlayerDistanceFromHole = getPlayerDistanceFromHole;\nfunction isArrayInArrayOfArrays(array, arrayOfArrays) {\n    return arrayOfArrays.some(arr => {\n        const isEqual = arr[0] === array[0] && arr[1] === array[1];\n        return isEqual;\n    });\n}\n/**\n * Find the hole position from the map data\n * @param map - The 2D array representing the golf course map\n * @returns The [row, col] position of the hole, or null if not found\n */\nfunction findHolePosition(map) {\n    for (let row = 0; row < map.length; row++) {\n        for (let col = 0; col < map[row].length; col++) {\n            if (map[row][col] === 'hole') {\n                return [row, col];\n            }\n        }\n    }\n    return null;\n}\n/**\n * Calculate the Euclidean distance between two points\n * @param point1 - First point as [row, col]\n * @param point2 - Second point as [row, col]\n * @returns The distance between the two points\n */\nfunction calculateEuclideanDistance(point1, point2) {\n    const [x1, y1] = point1;\n    const [x2, y2] = point2;\n    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));\n}\n/**\n * Calculate distance from a player's position to the hole\n * @param playerPosition - Player's current position as [row, col]\n * @param map - The 2D array representing the golf course map\n * @returns The distance from player to hole, or null if hole not found or invalid position\n */\nfunction calculateDistanceFromHole(playerPosition, map) {\n    // Validate player position\n    if (!playerPosition || playerPosition.length !== 2) {\n        return null;\n    }\n    const [playerRow, playerCol] = playerPosition;\n    // Check if player position is within map bounds\n    if (playerRow < 0 || playerRow >= map.length ||\n        playerCol < 0 || playerCol >= map[0].length) {\n        return null;\n    }\n    // Find hole position\n    const holePosition = findHolePosition(map);\n    if (!holePosition) {\n        return null;\n    }\n    // Calculate and return distance\n    return calculateEuclideanDistance(playerPosition, holePosition);\n}\n/**\n * Get distance from hole for a specific player from game data\n * @param playerId - The ID of the player\n * @param gameData - The game data array containing player positions\n * @param map - The golf course map\n * @returns The distance from player to hole, or null if player position not found\n */\nfunction getPlayerDistanceFromHole(playerId, gameData, map) {\n    // Find the most recent position for the player (either hitBall or teeOffPosition)\n    const playerPosition = gameData.findLast(item => (item.type === 'hitBall' || item.type === 'teeOffPosition') &&\n        item.playerId === playerId);\n    if (!playerPosition || !playerPosition.position) {\n        return null;\n    }\n    return calculateDistanceFromHole(playerPosition.position, map);\n}\n\n\n//# sourceURL=webpack:///./src/utilities/index.ts?");

/***/ }),

/***/ "./src/utilities/turn-manager.ts":
/*!***************************************!*\
  !*** ./src/utilities/turn-manager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getPlayerStrokeCount = getPlayerStrokeCount;\nexports.getActivePlayers = getActivePlayers;\nexports.isPlayerOnGreen = isPlayerOnGreen;\nexports.getNextPlayer = getNextPlayer;\nexports.isPlayerTurn = isPlayerTurn;\nexports.getGameStatus = getGameStatus;\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/utilities/index.ts\");\n/**\n * Get stroke count for a specific player\n * @param playerId - The ID of the player\n * @param gameData - The game data array\n * @returns The number of strokes taken by the player\n */\nfunction getPlayerStrokeCount(playerId, gameData) {\n    const hitBallEvents = gameData.filter(item => item.type === 'hitBall' && item.playerId === playerId);\n    return hitBallEvents.length;\n}\n/**\n * Get all active players from game data\n * @param gameData - The game data array\n * @returns Array of player objects\n */\nfunction getActivePlayers(gameData) {\n    return gameData.filter(item => item.type === 'player');\n}\n/**\n * Check if a player is on the green\n * @param playerId - The ID of the player\n * @param gameData - The game data array\n * @param map - The golf course map\n * @returns True if player is on green terrain\n */\nfunction isPlayerOnGreen(playerId, gameData, map) {\n    const playerPosition = gameData.findLast(item => (item.type === 'hitBall' || item.type === 'teeOffPosition') &&\n        item.playerId === playerId);\n    if (!playerPosition || !playerPosition.position) {\n        return false;\n    }\n    const [row, col] = playerPosition.position;\n    if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) {\n        return false;\n    }\n    return map[row][col] === 'green' || map[row][col] === 'hole';\n}\n/**\n * Determine which player should take the next shot\n * @param gameData - The game data array containing all game events\n * @param map - The golf course map\n * @returns The player who should take the next shot, or null if game is complete\n */\nfunction getNextPlayer(gameData, map) {\n    const players = getActivePlayers(gameData);\n    if (players.length === 0) {\n        return null;\n    }\n    // Check if all players are on the green (putting phase)\n    const allOnGreen = players.every(player => isPlayerOnGreen(player.id, gameData, map));\n    if (allOnGreen) {\n        // In putting phase, use different logic if needed\n        // For now, use same distance-based logic\n    }\n    // Calculate distances and stroke counts for all players\n    const playerStats = players.map(player => {\n        const distance = (0, index_1.getPlayerDistanceFromHole)(player.id, gameData, map);\n        const strokeCount = getPlayerStrokeCount(player.id, gameData);\n        return {\n            player,\n            distance,\n            strokeCount,\n            isOnGreen: isPlayerOnGreen(player.id, gameData, map)\n        };\n    }).filter(stat => stat.distance !== null); // Filter out players without valid positions\n    if (playerStats.length === 0) {\n        return null;\n    }\n    // Sort by distance (furthest first), then by stroke count (fewer strokes first) for tie-breaking\n    playerStats.sort((a, b) => {\n        // Primary sort: furthest from hole goes first\n        if (a.distance !== b.distance) {\n            return b.distance - a.distance;\n        }\n        // Tie-breaker: player with fewer strokes goes first\n        return a.strokeCount - b.strokeCount;\n    });\n    return playerStats[0].player;\n}\n/**\n * Check if it's a specific player's turn\n * @param playerId - The ID of the player to check\n * @param gameData - The game data array\n * @param map - The golf course map\n * @returns True if it's the specified player's turn\n */\nfunction isPlayerTurn(playerId, gameData, map) {\n    const nextPlayer = getNextPlayer(gameData, map);\n    return nextPlayer?.id === playerId;\n}\n/**\n * Get game status information\n * @param gameData - The game data array\n * @param map - The golf course map\n * @returns Object containing current game status\n */\nfunction getGameStatus(gameData, map) {\n    const players = getActivePlayers(gameData);\n    const nextPlayer = getNextPlayer(gameData, map);\n    const playerStats = players.map(player => {\n        const distance = (0, index_1.getPlayerDistanceFromHole)(player.id, gameData, map);\n        const strokeCount = getPlayerStrokeCount(player.id, gameData);\n        const isOnGreen = isPlayerOnGreen(player.id, gameData, map);\n        return {\n            player,\n            distance: distance ? Math.round(distance * 10) / 10 : null, // Round to 1 decimal\n            strokeCount,\n            isOnGreen\n        };\n    });\n    const allOnGreen = players.every(player => isPlayerOnGreen(player.id, gameData, map));\n    return {\n        nextPlayer,\n        playerStats,\n        allOnGreen,\n        isComplete: nextPlayer === null\n    };\n}\n\n\n//# sourceURL=webpack:///./src/utilities/turn-manager.ts?");

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

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

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