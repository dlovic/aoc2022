import { getInput } from "../utils.mjs";
const input = getInput(3, "input").split("\r\n");

let itemPoints = [];

for (let index = 65; index < 65 + 26; index++) {
  itemPoints.push(String.fromCharCode(index).toLowerCase());
}

itemPoints = [...itemPoints, ...itemPoints.map((x) => x.toUpperCase())];

let score = 0;

for (let index = 0; index < input.length; index += 3) {
  const group = input.slice(index, index + 3);

  const groupSets = group.map((elf) => new Set([...elf]));
  const groupEmblem = groupSets.reduce((matchingItems, groupSet) => {
    if (!matchingItems.length) return [...groupSet];

    return matchingItems.filter((item) => [...groupSet].includes(item));
  }, [])[0];

  score += itemPoints.indexOf(groupEmblem) + 1;
}

console.log(score);
