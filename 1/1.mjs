import { getInput } from "../utils.mjs";

const input = getInput(1, "input").split("\r\n");

const elves = [];

let counter = 0;
input.forEach((x) => {
  if (!x) {
    counter++;
  } else {
    elves[counter] = (elves[counter] || 0) + parseInt(x);
  }
});

elves.sort((a, b) => b - a);

console.log("part1", elves.slice(0, 1));
console.log(
  "part2",
  elves.slice(0, 3).reduce((acc, curr) => acc + curr, 0)
);
