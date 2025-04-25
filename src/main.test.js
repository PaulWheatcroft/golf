import displayHoleMap from "./fontend/display-hole-map";
import playerSelection from "./commands/player-selection";
import clubSelection from "./commands/club-selection";
import teeOffPosition from "./commands/tee-off-position";
import hitBall from "./commands/hit-ball";
import Hole from "./data-store/match";
import { clubs } from "./types/clubs";
import clear from "clear";

// Mock chalk to avoid issues during testing
jest.mock("chalk", () => ({
  __esModule: true,
  default: {
    green: (str) => str,
    bgGrey: (str) => str,
    bgGreen: (str) => str,
    bgGreenBright: (str) => str,
    bgBlue: (str) => str,
    bgYellow: (str) => str,
    bgRedBright: (str) => str,
    bgWhite: (str) => str,
  }
}));

// Mock dynamic import
jest.mock('./main.ts', () => ({}), { virtual: true });

clear();

describe("Golf Game", () => {
  let match;

  beforeEach(() => {
    match = Hole.getInstance();
    match.data = [];
  });

  test("should display hole map", () => {
    console.log = jest.fn();
    displayHoleMap();
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Hole Map:")
    );
  });

  test("should add players to the match", () => {
    const response = playerSelection("Alice", "Bob");
    expect(response).toBe("Game on!!!!");
    expect(match.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Alice" }),
        expect.objectContaining({ name: "Bob" }),
      ])
    );
  });

  test("should select a club for the player", () => {
    playerSelection("Alice", "Bob");
    const player = match.data.find((player) => player.name === "Alice");
    const selectedClub = clubs.find((club) => club.name === "Driver");
    clubSelection(player, selectedClub);
    expect(match.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: "clubSelection", club: selectedClub }),
      ])
    );
  });
});
