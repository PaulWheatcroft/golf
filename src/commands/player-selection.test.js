import playerSelection from './player-selection'
import Match from '../data-store/match'

beforeEach(() => {
    Match.getInstance().data = []
})

describe('player-selection', () => {
    it('should order the players in an array of two players', () => {
        const player1 = { name: 'player1' }
        const player2 = { name: 'player2' }

        const response = playerSelection([player1, player2])
        expect(response).toHaveLength(2)
    })
    it('should order the players randomly', () => {
        const player1 = { name: 'player1' }
        const player2 = { name: 'player2' }

        const random_order_of_players = playerSelection([player1, player2])
        expect(random_order_of_players[0]).not.toEqual(random_order_of_players[1])
    })
    it('should store the order of the players in the Match singleton', () => {
        const player1 = { name: 'player1' }
        const player2 = { name: 'player2' }

        playerSelection([player1, player2])
        const match = Match.getInstance()
        expect(match.data).toHaveLength(1)
        expect(match.data[0].teeOff).toHaveLength(2) 
    })
})