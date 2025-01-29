import Match from '../data-store/match'

export default function clubSelection(player: { name: string }, club: string) {
    const match = Match.getInstance()
    if (!club) {
        return 'Please select a club'
    }
    match.data.push({ club: [club] })
}