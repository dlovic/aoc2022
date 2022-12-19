import { getInput } from '../utils.mjs';
const map = getInput(8, 'input');
const rows = map.split('\r\n');
const width = rows[0].length;
const height = rows.length;

const visibleTrees = [];

const getTree = (x, y) => {
  return rows[y][x];
};

const isVisibleFrom = (direction, sX, sY) => {
  let isVisible = true;
  const treeHeight = getTree(sX, sY);

  if (sX === 1 && sY === 1) debugger;

  switch (direction) {
    case 'top':
      for (let y = sY - 1; y >= 0; y--) {
        if (getTree(sX, y) >= treeHeight) {
          isVisible = false;
          break;
        }
      }
      break;
    case 'bottom':
      for (let y = sY + 1; y <= height - 1; y++) {
        if (getTree(sX, y) >= treeHeight) {
          isVisible = false;
          break;
        }
      }
      break;
    case 'left':
      for (let x = sX - 1; x >= 0; x--) {
        if (getTree(x, sY) >= treeHeight) {
          isVisible = false;
          break;
        }
      }
      break;
    case 'right':
      for (let x = sX + 1; x <= width - 1; x++) {
        if (getTree(x, sY) >= treeHeight) {
          isVisible = false;
          break;
        }
      }
      break;
  }

  return isVisible;
};

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const visibility = ['top', 'bottom', 'left', 'right'].reduce((acc, direction) => [...acc, isVisibleFrom(direction, x, y)], []);
    if (visibility.some((x) => x)) visibleTrees.push(getTree(x, y));
  }
}

console.log(visibleTrees.length);
