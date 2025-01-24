import Match from '../data-store/match'

export default function playerSelection(players: { name: string }[]) {
    const teeOffOrder = players.sort(() => Math.random() - 0.5)
    const match = Match.getInstance()
    match.data.push({ teeOff: teeOffOrder })
    return teeOffOrder
} 