import Hole from '../data-store/match'
import { Player } from '../types/index'

export default function clubSelection(player: Player, club: string) {
    const match = Hole.getInstance()
    if (!club) {
        return 'Please select a club'
    }
    const checkPlayerTeeOffPosition = match.data.find((player: Player) => player.type === 'teeOffPosition')

    if (checkPlayerTeeOffPosition.playerId !== player.id) {
        return 'You need to select a tee off position first'
    }
    match.data.push({ playerId: player.id, playerName: player.name, type: 'clubSelection', club })
}
