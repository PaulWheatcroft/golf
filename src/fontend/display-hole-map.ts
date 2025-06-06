import Hole from '../data-store/match'

const firstHole = Hole.getInstance();

export default async function displayHoleMap() {
  // Use dynamic import for chalk
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

  // Circle icons for players
  const player1Icon = ' ● '; 
  const player2Icon = ' ○ '; 
  const bothPlayersIcon = ' ◉ '; 
  
  console.log('Hole Map:');
  for (let row = 0; row < firstHole.map.length; row++) {
    const rowData = firstHole.map[row];
    let rowStr = '';
    for (let col = 0; col < rowData.length; col++) {
      const cell = rowData[col];
      
      // Check if current position matches a player's position (using [row, col] format)
      const isPlayer1Here = player1Position && 
                          player1Position.position && 
                          player1Position.position[0] === row && 
                          player1Position.position[1] === col;
      
      const isPlayer2Here = player2Position && 
                          player2Position.position && 
                          player2Position.position[0] === row && 
                          player2Position.position[1] === col;
      
      // Players with matching terrain background
      if (isPlayer1Here && isPlayer2Here) {
        const bgColor = getBackgroundColor(cell, chalk);
        rowStr += bgColor(chalk.white(bothPlayersIcon));
      } else if (isPlayer1Here) {
        const bgColor = getBackgroundColor(cell, chalk);
        rowStr += bgColor(chalk.white(player1Icon));
      } else if (isPlayer2Here) {
        const bgColor = getBackgroundColor(cell, chalk);
        rowStr += bgColor(chalk.black(player2Icon));
      } else {
        // No player here, display terrain
        switch (cell) {
          case 'fairway':
            rowStr += chalk.bgGreen('   ');
            break;
          case 'green':
            rowStr += chalk.bgCyan('   ');
            break;
          case 'hole':
            rowStr += chalk.bgCyan('(H)');
            break;
          case 'teeoffLeft':
            rowStr += chalk.white.bgGreen(' 🀙 ');
            break;
          case 'teeoffCenter':
            rowStr += chalk.bgGreen(' 🀚 ');
            break;
          case 'teeoffRight':
            rowStr += chalk.bgGreen(' 🀛 ');
            break;
          default:
            rowStr += '   ';
        }
      }
    }
    console.log(rowStr);
  }
  
  // Add legend
  console.log('\nLegend:');
  console.log(chalk.white(' ●  - Player 1'));
  console.log(chalk.black(' ○  - Player 2'));
  console.log(chalk.white(' ◉  - Both players'));
  console.log(chalk.bgCyan('   ') + ' - Green');
  console.log(chalk.bgGreen('   ') + ' - Fairway');
  console.log(chalk.bgCyan('(H)') + ' - Hole');
  console.log(chalk.bgGreen(' 🀙  🀚  🀛 ') + ' - Tee-off positions');
  
  // For debugging
  console.log("\nPlayer Positions:");
  if (player1Position) console.log(`Player 1: ${player1Position.playerName} at position ${JSON.stringify(player1Position.position)}`);
  if (player2Position) console.log(`Player 2: ${player2Position?.playerName} at position ${JSON.stringify(player2Position?.position)}`);
  return
}

// Helper function to get background color for a terrain type
function getBackgroundColor(cell, chalk) {
  switch (cell) {
    case 'fairway': return chalk.bgGreen;
    case 'green': return chalk.bgCyan;
    case 'teeoffLeft':
    case 'teeoffCenter':
    case 'teeoffRight': return chalk.bgWhite;
    default: return chalk.bgGreen; // Default to fairway
  }
}