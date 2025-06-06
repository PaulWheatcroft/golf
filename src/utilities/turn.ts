import { Match, Player, Shot } from '../data-store/match';
import { handleGreenEntry } from './green-entry';
import { handlePuttingPhase } from './putting';
import displayGreenMap from '../fontend/display-green-map';
import clear from 'clear';
const chalk = require('chalk');

/**
 * Checks if a position is on a green square
 */
function isGreenSquare(position: [number, number], hole: any): boolean {
  const [row, col] = position;
  return hole.map[row][col] === 'green';
}

/**
 * Checks if a position is on the green
 */
function isOnGreen(position: [number, number]): boolean {
  // Green is a 5x5 area in the center of the 10x10 map
  return position[0] >= 3 && position[0] <= 7 && 
         position[1] >= 3 && position[1] <= 7;
}

/**
 * Calculates distance between two points
 */
function calculateDistance(pos1: [number, number], pos2: [number, number]): number {
  const rowDiff = pos1[0] - pos2[0];
  const colDiff = pos1[1] - pos2[1];
  // Multiply by 10 to get realistic golf distances
  return Math.round(Math.sqrt(rowDiff * rowDiff + colDiff * colDiff) * 10);
}

/**
 * Processes a turn for the current player
 */
export async function processTurn(match: Match): Promise<void> {
  const currentPlayerId = match.currentPlayerIndex + 1;
  const playerPos = currentPlayerId === 1 ? match.player1Position : match.player2Position;
  
  // Clear any previous output
  clear();
  console.log('\n'.repeat(5)); // Add extra padding to ensure old content is gone
  
  console.log(chalk.green(`\n=== Player ${currentPlayerId}'s Turn ===`));
  
  // Display current game state
  displayGreenMap();
  await showGameStatus(match);
  
  // Check if both players are on the green
  const player1OnGreen = isOnGreen(match.player1Position);
  const player2OnGreen = isOnGreen(match.player2Position);
  
  if (player1OnGreen && player2OnGreen) {
    console.log(chalk.green('\n🎯 Both players are on the green! Starting putting phase...'));
    await handlePuttingPhase(match, currentPlayerId);
  } else if (isOnGreen(playerPos)) {
    console.log(chalk.yellow('\n🎯 You are on the green! Waiting for other player...'));
    await processShot(match, await getPlayerShot());
  } else {
    // Handle regular shot
    const shot = await getPlayerShot();
    await processShot(match, shot);
  }
  
  // Move to next player
  match.currentPlayerIndex = (match.currentPlayerIndex + 1) % 2;
  
  // Check for game completion
  checkGameCompletion(match);
}

/**
 * Shows the current game status
 */
async function showGameStatus(match: Match): Promise<void> {
  const holePos = match.currentHole.greenMap.holePosition;
  const p1Distance = calculateDistance(match.player1Position, holePos);
  const p2Distance = calculateDistance(match.player2Position, holePos);
  
  console.log(chalk.cyan('\n=== Game Status ==='));
  console.log(`Player 1: ${match.player1Strokes} strokes, ${p1Distance} yards to hole`);
  console.log(`Player 2: ${match.player2Strokes} strokes, ${p2Distance} yards to hole`);
  console.log(`Current hole: Par ${match.currentHole.par}, ${match.currentHole.distance} yards`);
}

/**
 * Gets shot input from the player
 */
async function getPlayerShot(): Promise<Shot> {
  // Clear any previous output first
  clear();
  console.log('\n'.repeat(5)); // Add extra padding
  
  // This is a placeholder - implement actual player input
  return {
    power: 5,
    direction: 0,
    club: 'driver'
  };
}

/**
 * Processes a shot and updates the game state
 */
async function processShot(match: Match, shot: Shot): Promise<void> {
  const currentPlayerId = match.currentPlayerIndex + 1;
  const currentPos = currentPlayerId === 1 ? match.player1Position : match.player2Position;
  
  // Calculate new position
  const newPosition = calculateNewPosition(currentPos, shot);
  
  // Update position and increment strokes
  if (currentPlayerId === 1) {
    match.player1Position = newPosition;
    match.player1Strokes++;
  } else {
    match.player2Position = newPosition;
    match.player2Strokes++;
  }
  
  // Show the result
  const distanceToHole = calculateDistance(newPosition, match.currentHole.greenMap.holePosition);
  console.log(chalk.yellow(`\nShot landed at position [${newPosition[0]}, ${newPosition[1]}]`));
  console.log(chalk.cyan(`Distance to hole: ${distanceToHole} yards`));
  
  // Brief pause to show result
  await new Promise(resolve => setTimeout(resolve, 2000));
}

/**
 * Calculates the new position after a shot
 */
function calculateNewPosition(currentPosition: [number, number], shot: Shot): [number, number] {
  const [currentRow, currentCol] = currentPosition;
  
  // Convert direction to radians
  const directionRad = (shot.direction * Math.PI) / 180;
  
  // Calculate new position using trigonometry
  const newRow = currentRow + Math.sin(directionRad) * shot.power;
  const newCol = currentCol + Math.cos(directionRad) * shot.power;
  
  // Keep within bounds (0-9)
  return [
    Math.max(0, Math.min(9, Math.round(newRow))),
    Math.max(0, Math.min(9, Math.round(newCol)))
  ];
}

/**
 * Checks if the game is complete
 */
function checkGameCompletion(match: Match): void {
  // Game is complete if both players have holed out
  const player1Holed = match.player1Position[0] === match.currentHole.greenMap.holePosition[0] &&
                      match.player1Position[1] === match.currentHole.greenMap.holePosition[1];
  const player2Holed = match.player2Position[0] === match.currentHole.greenMap.holePosition[0] &&
                      match.player2Position[1] === match.currentHole.greenMap.holePosition[1];
  
  if (player1Holed && player2Holed) {
    match.isComplete = true;
    
    // Determine winner
    if (match.player1Strokes < match.player2Strokes) {
      match.winner = 1;
    } else if (match.player2Strokes < match.player1Strokes) {
      match.winner = 2;
    }
    // If strokes are equal, it's a tie (winner remains undefined)
  }
} 