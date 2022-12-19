import { getInput } from '../utils.mjs';

const moves = getInput(9, 'input')
  .split('\r\n')
  .map((x) => {
    const [direction, length] = x.split(' ');
    return { direction, length: Number(length) };
  });

const headHistory = [{ x: 0, y: 0 }];
const tailHistory = [{ x: 0, y: 0 }];

const follow = (head) => {
  if (Math.abs(tailHistory[0].x - head.x) >= 2 || Math.abs(tailHistory[0].y - head.y) >= 2) {
    tailHistory.unshift({ ...headHistory[0] });
  }
};

const moveHead = (direction) => {
  let head = { ...headHistory[0] };

  switch (direction) {
    case 'U':
      head.y += 1;
      break;
    case 'D':
      head.y -= 1;
      break;
    case 'R':
      head.x += 1;
      break;
    case 'L':
      head.x -= 1;
      break;
  }

  follow(head);
  headHistory.unshift(head);
};

moves.forEach(({ direction, length }) => {
  for (let index = 0; index < length; index++) {
    moveHead(direction);
  }
});

console.log(new Set(tailHistory.map((x) => `${x.x}${x.y}`)).size);
