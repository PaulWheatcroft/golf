import Hole from '../data-store/match';

const firstHole = Hole.getInstance();

/**
 * Converts coordinates from the main map to the detailed green map
 * @param position Position on the main map [row, col]
 * @returns Position on the green map [row, col] or null if not on green
 */
export function convertToGreenCoords(position: [number, number]): [number, number] | null {
  const { mainMapGreenCoords, map: greenMap } = firstHole.greenMap;
  const [row, col] = position;
  
  // Check if position is within the green area on main map
  if (row < mainMapGreenCoords.topLeft[0] || row > mainMapGreenCoords.bottomRight[0] ||
      col < mainMapGreenCoords.topLeft[1] || col > mainMapGreenCoords.bottomRight[1]) {
    return null;
  }
  
  // Calculate relative position within the green
  const greenWidth = mainMapGreenCoords.bottomRight[1] - mainMapGreenCoords.topLeft[1];
  const greenHeight = mainMapGreenCoords.bottomRight[0] - mainMapGreenCoords.topLeft[0];
  
  const relativeX = (col - mainMapGreenCoords.topLeft[1]) / greenWidth;
  const relativeY = (row - mainMapGreenCoords.topLeft[0]) / greenHeight;
  
  // Convert to green map coordinates
  const greenRow = Math.floor(relativeY * (greenMap.length - 1));
  const greenCol = Math.floor(relativeX * (greenMap[0].length - 1));
  
  return [greenRow, greenCol];
}

/**
 * Checks if a position is on the green in the main map
 * @param position Position to check [row, col]
 * @returns boolean
 */
export function isOnGreen(position: [number, number]): boolean {
  return convertToGreenCoords(position) !== null;
} 