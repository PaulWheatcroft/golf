import { 
    findHolePosition, 
    calculateEuclideanDistance, 
    calculateDistanceFromHole, 
    getPlayerDistanceFromHole 
} from './index';
import { firstHole } from '../data-store/holes';

describe('Distance Calculation System', () => {
    
    describe('findHolePosition', () => {
        it('should find the hole position in the standard map', () => {
            const holePosition = findHolePosition(firstHole.map);
            expect(holePosition).toEqual([2, 2]);
        });

        it('should return null if no hole is found', () => {
            const mapWithoutHole = [
                ['fairway', 'fairway'],
                ['green', 'green']
            ];
            const holePosition = findHolePosition(mapWithoutHole);
            expect(holePosition).toBeNull();
        });

        it('should find hole in different positions', () => {
            const customMap = [
                ['fairway', 'hole', 'fairway'],
                ['green', 'green', 'green']
            ];
            const holePosition = findHolePosition(customMap);
            expect(holePosition).toEqual([0, 1]);
        });

        it('should handle empty map', () => {
            const emptyMap = [];
            const holePosition = findHolePosition(emptyMap);
            expect(holePosition).toBeNull();
        });
    });

    describe('calculateEuclideanDistance', () => {
        it('should calculate distance between two points correctly', () => {
            // Distance from (0,0) to (3,4) should be 5
            const distance = calculateEuclideanDistance([0, 0], [3, 4]);
            expect(distance).toBe(5);
        });

        it('should calculate distance when points are the same', () => {
            const distance = calculateEuclideanDistance([5, 5], [5, 5]);
            expect(distance).toBe(0);
        });

        it('should calculate distance for negative coordinates', () => {
            const distance = calculateEuclideanDistance([-2, -2], [1, 2]);
            expect(distance).toBe(5);
        });

        it('should calculate distance for decimal results', () => {
            // Distance from (0,0) to (1,1) should be sqrt(2) ≈ 1.414
            const distance = calculateEuclideanDistance([0, 0], [1, 1]);
            expect(distance).toBeCloseTo(Math.sqrt(2), 5);
        });
    });

    describe('calculateDistanceFromHole', () => {
        it('should calculate distance from tee position to hole', () => {
            // Tee position is [11, 2], hole is at [2, 2]
            // Distance should be 9 (straight vertical line)
            const distance = calculateDistanceFromHole([11, 2], firstHole.map);
            expect(distance).toBe(9);
        });

        it('should calculate distance from green position to hole', () => {
            // Position [1, 2] (green next to hole [2, 2])
            // Distance should be 1
            const distance = calculateDistanceFromHole([1, 2], firstHole.map);
            expect(distance).toBe(1);
        });

        it('should return 0 when player is at the hole', () => {
            const distance = calculateDistanceFromHole([2, 2], firstHole.map);
            expect(distance).toBe(0);
        });

        it('should return null for invalid player position - out of bounds', () => {
            const distance = calculateDistanceFromHole([20, 20], firstHole.map);
            expect(distance).toBeNull();
        });

        it('should return null for negative coordinates', () => {
            const distance = calculateDistanceFromHole([-1, 2], firstHole.map);
            expect(distance).toBeNull();
        });

        it('should return null for invalid position format', () => {
            const distance = calculateDistanceFromHole(null, firstHole.map);
            expect(distance).toBeNull();
        });

        it('should return null for incomplete position array', () => {
            const distance = calculateDistanceFromHole([5], firstHole.map);
            expect(distance).toBeNull();
        });

        it('should calculate diagonal distance correctly', () => {
            // From bottom-left corner [11, 0] to hole [2, 2]
            const distance = calculateDistanceFromHole([11, 0], firstHole.map);
            const expectedDistance = Math.sqrt(Math.pow(9, 2) + Math.pow(2, 2));
            expect(distance).toBeCloseTo(expectedDistance, 5);
        });
    });

    describe('getPlayerDistanceFromHole', () => {
        let mockGameData;

        beforeEach(() => {
            mockGameData = [
                { id: 1, type: 'player', name: 'Player1' },
                { id: 2, type: 'player', name: 'Player2' },
                { 
                    playerId: 1, 
                    playerName: 'Player1', 
                    type: 'teeOffPosition', 
                    position: [11, 2] 
                },
                { 
                    playerId: 2, 
                    playerName: 'Player2', 
                    type: 'teeOffPosition', 
                    position: [11, 1] 
                }
            ];
        });

        it('should get distance for player with teeOffPosition', () => {
            const distance = getPlayerDistanceFromHole(1, mockGameData, firstHole.map);
            expect(distance).toBe(9); // Distance from [11, 2] to [2, 2]
        });

        it('should get distance for player with hitBall position (most recent)', () => {
            mockGameData.push({
                playerId: 1,
                playerName: 'Player1',
                type: 'hitBall',
                position: [6, 2]
            });
            
            const distance = getPlayerDistanceFromHole(1, mockGameData, firstHole.map);
            expect(distance).toBe(4); // Distance from [6, 2] to [2, 2]
        });

        it('should use most recent position when multiple positions exist', () => {
            mockGameData.push(
                {
                    playerId: 1,
                    playerName: 'Player1',
                    type: 'hitBall',
                    position: [8, 2]
                },
                {
                    playerId: 1,
                    playerName: 'Player1',
                    type: 'hitBall',
                    position: [5, 2]
                }
            );
            
            const distance = getPlayerDistanceFromHole(1, mockGameData, firstHole.map);
            expect(distance).toBe(3); // Distance from most recent position [5, 2] to [2, 2]
        });

        it('should return null for player that does not exist', () => {
            const distance = getPlayerDistanceFromHole(99, mockGameData, firstHole.map);
            expect(distance).toBeNull();
        });

        it('should return null for player without position data', () => {
            const gameDataWithoutPositions = [
                { id: 1, type: 'player', name: 'Player1' },
                { id: 2, type: 'player', name: 'Player2' }
            ];
            
            const distance = getPlayerDistanceFromHole(1, gameDataWithoutPositions, firstHole.map);
            expect(distance).toBeNull();
        });

        it('should handle player with invalid position data', () => {
            mockGameData.push({
                playerId: 1,
                playerName: 'Player1',
                type: 'hitBall',
                position: null
            });
            
            const distance = getPlayerDistanceFromHole(1, mockGameData, firstHole.map);
            expect(distance).toBeNull();
        });

        it('should calculate distance correctly for player 2', () => {
            const distance = getPlayerDistanceFromHole(2, mockGameData, firstHole.map);
            // Player 2 is at [11, 1], hole is at [2, 2]
            const expectedDistance = Math.sqrt(Math.pow(9, 2) + Math.pow(1, 2));
            expect(distance).toBeCloseTo(expectedDistance, 5);
        });
    });

    describe('Edge Cases and Integration', () => {
        it('should handle different map configurations', () => {
            const smallMap = [
                ['fairway', 'hole'],
                ['green', 'green']
            ];
            
            // Distance from [1, 1] to hole at [0, 1] should be 1 (straight vertical)
            const distance = calculateDistanceFromHole([1, 1], smallMap);
            expect(distance).toBe(1);
        });

        it('should work with larger maps', () => {
            const largeMap = Array(20).fill(null).map(() => Array(20).fill('fairway'));
            largeMap[10][10] = 'hole'; // Place hole at center
            
            const distance = calculateDistanceFromHole([0, 0], largeMap);
            const expectedDistance = Math.sqrt(200); // sqrt(10^2 + 10^2)
            expect(distance).toBeCloseTo(expectedDistance, 5);
        });

        it('should handle maps with multiple holes (finds first one)', () => {
            const mapWithMultipleHoles = [
                ['hole', 'fairway', 'hole'],
                ['green', 'green', 'green']
            ];
            
            const holePosition = findHolePosition(mapWithMultipleHoles);
            expect(holePosition).toEqual([0, 0]); // Should find the first hole
        });
    });
}); 