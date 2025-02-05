import Match from '../data-store/match'
import clubSelection from './club-selection'



function randomNumber() {
    const rollOne =  Math.floor(Math.random() * 6) + 1
    const rollTwo =  Math.floor(Math.random() * 6) + 1
    return rollOne + rollTwo
}

function lookupHandicapPowerScore(player, selectedClub, powerRoll, accuracyRoll) {
    console.log('*** player', player)
    console.log('*** selectedClub', selectedClub.club.name)
    console.log('*** powerRoll', powerRoll)
    console.log('*** accuracyRoll', accuracyRoll)
    return {
        power: 0,
        accuracy: 0
    }
}

export default function hitBall(player) {
    const match = Match.getInstance().data;
    const selectedClub = match.findLast(item => item.type === 'clubSelection');

    if (!selectedClub) {
        return 'Please select a club'
    }
    console.log('*** selectedClub', selectedClub.playerId, player)
    if (selectedClub.playerId !== player.id) {
        return 'It is not your turn'
    }
    
    const powerRoll = randomNumber()
    const accuracyRoll = randomNumber()
    const handicapScore = lookupHandicapPowerScore(player, selectedClub, powerRoll, accuracyRoll)
    
    const distance = selectedClub.club.maxDistance + handicapScore.power
    const accuracy = handicapScore.accuracy
    
    match.push({ playerId: player.id, playerName: player.name, type: 'hitBall', distance, accuracy })
    return
}