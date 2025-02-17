import Hole from '../data-store/match'
import hitBall from './hit-ball'

beforeEach(() => {
    Hole.getInstance().data = [
        { id: 1, type: 'player', name: 'Vladislav' },
        { id: 2, type: 'player', name: 'Paul' },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'teeOffPosition',
            position: [11, 2]
        },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'clubSelection',
            club: { name: 'Long Iron', distance: 5, rough: false, sand: false }
        },
    ]
})

describe('hit-ball at tee off', () => {
    it('should check to make sure the last club selection matches the player taking a shot', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        match.data.push({ playerId: 2, playerName: 'Paul', type: 'clubSelection', club: { name: 'Long Iron', distance: 5, rough: false, sand: false } })
        const response = hitBall(player1)
        expect(response).toBe('It is not your turn')
    })
    it('should return the new ball position', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const currentPosition = match.data.findLast(item => item.type === 'teeOffPosition');
        hitBall(player1)
        // in test findLast needs to run on match.data not just match
        const newPosition = match.data.findLast(item => item.type === 'hitBall');
        expect(newPosition.position[0]).toBeGreaterThan(currentPosition.position[0])
    })
})


// ONLY in a TEE OFF situation, the second player should only be able to hit the ball if the first player has hit the ball