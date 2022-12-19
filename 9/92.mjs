import { getInput } from '../utils.mjs';

const moves = getInput(9, 'input')
  .split('\r\n')
  .map((x) => {
    const [direction, length] = x.split(' ');
    return { direction, length: Number(length) };
  });

const rope = [...[...new Array(10)].map((knot) => [{ x: 0, y: 0 }])];

const follow = () => {
  for (let knot = 1; knot < rope.length; knot++) {
    let leader = { ...rope[knot - 1][0] };
    let follower = { ...rope[knot][0] };

    const dX = leader.x - follower.x;
    const dY = leader.y - follower.y;

    if (Math.abs(dX) >= 2 || Math.abs(dY) >= 2) {
      follower.x += Math.sign(dX);
      follower.y += Math.sign(dY);
      rope[knot].unshift({ ...follower });
    }
  }
};

const moveHead = (direction) => {
  let head = { ...rope[0][0] };

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

  rope[0].unshift(head);
  follow();
};

moves.forEach(({ direction, length }, i) => {
  for (let index = 0; index < length; index++) {
    moveHead(direction);
  }
});

//console.log(rope);

console.log(new Set(rope[9].map((x) => `${x.x}${x.y}`)).size);
