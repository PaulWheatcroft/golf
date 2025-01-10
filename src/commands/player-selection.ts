export default function playerSelection(players: { name: string }[]) {
    return players.sort(() => Math.random() - 0.5)
} 