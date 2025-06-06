import Hole from "../data-store/match";
import aimSelection from "./aim-selection";
import { clubs } from "../types/clubs";

beforeEach(() => {
    Hole.getInstance().data = [
        { id: 1, type: "player", name: "Vladislav" },
        { id: 2, type: "player", name: "Paul" },
        {
            playerId: 1,
            playerName: "Vladislav",
            type: "teeOffPosition",
            position: [15, 2],
        },
        {
            playerId: 1,
            playerName: "Vladislav",
            type: "clubSelection",
            club: { name: "Long Iron", distance: 5, rough: false, sand: false },
        },
    ];
});

describe("aim-selection at tee off", () => {
    it("should return available aim options if the player does not select a valid aim option", () => {
        const match = Hole.getInstance();
        const player1 = match.data[0];
        const response = aimSelection(player1, [4, 1]);
        expect(response).toBe("This is not an available square for you to aim at. Please select one of 10,1,10,2,10,3");
    })
    it("Should not return squares that are not playable i.e. out of bounds and water", () => {
        const match = Hole.getInstance();
        const player1 = match.data[0];
        match.data.push({ playerId: player1.id, playerName: player1.name, type: 'clubSelection', club: clubs[1] });
        console.dir(match.data);
        const response = aimSelection(player1, [2, 1]);
        expect(response).toBe("This is not an available square for you to aim at. Please select one of 11,1,11,2,11,3");
    });
    it("Should return 'Ready to take a swing?' if the player selects a valid aim option", () => {
        const match = Hole.getInstance();
        const player1 = match.data[0];
        const response = aimSelection(player1, [10, 1]);
        expect(response).toBe("Ready to take a swing? Hit that space bar!!!!!!!");
        expect(match.data[4].position).toEqual([10, 1]);
    });
});