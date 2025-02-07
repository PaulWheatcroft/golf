import Hole from '../data-store/match'

const match = Hole.getInstance()

export default function playerSelection(playerOne: string, playerTwo: string) {
    const players = [
        { name: playerOne },
        { name: playerTwo }
    ]
    if (!players[0].name || !players[1].name) {
        return 'Error selecting players'
    }
    const teeOffOrder = players.sort(() => Math.random() - 0.5)
    match.data.push(
        { 
            id: 1,
            type: 'player',
            name: teeOffOrder[0].name,
        },
        { 
            id: 2,
            type: 'player',
            name: teeOffOrder[1].name,
        }
    )

    return
} 