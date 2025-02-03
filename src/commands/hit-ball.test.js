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
            type: 'clubeSelection',
            club: { name: 'Long Iron', maxDistance: 5, rough: false, sand: false }
        },
    ]
})

describe('hit-ball at tee off', () => {
    it('it should only run if the player has selected a club', () => {
        const match = Match.getInstance()
        const player1 = match.data[0]
        const response = hitBall(player1)
        expect(response).toBe('Please select a club')
    })
    // it('should return the landing position of the ball', () => {
    //     const player1 = Match.getInstance().data[0].teeOff[0]
    //     hitBall(player1)
    //     const ball_position = Match.getInstance().data[3].ballPosition[0]
    //     expect(ball_position["x"]).toBeGreaterThanorEqualTo(0)
    //     expect(ball_position["x"]).toBeLessThan(8)
    //     expect(ball_position["y"]).toBeGreaterThanorEqualTo(4)
    //     expect(ball_position["y"]).toBeLessThanorEqualTo(6)
    // })
})


// ONLY in a TEE OFF situation, the second player should only be able to hit the ball if the first player has hit the ball