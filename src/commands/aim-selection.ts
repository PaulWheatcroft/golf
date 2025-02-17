import Hole from '../data-store/match'
import { Player } from '../types/index'
import { isArrayInArrayOfArrays } from '../utilities/index';

function getAvailableAimOptions(currentposition: [number, number], clubSelectionDistance: number): [number, number][] {
    const match = Hole.getInstance()
    const x: number = currentposition["position"][0]
    const y: number = currentposition["position"][1]
    const aimRow: number = x - clubSelectionDistance["club"]["distance"]

    const mapRow = match.map[aimRow]

    const availableAimOptions = [[aimRow, (y - 1)], [aimRow, y], [aimRow, (y +1)]].filter(option => mapRow[option[1]] !== 'water' && mapRow[option[1]] !== 'outOfBounds');

    return availableAimOptions as [number, number][]
}

export default function aimSelection(player: Player, aim: [number, number]) {
    const match = Hole.getInstance()
    if (!aim) {
        return 'Please select an aim'
    }
    const currentposition = match.data.find((player: Player) => player.type === 'teeOffPosition')
    const clubSelection = match.data.findLast((player: Player) => player.type === 'clubSelection')
    const availableAimOptions = getAvailableAimOptions(currentposition, clubSelection)
    if (!isArrayInArrayOfArrays(aim, availableAimOptions)) {
        return `This is not an available square for you to aim at. Please select one of ${availableAimOptions}`
    }

    match.data.push({
        type: 'aimSelection',
        player: player,
        position: aim
    })

    return  `Ready to take a swing? Hit that space bar!!!!!!!`
}