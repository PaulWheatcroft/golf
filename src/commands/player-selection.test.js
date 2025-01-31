import playerSelection from './player-selection'
import Match from '../data-store/match'

beforeEach(() => {
    Match.getInstance().data = []
})

describe('player-selection', () => {
    it('should order the players in the Match singleton', () => {
        const nameOne = 'Paul' 
        const nameTwo = 'Vladislav'

        playerSelection(nameOne, nameTwo)
        const match = Match.getInstance()
        
        expect(match.data).toHaveLength(2)
    })
    it('should order the players randomly', () => {
        const nameOne = 'Paul' 
        const nameTwo = 'Vladislav'

        playerSelection(nameOne, nameTwo)
        const match = Match.getInstance()
        console.log("*************", match.data)
        expect(match.data[0].name).not.toBe(match.data[1].name)
    })
    it('player selection should retun and error if there are less than two players', () => {
        const nameOne = 'Paul' 
        const response = playerSelection(nameOne)
        expect(response).toBe('Error selecting players')
    })
})