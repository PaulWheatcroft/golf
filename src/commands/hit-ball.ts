import Hole from '../data-store/match';
import { clubs } from '../types/clubs';

// Move rollDice to a separate module for easier mocking
export const diceRoller = {
  rollDice: (): number => {
    return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
  }
};

function getClubModifiers(selectedClub, powerRoll, accuracyRoll) {
  const clubAttributes = clubs.find(club => club.name === selectedClub.club.name);
  const power = clubAttributes.fairwayPower[powerRoll - 1];
  const accuracy = clubAttributes.fairwayAccuracy[accuracyRoll - 1];
  console.log(`Power Roll: ${powerRoll}, Accuracy Roll: ${accuracyRoll}`);
  console.log(`Power Modified: ${power}, Accuracy Modified: ${accuracy}`);
  return { power, accuracy };
}

const accuracyTextMap = (accuracy) => (
  accuracy === 1 ? 'left' :
  accuracy === 2 ? 'straight' :
  accuracy === 3 ? 'right' :
  'unknown'
);

export default function hitBall(player) {
  const matchData = Hole.getInstance().data;
  const selectedClub = matchData.findLast(item => item.type === 'clubSelection');

  if (!selectedClub) return 'Please select a club';
  if (selectedClub.playerId !== player.id) return 'It is not your turn';

  const currentPosition = matchData.findLast(item => item.type === 'hitBall' && item.playerId === player.id) ||
                          matchData.findLast(item => item.type === 'teeOffPosition' && item.playerId === player.id);

  // Use the diceRoller object instead of directly calling rollDice
  const powerRoll = diceRoller.rollDice();
  const accuracyRoll = diceRoller.rollDice();

  const { power, accuracy } = getClubModifiers(selectedClub, powerRoll, accuracyRoll);
  const distance = selectedClub.club.distance + power;
  let newAccuracy = currentPosition.position[1];

  if (accuracy === 1) newAccuracy -= 1;
  else if (accuracy === 3) newAccuracy += 1;

  const newPosition = [currentPosition.position[0] - distance, newAccuracy];
  
  matchData.push({ playerId: player.id, playerName: player.name, type: 'hitBall', position: newPosition });
  return `Player ${player.name} started at ${currentPosition.position} and hit the ball ${distance}0 yards ${accuracyTextMap(accuracy)} to position ${newPosition}`;
}