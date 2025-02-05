import Match from '../data-store/match'
import hitBall from './hit-ball'

beforeEach(() => {
    Match.getInstance().data = [
        { id: 1, type: 'player', name: 'Vladislav' },
        { id: 2, type: 'player', name: 'Paul' },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'teeOffPosition',
            position: 'left'
        },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'clubSelection',
            club: { name: 'Long Iron', maxDistance: 5, rough: false, sand: false }
        },
    ]
})

describe('hit-ball at tee off', () => {
    it('should check to make sure the last club selection matches the player taking a shot', () => {
        const match = Match.getInstance()
        const player1 = match.data[0]
        match.data.push({ playerId: 2, playerName: 'Paul', type: 'clubSelection', club: { name: 'Long Iron', maxDistance: 5, rough: false, sand: false } })
        const response = hitBall(player1)
        expect(response).toBe('It is not your turn')
    })
    it('should return the distance and accuracy', () => {
        const match = Match.getInstance()
        const player1 = match.data[0]
        hitBall(player1)
        console.log(match.data)
        // in test findLast needs to run on match.data not just match
        const lastHitBall = match.data.findLast(item => item.type === 'hitBall');
        expect(lastHitBall).toEqual({ playerId: 1, playerName: 'Vladislav', type: 'hitBall', distance: 5, accuracy: 0 })
    })
})


// ONLY in a TEE OFF situation, the second player should only be able to hit the ball if the first player has hit the ball