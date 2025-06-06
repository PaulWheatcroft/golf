import displayHoleMap from "./fontend/display-hole-map";
import playerSelection from "./commands/player-selection";
import clubSelection from "./commands/club-selection";
import teeOffPosition from "./commands/tee-off-position";
import hitBall from "./commands/hit-ball";
import Hole from "./data-store/match";
import { firstHole } from "./data-store/holes";
import { clubs, Club } from "./types/clubs";
import { getNextPlayer, getGameStatus, isPlayerOnGreen } from "./utilities/turn-manager";
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
const { stdin, stdout } = require('process');
let rl = readline.createInterface(process.stdin, process.stdout);

// Set up raw mode for stdin to capture arrow keys
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

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
  // Ensure raw mode is disabled for proper readline input
  stdin.setRawMode(false);
  
  let answer;
  while (true) {
    answer = await rl.question('Where would you like to tee off from? (1, 2, or 3): ');
    if (['1', '2', '3'].includes(answer)) {
      // Re-enable raw mode for next club selection
      stdin.setRawMode(true);
      return parseInt(answer);
    } else {
      console.log('Invalid choice. Please enter 1, 2, or 3.');
    }
  }
}

async function askClubSelection(player): Promise<Club> {
  // Fixed: Match actual club names from clubs.ts and remove unavailable clubs
  const availableClubs = ["Driver", "Long Iron", "Iron", "Wedge"];
  let selectedIndex = 0;

  // Get current position and distance from hole
  const currentPosition = match.data.findLast(item => 
    (item.type === 'hitBall' || item.type === 'teeOffPosition') && 
    item.playerId === player.id
  );
  const gameStatus = getGameStatus(match.data, firstHole.map);
  const playerStat = gameStatus.playerStats.find(p => p.player.id === player.id);
  const distanceFromHole = Math.round(playerStat?.distance || 0);

  // Function to display the club selection menu with enhanced information
  const displayMenu = () => {
    clear();
    console.log(chalk.bgBlue.white(`\n🏌️ ${player.name.toUpperCase()}'S CLUB SELECTION 🏌️`));
    console.log(chalk.yellow(`\n📍 Current Position: Row ${currentPosition.position[0]}, Column ${currentPosition.position[1]}`));
    console.log(chalk.yellow(`🎯 Distance to Hole: ${distanceFromHole} yards\n`));
    console.log(chalk.white('Select your club using ↑↓ arrows and press SPACE to confirm:\n'));
    
    availableClubs.forEach((club, index) => {
      const clubInfo = clubs.find(c => c.name === club);
      if (index === selectedIndex) {
        console.log(chalk.bgGreen(` > ${club.padEnd(12)} | Range: ${clubInfo.distance}0 yards < `));
      } else {
        console.log(chalk.gray(`   ${club.padEnd(12)} | Range: ${clubInfo.distance}0 yards   `));
      }
    });
  };

  return new Promise((resolve, reject) => {
    displayMenu();

    const handleKeyPress = (data: string) => {
      if (data === '\u001b[A') { // Up arrow
        selectedIndex = Math.max(0, selectedIndex - 1);
        displayMenu();
      } else if (data === '\u001b[B') { // Down arrow
        selectedIndex = Math.min(availableClubs.length - 1, selectedIndex + 1);
        displayMenu();
      } else if (data === ' ') { // Spacebar
        stdin.removeListener('data', handleKeyPress);
        stdin.setRawMode(false);
        
        const selectedClub = clubs.find(club => club.name === availableClubs[selectedIndex]);
        if (!selectedClub) {
          reject(new Error(`Selected club "${availableClubs[selectedIndex]}" not found in clubs data`));
          return;
        }
        console.log(chalk.green(`\n🎯 ${player.name} selected: ${availableClubs[selectedIndex]} (Range: ${selectedClub.distance}0 yards)`));
        
        // Don't automatically reset raw mode - let the calling function manage it
        resolve(selectedClub);
      } else if (data === '\u0003') { // Ctrl+C
        stdin.setRawMode(false);
        stdin.pause();
        process.exit();
      }
    };

    stdin.on('data', handleKeyPress);
  });
}

async function askHitBall(player) {
    // Ensure readline mode for reliable input
    stdin.setRawMode(false);
    
    console.log(chalk.bgBlue.white(`\n⛳ ${player.name.toUpperCase()}'S SHOT ⛳`));
    console.log(chalk.yellow('Press ENTER when ready to swing!'));
    await rl.question('');
    
    console.log(`\n💥 THWACK! ${player.name} takes their shot!`);
    const hit = hitBall(player);
    console.log(hit);
    
    // Re-enable raw mode for club selection
    stdin.setRawMode(true);
}

async function runGame() {
    try {
        // Game setup
        console.log(chalk.bgGrey('********** Add players **********', '\n'));
        
        // Ensure raw mode is disabled for name input
        stdin.setRawMode(false);
        const firstName = await rl.question('What is the name of the first player? ');
        const secondName = await rl.question('And what is name of the second player? ');
        // Re-enable raw mode for subsequent interactions
        stdin.setRawMode(true);
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
        console.log(responsePlayerOneTeeOff);
        console.log(chalk.bgGrey('\n'));
        const clubResponse = await askClubSelection(playerOne);
        clubSelection(playerOne, clubResponse);
        await askHitBall(playerOne);
        await displayHoleMap();

        //   Player two tee off
        console.log(chalk.bgGrey('\n'));
        console.log("Select your position on the tee player two");
        console.log(chalk.bgGrey('\n'));
        const chosenPositionPlayerTwo = await askTeePosition();
        const responsePlayerTwoTeeOff = teeOffPosition(playerTwo, chosenPositionPlayerTwo);
        console.log(responsePlayerTwoTeeOff);
        console.log(chalk.bgGrey('\n'));
        const clubResponsePlayerTwo = await askClubSelection(playerTwo);
        clubSelection(playerTwo, clubResponsePlayerTwo);
        await askHitBall(playerTwo);
        await displayHoleMap();

        // ========== CONTINUOUS SHOT MANAGEMENT ==========
        console.log(chalk.bgYellow('\n********** Starting Regular Play **********\n'));
        
        // Main game loop - continue until both players reach green
        while (true) {
            const gameStatus = getGameStatus(match.data, firstHole.map);
            console.log(chalk.bgBlue('\n============= GAME STATUS ============='));
            
            // Enhanced status message with clear visual indicators
            gameStatus.playerStats.forEach(stat => {
                const statusIcon = stat.isOnGreen ? '🟢' : '🔴';
                const turnIcon = gameStatus.nextPlayer?.id === stat.player.id ? '👉 ' : '   ';
                console.log(`${turnIcon}${statusIcon} ${stat.player.name.padEnd(15)} | ${stat.strokeCount} strokes | ${stat.distance || 0} yards from hole`);
            });
            
            console.log(chalk.bgBlue('======================================\n'));
            
            // Check if both players are on green (ready for putting)
            if (isPlayerOnGreen(playerOne.id, match.data, firstHole.map) && isPlayerOnGreen(playerTwo.id, match.data, firstHole.map)) {
                console.log(chalk.bgGreen('\n🏌️‍♀️⛳ Both players have reached the green! Time for putting! 🏌️‍♂️⛳\n'));
                break;
            }
            
            // Determine whose turn it is based on distance from hole
            const nextPlayer = getNextPlayer(match.data, firstHole.map);
            if (!nextPlayer) {
                console.log(chalk.red('Error: Unable to determine next player. Ending game.'));
                break;
            }
            
            // Enhanced turn announcement
            console.log(chalk.bgGreen.white(`\n⭐ ==========================================`));
            console.log(chalk.bgGreen.white(`      ${nextPlayer.name.toUpperCase()}'S TURN TO PLAY`));
            console.log(chalk.bgGreen.white(`⭐ ==========================================\n`));
            
            const playerStat = gameStatus.playerStats.find(p => p.player.id === nextPlayer.id);
            console.log(chalk.yellow(`🎯 Current position: ${Math.round(playerStat?.distance || 0)} yards from the hole`));
            
            // Clear indication before club selection
            console.log(chalk.bgYellow.black(`\n🏌️ ${nextPlayer.name.toUpperCase()}, select your club! 🏌️\n`));
            
            // Player's shot sequence
            const clubChoiceForShot = await askClubSelection(nextPlayer);
            clubSelection(nextPlayer, clubChoiceForShot);
            await askHitBall(nextPlayer);
            await displayHoleMap();
            
            // Clear transition to next turn
            console.log(chalk.bgMagenta('\n⏭️  Press ENTER to continue to next player...'));
            stdin.setRawMode(false);
            await rl.question('');
            stdin.setRawMode(true);
            
            // Clear screen for next turn
            clear();
        }
        
        console.log(chalk.bgMagenta('\n🎉 Game complete! Great round of golf! 🎉\n'));
        
    } catch (error) {
        console.error('Game error:', error);
        console.log('Restarting game...');
        // Reset game state and restart
        match.data = [];
        runGame();
    }
}
