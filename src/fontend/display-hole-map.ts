import Hole from '../data-store/match'
import chalk from 'chalk';

const firstHole = Hole.getInstance();

export default function displayHoleMap() {
  console.log('Hole Map:');
  for (let i = 0; i < firstHole.map.length; i++) {
    const row = firstHole.map[i];
    let rowStr = '';
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      switch (cell) {
        case 'fairway':
          rowStr += chalk.bgGreen('   '); // green background
          break;
        case 'green':
          rowStr += chalk.bgGreenBright('   ');
          break;
        case 'hole':
          rowStr += chalk.bgGreenBright('(H)');
          break;
        case 'water':
          rowStr += chalk.bgBlue('   ');
          break;
        case 'sand':
          rowStr += chalk.bgYellow('   ');
          break;
        case 'outOfBounds':
          rowStr += chalk.bgRedBright('   ');
          break;
        case 'teeoffLeft':
          rowStr += chalk.bgWhite(' 1 ');
          break;
        case 'teeoffCenter':
            rowStr += chalk.bgWhite(' 2 ');
            break;
        case 'teeoffRight':
            rowStr += chalk.bgWhite(' 3 ');
            break;
        default:
          rowStr += '   '; // empty space
      }
    }
    console.log(rowStr);
  }
}