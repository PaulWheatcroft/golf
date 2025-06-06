export function isArrayInArrayOfArrays(array: [number, number], arrayOfArrays: [number, number][]) {
    return arrayOfArrays.some(arr => {
        const isEqual = arr[0] === array[0] && arr[1] === array[1];
        return isEqual;
    });
}

/**
 * Find the hole position from the map data
 * @param map - The 2D array representing the golf course map
 * @returns The [row, col] position of the hole, or null if not found
 */
export function findHolePosition(map: string[][]): [number, number] | null {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 'hole') {
                return [row, col];
            }
        }
    }
    return null;
}

/**
 * Calculate the Euclidean distance between two points
 * @param point1 - First point as [row, col]
 * @param point2 - Second point as [row, col]
 * @returns The distance between the two points
 */
export function calculateEuclideanDistance(point1: [number, number], point2: [number, number]): number {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Calculate distance from a player's position to the hole
 * @param playerPosition - Player's current position as [row, col]
 * @param map - The 2D array representing the golf course map
 * @returns The distance from player to hole, or null if hole not found or invalid position
 */
export function calculateDistanceFromHole(playerPosition: [number, number], map: string[][]): number | null {
    // Validate player position
    if (!playerPosition || playerPosition.length !== 2) {
        return null;
    }
    
    const [playerRow, playerCol] = playerPosition;
    
    // Check if player position is within map bounds
    if (playerRow < 0 || playerRow >= map.length || 
        playerCol < 0 || playerCol >= map[0].length) {
        return null;
    }
    
    // Find hole position
    const holePosition = findHolePosition(map);
    if (!holePosition) {
        return null;
    }
    
    // Calculate and return distance
    return calculateEuclideanDistance(playerPosition, holePosition);
}

/**
 * Get distance from hole for a specific player from game data
 * @param playerId - The ID of the player
 * @param gameData - The game data array containing player positions
 * @param map - The golf course map
 * @returns The distance from player to hole, or null if player position not found
 */
export function getPlayerDistanceFromHole(playerId: number, gameData: any[], map: string[][]): number | null {
    // Find the most recent position for the player (either hitBall or teeOffPosition)
    const playerPosition = gameData.findLast(item => 
        (item.type === 'hitBall' || item.type === 'teeOffPosition') && 
        item.playerId === playerId
    );
    
    if (!playerPosition || !playerPosition.position) {
        return null;
    }
    
    return calculateDistanceFromHole(playerPosition.position, map);
}