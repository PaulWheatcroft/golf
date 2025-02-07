import playerSelection from './player-selection'
import Hole from '../data-store/match'

beforeEach(() => {
    Hole.getInstance().data = []
})

describe('player-selection', () => {
    it('should order the players in the Hole singleton', () => {
        const nameOne = 'Paul' 
        const nameTwo = 'Vladislav'

        playerSelection(nameOne, nameTwo)
        const match = Hole.getInstance()
        
        expect(match.data).toHaveLength(2)
    })
    it('should order the players randomly', () => {
        const nameOne = 'Paul' 
        const nameTwo = 'Vladislav'

        playerSelection(nameOne, nameTwo)
        const match = Hole.getInstance()
        expect(match.data[0].name).not.toBe(match.data[1].name)
    })
    it('player selection should retun and error if there are less than two players', () => {
        const nameOne = 'Paul' 
        const response = playerSelection(nameOne)
        expect(response).toBe('Error selecting players')
    })
})