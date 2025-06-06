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

// Mock console.log to avoid cluttering test output
console.log = jest.fn();

clear();

describe("Golf Game Journey", () => {
  // Initialize game state that will be shared across tests
  const match = Hole.getInstance();
  let player1, player2;
  
  // Reset match state before all tests
  beforeAll(() => {
    match.data = [];
  });

  test("1. Should initialize the game and add players", () => {
    const response = playerSelection("Alice", "Bob");
    expect(response).toBe("Game on!!!!");
    
    // Store players for future tests
    player1 = match.data.find(player => player.id === 1);
    player2 = match.data.find(player => player.id === 2);
    
    expect(player1).toBeDefined();
    expect(player2).toBeDefined();
  });

  test("2. Should set the tee-off position for player 1", () => {
    // Uses player1 from previous test
    const position = 1; // Left tee position
    teeOffPosition(player1, position);
    
    const teeOffEvent = match.data.find(event => 
      event.type === 'teeOffPosition' && event.playerId === player1.id
    );
    
    expect(teeOffEvent).toBeDefined();
    expect(teeOffEvent.position).toEqual(match.teeoffPosition[position - 1]);
  });

  test("3. Should select a club for player 1", () => {
    // Uses player1 from previous test
    const selectedClub = clubs.find(club => club.name === "Driver");
    clubSelection(player1, selectedClub);
    
    const clubSelectionEvent = match.data.find(event => 
      event.type === 'clubSelection' && event.playerId === player1.id
    );
    
    expect(clubSelectionEvent).toBeDefined();
    expect(clubSelectionEvent.club).toEqual(selectedClub);
  });

  test("4. Should hit the ball for player 1", () => {
    // Uses player1 from previous test
    hitBall(player1, { checkTurn: false }); // Disable turn checking for unit test
    
    const hitBallEvent = match.data.find(event => 
      event.type === 'hitBall' && event.playerId === player1.id
    );
    
    expect(hitBallEvent).toBeDefined();
    expect(hitBallEvent.position).toBeDefined();
  });

  test("5. Should set the tee-off position for player 2", () => {
    // Uses player2 from first test
    const position = 2; // Center tee position
    teeOffPosition(player2, position);
    
    const teeOffEvent = match.data.find(event => 
      event.type === 'teeOffPosition' && event.playerId === player2.id
    );
    
    expect(teeOffEvent).toBeDefined();
    expect(teeOffEvent.position).toEqual(match.teeoffPosition[position - 1]);
  });

  test("6. Should select a club for player 2", () => {
    // Uses player2 from first test
    const selectedClub = clubs.find(club => club.name === "Long Iron");
    clubSelection(player2, selectedClub);
    
    const clubSelectionEvent = match.data.find(event => 
      event.type === 'clubSelection' && event.playerId === player2.id
    );
    
    expect(clubSelectionEvent).toBeDefined();
    expect(clubSelectionEvent.club).toEqual(selectedClub);
  });

  test("7. Should hit the ball for player 2", () => {
    // Uses player2 from first test
    hitBall(player2, { checkTurn: false }); // Disable turn checking for unit test
    
    const hitBallEvent = match.data.find(event => 
      event.type === 'hitBall' && event.playerId === player2.id
    );
    
    expect(hitBallEvent).toBeDefined();
    expect(hitBallEvent.position).toBeDefined();
  });

  test("8. Should continue the game with player 1's second shot", () => {
    // Select a new club for player 1's second shot
    const selectedClub = clubs.find(club => club.name === "Wedge");
    clubSelection(player1, selectedClub);
    
    const clubSelectionEvent = match.data.findLast(event => 
      event.type === 'clubSelection' && event.playerId === player1.id
    );
    
    expect(clubSelectionEvent.club).toEqual(selectedClub);
    
    // Hit the ball again
    hitBall(player1, { checkTurn: false }); // Disable turn checking for unit test
    
    // Find the latest hitBall event for player 1
    const hitBallEvents = match.data.filter(event => 
      event.type === 'hitBall' && event.playerId === player1.id
    );
    
    expect(hitBallEvents.length).toBe(2); // Should have 2 hitBall events now
  });

  // At the end, we can verify the full game state
  test("9. Should have a complete game journey in match data", () => {
    // Check the total number of events in the match data
    expect(match.data.length).toBeGreaterThan(8); // Players + teeoffs + club selections + hits
    
    // Verify the sequence of events for player 1 (both id and playerId)
    const player1Events = match.data.filter(event => 
      event.id === player1.id || event.playerId === player1.id
    );
    expect(player1Events.length).toBe(6); // player + teeoff + club selection x2 + hitBall x2
    
    // Verify the sequence of events for player 2 (both id and playerId)
    const player2Events = match.data.filter(event => 
      event.id === player2.id || event.playerId === player2.id
    );
    expect(player2Events.length).toBe(4); // player + teeoff + club selection + hitBall
  });
});
