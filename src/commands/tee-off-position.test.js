import teeOffPosition from './tee-off-position'
import Hole from '../data-store/match'

beforeEach(() => {
    Hole.getInstance().data = [
        { id: 1, type: 'player', name: 'Vladislav' },
        { id: 2, type: 'player', name: 'Paul' },
    ]
})

describe('tee-off hole one', () => {
    it('the first player chooses the left position to tee off from', () => {
        const match = Hole.getInstance()
        const firstPlayer = match.data[0]

        const response = teeOffPosition(firstPlayer, 1)
        
        expect(match.data).toHaveLength(3)
        expect(match.data[2].position[0]).toBe(15)
        expect(match.data[2].position[1]).toBe(1)
        expect(response).toBe('Player Vladislav to tee off from position 1') 
    })
    // it('the first player cannot choose an incorrect postition to teeoff from', () => {
    //     const match = Hole.getInstance()
    //     const firstPlayer = match.data[0]

    //     const response = teeOffPosition(firstPlayer, [12, 2])
    //     expect(response).toBe('Invalid position to tee off from')
    // })
    // it('the second player cannot tee off if the first player has yet to', () => {
    //     const match = Hole.getInstance()
    //     const secondPlayer = match.data[1]
        
    //     const response = teeOffPosition(secondPlayer, [11, 2])
    //     expect(response).toBe('Please wait for the first player to tee off')
    // })
})