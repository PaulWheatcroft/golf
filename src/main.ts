import displayHoleMap from "./fontend/display-hole-map";
import playerSelection from "./commands/player-selection";
import Hole from "./data-store/match";
import chalk from 'chalk';
import clear from 'clear';

clear();

const match = Hole.getInstance();

const readline = require('readline');

let rl = readline.createInterface(
    process.stdin, process.stdout
);

console.log(chalk.green("********************************************"));
console.log(chalk.green("********** Welcome to Golf World! **********"));
console.log(chalk.green("********************************************", '\n'));
console.log(chalk.bgGrey('********** Hole 1 **********', '\n'));

displayHoleMap();

let playerOne = '';
let playerTwo = '';

console.log('\n');

console.log(chalk.bgGrey('********** Add players **********', '\n'));
rl.question('What is the name of the first player? ', (firstName) => {
    rl.question('And what is name of the second player? ', (secondName) => {
        const response = playerSelection(firstName, secondName);
        console.log(chalk.bgGrey('\n'));
        console.log(chalk.green("⛳️ ", response));
        console.log(chalk.bgGrey('\n'));
        console.log(match.data);
    });
});