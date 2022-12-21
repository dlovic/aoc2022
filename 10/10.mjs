import { getInput } from '../utils.mjs';

const instructions = getInput(10, 'input').split('\r\n');

const cycles = [1];

const cycle = (cyclesLeft, operation) => {
  if (cyclesLeft === 0) return;

  const prevCycle = cycles[cycles.length - 1];

  if (cyclesLeft === 1 && operation !== null) {
    cycles.push(prevCycle + operation);
    cyclesLeft--;
  } else {
    cycles.push(prevCycle);
    cyclesLeft--;
  }

  cycle(cyclesLeft, operation);
};

instructions.forEach((line) => {
  let [instruction, argument] = line.split(' ');
  argument = Number(argument);

  switch (instruction) {
    case 'noop':
      cycle(1, null);
      break;
    case 'addx':
      cycle(2, argument);
  }
});

const getSignalStrength = (cycle) => {
  return cycle * cycles[cycle - 1];
};

const signalStrengthSum = [20, 60, 100, 140, 180, 220].map((cycle) => getSignalStrength(cycle)).reduce((sum, cycleSignalStrength) => sum + cycleSignalStrength, 0);
console.log(signalStrengthSum);
