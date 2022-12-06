import { getInput } from "../utils.mjs";
const input = getInput(4, "input").split("\r\n");

const doPairsFullyContain = (a, b) => {
  return (
    a.filter((x) => b.includes(x)).length === a.length ||
    b.filter((x) => a.includes(x)).length === b.length
  );
};

const getPairs = (pairInput) => {
  return pairInput.reduce((pairs, part) => {
    const [start, end] = part.split("-").map((p) => parseInt(p));
    const pair = [...new Array(end - start + 1)].map((_, i) => i + start);

    return [...pairs, pair];
  }, []);
};

console.log(
  input.reduce((fullyContainedPairs, line) => {
    const [a, b] = getPairs(line.split(","));

    if (doPairsFullyContain(a, b)) return ++fullyContainedPairs;

    return fullyContainedPairs;
  }, 0)
);
