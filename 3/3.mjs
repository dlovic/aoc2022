import { getInput } from "../utils.mjs";
const input = getInput(3, "input").split("\r\n");

let itemPoints = [];

for (let index = 65; index < 65 + 26; index++) {
  itemPoints.push(String.fromCharCode(index).toLowerCase());
}

itemPoints = [...itemPoints, ...itemPoints.map((x) => x.toUpperCase())];

const getSackPriortyScore = (rucksack) => {
  const compartment1 = [...rucksack].slice(0, Math.floor(rucksack.length / 2));
  const compartment2 = [...rucksack].slice(compartment1.length);

  return [
    ...new Set(compartment1.filter((x) => compartment2.includes(x))),
  ].reduce((sackScore, item) => {
    return sackScore + itemPoints.indexOf(item) + 1;
  }, 0);
};

const totalScore = input.reduce((score, rucksack) => {
  return (score += getSackPriortyScore(rucksack));
}, 0);

console.log(totalScore);
