import Match from '../data-store/match'

export default function teeOffPosition(playerOrder: number, position: number) {
    // no shot hasn't been taken
    const match = Match.getInstance()
    if (match.data.length === 0) {
        return 'Please select players first'
    }
    if (match.data.length === 1) {
        match.data.push({ teeOffPosition: [position] })
        return
    }
    if (match.data.length === 2 && match.data[1].teeOffPosition.length === 1) {
        // add the socond player tee off position to the array
        match.data[1].teeOffPosition.push(position)
        return
    }
}