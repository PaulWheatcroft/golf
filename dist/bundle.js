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

/***/ "./src/commands/player-selection.ts":
/*!******************************************!*\
  !*** ./src/commands/player-selection.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ playerSelection)\n/* harmony export */ });\n/* harmony import */ var _data_store_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\");\n\nconst match = _data_store_match__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getInstance();\nfunction playerSelection(playerOne, playerTwo) {\n    const players = [\n        { name: playerOne },\n        { name: playerTwo }\n    ];\n    if (!players[0].name || !players[1].name) {\n        return 'Error selecting players';\n    }\n    const teeOffOrder = players.sort(() => Math.random() - 0.5);\n    match.data.push({\n        id: 1,\n        type: 'player',\n        name: teeOffOrder[0].name,\n    }, {\n        id: 2,\n        type: 'player',\n        name: teeOffOrder[1].name,\n    });\n    return;\n}\n\n\n//# sourceURL=webpack:///./src/commands/player-selection.ts?");

/***/ }),

/***/ "./src/data-store/holes.ts":
/*!*********************************!*\
  !*** ./src/data-store/holes.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   firstHole: () => (/* binding */ firstHole)\n/* harmony export */ });\nconst firstHole = {\n    map: [\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"green\", \"green\", \"green\", \"fairway\"],\n        [\"fairway\", \"green\", \"hole\", \"green\", \"fairway\"],\n        [\"fairway\", \"green\", \"green\", \"green\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"water\", \"fairway\", \"outOfBounds\", \"fairway\"], // Row 7 (Bottom - Water)\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"fairway\", \"fairway\", \"fairway\", \"fairway\"],\n        [\"fairway\", \"teeoff\", \"teeoff\", \"teeoff\", \"fairway\"], // Row 11 (Bottom - Teeoff)\n    ],\n    teeoffPositions: [[11, 2], [11, 3], [11, 4]],\n};\n\n\n//# sourceURL=webpack:///./src/data-store/holes.ts?");

/***/ }),

/***/ "./src/data-store/match.ts":
/*!*********************************!*\
  !*** ./src/data-store/match.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Hole)\n/* harmony export */ });\n/* harmony import */ var _holes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./holes */ \"./src/data-store/holes.ts\");\n\nclass Hole {\n    data = [];\n    map = _holes__WEBPACK_IMPORTED_MODULE_0__.firstHole.map;\n    teeoffPosition = _holes__WEBPACK_IMPORTED_MODULE_0__.firstHole.teeoffPositions;\n    static instance;\n    static getInstance() {\n        if (!Hole.instance) {\n            Hole.instance = new Hole();\n        }\n        return Hole.instance;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/data-store/match.ts?");

/***/ }),

/***/ "./src/fontend/display-hole-map.ts":
/*!*****************************************!*\
  !*** ./src/fontend/display-hole-map.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ displayHoleMap)\n/* harmony export */ });\n/* harmony import */ var _data_store_match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data-store/match */ \"./src/data-store/match.ts\");\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ \"./node_modules/chalk/source/index.js\");\n\n\nconst firstHole = _data_store_match__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getInstance();\nfunction displayHoleMap() {\n    console.log('Hole Map:');\n    for (let i = 0; i < firstHole.map.length; i++) {\n        const row = firstHole.map[i];\n        let rowStr = '';\n        for (let j = 0; j < row.length; j++) {\n            const cell = row[j];\n            switch (cell) {\n                case 'fairway':\n                    rowStr += chalk__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bgGreen('   '); // green background\n                    break;\n                case 'green':\n                    rowStr += chalk__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bgGreenBright('   ');\n                    break;\n                case 'hole':\n                    rowStr += chalk__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bgGreenBright('(H)');\n                    break;\n                case 'water':\n                    rowStr += chalk__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bgBlue('   ');\n                    break;\n                case 'outOfBounds':\n                    rowStr += chalk__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bgRedBright('   '); // red cross\n                    break;\n                case 'teeoff':\n                    rowStr += chalk__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bgWhite(' t '); // yellow golf ball symbol\n                    break;\n                default:\n                    rowStr += '   '; // empty space\n            }\n        }\n        console.log(rowStr);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/fontend/display-hole-map.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fontend_display_hole_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fontend/display-hole-map */ \"./src/fontend/display-hole-map.ts\");\n/* harmony import */ var _commands_player_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/player-selection */ \"./src/commands/player-selection.ts\");\n/* harmony import */ var _data_store_match__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-store/match */ \"./src/data-store/match.ts\");\n\n\n\nconst match = _data_store_match__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getInstance();\nconst readline = __webpack_require__(/*! readline */ \"readline\");\nlet rl = readline.createInterface(process.stdin, process.stdout);\nconsole.log('welcome to Golf World!');\n(0,_fontend_display_hole_map__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nlet playerOne = '';\nlet playerTwo = '';\nrl.question('What is the first player names? ', (firstName) => {\n    rl.question('What is the second player names? ', (secondName) => {\n        (0,_commands_player_selection__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(firstName, secondName);\n        console.log(match.data);\n    });\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "node:os":
/*!**************************!*\
  !*** external "node:os" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("node:process");

/***/ }),

/***/ "node:tty":
/*!***************************!*\
  !*** external "node:tty" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node:tty");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("readline");

/***/ }),

/***/ "./node_modules/chalk/source/index.js":
/*!********************************************!*\
  !*** ./node_modules/chalk/source/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Chalk: () => (/* binding */ Chalk),\n/* harmony export */   backgroundColorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.backgroundColorNames),\n/* harmony export */   backgroundColors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.backgroundColorNames),\n/* harmony export */   chalkStderr: () => (/* binding */ chalkStderr),\n/* harmony export */   colorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.colorNames),\n/* harmony export */   colors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.colorNames),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   foregroundColorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.foregroundColorNames),\n/* harmony export */   foregroundColors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.foregroundColorNames),\n/* harmony export */   modifierNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.modifierNames),\n/* harmony export */   modifiers: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.modifierNames),\n/* harmony export */   supportsColor: () => (/* binding */ stdoutColor),\n/* harmony export */   supportsColorStderr: () => (/* binding */ stderrColor)\n/* harmony export */ });\n/* harmony import */ var _ansi_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/ansi-styles/index.js */ \"./node_modules/chalk/source/vendor/ansi-styles/index.js\");\n/* harmony import */ var _supports_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #supports-color */ \"./node_modules/chalk/source/vendor/supports-color/index.js\");\n/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities.js */ \"./node_modules/chalk/source/utilities.js\");\n\n\n\n\nconst {stdout: stdoutColor, stderr: stderrColor} = _supports_color__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\nconst GENERATOR = Symbol('GENERATOR');\nconst STYLER = Symbol('STYLER');\nconst IS_EMPTY = Symbol('IS_EMPTY');\n\n// `supportsColor.level` → `ansiStyles.color[name]` mapping\nconst levelMapping = [\n\t'ansi',\n\t'ansi',\n\t'ansi256',\n\t'ansi16m',\n];\n\nconst styles = Object.create(null);\n\nconst applyOptions = (object, options = {}) => {\n\tif (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {\n\t\tthrow new Error('The `level` option should be an integer from 0 to 3');\n\t}\n\n\t// Detect level if not set manually\n\tconst colorLevel = stdoutColor ? stdoutColor.level : 0;\n\tobject.level = options.level === undefined ? colorLevel : options.level;\n};\n\nclass Chalk {\n\tconstructor(options) {\n\t\t// eslint-disable-next-line no-constructor-return\n\t\treturn chalkFactory(options);\n\t}\n}\n\nconst chalkFactory = options => {\n\tconst chalk = (...strings) => strings.join(' ');\n\tapplyOptions(chalk, options);\n\n\tObject.setPrototypeOf(chalk, createChalk.prototype);\n\n\treturn chalk;\n};\n\nfunction createChalk(options) {\n\treturn chalkFactory(options);\n}\n\nObject.setPrototypeOf(createChalk.prototype, Function.prototype);\n\nfor (const [styleName, style] of Object.entries(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"])) {\n\tstyles[styleName] = {\n\t\tget() {\n\t\t\tconst builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);\n\t\t\tObject.defineProperty(this, styleName, {value: builder});\n\t\t\treturn builder;\n\t\t},\n\t};\n}\n\nstyles.visible = {\n\tget() {\n\t\tconst builder = createBuilder(this, this[STYLER], true);\n\t\tObject.defineProperty(this, 'visible', {value: builder});\n\t\treturn builder;\n\t},\n};\n\nconst getModelAnsi = (model, level, type, ...arguments_) => {\n\tif (model === 'rgb') {\n\t\tif (level === 'ansi16m') {\n\t\t\treturn _ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"][type].ansi16m(...arguments_);\n\t\t}\n\n\t\tif (level === 'ansi256') {\n\t\t\treturn _ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"][type].ansi256(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"].rgbToAnsi256(...arguments_));\n\t\t}\n\n\t\treturn _ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"][type].ansi(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"].rgbToAnsi(...arguments_));\n\t}\n\n\tif (model === 'hex') {\n\t\treturn getModelAnsi('rgb', level, type, ..._ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hexToRgb(...arguments_));\n\t}\n\n\treturn _ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"][type][model](...arguments_);\n};\n\nconst usedModels = ['rgb', 'hex', 'ansi256'];\n\nfor (const model of usedModels) {\n\tstyles[model] = {\n\t\tget() {\n\t\t\tconst {level} = this;\n\t\t\treturn function (...arguments_) {\n\t\t\t\tconst styler = createStyler(getModelAnsi(model, levelMapping[level], 'color', ...arguments_), _ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"].color.close, this[STYLER]);\n\t\t\t\treturn createBuilder(this, styler, this[IS_EMPTY]);\n\t\t\t};\n\t\t},\n\t};\n\n\tconst bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);\n\tstyles[bgModel] = {\n\t\tget() {\n\t\t\tconst {level} = this;\n\t\t\treturn function (...arguments_) {\n\t\t\t\tconst styler = createStyler(getModelAnsi(model, levelMapping[level], 'bgColor', ...arguments_), _ansi_styles__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bgColor.close, this[STYLER]);\n\t\t\t\treturn createBuilder(this, styler, this[IS_EMPTY]);\n\t\t\t};\n\t\t},\n\t};\n}\n\nconst proto = Object.defineProperties(() => {}, {\n\t...styles,\n\tlevel: {\n\t\tenumerable: true,\n\t\tget() {\n\t\t\treturn this[GENERATOR].level;\n\t\t},\n\t\tset(level) {\n\t\t\tthis[GENERATOR].level = level;\n\t\t},\n\t},\n});\n\nconst createStyler = (open, close, parent) => {\n\tlet openAll;\n\tlet closeAll;\n\tif (parent === undefined) {\n\t\topenAll = open;\n\t\tcloseAll = close;\n\t} else {\n\t\topenAll = parent.openAll + open;\n\t\tcloseAll = close + parent.closeAll;\n\t}\n\n\treturn {\n\t\topen,\n\t\tclose,\n\t\topenAll,\n\t\tcloseAll,\n\t\tparent,\n\t};\n};\n\nconst createBuilder = (self, _styler, _isEmpty) => {\n\t// Single argument is hot path, implicit coercion is faster than anything\n\t// eslint-disable-next-line no-implicit-coercion\n\tconst builder = (...arguments_) => applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));\n\n\t// We alter the prototype because we must return a function, but there is\n\t// no way to create a function with a different prototype\n\tObject.setPrototypeOf(builder, proto);\n\n\tbuilder[GENERATOR] = self;\n\tbuilder[STYLER] = _styler;\n\tbuilder[IS_EMPTY] = _isEmpty;\n\n\treturn builder;\n};\n\nconst applyStyle = (self, string) => {\n\tif (self.level <= 0 || !string) {\n\t\treturn self[IS_EMPTY] ? '' : string;\n\t}\n\n\tlet styler = self[STYLER];\n\n\tif (styler === undefined) {\n\t\treturn string;\n\t}\n\n\tconst {openAll, closeAll} = styler;\n\tif (string.includes('\\u001B')) {\n\t\twhile (styler !== undefined) {\n\t\t\t// Replace any instances already present with a re-opening code\n\t\t\t// otherwise only the part of the string until said closing code\n\t\t\t// will be colored, and the rest will simply be 'plain'.\n\t\t\tstring = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_2__.stringReplaceAll)(string, styler.close, styler.open);\n\n\t\t\tstyler = styler.parent;\n\t\t}\n\t}\n\n\t// We can move both next actions out of loop, because remaining actions in loop won't have\n\t// any/visible effect on parts we add here. Close the styling before a linebreak and reopen\n\t// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92\n\tconst lfIndex = string.indexOf('\\n');\n\tif (lfIndex !== -1) {\n\t\tstring = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_2__.stringEncaseCRLFWithFirstIndex)(string, closeAll, openAll, lfIndex);\n\t}\n\n\treturn openAll + string + closeAll;\n};\n\nObject.defineProperties(createChalk.prototype, styles);\n\nconst chalk = createChalk();\nconst chalkStderr = createChalk({level: stderrColor ? stderrColor.level : 0});\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chalk);\n\n\n//# sourceURL=webpack:///./node_modules/chalk/source/index.js?");

/***/ }),

/***/ "./node_modules/chalk/source/utilities.js":
/*!************************************************!*\
  !*** ./node_modules/chalk/source/utilities.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   stringEncaseCRLFWithFirstIndex: () => (/* binding */ stringEncaseCRLFWithFirstIndex),\n/* harmony export */   stringReplaceAll: () => (/* binding */ stringReplaceAll)\n/* harmony export */ });\n// TODO: When targeting Node.js 16, use `String.prototype.replaceAll`.\nfunction stringReplaceAll(string, substring, replacer) {\n\tlet index = string.indexOf(substring);\n\tif (index === -1) {\n\t\treturn string;\n\t}\n\n\tconst substringLength = substring.length;\n\tlet endIndex = 0;\n\tlet returnValue = '';\n\tdo {\n\t\treturnValue += string.slice(endIndex, index) + substring + replacer;\n\t\tendIndex = index + substringLength;\n\t\tindex = string.indexOf(substring, endIndex);\n\t} while (index !== -1);\n\n\treturnValue += string.slice(endIndex);\n\treturn returnValue;\n}\n\nfunction stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {\n\tlet endIndex = 0;\n\tlet returnValue = '';\n\tdo {\n\t\tconst gotCR = string[index - 1] === '\\r';\n\t\treturnValue += string.slice(endIndex, (gotCR ? index - 1 : index)) + prefix + (gotCR ? '\\r\\n' : '\\n') + postfix;\n\t\tendIndex = index + 1;\n\t\tindex = string.indexOf('\\n', endIndex);\n\t} while (index !== -1);\n\n\treturnValue += string.slice(endIndex);\n\treturn returnValue;\n}\n\n\n//# sourceURL=webpack:///./node_modules/chalk/source/utilities.js?");

/***/ }),

/***/ "./node_modules/chalk/source/vendor/ansi-styles/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/chalk/source/vendor/ansi-styles/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   backgroundColorNames: () => (/* binding */ backgroundColorNames),\n/* harmony export */   colorNames: () => (/* binding */ colorNames),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   foregroundColorNames: () => (/* binding */ foregroundColorNames),\n/* harmony export */   modifierNames: () => (/* binding */ modifierNames)\n/* harmony export */ });\nconst ANSI_BACKGROUND_OFFSET = 10;\n\nconst wrapAnsi16 = (offset = 0) => code => `\\u001B[${code + offset}m`;\n\nconst wrapAnsi256 = (offset = 0) => code => `\\u001B[${38 + offset};5;${code}m`;\n\nconst wrapAnsi16m = (offset = 0) => (red, green, blue) => `\\u001B[${38 + offset};2;${red};${green};${blue}m`;\n\nconst styles = {\n\tmodifier: {\n\t\treset: [0, 0],\n\t\t// 21 isn't widely supported and 22 does the same thing\n\t\tbold: [1, 22],\n\t\tdim: [2, 22],\n\t\titalic: [3, 23],\n\t\tunderline: [4, 24],\n\t\toverline: [53, 55],\n\t\tinverse: [7, 27],\n\t\thidden: [8, 28],\n\t\tstrikethrough: [9, 29],\n\t},\n\tcolor: {\n\t\tblack: [30, 39],\n\t\tred: [31, 39],\n\t\tgreen: [32, 39],\n\t\tyellow: [33, 39],\n\t\tblue: [34, 39],\n\t\tmagenta: [35, 39],\n\t\tcyan: [36, 39],\n\t\twhite: [37, 39],\n\n\t\t// Bright color\n\t\tblackBright: [90, 39],\n\t\tgray: [90, 39], // Alias of `blackBright`\n\t\tgrey: [90, 39], // Alias of `blackBright`\n\t\tredBright: [91, 39],\n\t\tgreenBright: [92, 39],\n\t\tyellowBright: [93, 39],\n\t\tblueBright: [94, 39],\n\t\tmagentaBright: [95, 39],\n\t\tcyanBright: [96, 39],\n\t\twhiteBright: [97, 39],\n\t},\n\tbgColor: {\n\t\tbgBlack: [40, 49],\n\t\tbgRed: [41, 49],\n\t\tbgGreen: [42, 49],\n\t\tbgYellow: [43, 49],\n\t\tbgBlue: [44, 49],\n\t\tbgMagenta: [45, 49],\n\t\tbgCyan: [46, 49],\n\t\tbgWhite: [47, 49],\n\n\t\t// Bright color\n\t\tbgBlackBright: [100, 49],\n\t\tbgGray: [100, 49], // Alias of `bgBlackBright`\n\t\tbgGrey: [100, 49], // Alias of `bgBlackBright`\n\t\tbgRedBright: [101, 49],\n\t\tbgGreenBright: [102, 49],\n\t\tbgYellowBright: [103, 49],\n\t\tbgBlueBright: [104, 49],\n\t\tbgMagentaBright: [105, 49],\n\t\tbgCyanBright: [106, 49],\n\t\tbgWhiteBright: [107, 49],\n\t},\n};\n\nconst modifierNames = Object.keys(styles.modifier);\nconst foregroundColorNames = Object.keys(styles.color);\nconst backgroundColorNames = Object.keys(styles.bgColor);\nconst colorNames = [...foregroundColorNames, ...backgroundColorNames];\n\nfunction assembleStyles() {\n\tconst codes = new Map();\n\n\tfor (const [groupName, group] of Object.entries(styles)) {\n\t\tfor (const [styleName, style] of Object.entries(group)) {\n\t\t\tstyles[styleName] = {\n\t\t\t\topen: `\\u001B[${style[0]}m`,\n\t\t\t\tclose: `\\u001B[${style[1]}m`,\n\t\t\t};\n\n\t\t\tgroup[styleName] = styles[styleName];\n\n\t\t\tcodes.set(style[0], style[1]);\n\t\t}\n\n\t\tObject.defineProperty(styles, groupName, {\n\t\t\tvalue: group,\n\t\t\tenumerable: false,\n\t\t});\n\t}\n\n\tObject.defineProperty(styles, 'codes', {\n\t\tvalue: codes,\n\t\tenumerable: false,\n\t});\n\n\tstyles.color.close = '\\u001B[39m';\n\tstyles.bgColor.close = '\\u001B[49m';\n\n\tstyles.color.ansi = wrapAnsi16();\n\tstyles.color.ansi256 = wrapAnsi256();\n\tstyles.color.ansi16m = wrapAnsi16m();\n\tstyles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);\n\tstyles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);\n\tstyles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);\n\n\t// From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js\n\tObject.defineProperties(styles, {\n\t\trgbToAnsi256: {\n\t\t\tvalue(red, green, blue) {\n\t\t\t\t// We use the extended greyscale palette here, with the exception of\n\t\t\t\t// black and white. normal palette only has 4 greyscale shades.\n\t\t\t\tif (red === green && green === blue) {\n\t\t\t\t\tif (red < 8) {\n\t\t\t\t\t\treturn 16;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (red > 248) {\n\t\t\t\t\t\treturn 231;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn Math.round(((red - 8) / 247) * 24) + 232;\n\t\t\t\t}\n\n\t\t\t\treturn 16\n\t\t\t\t\t+ (36 * Math.round(red / 255 * 5))\n\t\t\t\t\t+ (6 * Math.round(green / 255 * 5))\n\t\t\t\t\t+ Math.round(blue / 255 * 5);\n\t\t\t},\n\t\t\tenumerable: false,\n\t\t},\n\t\thexToRgb: {\n\t\t\tvalue(hex) {\n\t\t\t\tconst matches = /[a-f\\d]{6}|[a-f\\d]{3}/i.exec(hex.toString(16));\n\t\t\t\tif (!matches) {\n\t\t\t\t\treturn [0, 0, 0];\n\t\t\t\t}\n\n\t\t\t\tlet [colorString] = matches;\n\n\t\t\t\tif (colorString.length === 3) {\n\t\t\t\t\tcolorString = [...colorString].map(character => character + character).join('');\n\t\t\t\t}\n\n\t\t\t\tconst integer = Number.parseInt(colorString, 16);\n\n\t\t\t\treturn [\n\t\t\t\t\t/* eslint-disable no-bitwise */\n\t\t\t\t\t(integer >> 16) & 0xFF,\n\t\t\t\t\t(integer >> 8) & 0xFF,\n\t\t\t\t\tinteger & 0xFF,\n\t\t\t\t\t/* eslint-enable no-bitwise */\n\t\t\t\t];\n\t\t\t},\n\t\t\tenumerable: false,\n\t\t},\n\t\thexToAnsi256: {\n\t\t\tvalue: hex => styles.rgbToAnsi256(...styles.hexToRgb(hex)),\n\t\t\tenumerable: false,\n\t\t},\n\t\tansi256ToAnsi: {\n\t\t\tvalue(code) {\n\t\t\t\tif (code < 8) {\n\t\t\t\t\treturn 30 + code;\n\t\t\t\t}\n\n\t\t\t\tif (code < 16) {\n\t\t\t\t\treturn 90 + (code - 8);\n\t\t\t\t}\n\n\t\t\t\tlet red;\n\t\t\t\tlet green;\n\t\t\t\tlet blue;\n\n\t\t\t\tif (code >= 232) {\n\t\t\t\t\tred = (((code - 232) * 10) + 8) / 255;\n\t\t\t\t\tgreen = red;\n\t\t\t\t\tblue = red;\n\t\t\t\t} else {\n\t\t\t\t\tcode -= 16;\n\n\t\t\t\t\tconst remainder = code % 36;\n\n\t\t\t\t\tred = Math.floor(code / 36) / 5;\n\t\t\t\t\tgreen = Math.floor(remainder / 6) / 5;\n\t\t\t\t\tblue = (remainder % 6) / 5;\n\t\t\t\t}\n\n\t\t\t\tconst value = Math.max(red, green, blue) * 2;\n\n\t\t\t\tif (value === 0) {\n\t\t\t\t\treturn 30;\n\t\t\t\t}\n\n\t\t\t\t// eslint-disable-next-line no-bitwise\n\t\t\t\tlet result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));\n\n\t\t\t\tif (value === 2) {\n\t\t\t\t\tresult += 60;\n\t\t\t\t}\n\n\t\t\t\treturn result;\n\t\t\t},\n\t\t\tenumerable: false,\n\t\t},\n\t\trgbToAnsi: {\n\t\t\tvalue: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),\n\t\t\tenumerable: false,\n\t\t},\n\t\thexToAnsi: {\n\t\t\tvalue: hex => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),\n\t\t\tenumerable: false,\n\t\t},\n\t});\n\n\treturn styles;\n}\n\nconst ansiStyles = assembleStyles();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ansiStyles);\n\n\n//# sourceURL=webpack:///./node_modules/chalk/source/vendor/ansi-styles/index.js?");

/***/ }),

/***/ "./node_modules/chalk/source/vendor/supports-color/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/chalk/source/vendor/supports-color/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSupportsColor: () => (/* binding */ createSupportsColor),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var node_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:process */ \"node:process\");\n/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:os */ \"node:os\");\n/* harmony import */ var node_tty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node:tty */ \"node:tty\");\n\n\n\n\n// From: https://github.com/sindresorhus/has-flag/blob/main/index.js\n/// function hasFlag(flag, argv = globalThis.Deno?.args ?? process.argv) {\nfunction hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : node_process__WEBPACK_IMPORTED_MODULE_0__.argv) {\n\tconst prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');\n\tconst position = argv.indexOf(prefix + flag);\n\tconst terminatorPosition = argv.indexOf('--');\n\treturn position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);\n}\n\nconst {env} = node_process__WEBPACK_IMPORTED_MODULE_0__;\n\nlet flagForceColor;\nif (\n\thasFlag('no-color')\n\t|| hasFlag('no-colors')\n\t|| hasFlag('color=false')\n\t|| hasFlag('color=never')\n) {\n\tflagForceColor = 0;\n} else if (\n\thasFlag('color')\n\t|| hasFlag('colors')\n\t|| hasFlag('color=true')\n\t|| hasFlag('color=always')\n) {\n\tflagForceColor = 1;\n}\n\nfunction envForceColor() {\n\tif ('FORCE_COLOR' in env) {\n\t\tif (env.FORCE_COLOR === 'true') {\n\t\t\treturn 1;\n\t\t}\n\n\t\tif (env.FORCE_COLOR === 'false') {\n\t\t\treturn 0;\n\t\t}\n\n\t\treturn env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);\n\t}\n}\n\nfunction translateLevel(level) {\n\tif (level === 0) {\n\t\treturn false;\n\t}\n\n\treturn {\n\t\tlevel,\n\t\thasBasic: true,\n\t\thas256: level >= 2,\n\t\thas16m: level >= 3,\n\t};\n}\n\nfunction _supportsColor(haveStream, {streamIsTTY, sniffFlags = true} = {}) {\n\tconst noFlagForceColor = envForceColor();\n\tif (noFlagForceColor !== undefined) {\n\t\tflagForceColor = noFlagForceColor;\n\t}\n\n\tconst forceColor = sniffFlags ? flagForceColor : noFlagForceColor;\n\n\tif (forceColor === 0) {\n\t\treturn 0;\n\t}\n\n\tif (sniffFlags) {\n\t\tif (hasFlag('color=16m')\n\t\t\t|| hasFlag('color=full')\n\t\t\t|| hasFlag('color=truecolor')) {\n\t\t\treturn 3;\n\t\t}\n\n\t\tif (hasFlag('color=256')) {\n\t\t\treturn 2;\n\t\t}\n\t}\n\n\t// Check for Azure DevOps pipelines.\n\t// Has to be above the `!streamIsTTY` check.\n\tif ('TF_BUILD' in env && 'AGENT_NAME' in env) {\n\t\treturn 1;\n\t}\n\n\tif (haveStream && !streamIsTTY && forceColor === undefined) {\n\t\treturn 0;\n\t}\n\n\tconst min = forceColor || 0;\n\n\tif (env.TERM === 'dumb') {\n\t\treturn min;\n\t}\n\n\tif (node_process__WEBPACK_IMPORTED_MODULE_0__.platform === 'win32') {\n\t\t// Windows 10 build 10586 is the first Windows release that supports 256 colors.\n\t\t// Windows 10 build 14931 is the first release that supports 16m/TrueColor.\n\t\tconst osRelease = node_os__WEBPACK_IMPORTED_MODULE_1__.release().split('.');\n\t\tif (\n\t\t\tNumber(osRelease[0]) >= 10\n\t\t\t&& Number(osRelease[2]) >= 10_586\n\t\t) {\n\t\t\treturn Number(osRelease[2]) >= 14_931 ? 3 : 2;\n\t\t}\n\n\t\treturn 1;\n\t}\n\n\tif ('CI' in env) {\n\t\tif (['GITHUB_ACTIONS', 'GITEA_ACTIONS', 'CIRCLECI'].some(key => key in env)) {\n\t\t\treturn 3;\n\t\t}\n\n\t\tif (['TRAVIS', 'APPVEYOR', 'GITLAB_CI', 'BUILDKITE', 'DRONE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {\n\t\t\treturn 1;\n\t\t}\n\n\t\treturn min;\n\t}\n\n\tif ('TEAMCITY_VERSION' in env) {\n\t\treturn /^(9\\.(0*[1-9]\\d*)\\.|\\d{2,}\\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;\n\t}\n\n\tif (env.COLORTERM === 'truecolor') {\n\t\treturn 3;\n\t}\n\n\tif (env.TERM === 'xterm-kitty') {\n\t\treturn 3;\n\t}\n\n\tif ('TERM_PROGRAM' in env) {\n\t\tconst version = Number.parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);\n\n\t\tswitch (env.TERM_PROGRAM) {\n\t\t\tcase 'iTerm.app': {\n\t\t\t\treturn version >= 3 ? 3 : 2;\n\t\t\t}\n\n\t\t\tcase 'Apple_Terminal': {\n\t\t\t\treturn 2;\n\t\t\t}\n\t\t\t// No default\n\t\t}\n\t}\n\n\tif (/-256(color)?$/i.test(env.TERM)) {\n\t\treturn 2;\n\t}\n\n\tif (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {\n\t\treturn 1;\n\t}\n\n\tif ('COLORTERM' in env) {\n\t\treturn 1;\n\t}\n\n\treturn min;\n}\n\nfunction createSupportsColor(stream, options = {}) {\n\tconst level = _supportsColor(stream, {\n\t\tstreamIsTTY: stream && stream.isTTY,\n\t\t...options,\n\t});\n\n\treturn translateLevel(level);\n}\n\nconst supportsColor = {\n\tstdout: createSupportsColor({isTTY: node_tty__WEBPACK_IMPORTED_MODULE_2__.isatty(1)}),\n\tstderr: createSupportsColor({isTTY: node_tty__WEBPACK_IMPORTED_MODULE_2__.isatty(2)}),\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supportsColor);\n\n\n//# sourceURL=webpack:///./node_modules/chalk/source/vendor/supports-color/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;