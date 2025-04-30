import Hole from '../data-store/match'
import { Player } from '../types/index'

export default function teeOffPosition(player: Player, position: number) {
    const match = Hole.getInstance()
    if (!player) {
        return 'Please select a player'
    }
    if (player.id == 2 && !match.data[2]) {
        return 'Please wait for the first player to tee off'
    }
    const teeOffPosition = match.teeoffPosition[(position - 1)]
    match.data.push({ playerId: player.id, playerName: player.name, type: 'teeOffPosition', position: teeOffPosition })
    return `Player ${player.name} to tee off from position ${position}`
}