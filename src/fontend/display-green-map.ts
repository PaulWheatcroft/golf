import Hole from '../data-store/match';
import { convertToGreenCoords } from '../utilities/green-coordinates';

const firstHole = Hole.getInstance();

export default async function displayGreenMap() {
  const chalk = (await import('chalk')).default;
  
  // Get fresh data each time
  const data = firstHole.data;
  
  // Get the latest position for each player
  const player1Position = data.findLast(item => 
    (item.type === 'hitBall' || item.type === 'teeOffPosition') && 
    item.playerId === 1
  );
  
  const player2Position = data.findLast(item => 
    (item.type === 'hitBall' || item.type === 'teeOffPosition') && 
    item.playerId === 2
  );

  // Convert player positions to green coordinates
  const player1GreenPos = player1Position?.position ? convertToGreenCoords(player1Position.position) : null;
  const player2GreenPos = player2Position?.position ? convertToGreenCoords(player2Position.position) : null;

  // Icons for players and slopes
  const player1Icon = ' ● ';
  const player2Icon = ' ○ ';
  const bothPlayersIcon = ' ◉ ';
  
  // Slope icons using arrows
  const slopeIcons = {
    flat: ' · ',    // Dot for flat
    up: ' ↑ ',      // Up arrow
    down: ' ↓ ',    // Down arrow
    left: ' ← ',    // Left arrow
    right: ' → ',   // Right arrow
    upLeft: ' ↖ ',  // Up-left arrow
    upRight: ' ↗ ', // Up-right arrow
    downLeft: ' ↙ ', // Down-left arrow
    downRight: ' ↘ ', // Down-right arrow
    hole: '(H)'     // Hole marker
  };

  console.log(chalk.bgCyan('\n=== Detailed Green View ===\n'));
  
  // Display the green map
  const { map } = firstHole.greenMap;
  for (let row = 0; row < map.length; row++) {
    let rowStr = '';
    for (let col = 0; col < map[row].length; col++) {
      const cell = map[row][col];
      
      // Check if either player is at this position
      const isPlayer1Here = player1GreenPos && player1GreenPos[0] === row && player1GreenPos[1] === col;
      const isPlayer2Here = player2GreenPos && player2GreenPos[0] === row && player2GreenPos[1] === col;
      
      if (isPlayer1Here && isPlayer2Here) {
        rowStr += chalk.white(bothPlayersIcon);
      } else if (isPlayer1Here) {
        rowStr += chalk.white(player1Icon);
      } else if (isPlayer2Here) {
        rowStr += chalk.black(player2Icon);
      } else {
        // Display slope with appropriate color
        const slopeIcon = slopeIcons[cell] || slopeIcons.flat;
        let color = chalk.white;
        
        // Color-code slopes
        switch (cell) {
          case 'up':
          case 'upLeft':
          case 'upRight':
            color = chalk.red; // Uphill in red
            break;
          case 'down':
          case 'downLeft':
          case 'downRight':
            color = chalk.blue; // Downhill in blue
            break;
          case 'left':
          case 'right':
            color = chalk.yellow; // Side slopes in yellow
            break;
          case 'hole':
            color = chalk.white; // Hole in white
            break;
        }
        
        rowStr += color(slopeIcon);
      }
    }
    console.log(rowStr);
  }
  
  // Add legend
  console.log('\nLegend:');
  console.log(chalk.white(' ●  - Player 1'));
  console.log(chalk.black(' ○  - Player 2'));
  console.log(chalk.white(' ◉  - Both players'));
  console.log(chalk.white(' · ') + ' - Flat surface');
  console.log(chalk.red(' ↑  ↖  ↗ ') + ' - Uphill slopes');
  console.log(chalk.blue(' ↓  ↙  ↘ ') + ' - Downhill slopes');
  console.log(chalk.yellow(' ←  → ') + ' - Side slopes');
  console.log(chalk.white('(H)') + ' - Hole');
  
  return;
} 