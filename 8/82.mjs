import { getInput } from '../utils.mjs';
const map = getInput(8, 'input');
const rows = map.split('\r\n');
const width = rows[0].length;
const height = rows.length;

const scenicScores = [];

const getTree = (x, y) => {
  return rows[y][x];
};

const getViewDistance = (direction, sX, sY) => {
  let viewDistance = 0;
  const treeHeight = getTree(sX, sY);

  if (sX === 2 && sY === 3) debugger;

  switch (direction) {
    case 'top':
      for (let y = sY - 1; y >= 0; y--) {
        viewDistance++;
        if (getTree(sX, y) >= treeHeight) break;
      }
      break;
    case 'bottom':
      for (let y = sY + 1; y <= height - 1; y++) {
        viewDistance++;
        if (getTree(sX, y) >= treeHeight) break;
      }
      break;
    case 'left':
      for (let x = sX - 1; x >= 0; x--) {
        viewDistance++;
        if (getTree(x, sY) >= treeHeight) break;
      }
      break;
    case 'right':
      for (let x = sX + 1; x <= width - 1; x++) {
        viewDistance++;
        if (getTree(x, sY) >= treeHeight) break;
      }
      break;
  }

  return viewDistance;
};

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const viewDistances = ['top', 'bottom', 'left', 'right'].reduce((acc, direction) => [...acc, getViewDistance(direction, x, y)], []);
    scenicScores.push(viewDistances.reduce((score, distance) => score * distance, 1));
  }
}

console.log(Math.max(...scenicScores));
