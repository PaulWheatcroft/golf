import teeOffPosition from './tee-off-position'

describe('tee-off', () => {
    it.only('the first player chooses the middle position to tee off from', () => {
        const firstPlayer = { name: 'player1' }
        const positionalOptions = [1, 2, 3]

        const response = teeOffPosition(firstPlayer, positionalOptions[1])
        expect(response).toBe(2)
    })
})