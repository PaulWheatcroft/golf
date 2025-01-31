import teeOffPosition from './tee-off-position'
import Match from '../data-store/match'

const positionalOptions = ["left", "middle", "right"]

beforeEach(() => {
    Match.getInstance().data = [
        { id: 1, type: 'player', name: 'Vladislav' },
        { id: 2, type: 'player', name: 'Paul' },
    ]
})

describe('tee-off hole one', () => {
    it('the first player chooses the left position to tee off from ', () => {
        const match = Match.getInstance()
        const firstPlayer = match.data[0]

        teeOffPosition(firstPlayer, positionalOptions[0])
        
        expect(match.data).toHaveLength(3)
        expect(match.data[2].position).toBe("left")
    })
    it('the second player cannot tee off if the first player has yet to', () => {
        const match = Match.getInstance()
        const secondPlayer = match.data[1]

        console.log("*****111********", match.data)
        
        const response = teeOffPosition(secondPlayer, positionalOptions[1])
        expect(response).toBe('Please wait for the first player to tee off')
    })
    it("the second player can tee off after the first player has teed off", () => {
        const match = Match.getInstance()
        match.data.push({ playerId: 1, playerName: 'Vladislav', type: 'teeOffPosition', position: 'left' })
        const secondPlayer = match.data[1]

        teeOffPosition(secondPlayer, positionalOptions[1])
        expect(match.data).toHaveLength(4)
        expect(match.data[3].position).toBe("middle")
    })
})