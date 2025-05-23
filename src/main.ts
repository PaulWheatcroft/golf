import displayHoleMap from "./fontend/display-hole-map";
import playerSelection from "./commands/player-selection";
import clubSelection from "./commands/club-selection";
import teeOffPosition from "./commands/tee-off-position";
import hitBall from "./commands/hit-ball";
import Hole from "./data-store/match";
import { clubs } from "./types/clubs";
import clear from 'clear';

// Use dynamic import for chalk to avoid ESM/CommonJS issues
let chalk;
(async () => {
  chalk = (await import('chalk')).default;
  init();
})();

const match = Hole.getInstance();
let actionQueue = [];
const readline = require('readline/promises');
let rl = readline.createInterface(process.stdin, process.stdout);

async function init() {
  clear();
  
  console.log(chalk.green("********************************************"));
  console.log(chalk.green("********** Welcome to Golf World! **********"));
  console.log(chalk.green("********************************************", '\n'));
  console.log(chalk.bgGrey('********** Hole 1 **********', '\n'));

  await displayHoleMap();

  let playerOne = '';
  let playerTwo = '';

  console.log('\n');
  
  runGame();
}

async function pressSpaceBarToContinue(action: string) {
  return new Promise((resolve) => {
    rl.question(`Press spacebar to ${action} `, (answer) => {
      if (answer === ' ') {
        resolve(action);
      } else {
        console.log('Invalid input. Please press the spacebar.');
        pressSpaceBarToContinue(action).then(resolve);
      }
    });
  });
}

async function askTeePosition() {
  let answer;
  while (true) {
    answer = await rl.question('Where would you like to tee off from? (1, 2, or 3): ');
    if (['1', '2', '3'].includes(answer)) {
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
    let answer = await rl.question('Would you like to hit the ball? (yes/no): ');
    if (["yes", "no"].includes(answer)) {
        console.log(`THWACK!`);
        const hit = hitBall(player);
        console.log(hit)
        return;
    } else {
        console.log('Invalid choice. Please enter "yes" or "no".');
    }

    rl.close();
}

async function runGame() {
    // Game setup
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

    //   Player one tee off

    console.log(chalk.bgGrey('\n'));
    console.log("Select your position on the tee");
    console.log(chalk.bgGrey('\n'));
    const chosenPositionPlayerOne = await askTeePosition();
    const responsePlayerOneTeeOff = teeOffPosition(playerOne, chosenPositionPlayerOne);
    console.log(responsePlayerOneTeeOff)
    console.log(chalk.bgGrey('\n'));
    const clubResponse = await askClubSelection();
    clubSelection(playerOne, clubResponse);
    await askHitBall(playerOne);
    displayHoleMap()

    //   Player two tee off

    console.log(chalk.bgGrey('\n'));
    console.log("Select your position on the tee player two");
    console.log(chalk.bgGrey('\n'));
    const chosenPositionPlayerTwo = await askTeePosition();
    const responsePlayerTwoTeeOff = teeOffPosition(playerTwo, chosenPositionPlayerTwo);
    console.log(responsePlayerTwoTeeOff)
    console.log(chalk.bgGrey('\n'));
    const clubResponsePlayerTwo = await askClubSelection();
    clubSelection(playerTwo, clubResponsePlayerTwo);
    await askHitBall(playerTwo);
    displayHoleMap()
}
