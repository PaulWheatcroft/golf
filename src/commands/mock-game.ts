export const gameOne = {
    players: [
      { name: 'Paul' },
      { name: 'Vladislav' }
    ],
    holes: [
      {
        number: 1,
        teeOffPositions: [
          { x: 1, y: 4 },
          { x: 1, y: 4 }
        ],
        strokes: [
          {
            playerIndex: 0,
            strokeNumber: 1,
            club: 'Driver',
            ballPosition: { x: 6, y: 4 },
            distanceFromHole: 6
          },
          {
            playerIndex: 1,
            strokeNumber: 1,
            club: 'Driver',
            ballPosition: { x: 4, y: 4 },
            distanceFromHole: 8
          },
          {
            playerIndex: 1,
            strokeNumber: 2,
            club: 'Long Iron',
            ballPosition: { x: 8, y: 4 },
            distanceFromHole: 4
          },
        ]
      }
    ]
  }