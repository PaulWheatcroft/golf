import displayHoleMap from "./fontend/display-hole-map";
import playerSelection from "./commands/player-selection";
import clubSelection from "./commands/club-selection";
import teeOffPosition from "./commands/tee-off-position";
import hitBall from "./commands/hit-ball";
import Hole from "./data-store/match";
import { clubs } from "./types/clubs";
import chalk from 'chalk';
import clear from 'clear';

clear();

const match = Hole.getInstance();

let actionQueue = [];

const readline = require('readline/promises');

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

async function askTeePosition() {
    let answer;
    while (true) {
        answer = await rl.question('Where would you like to tee off from? (1, 2, or 3): ');
        if (['1', '2', '3'].includes(answer)) {
            console.log(`You selected: ${answer}`);
            return parseInt(answer);
        } else {
            console.log('Invalid choice. Please enter 1, 2, or 3.');
        }
    }
    rl.close();
}

async function askClubSelection() {
    let answer;
    while (true) {
        answer = await rl.question('What club would you like to use? ("Driver", "Long iron", "Iron", "Wedge", "Sand", "Putter"): ');
        if (["Driver", "Long iron", "Iron", "Wedge", "Sand", "Putter"].includes(answer)) {
            console.log(`You selected: ${answer}`);
            const selectedClub = clubs.find(club => club.name === answer);
            return selectedClub;
        } else {
            console.log('Invalid choice. Please enter "Driver", "Long iron", "Iron", "Wedge", "Sand", "Putter".');
        }
    }
    rl.close();
}

async function askHitBall(player) {
    let answer;
    while (true) {
        answer = await rl.question('Would you like to hit the ball? (yes/no): ');
        if (["yes", "no"].includes(answer)) {
            console.log(`You selected: ${answer}`);
            const hit =hitBall(player);
            return hit;
        } else {
            console.log('Invalid choice. Please enter "yes" or "no".');
        }
    }
    rl.close();
}

async function runGame() {
    console.log(chalk.bgGrey('********** Add players **********', '\n'));
    const firstName = await rl.question('What is the name of the first player? ');
    const secondName = await rl.question('And what is name of the second player? ');
    const response = playerSelection(firstName, secondName);
    console.log(chalk.bgGrey('\n'));
    console.log(chalk.green("⛳️ ", response));
    console.log(chalk.bgGrey('\n'));
    const playerOne = match.data.find(player => player.id === 1);
    const playerTwo = match.data.find(player => player.id === 2);
    console.log("You are teeing off first " + playerOne.name);
    console.log(chalk.bgGrey('\n'));
    console.log("Select your position on the tee");
    console.log(chalk.bgGrey('\n'));
    const chosenPosition = await askTeePosition();
    const responsePlayerOneTeeOff = teeOffPosition(playerOne, chosenPosition);
    console.log(chalk.bgGrey('\n'));
    const clubResponse = await askClubSelection();
    clubSelection(playerOne, clubResponse);
    const hitBallResponse = askHitBall(playerOne);
    console.log(chalk.bgGrey('\n'));
    console.log(hitBallResponse);

}

runGame();
