import { firstHole } from "./holes";
export default class Hole {
    public data = [];
    public map = firstHole.map;
    public teeoffPosition = firstHole.teeoffPositions;
    private static instance: Hole;

    public static getInstance(): Hole {
        if (!Hole.instance) {
            Hole.instance = new Hole();
        }
        return Hole.instance;
    }
}
