import Match from '../data-store/match'

export default function teeOffPosition(firstPlayer: { name: string }, position: number) {
    // no shot hasn't been taken
    const match = Match.getInstance()
    if (match.data.length === 0) {
        return 'Please select players first'
    }
    match.data.push({ teeOffPosition: position })
    return
}