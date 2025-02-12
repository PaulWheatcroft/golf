import Hole from '../data-store/match'
import { Player } from '../types/index'
import { isArrayInArrayOfArrays } from '../utilities/index';

function getAvailableAimOptions(currentBallPosition: [number, number], clubSelectionDistance: number): [number, number][] {
    const x: number = currentBallPosition["position"][0]
    const y: number = currentBallPosition["position"][1]
    const aimDistance: number = x - clubSelectionDistance["club"]["distance"]
    const availableAimOptions = [[aimDistance, (y - 1)], [aimDistance, y], [aimDistance, (y +1)]]
     
    // check if the aim is within the bounds of the course
    return availableAimOptions as [number, number][]
}

export default function aimSelection(player: Player, aim: [number, number]) {
    const match = Hole.getInstance()
    if (!aim) {
        return 'Please select an aim'
    }
    const currentBallPosition = match.data.find((player: Player) => player.type === 'teeOffPosition')
    const clubSelection = match.data.findLast((player: Player) => player.type === 'clubSelection')
    const availableAimOptions = getAvailableAimOptions(currentBallPosition, clubSelection)
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