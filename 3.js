import * as fs from "fs"
import cond from "fj-cond"

const data = fs.readFileSync("3-input.txt").toString();

const steps = data.split('');

function getMoveResult(startingCoordinates, move) {
  return cond([
    [() => move === '^', () => [startingCoordinates[0], startingCoordinates[1] + 1]],
    [() => move === 'v', () => [startingCoordinates[0], startingCoordinates[1] - 1]],
    [() => move === '<', () => [startingCoordinates[0] - 1, startingCoordinates[1]]],
    [() => move === '>', () => [startingCoordinates[0] + 1, startingCoordinates[1]]]
  ])();
}

let currentCoordinates = [0, 0];

// Basic sanity check
function assertStringEquals(argOne, argTwo) {
  if (argOne.toString() !== argTwo.toString()) {
    throw new Error(`Assertion failed, ${argOne} does not equal ${argTwo}`);
  }
}

assertStringEquals(getMoveResult(currentCoordinates, '^'), [0, 1]);
assertStringEquals(getMoveResult(currentCoordinates, 'v'), [0, -1]);
assertStringEquals(getMoveResult(currentCoordinates, '<'), [-1, 0]);
assertStringEquals(getMoveResult(currentCoordinates, '>'), [1, 0]);

let visitedHouseCoordinates = new Map();

visitedHouseCoordinates.set(currentCoordinates.toString(), 1);

for (let step of steps) {
  currentCoordinates = getMoveResult(currentCoordinates, step);
  let presentsAtLocation =
      visitedHouseCoordinates.get(currentCoordinates.toString()) || 0;
  visitedHouseCoordinates.set(currentCoordinates.toString(),
      presentsAtLocation + 1);
}

console.log(`number of houses with at least one present: ${visitedHouseCoordinates.size}`);