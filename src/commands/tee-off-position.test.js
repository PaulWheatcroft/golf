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

        teeOffPosition(firstPlayer, [11, 2])
        
        expect(match.data).toHaveLength(3)
        expect(match.data[2].position[0]).toBe(11)
        expect(match.data[2].position[1]).toBe(2)
    })
    it('the first player cannot choose an incorrect postition to teeoff from', () => {
        const match = Hole.getInstance()
        const firstPlayer = match.data[0]

        const response = teeOffPosition(firstPlayer, [12, 2])
        expect(response).toBe('Invalid position to tee off from')
    })
    it('the second player cannot tee off if the first player has yet to', () => {
        const match = Hole.getInstance()
        const secondPlayer = match.data[1]
        
        const response = teeOffPosition(secondPlayer, [11, 2])
        expect(response).toBe('Please wait for the first player to tee off')
    })
    // it("the second player can tee off after the first player has teed off", () => {
    //     const match = Hole.getInstance()
    //     match.data.push({ playerId: 1, playerName: 'Vladislav', type: 'teeOffPosition', position: 'left' })
    //     const secondPlayer = match.data[1]

    //     teeOffPosition(secondPlayer, [11, 3])
    //     expect(match.data).toHaveLength(4)
    //     expect(match.data[3].position[0]).toBe(11)
    //     expect(match.data[3].position[1]).toBe(3)
    // })
})