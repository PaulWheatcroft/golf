import displayHoleMap from "./fontend/display-hole-map";
import playerSelection from "./commands/player-selection";
import Hole from "./data-store/match";

const match = Hole.getInstance();

const readline = require('readline');

let rl = readline.createInterface(
    process.stdin, process.stdout
);

console.log('welcome to Golf World!');

displayHoleMap();

let playerOne = '';
let playerTwo = '';

rl.question('What is the first player names? ', (firstName) => {
    rl.question('What is the second player names? ', (secondName) => {
        playerSelection(firstName, secondName);
        console.log(match.data);
    });
});