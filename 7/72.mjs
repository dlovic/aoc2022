import { getInput } from '../utils.mjs';
const input = getInput(7, 'input').split('\r\n');

class Directory {
  constructor(name, parent) {
    this.parent = parent;
    this.name = name;
    this.directories = [];
    this.files = [];
  }

  size(fn) {
    const fileSize = this.files.reduce((sum, f) => sum + f.size, 0);
    const dirSize = this.directories.reduce((sum, d) => sum + d.size(fn), 0);

    if (fn) fn(this);

    return fileSize + dirSize;
  }
}

const root = new Directory('/', null);
let currentDirectory = root;

const createDirectory = (name, parent) => new Directory(name, parent);

const changeDirectory = (path) => {
  if (path === '/') currentDirectory = root;
  else if (path === '..') currentDirectory = currentDirectory.parent;
  else currentDirectory = currentDirectory.directories.find((x) => x.name === path);
};

const parseLine = (line) => {
  if (line.startsWith('$')) {
    const [cmd, arg] = line.replace('$ ', '').split(' ');

    switch (cmd) {
      case 'cd':
        changeDirectory(arg);
    }
  } else {
    let [prefix, name] = line.split(' ');

    if (prefix === 'dir') currentDirectory.directories.push(createDirectory(name, currentDirectory));
    else currentDirectory.files.push({ name, size: Number(prefix) });
  }
};

input.forEach((line) => {
  parseLine(line);
});

const deletableDirectories = [];

const minSize = 30000000 - (70000000 - root.size());
root.size((directory) => {
  if (directory.size() >= minSize) deletableDirectories.push(directory);
});

deletableDirectories.sort((a, b) => a.size() - b.size());

console.log(deletableDirectories.map((d) => d.size()));
