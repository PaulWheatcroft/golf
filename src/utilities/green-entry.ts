import { stdin } from 'process';
import clear from 'clear';
import { convertToGreenCoords } from './green-coordinates';
import displayGreenMap from '../fontend/display-green-map';

interface RollResult {
  finalPosition: [number, number];  // Final position on the detailed green map
  rollPath: [number, number][];     // Path the ball took while rolling
}

/**
 * Handles the ball rolling animation and position assignment when a player reaches the green
 * @param initialPosition Position where the ball first landed on the green [row, col]
 * @param player Player object with id and name
 * @returns Final position on the detailed green map
 */
export async function handleGreenEntry(initialPosition: [number, number], player: { id: number, name: string }): Promise<RollResult> {
  const chalk = (await import('chalk')).default;
  
  // Convert initial position to green coordinates
  const startPos = convertToGreenCoords(initialPosition);
  if (!startPos) throw new Error('Initial position is not on the green');
  
  // Initialize variables for the rolling animation
  let currentPos = [...startPos] as [number, number];
  const rollPath: [number, number][] = [currentPos];
  let isRolling = true;
  let rollTick = 0;
  
  // Set up key press detection
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  
  console.log(chalk.yellow(`\n${player.name}'s ball is rolling on the green!`));
  console.log(chalk.white('Press SPACE to stop the ball...'));
  
  // Create a promise that resolves when the player stops the ball
  const rollPromise = new Promise<RollResult>((resolve) => {
    // Handle key press
    const handleKeyPress = (key: string) => {
      if (key === ' ') {  // Space bar
        isRolling = false;
        stdin.removeListener('data', handleKeyPress);
        stdin.setRawMode(false);
        stdin.pause();
        
        resolve({
          finalPosition: currentPos,
          rollPath
        });
      }
    };
    
    stdin.on('data', handleKeyPress);
    
    // Start the rolling animation
    const rollInterval = setInterval(() => {
      if (!isRolling) {
        clearInterval(rollInterval);
        return;
      }
      
      // Calculate next position based on slope and time
      rollTick++;
      const [row, col] = currentPos;
      
      // Simple circular motion pattern
      const radius = 1;
      const angle = rollTick * 0.2;
      const newRow = Math.floor(row + Math.sin(angle) * radius);
      const newCol = Math.floor(col + Math.cos(angle) * radius);
      
      // Keep within bounds
      currentPos = [
        Math.max(0, Math.min(9, newRow)),
        Math.max(0, Math.min(9, newCol))
      ] as [number, number];
      
      rollPath.push(currentPos);
      
      // Clear and redraw
      clear();
      console.log(chalk.yellow(`\n${player.name}'s ball is rolling on the green!`));
      console.log(chalk.white('Press SPACE to stop the ball...'));
      displayGreenMap();
      
    }, 200);  // Update every 200ms
  });
  
  return rollPromise;
} 