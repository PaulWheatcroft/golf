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
            position: [ 15, 2 ]
        },
    ]
})

describe('club-selection at tee off', () => {
    it('the player must select a club', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        const response = clubSelection(player1, "")
        expect(response).toBe('Please select a club')
        
    })
    it('Player one selects a long iron', () => {
        const match = Hole.getInstance()
        const player1 = match.data[0]
        clubSelection(player1, clubs[2])
        const club = match.data.find(item => item.type === 'clubSelection')
        expect(club.club.name).toBe("Long Iron")
    })

})