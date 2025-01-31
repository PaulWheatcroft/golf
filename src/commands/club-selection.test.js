import clubSelection from './club-selection'
import Match from '../data-store/match'
import { clubs } from '../types/clubs'


beforeEach(() => {
    Match.getInstance().data = [
        { id: 1, type: 'player', name: 'Vladislav' },
        { id: 2, type: 'player', name: 'Paul' },
        {
            playerId: 1,
            playerName: 'Vladislav',
            type: 'teeOffPosition',
            position: 'left'
        },
    ]
})

describe('club-selection at tee off', () => {
    it('it should only run if player has selected a club', () => {
        const match = Match.getInstance()
        const player1 = match.data[0]
        const response = clubSelection(player1, "")
        expect(response).toBe('Please select a club')
        
    })
    it('the player to tee off selects a long iron', () => {
        const match = Match.getInstance()
        const player1 = match.data[0]
        clubSelection(player1, clubs[4])
        expect(match.data).toHaveLength(4)
        expect(match.data[3].club.name).toBe("Long Iron")
    })
    it('a player cannot select a club if they have not teed off', () => {
        const match = Match.getInstance()
        const player2 = match.data[1]
        const response = clubSelection(player2, clubs[3])
        expect(response).toBe('You need to select a tee off position first')
    })
})