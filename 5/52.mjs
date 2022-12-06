import { getInput } from "../utils.mjs";
const input = getInput(5, "input");

const [sketch, instructionsSection] = input.split("\r\n\r\n");
const instructions = instructionsSection.split("\r\n");

const getStacks = (indexes) => {
  let stackLines = sketch.split("\r\n");
  let levels = stackLines.slice(0, stackLines.length - 1).reverse();

  return indexes.reduce((allStacks, index) => {
    const stack = [];
    levels.every((l) => {
      if (l[index] !== " ") {
        stack.push(l[index]);
        return true;
      }

      return false;
    });

    return [...allStacks, stack];
  }, []);
};

const getStackIndexes = (lines) => {
  let indexes = [];

  lines.every((line, lineNumber) => {
    if (line.indexOf("1") > -1) {
      indexes = [...lines[lineNumber]]
        .filter((x) => x !== " ")
        .map((x) => lines[lineNumber].indexOf(x));

      return false;
    }

    return true;
  });

  return indexes;
};

const executeInstructions = (stacks, instruction) => {
  // fucking js
  const [move, from, to] = instruction
    .replace("move", "")
    .replace("from", "")
    .replace("to", "")
    .split("  ")
    .map((x) => parseInt(x));

  const fromIndex = stacks[from - 1].length - move;
  stacks[to - 1].push(...stacks[from - 1].splice(fromIndex, move));
};

let stackIndexes = getStackIndexes(sketch.split("\r\n"));
let stacks = getStacks(stackIndexes);

console.log(sketch);
console.log(stacks);
instructions.forEach((instruction) => executeInstructions(stacks, instruction));
console.log(stacks);
const message = stacks.reduce((message, stack) => {
  return (message += [...stack].reverse()[0]);
}, "");

console.log(message);
