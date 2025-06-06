import { getNextPlayer, getGameStatus, isPlayerOnGreen } from './turn-manager';
import { firstHole } from '../data-store/holes';

describe('Continuous Shot Management Integration', () => {
    let mockGameData;
    
    beforeEach(() => {
        // Setup mock game data with two players after tee shots
        mockGameData = [
            // Players
            { type: 'player', id: 1, name: 'Alice' },
            { type: 'player', id: 2, name: 'Bob' },
            
            // Tee shots - Player 2 closer to hole
            { type: 'teeOffPosition', playerId: 1, position: [15, 3] },
            { type: 'hitBall', playerId: 1, position: [8, 2] }, // Distance: 6
            
            { type: 'teeOffPosition', playerId: 2, position: [15, 1] },
            { type: 'hitBall', playerId: 2, position: [7, 1] }  // Distance: ~5.1
        ];
    });

    test('should correctly determine turn order after tee shots', () => {
        // Player 1 is further away, so they should go next
        const nextPlayer = getNextPlayer(mockGameData, firstHole.map);
        
        expect(nextPlayer).toBeTruthy();
        expect(nextPlayer.id).toBe(1);
        expect(nextPlayer.name).toBe('Alice');
    });

    test('should provide comprehensive game status', () => {
        const gameStatus = getGameStatus(mockGameData, firstHole.map);
        
        expect(gameStatus.nextPlayer.id).toBe(1);
        expect(gameStatus.playerStats).toHaveLength(2);
        expect(gameStatus.allOnGreen).toBe(false);
        expect(gameStatus.isComplete).toBe(false);
        
        // Check player stats
        const player1Stats = gameStatus.playerStats.find(p => p.player.id === 1);
        const player2Stats = gameStatus.playerStats.find(p => p.player.id === 2);
        
        expect(player1Stats.strokeCount).toBe(1);
        expect(player2Stats.strokeCount).toBe(1);
        expect(player1Stats.distance).toBeGreaterThan(player2Stats.distance);
    });

    test('should continue game until both players reach green', () => {
        // Simulate game progression with multiple shots
        const gameProgression = [...mockGameData];
        
        // Player 2's second shot (still not on green)
        gameProgression.push({ type: 'hitBall', playerId: 2, position: [5, 1] });
        
        let gameStatus = getGameStatus(gameProgression, firstHole.map);
        expect(gameStatus.allOnGreen).toBe(false);
        
        // Player 1's second shot (still not on green)
        gameProgression.push({ type: 'hitBall', playerId: 1, position: [4, 2] });
        
        gameStatus = getGameStatus(gameProgression, firstHole.map);
        expect(gameStatus.allOnGreen).toBe(false);
        
        // Both players reach green
        gameProgression.push({ type: 'hitBall', playerId: 2, position: [2, 2] }); // On hole
        gameProgression.push({ type: 'hitBall', playerId: 1, position: [1, 2] }); // On green
        
        gameStatus = getGameStatus(gameProgression, firstHole.map);
        expect(gameStatus.allOnGreen).toBe(true);
    });

    test('should handle turn switching correctly during continuous play', () => {
        const gameProgression = [...mockGameData];
        
        // Player 1 goes first (further away)
        let nextPlayer = getNextPlayer(gameProgression, firstHole.map);
        expect(nextPlayer.id).toBe(1);
        
        // Player 1 takes a shot, getting closer
        gameProgression.push({ type: 'hitBall', playerId: 1, position: [4, 2] });
        
        // Now Player 2 should be further away
        nextPlayer = getNextPlayer(gameProgression, firstHole.map);
        expect(nextPlayer.id).toBe(2);
        
        // Player 2 takes a shot
        gameProgression.push({ type: 'hitBall', playerId: 2, position: [3, 1] });
        
        // Player 1 should be next again (further from hole)
        nextPlayer = getNextPlayer(gameProgression, firstHole.map);
        expect(nextPlayer.id).toBe(1);
    });

    test('should detect when players are on green', () => {
        // Player not on green
        expect(isPlayerOnGreen(1, mockGameData, firstHole.map)).toBe(false);
        expect(isPlayerOnGreen(2, mockGameData, firstHole.map)).toBe(false);
        
        // Add shot that puts player on green
        const updatedGameData = [
            ...mockGameData,
            { type: 'hitBall', playerId: 1, position: [2, 2] } // Hole position
        ];
        
        expect(isPlayerOnGreen(1, updatedGameData, firstHole.map)).toBe(true);
        expect(isPlayerOnGreen(2, updatedGameData, firstHole.map)).toBe(false);
    });

    test('should handle edge case with equal distances', () => {
        // Setup players at equal distances
        const equalDistanceData = [
            { type: 'player', id: 1, name: 'Alice' },
            { type: 'player', id: 2, name: 'Bob' },
            
            // Both players at same distance from hole [2,2]
            { type: 'hitBall', playerId: 1, position: [4, 2] }, // Distance: 2
            { type: 'hitBall', playerId: 2, position: [2, 4] }  // Distance: 2
        ];
        
        const nextPlayer = getNextPlayer(equalDistanceData, firstHole.map);
        
        // Should return player with fewer strokes (both have 1, so first player)
        expect(nextPlayer.id).toBe(1);
    });

    test('should properly track stroke counts during continuous play', () => {
        const gameProgression = [...mockGameData];
        
        // Add multiple shots for each player
        gameProgression.push({ type: 'hitBall', playerId: 2, position: [5, 1] }); // P2: 2 strokes
        gameProgression.push({ type: 'hitBall', playerId: 1, position: [6, 2] }); // P1: 2 strokes  
        gameProgression.push({ type: 'hitBall', playerId: 2, position: [3, 2] }); // P2: 3 strokes
        
        const gameStatus = getGameStatus(gameProgression, firstHole.map);
        
        const player1Stats = gameStatus.playerStats.find(p => p.player.id === 1);
        const player2Stats = gameStatus.playerStats.find(p => p.player.id === 2);
        
        expect(player1Stats.strokeCount).toBe(2);
        expect(player2Stats.strokeCount).toBe(3);
    });
}); 