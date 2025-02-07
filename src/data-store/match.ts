import { firstHole } from "./first-hole";
export default class Match {
    public data = [];
    public map = firstHole.map;
    public teeoffPosition = firstHole.teeoffPositions;
    private static instance: Match;

    public static getInstance(): Match {
        if (!Match.instance) {
            Match.instance = new Match();
        }
        return Match.instance;
    }
}
