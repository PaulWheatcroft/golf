import clubSelection from './club-selection'
import Hole from '../data-store/match'
import { clubs } from '../types/clubs'


beforeEach(() => {
    Hole.getInstance().data = [
        { id: 1, type: 'player', name: 'Vladislav' },
        { id: 2, type: 'player', name: 'Paul' },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'teeOffPosition',
            position: [ 11, 2 ]
        },
    ]
})

describe('club-selection at tee off', () => {
    it('a player cannot select a club if they have not teed off', () => {
        const match = Hole.getInstance()
        const player2 = match.data[1]
        const response = clubSelection(player2, clubs[3])
        expect(response).toBe('You need to select a tee off position first')
    })
    it('the player must select a club', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const response = clubSelection(player1, "")
        expect(response).toBe('Please select a club')
        
    })
    it('Player one selects a long iron', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        clubSelection(player1, clubs[4])
        expect(match.data[3].club.name).toBe("Long Iron")
    })

})