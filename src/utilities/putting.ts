import { Match } from '../data-store/match';
import { simulatePutt } from './putt-physics';
import { aimPutt } from './putt-aim';
import displayGreenMap from '../fontend/display-green-map';
import clear from 'clear';
const chalk = require('chalk');

interface GreenMap {
  map: string[][];
  holePosition: [number, number];
}

interface WindCondition {
  direction: 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';
  strength: number;
}

/**
 * Generates random wind conditions
 */
function generateWind(): WindCondition {
  const directions = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'] as const;
  return {
    direction: directions[Math.floor(Math.random() * directions.length)],
    strength: Math.floor(Math.random() * 4) + 1 // 1-4 strength
  };
}

/**
 * Handles the putting phase for a player
 */
export async function handlePuttingPhase(match: Match, playerId: number): Promise<void> {
  // Clear screen and show putting phase start
  clear();
  console.log('\n'.repeat(5));
  console.log(chalk.green('\n=== Putting Phase ==='));
  console.log(chalk.yellow(`Player ${playerId}'s turn to putt`));
  
  const playerPos = playerId === 1 ? match.player1Position : match.player2Position;
  const playerStrokes = playerId === 1 ? match.player1Strokes : match.player2Strokes;
  
  // Generate wind conditions for this putt
  const wind = generateWind();
  
  // Create green map
  const greenMap: GreenMap = {
    map: [
      ['flat', 'up-right', 'up', 'up-left', 'flat'],
      ['right', 'up-right', 'up', 'up-left', 'left'],
      ['right', 'right', 'flat', 'left', 'left'],
      ['down-right', 'down-right', 'down', 'down-left', 'down-left'],
      ['down-right', 'down', 'down', 'down', 'down-left']
    ],
    holePosition: [2, 2] // Center of the green
  };
  
  let isHoled = false;
  let attempts = 0;
  const maxAttempts = 5; // Limit putts to prevent infinite attempts
  
  while (!isHoled && attempts < maxAttempts) {
    // Clear and show current state
    clear();
    console.log('\n'.repeat(5));
    console.log(chalk.green(`\n=== Player ${playerId}'s Putt ===`));
    console.log(chalk.yellow(`Attempt ${attempts + 1} of ${maxAttempts}`));
    console.log(chalk.cyan(`Current strokes: ${playerStrokes}`));
    
    // Display the green
    displayGreenMap();
    
    // Get aim and power from player
    const aim = await aimPutt(playerPos, greenMap, wind);
    
    // Check if player cancelled
    if (aim.power === 0) {
      console.log(chalk.red('\nPutt cancelled!'));
      return;
    }
    
    // Simulate the putt
    const result = simulatePutt(playerPos, aim.power, aim.direction, greenMap, wind);
    
    // Update player position
    if (playerId === 1) {
      match.player1Position = result.finalPosition;
    } else {
      match.player2Position = result.finalPosition;
    }
    
    // Animate the ball path
    await animatePuttPath(result.path);
    
    // Check if holed
    if (result.isHoled) {
      isHoled = true;
      console.log(chalk.green('\nGreat putt! Ball in the hole! 🎯'));
      // Update match state
      if (playerId === 1) {
        match.player1Position = greenMap.holePosition;
      } else {
        match.player2Position = greenMap.holePosition;
      }
    } else {
      console.log(chalk.yellow('\nClose, but not quite! Try again.'));
      // Increment strokes
      if (playerId === 1) {
        match.player1Strokes++;
      } else {
        match.player2Strokes++;
      }
    }
    
    attempts++;
    
    // Brief pause before next attempt
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // If max attempts reached without holing
  if (!isHoled) {
    console.log(chalk.red('\nReached maximum putting attempts. Moving to next player.'));
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

/**
 * Animates the path of the ball during a putt
 */
async function animatePuttPath(path: [number, number][]): Promise<void> {
  for (let i = 0; i < path.length; i++) {
    clear();
    console.log('\n'.repeat(5));
    displayGreenMap();
    
    // Show ball position
    const [row, col] = path[i];
    console.log(`\nBall position: ${row.toFixed(1)}, ${col.toFixed(1)}`);
    
    // Brief pause between frames
    await new Promise(resolve => setTimeout(resolve, 100));
  }
} 