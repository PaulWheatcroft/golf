import Match from '../data-store/match'
import hitBall from './hit-ball'

beforeEach(() => {
    Match.getInstance().data = [
        { teeOff: [ { name: 'Paul' }, { name: 'Vladislav' } ] },
        { teeOffPosition: [ 'left' ] },
        { matchProgreass: { round: 1 } },
        { club: [ 'Long Iron' ] }
      ]
})

describe('hit-ball', () => {
    it('it should only run if the first player has selected a club', () => {
        const player1 = Match.getInstance().data[0].teeOff[0]
        delete Match.getInstance().data[2]
        const response = hitBall(player1)
        expect(response).toBe('Please select a club')
    })
    it('should return the landing position of the ball', () => {
        const player1 = Match.getInstance().data[0].teeOff[0]
        hitBall(player1)
        const ball_position = Match.getInstance().data[3].ballPosition[0]
        expect(ball_position["x"]).toBeGreaterThanorEqualTo(0)
        expect(ball_position["x"]).toBeLessThan(8)
        expect(ball_position["y"]).toBeGreaterThanorEqualTo(4)
        expect(ball_position["y"]).toBeLessThanorEqualTo(6)
    })
})


// ONLY in a TEE OFF situation, the second player should only be able to hit the ball if the first player has hit the ball