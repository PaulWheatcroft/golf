import { stdin } from 'process';
import clear from 'clear';
import displayGreenMap from '../fontend/display-green-map';

interface AimResult {
  power: number;     // 1-10
  direction: number; // 0-359 degrees
}

/**
 * Shows an aiming line on the green map
 */
function displayAimingLine(
  startPos: [number, number],
  direction: number,
  length: number,
  greenMap: any
): void {
  const chalk = require('chalk');
  
  // Calculate end point
  const directionRad = (direction * Math.PI) / 180;
  const endPos: [number, number] = [
    startPos[0] + Math.sin(directionRad) * length,
    startPos[1] + Math.cos(directionRad) * length
  ];
  
  // Draw aim line
  console.log('\nAiming Guide:');
  console.log('Direction: ' + direction + '°');
  console.log('Power: ' + length.toFixed(1) + '/10\n');
  
  // Show slope at current position
  const slope = greenMap.map[Math.floor(startPos[0])][Math.floor(startPos[1])];
  console.log('Current slope: ' + formatSlope(slope) + '\n');
  
  // Show controls
  console.log(chalk.cyan('Controls:'));
  console.log('← → : Adjust direction');
  console.log('↑ ↓ : Adjust power');
  console.log('SPACE: Take shot');
  console.log('ESC  : Cancel\n');
}

function formatSlope(slope: string): string {
  const chalk = require('chalk');
  
  if (slope === 'flat') return chalk.green('flat');
  
  let description = '';
  if (slope.includes('up')) description += chalk.red('↑ uphill ');
  if (slope.includes('down')) description += chalk.blue('↓ downhill ');
  if (slope.includes('left')) description += chalk.yellow('← leftward ');
  if (slope.includes('right')) description += chalk.yellow('→ rightward ');
  
  return description.trim();
}

/**
 * Interactive aiming system for putting
 */
export async function aimPutt(
  startPosition: [number, number],
  greenMap: any,
  wind?: { direction: string; strength: number }
): Promise<AimResult> {
  // Initialize aiming state
  let direction = 0;
  let power = 5;
  let isAiming = true;
  
  // Set up key press detection
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  
  // Create a promise that resolves when aiming is complete
  const aimPromise = new Promise<AimResult>((resolve) => {
    const handleKeyPress = (key: string) => {
      if (!isAiming) return;
      
      switch(key) {
        case '\u001b[D': // Left arrow
          direction = (direction - 5 + 360) % 360;
          break;
        case '\u001b[C': // Right arrow
          direction = (direction + 5) % 360;
          break;
        case '\u001b[A': // Up arrow
          power = Math.min(10, power + 0.5);
          break;
        case '\u001b[B': // Down arrow
          power = Math.max(1, power - 0.5);
          break;
        case ' ': // Space
          isAiming = false;
          stdin.removeListener('data', handleKeyPress);
          stdin.setRawMode(false);
          stdin.pause();
          resolve({ direction, power });
          break;
        case '\u001b': // Escape
          isAiming = false;
          stdin.removeListener('data', handleKeyPress);
          stdin.setRawMode(false);
          stdin.pause();
          resolve({ direction: 0, power: 0 }); // Cancel shot
          break;
      }
      
      // Update display
      if (isAiming) {
        clear();
        displayGreenMap();
        displayAimingLine(startPosition, direction, power, greenMap);
        
        // Show wind information if present
        if (wind) {
          const chalk = require('chalk');
          console.log(chalk.blue(`\nWind: ${wind.direction} (${wind.strength}/5)`));
        }
      }
    };
    
    stdin.on('data', handleKeyPress);
    
    // Initial display
    clear();
    displayGreenMap();
    displayAimingLine(startPosition, direction, power, greenMap);
    if (wind) {
      const chalk = require('chalk');
      console.log(chalk.blue(`\nWind: ${wind.direction} (${wind.strength}/5)`));
    }
  });
  
  return aimPromise;
} 