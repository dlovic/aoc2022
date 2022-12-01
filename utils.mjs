import fs from 'fs';

export const getInput = (number, file) => {
    return fs.readFileSync(`${number}/${file}.txt`, 'utf-8');
}