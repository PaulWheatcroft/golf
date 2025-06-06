import {
    getPlayerStrokeCount,
    getActivePlayers,
    isPlayerOnGreen,
    getNextPlayer,
    isPlayerTurn,
    getGameStatus
} from './turn-manager';
import { firstHole } from '../data-store/holes';

describe('Turn Manager System', () => {
    let mockGameData;
    
    beforeEach(() => {
        mockGameData = [
            { id: 1, type: 'player', name: 'Alice' },
            { id: 2, type: 'player', name: 'Bob' },
            { playerId: 1, playerName: 'Alice', type: 'teeOffPosition', position: [15, 1] },
            { playerId: 2, playerName: 'Bob', type: 'teeOffPosition', position: [15, 2] },
            { playerId: 1, playerName: 'Alice', type: 'clubSelection', club: { name: 'Driver' } },
            { playerId: 2, playerName: 'Bob', type: 'clubSelection', club: { name: 'Driver' } },
            { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [6, 1] }, // Distance: ~4.12
            { playerId: 2, playerName: 'Bob', type: 'hitBall', position: [8, 2] }      // Distance: ~6
        ];
    });

    describe('getPlayerStrokeCount', () => {
        it('should count hit ball events for a player', () => {
            const strokeCount = getPlayerStrokeCount(1, mockGameData);
            expect(strokeCount).toBe(1);
        });

        it('should return 0 for player with no shots', () => {
            const gameDataNoHits = mockGameData.filter(item => item.type !== 'hitBall');
            const strokeCount = getPlayerStrokeCount(1, gameDataNoHits);
            expect(strokeCount).toBe(0);
        });

        it('should count multiple shots correctly', () => {
            mockGameData.push(
                { playerId: 1, playerName: 'Alice', type: 'clubSelection', club: { name: 'Iron' } },
                { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [4, 1] }
            );
            const strokeCount = getPlayerStrokeCount(1, mockGameData);
            expect(strokeCount).toBe(2);
        });

        it('should return 0 for non-existent player', () => {
            const strokeCount = getPlayerStrokeCount(99, mockGameData);
            expect(strokeCount).toBe(0);
        });
    });

    describe('getActivePlayers', () => {
        it('should return all players from game data', () => {
            const players = getActivePlayers(mockGameData);
            expect(players).toHaveLength(2);
            expect(players[0].name).toBe('Alice');
            expect(players[1].name).toBe('Bob');
        });

        it('should return empty array if no players', () => {
            const emptyGameData = [];
            const players = getActivePlayers(emptyGameData);
            expect(players).toHaveLength(0);
        });

        it('should filter out non-player entries', () => {
            const players = getActivePlayers(mockGameData);
            expect(players).toHaveLength(2);
            expect(players.every(p => p.type === 'player')).toBe(true);
        });
    });

    describe('isPlayerOnGreen', () => {
        it('should return false for player on fairway', () => {
            const isOnGreen = isPlayerOnGreen(1, mockGameData, firstHole.map);
            expect(isOnGreen).toBe(false);
        });

        it('should return true for player on green', () => {
            const gameDataOnGreen = [...mockGameData];
            gameDataOnGreen.push({
                playerId: 1, 
                playerName: 'Alice', 
                type: 'hitBall', 
                position: [1, 2] // Green position
            });
            
            const isOnGreen = isPlayerOnGreen(1, gameDataOnGreen, firstHole.map);
            expect(isOnGreen).toBe(true);
        });

        it('should return true for player at hole', () => {
            const gameDataAtHole = [...mockGameData];
            gameDataAtHole.push({
                playerId: 1, 
                playerName: 'Alice', 
                type: 'hitBall', 
                position: [2, 2] // Hole position
            });
            
            const isOnGreen = isPlayerOnGreen(1, gameDataAtHole, firstHole.map);
            expect(isOnGreen).toBe(true);
        });

        it('should return false for player with no position', () => {
            const gameDataNoPosition = mockGameData.filter(item => 
                !(item.type === 'hitBall' || item.type === 'teeOffPosition')
            );
            
            const isOnGreen = isPlayerOnGreen(1, gameDataNoPosition, firstHole.map);
            expect(isOnGreen).toBe(false);
        });

        it('should return false for out of bounds position', () => {
            const gameDataOutOfBounds = [...mockGameData];
            gameDataOutOfBounds.push({
                playerId: 1, 
                playerName: 'Alice', 
                type: 'hitBall', 
                position: [20, 20] // Out of bounds
            });
            
            const isOnGreen = isPlayerOnGreen(1, gameDataOutOfBounds, firstHole.map);
            expect(isOnGreen).toBe(false);
        });
    });

    describe('getNextPlayer', () => {
        it('should return furthest player from hole', () => {
            // Bob is at [8,2] (distance ~6), Alice is at [6,1] (distance ~4.12)
            // Bob should go next (furthest from hole)
            const nextPlayer = getNextPlayer(mockGameData, firstHole.map);
            expect(nextPlayer?.name).toBe('Bob');
            expect(nextPlayer?.id).toBe(2);
        });

        it('should use stroke count as tie-breaker when distances are equal', () => {
            const gameDataEqual = [...mockGameData];
            // Make both players at same distance but Alice has more strokes
            gameDataEqual[6] = { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [8, 2] }; // Same as Bob
            gameDataEqual.push(
                { playerId: 1, playerName: 'Alice', type: 'clubSelection', club: { name: 'Iron' } },
                { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [8, 2] } // Alice now has 2 strokes
            );
            
            const nextPlayer = getNextPlayer(gameDataEqual, firstHole.map);
            expect(nextPlayer?.name).toBe('Bob'); // Bob should go (fewer strokes)
        });

        it('should return null when no players exist', () => {
            const emptyGameData = [];
            const nextPlayer = getNextPlayer(emptyGameData, firstHole.map);
            expect(nextPlayer).toBeNull();
        });

        it('should return null when no players have valid positions', () => {
            const gameDataNoPositions = [
                { id: 1, type: 'player', name: 'Alice' },
                { id: 2, type: 'player', name: 'Bob' }
            ];
            const nextPlayer = getNextPlayer(gameDataNoPositions, firstHole.map);
            expect(nextPlayer).toBeNull();
        });

        it('should work with players at different stages', () => {
            const gameDataMixed = [
                { id: 1, type: 'player', name: 'Alice' },
                { id: 2, type: 'player', name: 'Bob' },
                { playerId: 1, playerName: 'Alice', type: 'teeOffPosition', position: [15, 1] },
                { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [5, 1] }, // Closer to hole
                { playerId: 2, playerName: 'Bob', type: 'teeOffPosition', position: [15, 2] } // Still at tee
            ];
            
            const nextPlayer = getNextPlayer(gameDataMixed, firstHole.map);
            expect(nextPlayer?.name).toBe('Bob'); // Bob is furthest (still at tee)
        });
    });

    describe('isPlayerTurn', () => {
        it('should return true for player whose turn it is', () => {
            const isBobTurn = isPlayerTurn(2, mockGameData, firstHole.map);
            expect(isBobTurn).toBe(true);
        });

        it('should return false for player whose turn it is not', () => {
            const isAliceTurn = isPlayerTurn(1, mockGameData, firstHole.map);
            expect(isAliceTurn).toBe(false);
        });

        it('should return false for non-existent player', () => {
            const isNonExistentTurn = isPlayerTurn(99, mockGameData, firstHole.map);
            expect(isNonExistentTurn).toBe(false);
        });
    });

    describe('getGameStatus', () => {
        it('should return comprehensive game status', () => {
            const status = getGameStatus(mockGameData, firstHole.map);
            
            expect(status.nextPlayer?.name).toBe('Bob');
            expect(status.playerStats).toHaveLength(2);
            expect(status.allOnGreen).toBe(false);
            expect(status.isComplete).toBe(false);
        });

        it('should include player statistics', () => {
            const status = getGameStatus(mockGameData, firstHole.map);
            
            const aliceStats = status.playerStats.find(p => p.player.name === 'Alice');
            const bobStats = status.playerStats.find(p => p.player.name === 'Bob');
            
            expect(aliceStats?.strokeCount).toBe(1);
            expect(aliceStats?.isOnGreen).toBe(false);
            expect(aliceStats?.distance).toBeCloseTo(4.1, 1);
            
            expect(bobStats?.strokeCount).toBe(1);
            expect(bobStats?.isOnGreen).toBe(false);
            expect(bobStats?.distance).toBe(6);
        });

        it('should detect when all players are on green', () => {
            const gameDataAllOnGreen = [...mockGameData];
            gameDataAllOnGreen[6] = { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [1, 2] }; // Green
            gameDataAllOnGreen[7] = { playerId: 2, playerName: 'Bob', type: 'hitBall', position: [3, 2] };   // Green
            
            const status = getGameStatus(gameDataAllOnGreen, firstHole.map);
            expect(status.allOnGreen).toBe(true);
        });

        it('should handle empty game data', () => {
            const status = getGameStatus([], firstHole.map);
            expect(status.nextPlayer).toBeNull();
            expect(status.playerStats).toHaveLength(0);
            expect(status.allOnGreen).toBe(true); // Vacuously true
            expect(status.isComplete).toBe(true);
        });
    });

    describe('Integration scenarios', () => {
        it('should handle complex multi-shot scenario', () => {
            const complexGameData = [
                { id: 1, type: 'player', name: 'Alice' },
                { id: 2, type: 'player', name: 'Bob' },
                // Alice: Tee -> Hit -> Hit (2 strokes, closer to hole)
                { playerId: 1, playerName: 'Alice', type: 'teeOffPosition', position: [15, 1] },
                { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [7, 1] },
                { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [4, 1] },
                // Bob: Tee -> Hit (1 stroke, further from hole)
                { playerId: 2, playerName: 'Bob', type: 'teeOffPosition', position: [15, 2] },
                { playerId: 2, playerName: 'Bob', type: 'hitBall', position: [6, 2] }
            ];
            
            const nextPlayer = getNextPlayer(complexGameData, firstHole.map);
            expect(nextPlayer?.name).toBe('Bob'); // Bob is further despite fewer strokes
            
            const status = getGameStatus(complexGameData, firstHole.map);
            expect(status.playerStats.find(p => p.player.name === 'Alice')?.strokeCount).toBe(2);
            expect(status.playerStats.find(p => p.player.name === 'Bob')?.strokeCount).toBe(1);
        });

        it('should handle players at exact same distance with different stroke counts', () => {
            const tieGameData = [
                { id: 1, type: 'player', name: 'Alice' },
                { id: 2, type: 'player', name: 'Bob' },
                { playerId: 1, playerName: 'Alice', type: 'teeOffPosition', position: [15, 1] },
                { playerId: 2, playerName: 'Bob', type: 'teeOffPosition', position: [15, 2] },
                { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [5, 2] }, // Distance: 3
                { playerId: 1, playerName: 'Alice', type: 'hitBall', position: [5, 2] }, // Alice: 2 strokes
                { playerId: 2, playerName: 'Bob', type: 'hitBall', position: [5, 2] }    // Bob: 1 stroke, same distance
            ];
            
            const nextPlayer = getNextPlayer(tieGameData, firstHole.map);
            expect(nextPlayer?.name).toBe('Bob'); // Bob goes first (fewer strokes)
        });
    });
}); 