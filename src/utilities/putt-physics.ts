interface PuttPhysicsResult {
  finalPosition: [number, number];
  isHoled: boolean;
  path: [number, number][];
}

interface WindCondition {
  direction: 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';
  strength: number; // 0-5, where 5 is strongest
}

interface SlopeEffect {
  vertical: number;   // -1 to 1 (negative is uphill)
  horizontal: number; // -1 to 1 (negative is leftward)
}

/**
 * Calculates how slopes affect the ball's movement
 */
function calculateSlopeEffect(slopeType: string): SlopeEffect {
  const effect: SlopeEffect = { vertical: 0, horizontal: 0 };
  
  // Base slope effects
  if (slopeType.includes('up')) effect.vertical = -0.5;
  if (slopeType.includes('down')) effect.vertical = 0.5;
  if (slopeType.includes('left')) effect.horizontal = -0.5;
  if (slopeType.includes('right')) effect.horizontal = 0.5;
  
  // Diagonal slopes have reduced effect in each direction
  if (slopeType.includes('up') && (slopeType.includes('left') || slopeType.includes('right'))) {
    effect.vertical *= 0.7;
    effect.horizontal *= 0.7;
  }
  if (slopeType.includes('down') && (slopeType.includes('left') || slopeType.includes('right'))) {
    effect.vertical *= 0.7;
    effect.horizontal *= 0.7;
  }
  
  return effect;
}

/**
 * Applies wind effects to the ball's movement
 */
function applyWindEffect(position: [number, number], wind: WindCondition): [number, number] {
  const [row, col] = position;
  const windEffect = wind.strength * 0.1; // Scale wind strength to reasonable effect
  
  let rowEffect = 0;
  let colEffect = 0;
  
  // Calculate wind effects based on direction
  switch(wind.direction) {
    case 'N': rowEffect = -windEffect; break;
    case 'S': rowEffect = windEffect; break;
    case 'E': colEffect = windEffect; break;
    case 'W': colEffect = -windEffect; break;
    case 'NE': 
      rowEffect = -windEffect * 0.7;
      colEffect = windEffect * 0.7;
      break;
    case 'NW':
      rowEffect = -windEffect * 0.7;
      colEffect = -windEffect * 0.7;
      break;
    case 'SE':
      rowEffect = windEffect * 0.7;
      colEffect = windEffect * 0.7;
      break;
    case 'SW':
      rowEffect = windEffect * 0.7;
      colEffect = -windEffect * 0.7;
      break;
  }
  
  return [row + rowEffect, col + colEffect];
}

/**
 * Simulates ball physics for a putt
 */
export function simulatePutt(
  startPosition: [number, number],
  power: number, // 1-10
  direction: number, // Degrees (0-359)
  greenMap: any,
  wind?: WindCondition
): PuttPhysicsResult {
  const path: [number, number][] = [startPosition];
  let currentPos = [...startPosition] as [number, number];
  let remainingPower = power;
  const friction = 0.1; // Base friction coefficient
  
  // Convert direction to radians
  const directionRad = (direction * Math.PI) / 180;
  
  // Initial velocity components
  let velocityX = Math.cos(directionRad) * power;
  let velocityY = Math.sin(directionRad) * power;
  
  while (remainingPower > 0) {
    // Get current slope
    const slope = greenMap.map[Math.floor(currentPos[0])][Math.floor(currentPos[1])];
    const slopeEffect = calculateSlopeEffect(slope);
    
    // Apply slope effects to velocity
    velocityX += slopeEffect.horizontal * 0.2;
    velocityY += slopeEffect.vertical * 0.2;
    
    // Apply wind if present
    if (wind) {
      const withWind = applyWindEffect(currentPos, wind);
      currentPos = withWind;
    }
    
    // Update position based on current velocity
    currentPos = [
      currentPos[0] + velocityY * 0.1,
      currentPos[1] + velocityX * 0.1
    ];
    
    // Keep within bounds
    currentPos = [
      Math.max(0, Math.min(9, currentPos[0])),
      Math.max(0, Math.min(9, currentPos[1]))
    ];
    
    // Add to path
    path.push([...currentPos] as [number, number]);
    
    // Apply friction and slope resistance
    const slopeResistance = Math.abs(slopeEffect.vertical) + Math.abs(slopeEffect.horizontal);
    remainingPower -= (friction + slopeResistance * 0.05);
    
    // Reduce velocities
    velocityX *= (1 - friction);
    velocityY *= (1 - friction);
    
    // Check if holed
    const distanceToHole = Math.sqrt(
      Math.pow(currentPos[0] - greenMap.holePosition[0], 2) +
      Math.pow(currentPos[1] - greenMap.holePosition[1], 2)
    );
    
    // Ball is holed if within 0.5 units and speed is low enough
    if (distanceToHole < 0.5 && remainingPower < 2) {
      return {
        finalPosition: greenMap.holePosition,
        isHoled: true,
        path
      };
    }
  }
  
  return {
    finalPosition: [Math.floor(currentPos[0]), Math.floor(currentPos[1])],
    isHoled: false,
    path
  };
} 