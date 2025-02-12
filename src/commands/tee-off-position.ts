import Hole from '../data-store/match'
import { Player } from '../types/index'
import { isArrayInArrayOfArrays } from '../utilities/index';


export default function teeOffPosition(player: Player, position: [number, number]) {
    const match = Hole.getInstance()
    if (!player) {
        return 'Please select a player'
    }
    if (player.id == 2 && !match.data[2]) {
        return 'Please wait for the first player to tee off'
    }
    if (isArrayInArrayOfArrays(position, match.teeoffPosition)) {
        match.data.push({ playerId: player.id, playerName: player.name, type: 'teeOffPosition', position: position })
    } else {
        return 'Invalid position to tee off from'
    }
}