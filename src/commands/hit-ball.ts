import Match from '../data-store/match'
import clubSelection from './club-selection'



function randomNumber() {
    const rollOne =  Math.floor(Math.random() * 6) + 1
    const rollTwo =  Math.floor(Math.random() * 6) + 1
    return rollOne + rollTwo
}

function lookupHandicapPowerScore(player, selectedClub, powerRoll, accuracyRoll) {
    // get handicap scores
    return {
        power: 0,
        accuracy: 0
    }
}

export default function hitBall(player) {
    const match = Match.getInstance()
    const teeOffPositions = match.data[1].holes[0].teeOffPositions
    const selectedClub = match.data[2].club[0]
    
    const powerRoll = randomNumber()
    const accuracyRoll = randomNumber()
    const handicapScore = lookupHandicapPowerScore(player, selectedClub, powerRoll, accuracyRoll)
    
    const distance = selectedClub.distance + handicapScore.power
    const accuracy = handicapScore.accuracy
}