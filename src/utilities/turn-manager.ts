import { getPlayerDistanceFromHole } from './index';
import { Player } from '../types/index';

/**
 * Get stroke count for a specific player
 * @param playerId - The ID of the player
 * @param gameData - The game data array
 * @returns The number of strokes taken by the player
 */
export function getPlayerStrokeCount(playerId: number, gameData: any[]): number {
    const hitBallEvents = gameData.filter(item => 
        item.type === 'hitBall' && item.playerId === playerId
    );
    return hitBallEvents.length;
}

/**
 * Get all active players from game data
 * @param gameData - The game data array
 * @returns Array of player objects
 */
export function getActivePlayers(gameData: any[]): Player[] {
    return gameData.filter(item => item.type === 'player') as Player[];
}

/**
 * Check if a player is on the green
 * @param playerId - The ID of the player
 * @param gameData - The game data array
 * @param map - The golf course map
 * @returns True if player is on green terrain
 */
export function isPlayerOnGreen(playerId: number, gameData: any[], map: string[][]): boolean {
    const playerPosition = gameData.findLast(item => 
        (item.type === 'hitBall' || item.type === 'teeOffPosition') && 
        item.playerId === playerId
    );
    
    if (!playerPosition || !playerPosition.position) {
        return false;
    }
    
    const [row, col] = playerPosition.position;
    if (row < 0 || row >= map.length || col < 0 || col >= map[0].length) {
        return false;
    }
    
    return map[row][col] === 'green' || map[row][col] === 'hole';
}

/**
 * Determine which player should take the next shot
 * @param gameData - The game data array containing all game events
 * @param map - The golf course map
 * @returns The player who should take the next shot, or null if game is complete
 */
export function getNextPlayer(gameData: any[], map: string[][]): Player | null {
    const players = getActivePlayers(gameData);
    
    if (players.length === 0) {
        return null;
    }
    
    // Check if all players are on the green (putting phase)
    const allOnGreen = players.every(player => 
        isPlayerOnGreen(player.id, gameData, map)
    );
    
    if (allOnGreen) {
        // In putting phase, use different logic if needed
        // For now, use same distance-based logic
    }
    
    // Calculate distances and stroke counts for all players
    const playerStats = players.map(player => {
        const distance = getPlayerDistanceFromHole(player.id, gameData, map);
        const strokeCount = getPlayerStrokeCount(player.id, gameData);
        
        return {
            player,
            distance,
            strokeCount,
            isOnGreen: isPlayerOnGreen(player.id, gameData, map)
        };
    }).filter(stat => stat.distance !== null); // Filter out players without valid positions
    
    if (playerStats.length === 0) {
        return null;
    }
    
    // Sort by distance (furthest first), then by stroke count (fewer strokes first) for tie-breaking
    playerStats.sort((a, b) => {
        // Primary sort: furthest from hole goes first
        if (a.distance !== b.distance) {
            return b.distance! - a.distance!;
        }
        
        // Tie-breaker: player with fewer strokes goes first
        return a.strokeCount - b.strokeCount;
    });
    
    return playerStats[0].player;
}

/**
 * Check if it's a specific player's turn
 * @param playerId - The ID of the player to check
 * @param gameData - The game data array
 * @param map - The golf course map
 * @returns True if it's the specified player's turn
 */
export function isPlayerTurn(playerId: number, gameData: any[], map: string[][]): boolean {
    const nextPlayer = getNextPlayer(gameData, map);
    return nextPlayer?.id === playerId;
}

/**
 * Get game status information
 * @param gameData - The game data array
 * @param map - The golf course map
 * @returns Object containing current game status
 */
export function getGameStatus(gameData: any[], map: string[][]) {
    const players = getActivePlayers(gameData);
    const nextPlayer = getNextPlayer(gameData, map);
    
    const playerStats = players.map(player => {
        const distance = getPlayerDistanceFromHole(player.id, gameData, map);
        const strokeCount = getPlayerStrokeCount(player.id, gameData);
        const isOnGreen = isPlayerOnGreen(player.id, gameData, map);
        
        return {
            player,
            distance: distance ? Math.round(distance * 10) / 10 : null, // Round to 1 decimal
            strokeCount,
            isOnGreen
        };
    });
    
    const allOnGreen = players.every(player => 
        isPlayerOnGreen(player.id, gameData, map)
    );
    
    return {
        nextPlayer,
        playerStats,
        allOnGreen,
        isComplete: nextPlayer === null
    };
} 