import { getInput } from "../utils.mjs";

const input = getInput(2, "input").split("\r\n");

let total = 0;

input.forEach((row, r) => {
  let gameScore = 0;
  const [opponent, me] = row
    .split(" ")
    .map((x, i) =>
      i === 0 ? { A: 0, B: 1, C: 2 }[x] : { X: 0, Y: 1, Z: 2 }[x]
    );

  gameScore += me + 1;

  if (me === opponent) gameScore += 3;
  if (me === 0 && opponent === 2) gameScore += 6;
  if (me === 1 && opponent === 0) gameScore += 6;
  if (me === 2 && opponent === 1) gameScore += 6;

  console.log(`game ${r + 1}: ${gameScore}`);
  total += gameScore;
});

console.log(total);
