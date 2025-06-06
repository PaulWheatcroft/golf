import Hole from '../data-store/match'
import hitBall, { diceRoller } from './hit-ball'

// Create a backup of the original implementation
const originalRollDice = diceRoller.rollDice;

beforeEach(() => {
    Hole.getInstance().data = [
        { id: 1, type: 'player', name: 'Vladislav' },
        { id: 2, type: 'player', name: 'Paul' },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'teeOffPosition',
            position: [15, 2]
        },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'clubSelection',
            club: { name: 'Long Iron', distance: 5, rough: false, sand: false }
        },
    ]
    
    // Reset the mock before each test
    diceRoller.rollDice = originalRollDice;
});

describe('hit-ball at tee off', () => {
    it('should check to make sure the last club selection matches the player taking a shot', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        match.data.push({ playerId: 2, playerName: 'Paul', type: 'clubSelection', club: { name: 'Long Iron', distance: 5, rough: false, sand: false } })
        const response = hitBall(player1, { checkTurn: false })
        expect(response).toBe('It is not your turn')
    })
    
    it('should return the new ball position', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');
        
        // Mock sequence of dice rolls
        let mockRolls = [7, 6]; // Power roll, accuracy roll
        diceRoller.rollDice = jest.fn(() => mockRolls.shift());
        
        hitBall(player1, { checkTurn: false })
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[0]).toBeLessThan(currentPosition.position[0])
    })
    
    it('should return the correct new accuracy position for straight shot', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');

        // Mock sequence for straight shot (accuracy = 2)
        let mockRolls = [6, 7]; // Power roll, accuracy roll for 'straight'
        diceRoller.rollDice = jest.fn(() => mockRolls.shift());
        
        const response = hitBall(player1, { checkTurn: false })
        console.log(response)
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[1]).toBe(currentPosition.position[1])
    })
    
    it('should move the ball left when accuracy roll is low', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');
        
        // Mock sequence for left shot (accuracy = 1)
        let mockRolls = [6, 2]; // Power roll, accuracy roll for 'left'
        diceRoller.rollDice = jest.fn(() => mockRolls.shift());
        
        const response = hitBall(player1, { checkTurn: false })
        console.log(response)
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[1]).toBe(currentPosition.position[1] - 1)
    })
    
    it('should move the ball right when accuracy roll is high', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');
        
        // Mock sequence for right shot (accuracy = 3)
        let mockRolls = [6, 12]; // Power roll, accuracy roll for 'right'
        diceRoller.rollDice = jest.fn(() => mockRolls.shift());
        
        hitBall(player1, { checkTurn: false })
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[1]).toBe(currentPosition.position[1] + 1)
    })

    it('should return a correct new distance position when the power roll is 7', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');
        
        // Mock sequence for high power shot
        let mockRolls = [7, 7]; // Power roll, accuracy roll
        diceRoller.rollDice = jest.fn(() => mockRolls.shift());
        
        hitBall(player1, { checkTurn: false })
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[0]).toBe(currentPosition.position[0] - 5)
    })

    it('should return a correct new distance position when the power roll is high', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');
        
        // Mock sequence for high power shot
        let mockRolls = [12, 7]; // Power roll, accuracy roll
        diceRoller.rollDice = jest.fn(() => mockRolls.shift());
        
        hitBall(player1, { checkTurn: false })
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[0]).toBe(currentPosition.position[0] - 7)
    })

    it('should return a correct new distance position when the power roll is low', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');
        
        // Mock sequence for high power shot
        let mockRolls = [1, 7]; // Power roll, accuracy roll
        diceRoller.rollDice = jest.fn(() => mockRolls.shift());
        
        hitBall(player1, { checkTurn: false })
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[0]).toBe(currentPosition.position[0])
    })
    
    afterAll(() => {
        // Restore original function after all tests
        diceRoller.rollDice = originalRollDice;
    });
})

// ONLY in a TEE OFF situation, the second player should only be able to hit the ball if the first player has hit the ball