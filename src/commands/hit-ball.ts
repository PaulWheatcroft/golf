import Match from '../data-store/match'

export default function hitBall(player) {
    const match = Match.getInstance()
    if (!match.data[2]?.club) {
        return 'Please select a club'
    }
}