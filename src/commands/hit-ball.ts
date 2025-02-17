import Hole from '../data-store/match'
import { clubs } from '../types/clubs'



function randomNumber() {
    const rollOne =  Math.floor(Math.random() * 6) + 1
    const rollTwo =  Math.floor(Math.random() * 6) + 1
    return rollOne + rollTwo
}

function lookupModifiers(selectedClub, powerRoll, accuracyRoll) {
    const clubAttributes = clubs.find(club => club.name === selectedClub.club.name)
    const power = clubAttributes.fairwayPower[powerRoll - 1]
    const accuracy = clubAttributes.fairwayAccuracy[accuracyRoll - 1]
    return { power, accuracy }
}

export default function hitBall(player) {
    const match = Hole.getInstance().data;

    const selectedClub = match.findLast(item => item.type === 'clubSelection');

    if (!selectedClub) {
        return 'Please select a club'
    }
    if (selectedClub.playerId !== player.id) {
        return 'It is not your turn'
    }

    // If this is the first hit get the tee off position
    // If there has already been a hit get the last position
    const currentposition = match.findLast(item => item.type === 'hitBall' && item.playerId === player.id) || match.findLast(item => item.type === 'teeOffPosition' && item.playerId === player.id);

    const powerRoll = randomNumber()
    const accuracyRoll = randomNumber()

    const modifiers = lookupModifiers(selectedClub, powerRoll, accuracyRoll)
    
    const distance = selectedClub.club.distance + modifiers.power
    let accuracy = currentposition.position[1]
    if (modifiers.accuracy === 1) {
        accuracy = accuracy - 1
    } else if (modifiers.accuracy === 3) {
        accuracy = accuracy + 1
    }

    const newPosition = [currentposition.position[0] + distance, accuracy]

    console.log(`Player ${player.name} started at ${currentposition.position} and hit the ball ${distance} yards with an accuracy of ${accuracy} to position ${newPosition}`)
    
    match.push({ playerId: player.id, playerName: player.name, type: 'hitBall', position: newPosition })
    return
}