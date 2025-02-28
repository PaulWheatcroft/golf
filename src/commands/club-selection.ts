import Hole from '../data-store/match'
import { Player } from '../types/index'
import { clubs, Club } from '../types/clubs'

export default function clubSelection(player: Player, club: Club) {
    const match = Hole.getInstance()
    if (!club) {
        return 'Please select a club'
    }
    // const checkPlayerTeeOffPosition = match.data.find((player: Player) => player.type === 'teeOffPosition')
    const getCurrentPositionOrTeeOffPosition = match.data.find((player: Player) => player.type === 'hitBall' || player.type === 'teeOffPosition')
    if (!getCurrentPositionOrTeeOffPosition) {
        return 'You need to select a tee off position first'
    }


    match.data.push({ playerId: player.id, playerName: player.name, type: 'clubSelection', club })
}
