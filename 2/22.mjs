import { getInput } from "../utils.mjs";

const input = getInput(2, "input").split("\r\n");

let total = 0;

const getMe = (result, opponent) => {
  if (result === 3) return opponent;

  if (result === 0) {
    let me = opponent - 1;
    if (me === -1) return 2;
    return me;
  }

  if (result === 6) {
    let me = opponent + 1;
    if (me === 3) return 0;
    return me;
  }
};

input.forEach((row, r) => {
  const [opponent, result] = row
    .split(" ")
    .map((x, i) =>
      i === 0 ? { A: 0, B: 1, C: 2 }[x] : { X: 0, Y: 3, Z: 6 }[x]
    );

  const me = getMe(result, opponent);
  total += result + me + 1;
});

console.log(total);
