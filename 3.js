import * as fs from "fs"
import cond from "fj-cond"
import {unique} from "lodash"

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

function isEven(num) {
  return num % 2 === 0;
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

// Main computation


let visitedHouseCoordinates = new Map();

visitedHouseCoordinates.set(currentCoordinates.toString(), true);

for (let step of steps) {
  currentCoordinates = getMoveResult(currentCoordinates, step);
  visitedHouseCoordinates.set(currentCoordinates.toString(), true);
}

console.log(`number of houses with at least one present: ${visitedHouseCoordinates.size}`);

// part b

let santaVisits = new Map(),
    roboVisits = new Map(),
    santaCoordinates = [0,0],
    roboCoordinates = [0,0];

santaVisits.set(santaCoordinates.toString(), true);
roboVisits.set(roboCoordinates.toString(), true);

for (var stepNumber = 0; stepNumber < steps.length; stepNumber++) {
  if (isEven(stepNumber)) {
    santaCoordinates = getMoveResult(santaCoordinates, steps[stepNumber]);
    santaVisits.set(santaCoordinates.toString(), true);
  } else {
    roboCoordinates = getMoveResult(roboCoordinates, steps[stepNumber]);
    roboVisits.set(roboCoordinates.toString(), true);
  }
}

console.log('Houses covered by either santa or robosanta: ' +
    unique(Array.from(santaVisits.keys()).concat(Array.from(roboVisits.keys()))).length);
