import { getInput } from '../utils.mjs';

const clamp = (num) => Math.min(Math.max(num, 0), 39);
const getEmptyRow = () => [...new Array(40)].join('.');
const paintPixel = (row, x) => {
  const buffer = row.split('');
  buffer[x] = '#';
  return buffer.join('');
};

const getBuffer = (register) => {
  let buffer = [...new Array(40)].join('.');
  const sprite = [register - 1, register, register + 1];
  const min = clamp(Math.min(...sprite));
  const max = clamp(Math.max(...sprite));

  for (let x = min; x <= max; x++) {
    buffer = paintPixel(buffer, x);
  }

  return buffer;
};

const isSpriteVisible = (register, x) => {
  return getBuffer(register)[x] === '#';
};

const instructions = getInput(10, 'input').split('\r\n');
const cycles = [];

let currentRow = getEmptyRow();

const doCycle = (cyclesLeft, operation) => {
  if (cyclesLeft === 0) return;

  const prevCycle = cycles[cycles.length - 1];

  if (cyclesLeft === 1 && operation !== null) {
    cycles.push(prevCycle + operation);
    cyclesLeft--;
  } else {
    if (cycles.length === 0) cycles.push(1);
    else cycles.push(prevCycle);
    cyclesLeft--;
  }

  const x = cycles.length % 40;

  if (isSpriteVisible(cycles[cycles.length - 1], x)) currentRow = paintPixel(currentRow, x);

  if (x === 0 && cycles.length) {
    console.log(currentRow);
    currentRow = getEmptyRow();
  }

  doCycle(cyclesLeft, operation);
};

instructions.forEach((line) => {
  let [instruction, argument] = line.split(' ');
  argument = Number(argument);

  switch (instruction) {
    case 'noop':
      doCycle(1, null);
      break;
    case 'addx':
      doCycle(2, argument);
  }
});
