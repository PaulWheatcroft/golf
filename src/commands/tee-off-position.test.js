import teeOffPosition from './tee-off-position'
import Match from '../data-store/match'

beforeEach(() => {
    Match.getInstance().data = []
})

describe('tee-off', () => {
    it('it should only run if players have selected', () => {
        const match = Match.getInstance()
        
        const firstPlayer = {"name": "player1"}
        const response = teeOffPosition(firstPlayer, 1)
        expect(response).toBe('Please select players first')
    })
    it('the first player chooses the central position to tee off from and it is stored in the Match singleton', () => {
        const match = Match.getInstance()
        match.data.push({ teeOff: [{"name": "player1"}, {"name": "player2"}] })
        const firstPlayer = match.data[0].teeOff[0]
        const positionalOptions = [1, 2, 3]

        teeOffPosition(firstPlayer, positionalOptions[0])
        expect(match.data).toHaveLength(2)
        expect(match.data[1].teeOffPosition).toBe(1)
    })
})