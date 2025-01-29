import playerSelection from './player-selection'
import teeOffPosition from './tee-off-position'
import clubSelection from './club-selection'
import Match from '../data-store/match'

const positionalOptions = ["left", "middle", "right"]

beforeEach(() => {
    Match.getInstance().data = []
})

describe('club-selection', () => {
    it('it should only run if player has selected a club', () => {
        const player1 = { name: 'player1' }
        const player2 = { name: 'player2' }

        playerSelection([player1, player2])
        teeOffPosition(player1, positionalOptions[0])
        const response = clubSelection(player1, "")
        expect(response).toBe('Please select a club')
        
    })
    it('the player who is going to hit the ball selects a long iron', () => {
        const match = Match.getInstance()
        const player1 = { name: 'player1' }
        const player2 = { name: 'player2' }

        playerSelection([player1, player2])
        teeOffPosition(player1, positionalOptions[0])
        clubSelection(match.data[0].teeOff[0], "Long Iron")
        console.dir(Match.getInstance(), { depth: null })
        expect(match.data).toHaveLength(3)
        expect(match.data[2].club[0]).toBe("Long Iron")
    })
})