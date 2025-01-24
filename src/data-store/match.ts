// create a class that will be use to store an array of objects that will be used to store the match data as singleton
export default class Match {
    public data = [];
    private static instance: Match;

    public static getInstance(): Match {
        if (!Match.instance) {
            Match.instance = new Match();
        }
        return Match.instance;
    }
}
