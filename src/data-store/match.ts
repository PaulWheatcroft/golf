import { firstHole } from "./holes";

interface GreenMap {
  map: string[][];
  mainMapGreenCoords: {
    topLeft: [number, number];
    bottomRight: [number, number];
    holePosition: [number, number];
  };
  holePosition: [number, number];
}

export default class Hole {
    public data = [];
    public map = firstHole.map;
    public teeoffPosition = firstHole.teeoffPositions;
    public greenMap = firstHole.greenMap;
    private static instance: Hole;

    private constructor() {
        const { firstHole } = require('./holes');
        this.map = firstHole.map;
        this.teeoffPosition = firstHole.teeoffPositions;
        this.greenMap = firstHole.greenMap;
    }

    public static getInstance(): Hole {
        if (!Hole.instance) {
            Hole.instance = new Hole();
        }
        return Hole.instance;
    }
}

export interface Match {
  player1Position: [number, number];
  player2Position: [number, number];
  player1Strokes: number;
  player2Strokes: number;
  currentPlayerIndex: number;
  currentHole: {
    par: number;
    distance: number;
    greenMap: {
      map: string[][];
      holePosition: [number, number];
    };
  };
  isComplete: boolean;
  winner?: number;
}

export interface Player {
  id: number;
  name: string;
  position: [number, number];
  isOnGreen: boolean;
  greenPosition?: [number, number];
  lastGreenEntry?: {
    entryPoint: [number, number];
    rollPath: [number, number][];
  };
  hasHoledOut: boolean;
  strokes: number;
}

export interface Shot {
  power: number;
  direction: number;
  club: string;
}

export function createMatch(): Match {
  return {
    player1Position: [0, 0],
    player2Position: [0, 0],
    player1Strokes: 0,
    player2Strokes: 0,
    currentPlayerIndex: 0,
    currentHole: {
      par: 4,
      distance: 400,
      greenMap: {
        map: [
          ['flat', 'up-right', 'up', 'up-left', 'flat'],
          ['right', 'up-right', 'up', 'up-left', 'left'],
          ['right', 'right', 'flat', 'left', 'left'],
          ['down-right', 'down-right', 'down', 'down-left', 'down-left'],
          ['down-right', 'down', 'down', 'down', 'down-left']
        ],
        holePosition: [2, 2]
      }
    },
    isComplete: false
  };
}
